package wasm

import (
	"time"

	badger "github.com/dgraph-io/badger/v3"
	"github.com/google/uuid"
	"github.com/gravitational/trace"
)

var (
	tokenPrefix = []byte{0x00, 0x01}
)

// PersistentStore represents interface which the store object must meet to work with WASM
type PersistentStore interface {
	TakeToken(string, time.Duration) (int, error)
	ReleaseTokens(string) error
}

// BadgerPersistentStore represents badgerdb persistent store
type BadgerPersistentStore struct {
	// db badger db instance
	db *badger.DB
}

// NewBadgerMemoryStore creates badgerdb in-memory store
func NewBadgerPersistentStore(db *badger.DB) *BadgerPersistentStore {
	return &BadgerPersistentStore{db: db}
}

// TakeToken creates new token within specified with the requested TTL
func (s *BadgerPersistentStore) TakeToken(scope string, ttl time.Duration) (int, error) {
	u, err := uuid.New().MarshalBinary()
	if err != nil {
		return -1, trace.Wrap(err)
	}

	// Scoped prefix for this token group
	var prefix []byte = make([]byte, 1)
	prefix = append(prefix, tokenPrefix...)
	prefix = append(prefix, []byte(scope)...)

	// key is token name
	var key []byte = make([]byte, len(prefix))
	copy(key, prefix)
	key = append(key, u...) // Append uuid in binary form to save space

	// badger entry for token
	entry := badger.NewEntry(key, []byte{1}).WithTTL(ttl)

	err = s.db.Update(func(txn *badger.Txn) error {
		return txn.SetEntry(entry)
	})
	if err != nil {
		return -1, trace.Wrap(err)
	}

	count := 0

	err = s.db.View(func(txn *badger.Txn) error {
		// caclculate token count in the scope
		opts := badger.DefaultIteratorOptions
		opts.PrefetchValues = false

		it := txn.NewIterator(opts)
		for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {
			count++
		}
		it.Close()
		return nil
	})
	if err != nil {
		return -1, trace.Wrap(err)
	}

	return count, nil
}

// ReleaseToken cleans up specified tokens scope
func (s *BadgerPersistentStore) ReleaseTokens(scope string) error {
	var prefix []byte = make([]byte, 1)
	prefix = append(prefix, tokenPrefix...)
	prefix = append(prefix, []byte(scope)...)

	err := s.db.Update(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.PrefetchValues = false

		it := txn.NewIterator(opts)
		for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {
			txn.Delete(it.Item().Key())
		}
		it.Close()
		return nil
	})

	return err
}
