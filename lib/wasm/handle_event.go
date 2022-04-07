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
	"github.com/gravitational/teleport-plugin-framework/lib/wasm/plugin"
	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// HandleEvent represents collection of traits
type HandleEvent struct {
	fnName          string
	traits          []*HandleEventTrait
	protobufInterop *ProtobufInterop
}

// HandleEventTrait represents handleEvent trait
type HandleEventTrait struct {
	ectx        *ExecutionContext
	collection  *HandleEvent
	handleEvent wasmer.NativeFunction
}

// NewHandleEvent creates new HandleEvent trait collection
func NewHandleEvent(fnName string, protobufInterop *ProtobufInterop) *HandleEvent {
	return &HandleEvent{traits: make([]*HandleEventTrait, 0), fnName: fnName, protobufInterop: protobufInterop}
}

// CreateTrait creates trait and binds it to the ExecutionContext
func (e *HandleEvent) CreateTrait(ectx *ExecutionContext) Trait {
	t := &HandleEventTrait{ectx: ectx, collection: e}
	e.traits = append(e.traits, t)
	return t
}

// For returns trait bound to the specific execution context
func (e *HandleEvent) For(ec *ExecutionContext) (*HandleEventTrait, error) {
	for _, t := range e.traits {
		if t.ectx == ec {
			return t, nil
		}
	}

	return nil, trace.Errorf("HandleEventTrait bound to execution context %v not found", ec)
}

// ImportMethodsFromWASM imports WASM methods to go side
func (e *HandleEventTrait) ImportMethodsFromWASM(getFunction GetFunctionFn) error {
	var err error

	e.handleEvent, err = getFunction(e.collection.fnName)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// ExportMethodsToWASM exports go methods to WASM
func (e *HandleEventTrait) ExportMethodsToWASM(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	return nil
}

// HandleEvent wraps handleEvent call to proto def
func (e *HandleEventTrait) HandleEvent(evt events.AuditEvent) (*plugin.HandleEventResponse, error) {
	request := &plugin.HandleEventRequest{
		Event: events.MustToOneOf(evt),
	}

	result := &plugin.HandleEventResponse{}

	// Send teleport event to WASM side
	pb, err := e.collection.protobufInterop.For(e.ectx)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Execute handleEvent method
	err = pb.ExecuteProtobufMethod(request, e.handleEvent, e.collection.fnName, result)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return result, nil
}
