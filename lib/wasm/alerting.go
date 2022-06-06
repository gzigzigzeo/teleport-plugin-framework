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
	"github.com/gravitational/teleport-plugin-framework/lib/plugin"
	"github.com/gravitational/trace"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// Alerting contains common AssemblyScript methods
type Alerting struct {
	Alerts chan plugin.Alert
}

// NewAlerting constructs Alert trait
func NewAlerting(capacity int) *Alerting {
	return &Alerting{Alerts: make(chan plugin.Alert, capacity)}
}

// ExportMethodsToWASM exports AssemblyScript methods implementation to WASM
func (a *Alerting) ExportMethodsToWASM(exports *Exports) {
	exports.Define(
		"env",
		map[string]Export{
			"alert": {
				wasmer.NewValueTypes(
					wasmer.I32, // Alert: i32
				),
				wasmer.NewValueTypes(), // void
				a.alert,
			},
		},
	)
}

// alert AssemblyScript alert() function
func (a *Alerting) alert(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	alert := plugin.Alert{}

	// Get the response
	err := ectx.MemoryInterop.ReceiveMessage(ectx, args[0], &alert)
	if err != nil {
		return []wasmer.Value{}, trace.Wrap(err)
	}

	a.Alerts <- alert

	return []wasmer.Value{}, nil
}
