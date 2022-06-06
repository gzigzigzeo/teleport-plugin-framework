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

	"github.com/wasmerio/wasmer-go/wasmer"
)

// AssemblyScriptEnv contains common AssemblyScript methods
type AsssemblyScriptEnv struct{}

// NewAssemblyScriptEnv constructs AssemblyScriptEnv trait
func NewAssemblyScriptEnv() *AsssemblyScriptEnv {
	return &AsssemblyScriptEnv{}
}

// ExportMethodsToWASM exports AssemblyScript methods implementation to WASM
func (e *AsssemblyScriptEnv) ExportMethodsToWASM(exports *Exports) {
	exports.Define(
		"env",
		map[string]Export{
			"abort": {
				wasmer.NewValueTypes(
					wasmer.I32, // message: string | null
					wasmer.I32, // fileName: string | null,
					wasmer.I32, // lineNumber: i32
					wasmer.I32, // columnNumber: i32
				),
				wasmer.NewValueTypes(), // void
				e.abort,
			},
			"trace": {
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
				e.trace,
			},
			"seed": {
				wasmer.NewValueTypes(),
				wasmer.NewValueTypes(wasmer.F64), // f64 seed
				e.seed,
			},
			"Date.now": {
				wasmer.NewValueTypes(),
				wasmer.NewValueTypes(wasmer.F64), // f64 unix seconds
				e.dateNow,
			},
		},
	)
}

// dateNow exports `Date`.`now`, which is required for datetime ops
func (e *AsssemblyScriptEnv) dateNow(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	return []wasmer.Value{wasmer.NewF64(float64(time.Now().UTC().UnixMilli()))}, nil
}

// abort AssemblyScript abort() function
func (e *AsssemblyScriptEnv) abort(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	ectx.Log.Error(fmt.Sprintf(
		"Wasmer: abort! %v (%v:%v:%v)",
		ectx.MemoryInterop.GetString(ectx, args[0]),
		ectx.MemoryInterop.GetString(ectx, args[1]),
		args[2].I32(),
		args[3].I32(),
	))

	return []wasmer.Value{}, nil
}

// trace AssemblyScript trace() function
func (e *AsssemblyScriptEnv) trace(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	s := ectx.MemoryInterop.GetString(ectx, args[0])

	var params []string

	l := int(args[1].I32())
	if len(args)-2 < l {
		l = len(args) - 2
	}

	params = make([]string, l)

	for n := 0; n < l; n++ {
		params[n] = fmt.Sprintf("%v", args[n+2].F64())
	}
	if len(params) > 0 {
		s = s + " " + strings.Join(params, ", ")
	}

	ectx.Log.Info(s)

	return []wasmer.Value{}, nil
}

// seed implements random seed function
func (e *AsssemblyScriptEnv) seed(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	return []wasmer.Value{wasmer.NewF64(float64(time.Now().UnixNano()))}, nil
}
