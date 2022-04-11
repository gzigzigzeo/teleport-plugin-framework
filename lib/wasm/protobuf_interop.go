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
	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// ProtobufInterop represents protobuf interop methods
type ProtobufInterop struct{}

// NewProtobufInterop creates new protobuf interop trait
func NewProtobufInterop() *ProtobufInterop {
	return &ProtobufInterop{}
}

// SendMessage allocates memory and copies proto.Message to the AS side, returns memory address
func (i *ProtobufInterop) SendMessage(ectx *ExecutionContext, message proto.Message) (wasmer.Value, error) {
	size := proto.Size(message)
	bytes, err := proto.Marshal(message)
	if err != nil {
		return wasmer.NewI32(0), trace.Wrap(err)
	}

	arrayBuffer, err := ectx.MemoryInterop.New(ectx, size, AssemblyScriptArrayBuffer)
	if err != nil {
		return wasmer.NewI32(0), trace.Wrap(err)
	}

	arrayBufferAddr := arrayBuffer.I32()

	// DMA copy
	memory := ectx.Memory.Data()
	copy(memory[arrayBufferAddr:], bytes)

	return arrayBuffer, nil
}

// ReceiveMessage decodes message from WASM side. Type of the message must be known onset.
func (i *ProtobufInterop) ReceiveMessage(ectx *ExecutionContext, arrayBuffer wasmer.Value, m proto.Message) error {
	len := ectx.MemoryInterop.Len(ectx, arrayBuffer)

	bytes := make([]byte, len)
	memory := ectx.Memory.Data()
	copy(bytes, memory[arrayBuffer.I32():arrayBuffer.I32()+len])

	err := proto.Unmarshal(bytes, m)
	if err != nil {
		return trace.Wrap(err, "Protobuf unmarshal error")
	}

	return nil
}

// ExecuteProtobufMethod executes abitary WASM method which has a single proto.Message argument and a single
// proto.Message return value. Method must be bound to the same execution context.
func (i *ProtobufInterop) ExecuteProtobufMethod(ectx *ExecutionContext, request proto.Message, fn NativeFunctionWithExecutionContext, target proto.Message) error {
	handle, err := i.SendMessage(ectx, request)
	if err != nil {
		return trace.Wrap(err)
	}

	// Get the result
	resultHandle, err := fn(ectx, handle)
	if err != nil {
		return trace.Wrap(err)
	}

	if resultHandle.I32() == 0 {
		return trace.Errorf("SendMessage returned nil handle")
	}

	// Get the response
	err = i.ReceiveMessage(ectx, resultHandle, target)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}
