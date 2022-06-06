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
	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/trace"
)

// HandleEvent represents handleEvent trait
type HandleEvent struct {
	fnName      string
	handleEvent NativeFunctionWithExecutionContext
}

// NewHandleEvent creates new HandleEvent trait collection
func NewHandleEvent(fnName string) *HandleEvent {
	return &HandleEvent{fnName: fnName}
}

// ImportMethodsFromWASM imports WASM methods to go side
func (e *HandleEvent) ImportMethodsFromWASM(getFunction GetFunction) error {
	var err error

	e.handleEvent, err = getFunction(e.fnName)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// HandleEvent wraps handleEvent call to proto def
func (e *HandleEvent) HandleEvent(ectx *ExecutionContext, evt events.AuditEvent) (*plugin.HandleEventResponse, error) {
	request := &plugin.HandleEventRequest{
		Event: events.MustToOneOf(evt),
	}

	result := &plugin.HandleEventResponse{}

	// Execute handleEvent method
	err := ectx.ExecuteProtobufMethod(request, e.handleEvent, result)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return result, nil
}
