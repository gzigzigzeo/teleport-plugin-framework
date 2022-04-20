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
	"github.com/sirupsen/logrus"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// ExecutionContextPool represents object pool of a contexts (wasmer instances)
type ExecutionContextPool struct {
	timeout  time.Duration
	contexts chan *ExecutionContext
}

// TraitWithExports represents trait which has methods exposed to WASM plugin
type TraitWithExports interface {
	// ExportMethodsToWASM exports trait methods to WASM side
	ExportMethodsToWASM(*Exports)
}

// TraitWithImports represents trait which has methods required to be imported from WASM plugin
type TraitWithImports interface {
	// ImportMethodsFromWASM imports WASM methods to Go side.
	// The only parameter is a shortcut to the current instance GetFunction()
	ImportMethodsFromWASM(fn GetFunction) error
}

// NativeFunctionWithExecutionContext represents wrapper over wasmer.NativeFunction, which accepts
// wasmer.Value instead of interfaces. Please note that WASM functions can not return null.
type NativeFunctionWithExecutionContext = func(*ExecutionContext, ...wasmer.Value) (wasmer.Value, error)

// GetFunction represents the signature of a function which gets method from wasm side
type GetFunction = func(string) (NativeFunctionWithExecutionContext, error)

// ExecutionContextPoolOptions represents execution context pool options
type ExecutionContextPoolOptions struct {
	// Log represents logger instance
	Log logrus.FieldLogger
	// MemoryInterop represents the interface to WASM instance memory
	MemoryInterop MemoryInterop
	// PluginBytes represents wasm binary bytes
	PluginBytes []byte
	// Timeout represents max method execution timeout. Individual call timeouts can be set using normal go contexts.
	Timeout time.Duration
	// Concurrency represents object pool size
	Concurrency int
	// Traits represents array of trait objects
	Traits []interface{}
	// WasmerCompiler wasmer.Compiler to use
	WasmerCompiler wasmer.CompilerKind
}

// Validate validates pool options
func (o *ExecutionContextPoolOptions) Validate() error {
	if o.Log == nil {
		return trace.Errorf(".Log is required for ExecutionContextPoolOptions")
	}

	if o.MemoryInterop == nil {
		return trace.Errorf(".MemoryInterop is required for ExecutionContextPoolOptions (specify NewAssemblyScriptMemoryInterop())")
	}

	if o.Timeout == 0 {
		return trace.Errorf(".Timeout is required for ExecutionContextPoolOptions")
	}

	if o.PluginBytes == nil || len(o.PluginBytes) == 0 {
		return trace.Errorf(".PluginBytes is required for ExecutionContextPoolOptions")
	}

	if len(o.Traits) == 0 {
		return trace.Errorf(".[]Traits is empty, please specify any")
	}

	if o.Concurrency == 0 {
		o.Concurrency = 1
	}

	return nil
}

// NewExecutionContextPool initializes InstancePool structure structure
func NewExecutionContextPool(options ExecutionContextPoolOptions) (*ExecutionContextPool, error) {
	err := options.Validate()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	config := wasmer.NewConfig()

	switch wasmer.CompilerKind(options.WasmerCompiler) {
	case wasmer.CRANELIFT:
		config = config.UseCraneliftCompiler()
	case wasmer.LLVM:
		config = config.UseLLVMCompiler()
	case wasmer.SINGLEPASS:
		config = config.UseSinglepassCompiler()
	}

	engine := wasmer.NewEngineWithConfig(config)
	store := wasmer.NewStore(engine)

	module, err := wasmer.NewModule(store, options.PluginBytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	contexts := make([]*ExecutionContext, options.Concurrency)

	for i := 0; i < options.Concurrency; i++ {
		importObject := wasmer.NewImportObject()

		ec := &ExecutionContext{
			Log:           options.Log,
			MemoryInterop: options.MemoryInterop,
		}

		for _, tr := range options.Traits {
			ex, ok := tr.(TraitWithExports)
			if !ok {
				continue
			}

			exports := newExports()
			ex.ExportMethodsToWASM(exports)
			exports.appendToImportOjbect(ec, store, importObject)
		}

		instance, err := wasmer.NewInstance(module, importObject)
		if err != nil {
			return nil, trace.Wrap(err)
		}

		memory, err := instance.Exports.GetMemory("memory")
		if err != nil {
			return nil, trace.Wrap(err)
		}

		ec.Instance = instance
		ec.Memory = memory

		contexts[i] = ec
	}

	for _, t := range options.Traits {
		err := importMethodsFromWASM(t, contexts)
		if err != nil {
			return nil, trace.Wrap(err)
		}
	}

	err = importMethodsFromWASM(options.MemoryInterop, contexts)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	contextsCh := make(chan *ExecutionContext, options.Concurrency)
	for _, ectx := range contexts {
		contextsCh <- ectx
	}

	return &ExecutionContextPool{
		timeout:  options.Timeout,
		contexts: contextsCh,
	}, nil
}

func importMethodsFromWASM(tr interface{}, contexts []*ExecutionContext) error {
	t, ok := tr.(TraitWithImports)
	if !ok {
		return nil
	}

	err := t.ImportMethodsFromWASM(
		func(name string) (NativeFunctionWithExecutionContext, error) {
			return newExportFnResolver(contexts, name)
		},
	)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// Fetch fetches next instance from the pool, if any and sets currentContext
func (p *ExecutionContextPool) Fetch(ctx context.Context) (*ExecutionContext, error) {
	select {
	case ec := <-p.contexts:
		return ec, nil
	case <-ctx.Done():
		return nil, trace.Wrap(ctx.Err())
	}
}

// Return returns instance to the pool
func (p *ExecutionContextPool) Return(ctx context.Context, ec *ExecutionContext) error {
	select {
	case p.contexts <- ec:
		return nil
	case <-ctx.Done():
		return trace.Wrap(ctx.Err())
	}
}

// Execute executes obtains context, executes passed function, puts the context back to the pool and returns the result
func (p *ExecutionContextPool) Execute(ctx context.Context, fn ExecuteFn) (interface{}, error) {
	ectx, err := p.Fetch(ctx)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	res, fnErr := ectx.wait(ctx, p.timeout, fn)

	err = p.Return(ctx, ectx)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return res, fnErr
}

// Close closes instance pool
func (i *ExecutionContextPool) Close() {
	close(i.contexts)
}
