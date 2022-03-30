package internal

import (
	"context"
	"os"
	"time"

	badger "github.com/dgraph-io/badger/v3"
	"github.com/gravitational/teleport-plugin-framework/lib/wasm"
	"github.com/gravitational/trace"
	"github.com/sirupsen/logrus"
)

const (
	// defaultConcurrency default test concurrency
	defaultConcurrency = 1
	// defaultTimeout default timeout for WASM method calls
	defaultTimeout = time.Second * 30
	// testWasm WASM test binary file
	testWasm = "build/test.wasm"
)

// RunTests runs tests
func RunTests(log logrus.FieldLogger) {
	ctx := context.Background()

	b, err := os.ReadFile(testWasm)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	db, err := badger.Open(badger.DefaultOptions("").WithInMemory(true))
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	asEnv := wasm.NewAssemblyScriptEnv(log)
	store := wasm.NewStore(wasm.NewBadgerPersistentStore(db), wasm.DecodeAssemblyScriptString)
	testRunner, err := wasm.NewTesting(fixturesDir)
	if err != nil {
		log.Fatal(trace.Wrap(err))
	}
	pb := wasm.NewProtobufInterop()
	api := wasm.NewTeleportAPI(log, testRunner.MockAPIClient, pb)

	opts := wasm.ExecutionContextPoolOptions{
		Timeout:     defaultTimeout,
		Concurrency: defaultConcurrency,
		Bytes:       b,
	}

	pool, err := wasm.NewExecutionContextPool(opts, asEnv, testRunner, store, api, pb)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	c, err := pool.Get(ctx)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	ec, err := testRunner.For(c)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	err = ec.Run()
	if err != nil {
		bail("%v", trace.Wrap(err))
	}
}
