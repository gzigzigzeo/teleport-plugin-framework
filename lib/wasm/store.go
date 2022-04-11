package wasm

import (
	"strings"
	"time"

	"github.com/gravitational/trace"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// Store represents store methods bound to specific execution context
type Store struct {
	db PersistentStore
}

// NewStore creats new Store struct
func NewStore(db PersistentStore) *Store {
	return &Store{db: db}
}

// ExportMethodsToWASM exports Store methods to wasm
func (t *Store) ExportMethodsToWASM(exports *Exports) {
	exports.Define(
		"store",
		map[string]Export{
			"takeToken": {
				wasmer.NewValueTypes(wasmer.I32, wasmer.I32), // prefix string, TTL i32
				wasmer.NewValueTypes(wasmer.I32),             // i32 - tokens count
				t.takeToken,
			},
			"releaseTokens": {
				wasmer.NewValueTypes(wasmer.I32), // prefix string
				wasmer.NewValueTypes(),           // void
				t.releaseTokens,
			},
		},
	)
}

// takeToken generates new token scope and ttl
func (t *Store) takeToken(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	scope := ectx.MemoryInterop.GetString(ectx, args[0])
	if strings.TrimSpace(scope) == "" {
		return nil, trace.BadParameter("Please, pass non-empty scope to takeToken")
	}

	ttl := args[1].I32()

	n, err := t.db.TakeToken(scope, time.Duration(ttl)*time.Second)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return []wasmer.Value{wasmer.NewI32(n)}, nil
}

// releaseTokens releases tokens within the scope
func (t *Store) releaseTokens(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	scope := ectx.MemoryInterop.GetString(ectx, args[0])
	if strings.TrimSpace(scope) == "" {
		return nil, trace.BadParameter("Please, pass non-empty scope to releaseTokens")
	}

	err := t.db.ReleaseTokens(scope)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return []wasmer.Value{}, nil
}
