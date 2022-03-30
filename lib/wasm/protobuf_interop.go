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

const (
	allocFnName     = "__protobuf_alloc"
	getAddrFnName   = "__protobuf_getAddr"
	getLengthFnName = "__protobuf_getLength"
)

// ProtobufInterop represents collection of traits
type ProtobufInterop struct {
	traits []*ProtobufInteropTrait
}

// ProtobufInterop represents protobuf interop methods
type ProtobufInteropTrait struct {
	ectx      *ExecutionContext
	alloc     wasmer.NativeFunction
	getAddr   wasmer.NativeFunction
	getLength wasmer.NativeFunction
}

// NewProtobufInterop creates new ProtobufInterop bindings
func NewProtobufInterop() *ProtobufInterop {
	return &ProtobufInterop{traits: make([]*ProtobufInteropTrait, 0)}
}

// CreateTrait creates trait and binds it to the ExecutionContext
func (e *ProtobufInterop) CreateTrait(ectx *ExecutionContext) Trait {
	t := &ProtobufInteropTrait{ectx: ectx}
	e.traits = append(e.traits, t)
	return t
}

// For returns trait bound to the specific execution context
func (e *ProtobufInterop) For(ec *ExecutionContext) (*ProtobufInteropTrait, error) {
	for _, t := range e.traits {
		if t.ectx == ec {
			return t, nil
		}
	}

	return nil, trace.Errorf("ProtobufInteropTrait bound to execution context %v not found", ec)
}

// ImportMethodsFromWASM imports WASM methods to go side
func (i *ProtobufInteropTrait) ImportMethodsFromWASM() error {
	var err error

	i.alloc, err = i.ectx.GetFunction(allocFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	i.getAddr, err = i.ectx.GetFunction(getAddrFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	i.getLength, err = i.ectx.GetFunction(getLengthFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// ExportMethodsToWASM exports go methods to WASM
func (i *ProtobufInteropTrait) ExportMethodsToWASM(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	return nil
}

// SendMessage allocates memory and copies proto.Message to the AS side, returns memory address
func (i *ProtobufInteropTrait) SendMessage(message proto.Message) (int32, error) {
	size := proto.Size(message)
	bytes, err := proto.Marshal(message)
	if err != nil {
		return 0, trace.Wrap(err)
	}

	rawAddrSize, err := i.ectx.Execute(i.alloc, size)
	if err != nil {
		return 0, trace.Wrap(err)
	}

	i64 := wasmer.NewI64(rawAddrSize)
	addrSize := i64.I64()
	dataView := int32(addrSize >> 32)
	addr := addrSize & 0xFFFFFFFF

	// DMA copy
	memory := i.ectx.Memory.Data()
	copy(memory[addr:], bytes)

	return dataView, nil
}

// ReceiveMessage decodes message from WASM side. Type of the message must be known onset.
func (i *ProtobufInteropTrait) ReceiveMessage(handle interface{}, m proto.Message) error {
	rawLength, err := i.ectx.Execute(i.getLength, handle)
	if err != nil {
		return trace.Wrap(err)
	}

	rawAddr, err := i.ectx.Execute(i.getAddr, handle)
	if err != nil {
		return trace.Wrap(err)
	}

	length := wasmer.NewI32(rawLength)
	addr := wasmer.NewI32(rawAddr)

	bytes := make([]byte, length.I32())
	memory := i.ectx.Memory.Data()
	copy(bytes, memory[addr.I32():addr.I32()+length.I32()])

	err = proto.Unmarshal(bytes, m)
	if err != nil {
		return trace.Wrap(err, "Protobuf unmarshal error")
	}

	return nil
}

// ExecuteProtobufMethod executes abitary WASM method which has a single proto.Message argument and a single
// proto.Message return value. Method must be bound to the same execution context.
func (i *ProtobufInteropTrait) ExecuteProtobufMethod(request proto.Message, fn wasmer.NativeFunction, fnName string, target proto.Message) error {
	handle, err := i.SendMessage(request)
	if err != nil {
		return trace.Wrap(err)
	}

	// Get the result
	resultHandle, err := i.ectx.Execute(fn, handle)
	if err != nil {
		return trace.Wrap(err)
	}

	// Check if there is any result
	h := wasmer.NewI32(resultHandle)
	if h.I32() == 0 {
		return trace.Errorf("%v returned null result", fnName)
	}

	// Get the response
	err = i.ReceiveMessage(resultHandle, target)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}
