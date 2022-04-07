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
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// RewriteHeaders represents collection of traits
type RewriteHeaders struct {
	fnName          string
	traits          []*RewriteHeadersTrait
	protobufInterop *ProtobufInterop
}

// RewriteHeadersTrait represents rewriteHeader trait
type RewriteHeadersTrait struct {
	ectx           *ExecutionContext
	collection     *RewriteHeaders
	rewriteHeaders wasmer.NativeFunction
}

// NewRewriteHeaders creates new RewriteHeaders trait collection
func NewRewriteHeaders(fnName string, protobufInterop *ProtobufInterop) *RewriteHeaders {
	return &RewriteHeaders{traits: make([]*RewriteHeadersTrait, 0), fnName: fnName, protobufInterop: protobufInterop}
}

// CreateTrait creates trait and binds it to the ExecutionContext
func (e *RewriteHeaders) CreateTrait(ectx *ExecutionContext) Trait {
	t := &RewriteHeadersTrait{ectx: ectx, collection: e}
	e.traits = append(e.traits, t)
	return t
}

// For returns trait bound to the specific execution context
func (e *RewriteHeaders) For(ec *ExecutionContext) (*RewriteHeadersTrait, error) {
	for _, t := range e.traits {
		if t.ectx == ec {
			return t, nil
		}
	}

	return nil, trace.Errorf("RewriteHeadersTrait bound to execution context %v not found", ec)
}

// ImportMethodsFromWASM imports WASM methods to go side
func (e *RewriteHeadersTrait) ImportMethodsFromWASM(getFunction GetFunctionFn) error {
	var err error

	e.rewriteHeaders, err = getFunction(e.collection.fnName)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// ExportMethodsToWASM exports go methods to WASM
func (e *RewriteHeadersTrait) ExportMethodsToWASM(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	return nil
}

// RewriteHeaders wraps RewriteHeaders call to proto def
func (e *RewriteHeadersTrait) RewriteHeaders(headers map[string]string) (*plugin.RewriteHeadersResponse, error) {
	request := &plugin.RewriteHeadersRequest{
		Headers: headers,
	}

	result := &plugin.RewriteHeadersResponse{}

	// Send teleport event to WASM side
	pb, err := e.collection.protobufInterop.For(e.ectx)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Execute RewriteHeaders method
	err = pb.ExecuteProtobufMethod(request, e.rewriteHeaders, e.collection.fnName, result)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return result, nil
}
