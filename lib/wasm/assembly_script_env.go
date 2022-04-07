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
	"fmt"
	"strings"
	"time"

	log "github.com/sirupsen/logrus"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// AsssemblyScriptEnv represents AssemblyScript env functions
type AsssemblyScriptEnv struct {
	log    log.FieldLogger
	traits []*AsssemblyScriptEnvTrait
}

// AsssemblyScriptEnvTrait represents AssemblyScript functions bound to specific instance
type AsssemblyScriptEnvTrait struct {
	ectx *ExecutionContext
	env  *AsssemblyScriptEnv
}

// NewAssemblyScriptEnv creates new AssemblyScriptEnv collection instance
func NewAssemblyScriptEnv(log log.FieldLogger) *AsssemblyScriptEnv {
	return &AsssemblyScriptEnv{log: log, traits: make([]*AsssemblyScriptEnvTrait, 0)}
}

// CreateTrait creates AssemblyScriptEnv trait
func (e *AsssemblyScriptEnv) CreateTrait(ectx *ExecutionContext) Trait {
	t := &AsssemblyScriptEnvTrait{env: e, ectx: ectx}
	e.traits = append(e.traits, t)
	return t
}

// ImportMethodsFromWASM imports methods from WASM side
func (e *AsssemblyScriptEnvTrait) ImportMethodsFromWASM(getFunction GetFunctionFn) error {
	return nil
}

// ExportMethodsToWASM exports AssemblyScript methods implementation to WASM
func (e *AsssemblyScriptEnvTrait) ExportMethodsToWASM(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	importObject.Register("env", map[string]wasmer.IntoExtern{
		"abort": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(
				wasmer.I32, // message: string | null
				wasmer.I32, // fileName: string | null,
				wasmer.I32, // lineNumber: i32
				wasmer.I32, // columnNumber: i32
			),
			wasmer.NewValueTypes(), // void
		), e.abort),
		"trace": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(
				wasmer.I32, // message: string
				wasmer.I32, // n:i32
				wasmer.F64, // a0?:f64
				wasmer.F64, // a1?:f64
				wasmer.F64, // a2?:F64
				wasmer.F64, // a3?:f64
				wasmer.F64, // a4?:f64
			),
			wasmer.NewValueTypes(), // void
		), e.trace),
		"seed": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(),
			wasmer.NewValueTypes(
				wasmer.F64,
			),
		), e.seed),
		"Date.now": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(),
			wasmer.NewValueTypes(wasmer.F64),
		), e.dateNow),
	})

	return nil
}

// dateNow exports `Date`.`now`, which is required for datetime ops
func (e *AsssemblyScriptEnvTrait) dateNow(args []wasmer.Value) ([]wasmer.Value, error) {
	return []wasmer.Value{wasmer.NewF64(float64(time.Now().UTC().UnixMilli()))}, nil
}

// ValidateImports validates that protobuf interop functions exists in the module
func (e *AsssemblyScriptEnvTrait) ValidateImports(instance *wasmer.Instance) error {
	return nil // No imports
}

// getString reads and returns AssemblyScript string by it's memory address. It assumes that
// a string has the standard AS GC header.
func (e *AsssemblyScriptEnvTrait) getString(s wasmer.Value) string {
	return DecodeAssemblyScriptString(s, e.ectx.Memory)
}

// asAbort AssemblyScript abort() function
func (e *AsssemblyScriptEnvTrait) abort(args []wasmer.Value) ([]wasmer.Value, error) {
	e.env.log.Error(fmt.Sprintf(
		"Wasmer: abort! %v (%v:%v:%v)",
		e.getString(args[0]),
		e.getString(args[1]),
		args[2].I32(),
		args[3].I32(),
	))

	return []wasmer.Value{}, nil
}

// asAbort AssemblyScript trace() function
func (e *AsssemblyScriptEnvTrait) trace(args []wasmer.Value) ([]wasmer.Value, error) {
	s := e.getString(args[0])

	if len(args) > 1 {
		var params []string

		l := int(args[1].I32())
		if len(args)-2 < l {
			l = len(args) - 2
		}

		params = make([]string, l)

		for n := 0; n < l; n++ {
			params[n] = fmt.Sprintf("%v", args[n+2].F64())
		}

		s = s + " " + strings.Join(params, ", ")
	}

	e.env.log.Info(s)

	return []wasmer.Value{}, nil
}

// asSeed implements random seed function
func (e *AsssemblyScriptEnvTrait) seed(args []wasmer.Value) ([]wasmer.Value, error) {
	return []wasmer.Value{wasmer.NewF64(float64(time.Now().UnixNano()))}, nil
}
