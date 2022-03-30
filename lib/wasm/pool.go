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
	"time"

	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// ExecutionContext represents object required to execute methods on the specific wasmer instance
type ExecutionContext struct {
	// Instance represents wasmer.Instance
	Instance *wasmer.Instance
	// Memory represents wasmer.Memory
	Memory *wasmer.Memory
	// timeout represents method execution timeout
	timeout time.Duration
	// currentContext represents current context for execution chain
	currentContext context.Context
}

// ExecutionContextPool represents object pool of a contexts (wasmer instances)
type ExecutionContextPool struct {
	timeout  time.Duration
	contexts chan *ExecutionContext
}

// TraitFactory represents the trait factory which is responsible for trait creation
type TraitFactory interface {
	// CreateTrait creates the new trait and returns it
	CreateTrait(ec *ExecutionContext) Trait
}

// Trait represents the set of wasmer and go methods bound to the specific execution context
type Trait interface {
	// Export exports trait methods
	ExportMethodsToWASM(*wasmer.Store, *wasmer.ImportObject) error
	// Bind binds execution context to this trait
	ImportMethodsFromWASM() error
}

// ExecutionContextPoolOptions represents instance pool constructor options
type ExecutionContextPoolOptions struct {
	// Bytes represents wasm binary bytes
	Bytes []byte
	// Timeout represents method execution timeout
	Timeout time.Duration
	// Concurrency represents object pool size
	Concurrency int
}

// NewExecutionContextPool initializes InstancePool structure structure
func NewExecutionContextPool(options ExecutionContextPoolOptions, tf ...TraitFactory) (*ExecutionContextPool, error) {
	config := wasmer.NewConfig().UseCraneliftCompiler()
	engine := wasmer.NewEngineWithConfig(config)
	store := wasmer.NewStore(engine)

	module, err := wasmer.NewModule(store, options.Bytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	contexts := make(chan *ExecutionContext, options.Concurrency)

	for i := 0; i < options.Concurrency; i++ {
		ec := &ExecutionContext{timeout: options.Timeout}

		imports := wasmer.NewImportObject()

		traits := make([]Trait, len(tf))
		for n, t := range tf {
			tr := t.CreateTrait(ec)
			err = tr.ExportMethodsToWASM(store, imports)
			if err != nil {
				return nil, trace.Wrap(err)
			}
			traits[n] = tr
		}

		instance, err := wasmer.NewInstance(module, imports)
		if err != nil {
			return nil, trace.Wrap(err)
		}

		memory, err := instance.Exports.GetMemory("memory")
		if err != nil {
			return nil, trace.Wrap(err)
		}

		ec.Instance = instance
		ec.Memory = memory

		for _, t := range traits {
			err = t.ImportMethodsFromWASM()
			if err != nil {
				return nil, trace.Wrap(err)
			}
		}

		contexts <- ec
	}

	return &ExecutionContextPool{
		timeout:  options.Timeout,
		contexts: contexts,
	}, nil
}

// Get fetches next instance from the pool, if any and sets currentContext
func (i *ExecutionContextPool) Get(ctx context.Context) (*ExecutionContext, error) {
	select {
	case ec := <-i.contexts:
		ec.currentContext = ctx
		return ec, nil
	case <-ctx.Done():
		return nil, trace.Wrap(ctx.Err())
	}
}

// Put returns instance to the pool
func (i *ExecutionContextPool) Put(ctx context.Context, ec *ExecutionContext) error {
	select {
	case i.contexts <- ec:
		return nil
	case <-ctx.Done():
		return trace.Wrap(ctx.Err())
	}
}

// Close closes instance pool
func (i *ExecutionContextPool) Close() {
	close(i.contexts)
}

// GetFunction gets function by name
func (i *ExecutionContext) GetFunction(name string) (wasmer.NativeFunction, error) {
	fn, err := i.Instance.Exports.GetFunction(name)
	if fn == nil {
		return nil, trace.BadParameter("Function `%v` is not a function", name)
	}
	if err != nil {
		return nil, trace.NotImplemented("Function `%v` can not be loaded from WASM module: %v", name, err)
	}

	return fn, nil
}

// Execute executes wasm method with timeout.
func (i *ExecutionContext) Execute(fn wasmer.NativeFunction, args ...interface{}) (interface{}, error) {
	var ch chan interface{} = make(chan interface{})
	var e chan error = make(chan error)

	go func() {
		r, err := fn(args...)
		if err != nil {
			e <- err
			return
		}
		ch <- r
	}()

	select {
	case err := <-e:
		return nil, trace.Wrap(err)
	case r := <-ch:
		return r, nil
	case <-time.After(i.timeout):
		return nil, trace.LimitExceeded("WASM method execution timeout")
	case <-i.currentContext.Done():
		return nil, trace.Wrap(i.currentContext.Err())
	}
}
