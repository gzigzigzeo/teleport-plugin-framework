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
)

// RewriteHeaders represents rewriteHeader trait
type RewriteHeaders struct {
	fnName          string
	protobufInterop *ProtobufInterop
	rewriteHeaders  NativeFunctionWithExecutionContext
}

// NewRewriteHeaders creates new RewriteHeaders trait collection
func NewRewriteHeaders(fnName string, protobufInterop *ProtobufInterop) *RewriteHeaders {
	return &RewriteHeaders{fnName: fnName, protobufInterop: protobufInterop}
}

// ImportMethodsFromWASM imports WASM methods to go side
func (e *RewriteHeaders) ImportMethodsFromWASM(getFunction GetFunction) error {
	var err error

	e.rewriteHeaders, err = getFunction(e.fnName)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// RewriteHeaders wraps RewriteHeaders call to proto def
func (e *RewriteHeaders) RewriteHeaders(ectx *ExecutionContext, headers map[string]string) (*plugin.RewriteHeadersResponse, error) {
	request := &plugin.RewriteHeadersRequest{
		Headers: headers,
	}

	result := &plugin.RewriteHeadersResponse{}

	// Execute RewriteHeaders method
	err := e.protobufInterop.ExecuteProtobufMethod(ectx, request, e.rewriteHeaders, result)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return result, nil
}
