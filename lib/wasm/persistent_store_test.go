package wasm

import (
	"testing"
	"time"

	badger "github.com/dgraph-io/badger/v3"
	"github.com/stretchr/testify/require"
)

func TestTakeToken(t *testing.T) {
	db, err := badger.Open(badger.DefaultOptions("").WithInMemory(true))
	require.NoError(t, err)
	defer db.Close()

	s := NewBadgerPersistentStore(db)

	_, err = s.TakeToken("test", 5*time.Second)
	require.NoError(t, err)

	count, err := s.TakeToken("test", 5*time.Second)
	require.NoError(t, err)

	require.Equal(t, 2, count)

	count, err = s.TakeToken("test2", 5*time.Second)
	require.NoError(t, err)

	require.Equal(t, 1, count)
}
