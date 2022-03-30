/*
Copyright 2015-2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package wasm

import (
	"context"
	"fmt"
	"os"
	"sync"
	"testing"
	"time"

	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/trace"
	logrus "github.com/sirupsen/logrus/hooks/test"
	"github.com/wasmerio/wasmer-go/wasmer"

	"github.com/stretchr/testify/require"
)

type testTraits struct {
	i []*testTrait
}

type testTrait struct {
	ec            *ExecutionContext
	ok            wasmer.NativeFunction
	fail          wasmer.NativeFunction
	infinite      wasmer.NativeFunction
	delay100ms    wasmer.NativeFunction
	getEventIndex wasmer.NativeFunction
}

func newTestTraits() *testTraits {
	return &testTraits{i: make([]*testTrait, 0)}
}

func (e *testTraits) CreateTrait(ec *ExecutionContext) Trait {
	t := &testTrait{ec: ec}
	e.i = append(e.i, t)
	return t
}

func (e *testTraits) For(ec *ExecutionContext) (*testTrait, error) {
	for _, t := range e.i {
		if t.ec == ec {
			return t, nil
		}
	}

	return nil, trace.Errorf("testTrait not found for ExecutionContext %v", ec)
}

func (e *testTrait) ExportMethodsToWASM(store *wasmer.Store, imports *wasmer.ImportObject) error {
	return nil
}

func (e *testTrait) ImportMethodsFromWASM() error {
	var err error

	e.ok, err = e.ec.GetFunction("ok")
	if err != nil {
		return trace.Wrap(err)
	}

	e.fail, err = e.ec.GetFunction("fail")
	if err != nil {
		return trace.Wrap(err)
	}

	e.infinite, err = e.ec.GetFunction("infinite")
	if err != nil {
		return trace.Wrap(err)
	}

	e.delay100ms, err = e.ec.GetFunction("delay100ms")
	if err != nil {
		return trace.Wrap(err)
	}

	e.getEventIndex, err = e.ec.GetFunction("getEventIndex")
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

func (e *testTrait) OK() (interface{}, error) {
	return e.ec.Execute(e.ok)
}

func (e *testTrait) Fail() (interface{}, error) {
	return e.ec.Execute(e.fail)
}

func (e *testTrait) Infinite() (interface{}, error) {
	return e.ec.Execute(e.infinite)
}

func (e *testTrait) Delay100ms() (interface{}, error) {
	return e.ec.Execute(e.delay100ms)
}

func (e *testTrait) ValidatePBMessage(dataView interface{}) (interface{}, error) {
	return e.ec.Execute(e.getEventIndex, dataView)
}

func TestPool(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, _ := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 2,
	}, e)
	require.NoError(t, err)

	i, err := p.Get(ctx)
	require.NoError(t, err)
	require.NotNil(t, i)

	require.Len(t, p.contexts, 1)
	ec, err := p.Get(ctx)
	require.NoError(t, err)
	require.NotNil(t, ec)
	require.Len(t, p.contexts, 0)

	err = p.Put(ctx, i)
	require.NoError(t, err)

	require.Len(t, p.contexts, 1)
}

func TestRegularMethods(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, hook := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)
	f := newTestTraits()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 2,
	}, e, f)
	require.NoError(t, err)

	i, err := p.Get(ctx)
	require.NoError(t, err)
	require.NotNil(t, i)

	fi, err := f.For(i)
	require.NoError(t, err)
	require.NotNil(t, fi)

	r, err := fi.OK()
	require.NoError(t, err)
	require.Equal(t, r, int32(1))

	_, err = fi.Fail()
	require.Error(t, err, "unreachable")
	require.Contains(t, hook.LastEntry().Message, "Failure")

	_, err = fi.Infinite()
	require.Error(t, err, "execution timeout")
}

// TestParallelExecution the purpose of this test is to ensure that there would be no crashes
func TestParallelExecution(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, _ := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)
	f := newTestTraits()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 5,
	}, e, f)
	require.NoError(t, err)

	count := 50 // 100ms * 50 * 5 threads = ~1s

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func() {
			n, err := p.Get(ctx)
			require.NoError(t, err)

			s, err := f.For(n)
			require.NoError(t, err)
			require.NotNil(t, s)

			_, err = s.Delay100ms()
			require.NoError(t, err)

			err = p.Put(ctx, n)
			require.NoError(t, err)

			wg.Done()
		}()
	}

	wg.Wait()
}

func TestParallelProtobufInteropExecution(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, hook := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)
	pb := NewProtobufInterop()
	f := newTestTraits()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 32,
	}, e, f, pb)
	require.NoError(t, err)

	count := 50000

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func(i int) {
			oneof := events.MustToOneOf(&events.UserCreate{
				Metadata: events.Metadata{
					Index: int64(i),
				},
			})

			in, err := p.Get(ctx)
			require.NoError(t, err)

			ec, err := pb.For(in)
			require.NoError(t, err)
			require.NotNil(t, ec)

			dataView, err := ec.SendMessage(oneof)
			require.NoError(t, err)

			if len(hook.AllEntries()) > 0 {
				fmt.Println(hook.LastEntry())
			}

			tr, err := f.For(in)
			require.NoError(t, err)

			result, err := tr.ValidatePBMessage(dataView)
			require.NoError(t, err)
			require.Equal(t, result, int64(i))

			err = p.Put(ctx, in)
			require.NoError(t, err)

			wg.Done()
		}(i)
	}

	wg.Wait()
}

func TestHandleEvent(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, _ := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)
	pb := NewProtobufInterop()
	he := NewHandleEvent(pb)

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 32,
	}, e, pb, he)
	require.NoError(t, err)

	userCreate := &events.UserCreate{
		Metadata: events.Metadata{
			Index: int64(0),
		},
	}

	userLogin := &events.UserLogin{
		Metadata: events.Metadata{
			Index: int64(1),
		},
	}

	userDelete := &events.UserDelete{
		Metadata: events.Metadata{
			Index: int64(1),
		},
	}

	ectx, err := p.Get(ctx)
	require.NoError(t, err)

	h, err := he.For(ectx)
	require.NoError(t, err)
	require.NotNil(t, ectx)

	r, err := h.HandleEvent(ctx, userCreate)
	require.NoError(t, err)
	require.False(t, r.Success)
	require.Equal(t, r.Error, "UserCreate event is not allowed")

	r, err = h.HandleEvent(ctx, userLogin)
	require.NoError(t, err)
	require.True(t, r.Success)
	require.Equal(t, r.Event.GetUserLogin().Metadata.Index, int64(999))

	r, err = h.HandleEvent(ctx, userDelete)
	require.NoError(t, err)
	require.True(t, r.Success)
	require.Nil(t, r.Event)

	err = p.Put(ctx, ectx)
	require.NoError(t, err)
}
