package wasm

import (
	"github.com/gravitational/trace"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// exportFnResolver represents struct which stores ExecutionContext->NativeFunction map.
// It is required to pass *ExecutionContext into the target function on our side.
type exportFnResolver struct {
	name       string // debug purposes
	returnKind wasmer.ValueKind
	fns        map[*ExecutionContext]wasmer.NativeFunction
}

// Exports represents wrapper over wasmer.ImportObject, which calls native WASM function bound to the
// ExecutionContext specified in the first argument.
type Exports struct {
	exports map[string]map[string]Export
}

// Export represents exported function definition
type Export struct {
	Args   []*wasmer.ValueType
	Return []*wasmer.ValueType
	Fn     func(*ExecutionContext, []wasmer.Value) ([]wasmer.Value, error)
}

// newExportFnResolver builds the ExecutionContext->wasmer.NativeFunction map
func newExportFnResolver(contexts []*ExecutionContext, name string) (NativeFunctionWithExecutionContext, error) {
	fns := make(map[*ExecutionContext]wasmer.NativeFunction)
	for _, ectx := range contexts {
		fn, err := ectx.getFunction(name)
		if err != nil {
			return nil, trace.Wrap(err)
		}

		fns[ectx] = fn.Native()
	}

	// Let's use first context as a prototype
	fnProto, err := contexts[0].getFunction(name)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var kind wasmer.ValueKind

	results := fnProto.Type().Results()
	if len(results) > 0 {
		kind = results[0].Kind()
	}

	resolver := &exportFnResolver{name, kind, fns}
	return resolver.resolve, nil
}

// resolve calls wasmer.NativeFunction on the given ExecutionContext
func (r *exportFnResolver) resolve(ectx *ExecutionContext, args ...wasmer.Value) (wasmer.Value, error) {
	fn, ok := r.fns[ectx]
	if !ok {
		return wasmer.NewValue(0, r.returnKind), trace.Errorf("ExecutionContext %v is not initialized", ectx)
	}

	// Unwrap all args to underlying interface{} values
	unwrappedArgs := make([]interface{}, len(args))
	for i, arg := range args {
		unwrappedArgs[i] = arg.Unwrap()
	}

	// Call and transform result to wasmer.Value. Unfortunately, there is no way to distinguish between nil
	// and zero value yet.
	result, err := fn(unwrappedArgs...)
	if err != nil {
		return wasmer.NewValue(0, r.returnKind), err
	}

	if result == nil {
		return wasmer.NewValue(0, r.returnKind), nil
	}

	value := wasmer.NewValue(result, r.returnKind)
	return value, err
}

// newExports creates new exports object
func newExports() *Exports {
	return &Exports{make(map[string]map[string]Export)}
}

// Define defines exported methods
func (e *Exports) Define(ns string, exports map[string]Export) {
	e.exports[ns] = exports
}

// appendToImportOjbect appends exported methods with given ExecutionContext to ImportObject
func (e *Exports) appendToImportOjbect(ectx *ExecutionContext, store *wasmer.Store, importObject *wasmer.ImportObject) {
	for ns, exports := range e.exports {
		methods := make(map[string]wasmer.IntoExtern)

		for name, export := range exports {
			methods[name] = wasmer.NewFunction(
				store,
				wasmer.NewFunctionType(export.Args, export.Return),
				e.wrapFn(ectx, export),
			)
		}

		importObject.Register(ns, methods)
	}
}

// wrapFn is the utility function which avoids clojure context drift
func (e *Exports) wrapFn(ectx *ExecutionContext, export Export) func(args []wasmer.Value) ([]wasmer.Value, error) {
	return func(args []wasmer.Value) ([]wasmer.Value, error) {
		return export.Fn(ectx, args)
	}
}
