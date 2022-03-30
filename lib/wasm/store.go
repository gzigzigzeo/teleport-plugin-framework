package wasm

import (
	"strings"
	"time"

	"github.com/gravitational/trace"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// Store represents object responsible for external persistent store
type Store struct {
	traits       []*StoreTrait
	db           PersistentStore
	decodeString StringDecoder
}

// Store represents store methods bound to specific execution context
type StoreTrait struct {
	ectx  *ExecutionContext
	store *Store
}

// NewStore creats new Store struct
func NewStore(db PersistentStore, decodeString StringDecoder) *Store {
	return &Store{traits: make([]*StoreTrait, 0), db: db, decodeString: decodeString}
}

// CreateTrait creates StoreTrait and binds it to passed ExecutionContext
func (s *Store) CreateTrait(ectx *ExecutionContext) Trait {
	t := &StoreTrait{store: s, ectx: ectx}
	s.traits = append(s.traits, t)
	return t
}

// ImportMethodsFromWASM imports WASM methods to go
func (t *StoreTrait) ImportMethodsFromWASM() error {
	return nil
}

// ExportMethodsToWASM exports Store methods to wasm
func (t *StoreTrait) ExportMethodsToWASM(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	importObject.Register("store", map[string]wasmer.IntoExtern{
		"takeToken": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(wasmer.I32, wasmer.I32), // prefix string, TTL i32
			wasmer.NewValueTypes(wasmer.I32),             // i32 - tokens count
		), t.takeToken),
		"releaseTokens": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(wasmer.I32), // prefix string
			wasmer.NewValueTypes(),           // void
		), t.releaseTokens),
	})
	return nil
}

// takeToken generates new token scope and ttl
func (t *StoreTrait) takeToken(args []wasmer.Value) ([]wasmer.Value, error) {
	scope := t.store.decodeString(args[0], t.ectx.Memory)
	if strings.TrimSpace(scope) == "" {
		return nil, trace.BadParameter("Please, pass non-empty scope to takeToken")
	}

	ttl := args[1].I32()

	n, err := t.store.db.TakeToken(scope, time.Duration(ttl)*time.Second)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return []wasmer.Value{wasmer.NewI32(n)}, nil
}

// releaseTokens releases tokens within the scope
func (t *StoreTrait) releaseTokens(args []wasmer.Value) ([]wasmer.Value, error) {
	scope := t.store.decodeString(args[0], t.ectx.Memory)
	if strings.TrimSpace(scope) == "" {
		return nil, trace.BadParameter("Please, pass non-empty scope to releaseTokens")
	}

	err := t.store.db.ReleaseTokens(scope)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return []wasmer.Value{}, nil
}
