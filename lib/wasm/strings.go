package wasm

import (
	"bytes"
	"encoding/binary"
	"unicode/utf16"

	"github.com/wasmerio/wasmer-go/wasmer"
)

// StringDecoder represents a type of generic string decoder function
type StringDecoder func(wasmer.Value, *wasmer.Memory) string

// DecodeAssemblyScriptString reads string from AssemblyScript memory, converts it from UTF-16 to UTF-8 and returns it
func DecodeAssemblyScriptString(s wasmer.Value, m *wasmer.Memory) string {
	addr := s.I32()
	if addr == 0 {
		return ""
	}

	data := m.Data()
	len := int32(binary.LittleEndian.Uint32(data[addr-4 : addr]))

	// Copy UTF16 string to a buffer
	utf16buf := make([]uint16, len/2)
	for n := 0; n < int(len); n += 2 {
		pos := addr + int32(n)
		utf16buf[n/2] = binary.LittleEndian.Uint16(data[pos : pos+2])
	}

	// Convert UTF16 to UTF8
	stringBuf := &bytes.Buffer{}
	for _, r := range utf16.Decode(utf16buf) {
		stringBuf.WriteRune(r)
	}

	return stringBuf.String()
}
