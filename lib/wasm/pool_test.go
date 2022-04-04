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

// testTraitFactory represents trait factory for tests
type testTraitFactory struct {
	traits []*testTrait
}

// testTrait represents test trait
type testTrait struct {
	ectx               *ExecutionContext
	OK                 wasmer.NativeFunction
	Fail               wasmer.NativeFunction
	Infinite           wasmer.NativeFunction
	Delay100ms         wasmer.NativeFunction
	GetEventIndex      wasmer.NativeFunction
	GoMethodEntryPoint wasmer.NativeFunction
}

// newTestTraitFactory creates new test trait factory
func newTestTraitFactory() *testTraitFactory {
	return &testTraitFactory{traits: make([]*testTrait, 0)}
}

// CreateTrait creates new test trait and returns it
func (e *testTraitFactory) CreateTrait(ectx *ExecutionContext) Trait {
	t := &testTrait{ectx: ectx}
	e.traits = append(e.traits, t)
	return t
}

// For returns test trait bound to the specific execution context or error
func (e *testTraitFactory) For(ec *ExecutionContext) (*testTrait, error) {
	for _, t := range e.traits {
		if t.ectx == ec {
			return t, nil
		}
	}

	return nil, trace.Errorf("testTrait not found for ExecutionContext %v", ec)
}

// ExportMethodsToWasm exports methods from go side to WASM side
func (e *testTrait) ExportMethodsToWASM(store *wasmer.Store, imports *wasmer.ImportObject) error {
	imports.Register(
		"lib_wasm_test",
		map[string]wasmer.IntoExtern{
			"goMethod": wasmer.NewFunction(store, wasmer.NewFunctionType(
				wasmer.NewValueTypes(), // void
				wasmer.NewValueTypes(), // void
			), e.goMethod),
		},
	)

	return nil
}

// goMethod is the example go method, which could be called from WASM side and, in turn, calls infinite loop on WASM side
func (e *testTrait) goMethod(args []wasmer.Value) ([]wasmer.Value, error) {
	_, err := e.Infinite()
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return nil, nil
}

// ImportMethodsFromWASM reads WASM methods references to the current trait context
func (e *testTrait) ImportMethodsFromWASM() error {
	var err error

	e.OK, err = e.ectx.GetFunction("ok")
	if err != nil {
		return trace.Wrap(err)
	}

	e.Fail, err = e.ectx.GetFunction("fail")
	if err != nil {
		return trace.Wrap(err)
	}

	e.Infinite, err = e.ectx.GetFunction("infinite")
	if err != nil {
		return trace.Wrap(err)
	}

	e.Delay100ms, err = e.ectx.GetFunction("delay100ms")
	if err != nil {
		return trace.Wrap(err)
	}

	e.GetEventIndex, err = e.ectx.GetFunction("getEventIndex")
	if err != nil {
		return trace.Wrap(err)
	}

	e.GoMethodEntryPoint, err = e.ectx.GetFunction("goMethodEntryPoint")
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

func TestPool(t *testing.T) {
	ctx := context.Background()
	log, _ := logrus.NewNullLogger()

	bytes, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       bytes,
		Timeout:     time.Second,
		Concurrency: 2,
		TraitFactories: []TraitFactory{
			NewAssemblyScriptEnv(log),
			newTestTraitFactory(),
		},
	})
	require.NoError(t, err)

	ectx1, err := p.Get(ctx)
	require.NoError(t, err)
	require.NotNil(t, ectx1)
	require.Len(t, p.contexts, 1)

	ectx2, err := p.Get(ctx)
	require.NoError(t, err)
	require.NotNil(t, ectx2)
	require.Len(t, p.contexts, 0)
	require.NotEqual(t, ectx1, ectx2)

	err = p.Put(ctx, ectx1)
	require.NoError(t, err)

	require.Len(t, p.contexts, 1)
}

func TestRegularMethods(t *testing.T) {
	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, hook := logrus.NewNullLogger()
	testTraitFactory := newTestTraitFactory()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 2,
		TraitFactories: []TraitFactory{
			NewAssemblyScriptEnv(log),
			testTraitFactory,
		},
	})
	require.NoError(t, err)

	_, err = p.Execute(context.Background(), func(ectx *ExecutionContext) (interface{}, error) {
		tt, err := testTraitFactory.For(ectx)
		require.NoError(t, err)
		require.NotNil(t, tt)

		r, err := tt.OK()
		require.NoError(t, err)
		require.Equal(t, r, int32(1))

		_, err = tt.Fail()
		require.Error(t, err, "unreachable")
		require.Contains(t, hook.LastEntry().Message, "Failure")

		_, err = tt.Infinite()
		require.NoError(t, err)

		return nil, nil
	})

	require.Error(t, err, "execution timeout")

	_, err = p.Execute(context.Background(), func(ctx *ExecutionContext) (interface{}, error) {
		tt, err := testTraitFactory.For(ctx)
		require.NoError(t, err)
		require.NotNil(t, tt)

		_, err = tt.GoMethodEntryPoint()
		require.NoError(t, err)

		return nil, nil
	})

	require.Error(t, err, "execution timeout")

}

// TestParallelExecution the purpose of this test is to ensure that there would be no crashes
func TestParallelExecution(t *testing.T) {
	ctx := context.Background()
	log, _ := logrus.NewNullLogger()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	testTraitFactory := newTestTraitFactory()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 5,
		TraitFactories: []TraitFactory{
			NewAssemblyScriptEnv(log),
			testTraitFactory,
		},
	})
	require.NoError(t, err)

	count := 50 // 100ms * 50 * 5 threads = ~1s

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func(n int) {
			_, err := p.Execute(ctx, func(ectx *ExecutionContext) (interface{}, error) {
				tt, err := testTraitFactory.For(ectx)
				require.NoError(t, err)
				require.NotNil(t, tt)

				_, err = tt.Delay100ms()
				require.NoError(t, err)

				return nil, nil
			})

			require.NoError(t, err)

			wg.Done()
		}(i)
	}

	wg.Wait()
}

func TestParallelProtobufInteropExecution(t *testing.T) {
	ctx := context.Background()
	log, hook := logrus.NewNullLogger()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	protobufInterop := NewProtobufInterop()
	testTraitFactory := newTestTraitFactory()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 32,
		TraitFactories: []TraitFactory{
			NewAssemblyScriptEnv(log),
			protobufInterop,
			testTraitFactory,
		},
	})
	require.NoError(t, err)

	count := 50000

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func(i int) {
			_, err = p.Execute(ctx, func(ectx *ExecutionContext) (interface{}, error) {
				oneof := events.MustToOneOf(&events.UserCreate{
					Metadata: events.Metadata{
						Index: int64(i),
					},
				})

				protobufInteropTrait, err := protobufInterop.For(ectx)
				require.NoError(t, err)
				require.NotNil(t, ectx)

				dataView, err := protobufInteropTrait.SendMessage(oneof)
				require.NoError(t, err)

				if len(hook.AllEntries()) > 0 {
					fmt.Println(hook.LastEntry())
				}

				tr, err := testTraitFactory.For(ectx)
				require.NoError(t, err)

				result, err := tr.GetEventIndex(dataView)
				require.NoError(t, err)
				require.Equal(t, result, int64(i))

				wg.Done()

				return nil, nil
			})

			require.NoError(t, err)
		}(i)
	}

	wg.Wait()
}

func TestHandleEvent(t *testing.T) {
	ctx := context.Background()
	log, _ := logrus.NewNullLogger()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	protobufInterop := NewProtobufInterop()
	handleEvent := NewHandleEvent("handleEvent", protobufInterop)
	testTraitFactory := newTestTraitFactory()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 32,
		TraitFactories: []TraitFactory{
			NewAssemblyScriptEnv(log),
			protobufInterop,
			handleEvent,
			testTraitFactory,
		},
	})
	require.NoError(t, err)

	_, err = p.Execute(ctx, func(ectx *ExecutionContext) (interface{}, error) {
		h, err := handleEvent.For(ectx)
		require.NoError(t, err)

		r, err := h.HandleEvent(&events.UserCreate{
			Metadata: events.Metadata{
				Index: int64(0),
			},
		})
		require.NoError(t, err)
		require.False(t, r.Success)
		require.Equal(t, r.Error, "UserCreate event is not allowed")

		r, err = h.HandleEvent(&events.UserLogin{
			Metadata: events.Metadata{
				Index: int64(1),
			},
		})
		require.NoError(t, err)
		require.True(t, r.Success)
		require.Equal(t, r.Event.GetUserLogin().Metadata.Index, int64(999))

		r, err = h.HandleEvent(&events.UserDelete{
			Metadata: events.Metadata{
				Index: int64(1),
			},
		})
		require.NoError(t, err)
		require.True(t, r.Success)
		require.Nil(t, r.Event)

		return nil, nil
	})

	require.NoError(t, err)
}
