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
	logrus_hooks "github.com/sirupsen/logrus/hooks/test"
	"github.com/wasmerio/wasmer-go/wasmer"

	"github.com/stretchr/testify/require"
)

// testTrait represents test trait
type testTrait struct {
	OK                    NativeFunctionWithExecutionContext
	ThrowError            NativeFunctionWithExecutionContext
	GetStringReturnString NativeFunctionWithExecutionContext
	InfiniteLoop          NativeFunctionWithExecutionContext
	Delay100ms            NativeFunctionWithExecutionContext
	GetEventIndex         NativeFunctionWithExecutionContext
	GoMethodEntryPoint    NativeFunctionWithExecutionContext
	GetSecret             NativeFunctionWithExecutionContext
}

func newTestTrait() *testTrait {
	return &testTrait{}
}

func (e *testTrait) ExportMethodsToWASM(exports *Exports) {
	exports.Define(
		"lib_wasm_test",
		map[string]Export{
			"goMethod": {
				wasmer.NewValueTypes(),
				wasmer.NewValueTypes(),
				e.goMethod,
			},
		},
	)
}

// goMethod is the example go method, which could be called from WASM side and, in turn, calls infinite loop on WASM side
func (e *testTrait) goMethod(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	_, err := e.InfiniteLoop(ectx)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return nil, nil
}

// ImportMethodsFromWASM reads WASM methods references to the current trait context
func (e *testTrait) ImportMethodsFromWASM(getFunction GetFunction) error {
	var err error

	e.OK, err = getFunction("ok")
	if err != nil {
		return trace.Wrap(err)
	}

	e.ThrowError, err = getFunction("throwError")
	if err != nil {
		return trace.Wrap(err)
	}

	e.InfiniteLoop, err = getFunction("infiniteLoop")
	if err != nil {
		return trace.Wrap(err)
	}

	e.Delay100ms, err = getFunction("delay100ms")
	if err != nil {
		return trace.Wrap(err)
	}

	e.GetEventIndex, err = getFunction("getEventIndex")
	if err != nil {
		return trace.Wrap(err)
	}

	e.GoMethodEntryPoint, err = getFunction("goMethodEntryPoint")
	if err != nil {
		return trace.Wrap(err)
	}

	e.GetStringReturnString, err = getFunction("getStringReturnString")
	if err != nil {
		return trace.Wrap(err)
	}

	e.GetSecret, err = getFunction("getSecret")
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

func newSecretManager(t *testing.T) *AWSSecretsManager {
	m, err := NewAWSSecretsManager(NewMockSecretsCache(map[string]string{"foo": "bar"}))
	require.NoError(t, err)
	return m
}

func TestPool(t *testing.T) {
	ctx := context.Background()
	log, _ := logrus_hooks.NewNullLogger()

	bytes, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Log:           log,
		PluginBytes:   bytes,
		Timeout:       time.Second,
		Concurrency:   2,
		MemoryInterop: NewAssemblyScriptMemoryInterop(),
		Traits: []interface{}{
			NewAssemblyScriptEnv(),
			newTestTrait(),
			newSecretManager(t),
		},
	})
	require.NoError(t, err)

	ectx1, err := p.Fetch(ctx)
	require.NoError(t, err)
	require.NotNil(t, ectx1)
	require.Len(t, p.contexts, 1)

	ectx2, err := p.Fetch(ctx)
	require.NoError(t, err)
	require.NotNil(t, ectx2)
	require.Len(t, p.contexts, 0)
	require.NotEqual(t, ectx1, ectx2)

	err = p.Return(ctx, ectx1)
	require.NoError(t, err)

	require.Len(t, p.contexts, 1)
}

func TestRegularMethods(t *testing.T) {
	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, hook := logrus_hooks.NewNullLogger()
	testTrait := newTestTrait()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Log:           log,
		MemoryInterop: NewAssemblyScriptMemoryInterop(),
		PluginBytes:   b,
		Timeout:       time.Second,
		Concurrency:   1,
		Traits: []interface{}{
			NewAssemblyScriptEnv(),
			testTrait,
			newSecretManager(t),
		},
	})
	require.NoError(t, err)

	_, err = p.Execute(context.Background(), func(ectx *ExecutionContext) (interface{}, error) {
		r, err := testTrait.OK(ectx)
		require.NoError(t, err)
		require.Equal(t, r.I32(), int32(1))

		_, err = testTrait.ThrowError(ectx)
		require.Error(t, err, "unreachable")
		require.Contains(t, hook.LastEntry().Message, "Failure")

		foo, err := ectx.MemoryInterop.PutString(ectx, "foo")
		require.NoError(t, err)

		bar, err := testTrait.GetStringReturnString(ectx, foo)
		require.NoError(t, err)

		s := ectx.MemoryInterop.GetString(ectx, bar)
		require.Equal(t, s, "bar")

		return nil, nil
	})

	require.NoError(t, err)

	_, err = p.Execute(context.Background(), func(ectx *ExecutionContext) (interface{}, error) {
		_, err = testTrait.InfiniteLoop(ectx)
		require.NoError(t, err)

		return nil, nil
	})

	require.Error(t, err, "execution timeout")

	_, err = p.Execute(context.Background(), func(ectx *ExecutionContext) (interface{}, error) {
		_, err = testTrait.GoMethodEntryPoint(ectx)
		require.NoError(t, err)

		return nil, nil
	})

	require.Error(t, err, "execution timeout")
}

// TestParallelExecution the purpose of this test is to ensure that there would be no crashes
func TestParallelExecution(t *testing.T) {
	ctx := context.Background()
	log, _ := logrus_hooks.NewNullLogger()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	testTrait := newTestTrait()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Log:           log,
		PluginBytes:   b,
		MemoryInterop: NewAssemblyScriptMemoryInterop(),
		Timeout:       time.Second,
		Concurrency:   5,
		Traits: []interface{}{
			NewAssemblyScriptEnv(),
			testTrait,
			newSecretManager(t),
		},
	})
	require.NoError(t, err)

	count := 50 // 100ms * 50 * 5 threads = ~1s

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func(n int) {
			_, err := p.Execute(ctx, func(ectx *ExecutionContext) (interface{}, error) {
				_, err = testTrait.Delay100ms(ectx)
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
	log, hook := logrus_hooks.NewNullLogger()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	protobufInterop := NewProtobufInterop()
	testTrait := newTestTrait()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Log:           log,
		PluginBytes:   b,
		Timeout:       time.Second,
		Concurrency:   32,
		MemoryInterop: NewAssemblyScriptMemoryInterop(),
		Traits: []interface{}{
			NewAssemblyScriptEnv(),
			protobufInterop,
			testTrait,
			newSecretManager(t),
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

				dataView, err := protobufInterop.SendMessage(ectx, oneof)
				require.NoError(t, err)

				if len(hook.AllEntries()) > 0 {
					fmt.Println(hook.LastEntry())
				}

				result, err := testTrait.GetEventIndex(ectx, dataView)
				require.NoError(t, err)
				require.Equal(t, result.I64(), int64(i))

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
	log, _ := logrus_hooks.NewNullLogger()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	protobufInterop := NewProtobufInterop()
	handleEvent := NewHandleEvent("handleEvent", protobufInterop)
	testTraitFactory := newTestTrait()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Log:           log,
		PluginBytes:   b,
		Timeout:       time.Second,
		Concurrency:   32,
		MemoryInterop: NewAssemblyScriptMemoryInterop(),
		Traits: []interface{}{
			NewAssemblyScriptEnv(),
			protobufInterop,
			handleEvent,
			testTraitFactory,
			newSecretManager(t),
		},
	})
	require.NoError(t, err)

	_, err = p.Execute(ctx, func(ectx *ExecutionContext) (interface{}, error) {
		r, err := handleEvent.HandleEvent(ectx, &events.UserCreate{
			Metadata: events.Metadata{
				Index: int64(0),
			},
		})
		require.NoError(t, err)
		require.False(t, r.Success)
		require.Equal(t, r.Error, "UserCreate event is not allowed")

		r, err = handleEvent.HandleEvent(ectx, &events.UserLogin{
			Metadata: events.Metadata{
				Index: int64(1),
			},
		})
		require.NoError(t, err)
		require.True(t, r.Success)
		require.Equal(t, r.Event.GetUserLogin().Metadata.Index, int64(999))

		r, err = handleEvent.HandleEvent(ectx, &events.UserDelete{
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

func TestAWSSecretsManager(t *testing.T) {
	ctx := context.Background()
	log, _ := logrus_hooks.NewNullLogger()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	testTrait := newTestTrait()
	awsSecretsManager := newSecretManager(t)

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Log:           log,
		PluginBytes:   b,
		Timeout:       time.Second,
		Concurrency:   32,
		MemoryInterop: NewAssemblyScriptMemoryInterop(),
		Traits: []interface{}{
			NewAssemblyScriptEnv(),
			awsSecretsManager,
			testTrait,
		},
	})
	require.NoError(t, err)

	_, err = p.Execute(ctx, func(ectx *ExecutionContext) (interface{}, error) {
		fooS, err := ectx.MemoryInterop.PutString(ectx, "foo")
		require.NoError(t, err)

		r, err := testTrait.GetSecret(ectx, fooS)
		require.NoError(t, err)
		require.Equal(t, ectx.MemoryInterop.GetString(ectx, r), "bar")

		emptyS, err := ectx.MemoryInterop.PutString(ectx, "-")
		require.NoError(t, err)

		_, err = testTrait.GetSecret(ectx, emptyS)
		require.Error(t, err)

		return nil, nil
	})

	require.NoError(t, err)
}
