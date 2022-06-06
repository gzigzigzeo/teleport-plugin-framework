package wasm

import (
	"encoding/binary"

	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/trace"
	"github.com/wasmerio/wasmer-go/wasmer"
	"golang.org/x/text/encoding/unicode"
)

const (
	// AssemblyScriptArrayBuffer represents object type for ArrayBuffer
	AssemblyScriptArrayBuffer = 0
	// AssemblyScriptString represents object type for string
	AssemblyScriptString = 1
)

// MemoryInterop represents interface which is required to interoperate with wasmer instance memory
type MemoryInterop interface {
	// GetString returns string from wasmer memory
	GetString(ectx *ExecutionContext, value wasmer.Value) string
	// PutString puts string to wasmer memory
	PutString(ectx *ExecutionContext, value string) (wasmer.Value, error)
	// GetSize gets memory segment size
	Len(ectx *ExecutionContext, value wasmer.Value) int32
	// New allocates memory on WASM side. typ represents object type, omit if not required
	New(ectx *ExecutionContext, byteSize int, typ int) (wasmer.Value, error)
	// SendMessage allocates memory and copies proto.Message to the AS side, returns memory address
	SendMessage(ectx *ExecutionContext, message proto.Message) (wasmer.Value, error)
	// ReceiveMessage decodes message from WASM side. Type of the message must be known onset
	ReceiveMessage(ectx *ExecutionContext, arrayBuffer wasmer.Value, message proto.Message) error
}

// AssemblyScriptMemoryInterop represents struct which works with AssemblyScript memory
type AssemblyScriptMemoryInterop struct {
	TraitWithImports
	MemoryInterop
	new NativeFunctionWithExecutionContext
}

// NewAssemblyScriptMemoryInterop returns empty AssemblyScriptMemoryInterop struct
func NewAssemblyScriptMemoryInterop() *AssemblyScriptMemoryInterop {
	return &AssemblyScriptMemoryInterop{}
}

// ImportMethodsFromWASM imports WASM methods
func (m *AssemblyScriptMemoryInterop) ImportMethodsFromWASM(getFunction GetFunction) error {
	var err error

	m.new, err = getFunction("__new")
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// GetString returns string from WASM memory decoded to UTF-8 by it's address
func (m *AssemblyScriptMemoryInterop) GetString(ectx *ExecutionContext, value wasmer.Value) string {
	addr := value.I32()
	if addr == 0 {
		return ""
	}

	// see Len()
	data := ectx.Memory.Data()
	len := int32(binary.LittleEndian.Uint32(data[addr-4 : addr]))

	segment := data[addr : addr+len]
	decoder := unicode.UTF16(unicode.LittleEndian, unicode.IgnoreBOM).NewDecoder()
	utf8, err := decoder.Bytes(segment)
	if err != nil {
		return ""
	}

	return string(utf8)
}

// PutString encodes string to UTF-16, puts it to WASM memory and returns address
func (m *AssemblyScriptMemoryInterop) PutString(ectx *ExecutionContext, value string) (wasmer.Value, error) {
	encoder := unicode.UTF16(unicode.LittleEndian, unicode.IgnoreBOM).NewEncoder()
	utf16, err := encoder.String(value)
	if err != nil {
		return wasmer.NewI32(0), trace.Wrap(err)
	}

	data := ectx.Memory.Data()

	addr, err := m.New(ectx, len(utf16), AssemblyScriptString)
	if err != nil {
		return wasmer.NewI32(0), trace.Wrap(err)
	}
	copy(data[addr.I32():], []byte(utf16))

	return addr, nil
}

// Len returns size of a memory segment taken from AS GC header
func (m *AssemblyScriptMemoryInterop) Len(ectx *ExecutionContext, value wasmer.Value) int32 {
	addr := value.I32()
	data := ectx.Memory.Data()
	return int32(binary.LittleEndian.Uint32(data[addr-4 : addr]))
}

// New allocates object by length and type
func (m *AssemblyScriptMemoryInterop) New(ectx *ExecutionContext, byteSize int, typ int) (wasmer.Value, error) {
	return m.new(ectx, wasmer.NewI32(byteSize), wasmer.NewI32(AssemblyScriptString))
}

// SendMessage allocates memory and copies proto.Message to the AS side, returns memory address
func (m *AssemblyScriptMemoryInterop) SendMessage(ectx *ExecutionContext, message proto.Message) (wasmer.Value, error) {
	size := proto.Size(message)
	bytes, err := proto.Marshal(message)
	if err != nil {
		return wasmer.NewI32(0), trace.Wrap(err)
	}

	arrayBuffer, err := m.New(ectx, size, AssemblyScriptArrayBuffer)
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
func (m *AssemblyScriptMemoryInterop) ReceiveMessage(ectx *ExecutionContext, arrayBuffer wasmer.Value, message proto.Message) error {
	len := ectx.MemoryInterop.Len(ectx, arrayBuffer)

	bytes := make([]byte, len)
	memory := ectx.Memory.Data()
	copy(bytes, memory[arrayBuffer.I32():arrayBuffer.I32()+len])

	err := proto.Unmarshal(bytes, message)
	if err != nil {
		return trace.Wrap(err, "Protobuf unmarshal error")
	}

	return nil
}
