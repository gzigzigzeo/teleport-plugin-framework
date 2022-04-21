package wasm

import (
	"context"
	"time"

	"github.com/gravitational/trace"
	"github.com/sirupsen/logrus"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// ExecutionContext represents object required to execute methods on the specific wasmer instance
type ExecutionContext struct {
	// Log represents current logger
	Log logrus.FieldLogger
	// Instance represents wasmer.Instance
	Instance *wasmer.Instance
	// Memory represents wasmer.Memory
	Memory *wasmer.Memory
	// CurrentContext represents current go context for this execution chain
	// We put context here on pool.Get() and erase reference on pool.Put()
	CurrentContext context.Context
	// MemoryInterop represents the interface to WASM instance memory
	MemoryInterop MemoryInterop
}

// ExecuteFn represents the function type used as the argument for pool.Execute
type ExecuteFn = func(*ExecutionContext) (interface{}, error)

// GetFunction gets the function by name from the current instance
func (i *ExecutionContext) getFunction(name string) (*wasmer.Function, error) {
	fn, err := i.Instance.Exports.GetRawFunction(name)
	if fn == nil {
		return nil, trace.BadParameter("Function `%v` not found in WASM module or is not a function", name)
	}
	if err != nil {
		return nil, trace.NotImplemented("Function `%v` can not be loaded from WASM module: %v", name, err)
	}

	return fn, nil
}

// wait executes WASM function with timeout
func (i *ExecutionContext) wait(ctx context.Context, timeout time.Duration, fn ExecuteFn) (interface{}, error) {
	var fnErr error
	var fnResult interface{}

	i.CurrentContext = ctx

	errCh := make(chan error, 1)
	defer close(errCh)
	resultCh := make(chan interface{}, 1)
	defer close(resultCh)

	go func() {
		result, err := fn(i)
		if err != nil {
			errCh <- trace.Wrap(err)
			return
		}

		resultCh <- result
	}()

	select {
	case fnResult = <-resultCh:
		break
	case fnErr = <-errCh:
		break
	case <-time.After(timeout):
		fnErr = trace.LimitExceeded("WASM method execution timeout")
		break
	case <-i.CurrentContext.Done():
		fnErr = trace.Wrap(ctx.Err())
		break
	}

	i.CurrentContext = nil

	return fnResult, fnErr
}
