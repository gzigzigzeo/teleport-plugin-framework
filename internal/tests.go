package internal

import (
	"context"
	"fmt"
	"os"
	"sync"
	"time"

	badger "github.com/dgraph-io/badger/v3"
	"github.com/gravitational/teleport-plugin-framework/lib/wasm"
	"github.com/gravitational/trace"
	"github.com/sirupsen/logrus"
)

// RunTests runs tests
func RunTests(log logrus.FieldLogger, binary string, fixturesPath string, timeout time.Duration, concurrency int) {
	b, err := os.ReadFile(binary)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	db, err := badger.Open(badger.DefaultOptions("").WithInMemory(true))
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	testRunner, err := wasm.NewTesting(fixturesPath)
	if err != nil {
		log.Fatal(trace.Wrap(err))
	}
	protobufInterop := wasm.NewProtobufInterop()
	api := wasm.NewTeleportAPI(testRunner.MockAPIClient, protobufInterop)

	opts := wasm.ExecutionContextPoolOptions{
		Log:           log,
		MemoryInterop: wasm.NewAssemblyScriptMemoryInterop(),
		Timeout:       timeout,
		Concurrency:   concurrency,
		PluginBytes:   b,
		Traits: []interface{}{
			wasm.NewAssemblyScriptEnv(),
			wasm.NewStore(wasm.NewBadgerPersistentStore(db)),
			testRunner,
			protobufInterop,
			api,
			wasm.NewAWSSecretsManager(testRunner.MockSecretsCache),
		},
	}

	pool, err := wasm.NewExecutionContextPool(opts)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	fmt.Println("Running tests...")

	var wg sync.WaitGroup

	for i := 0; i < concurrency; i++ {
		wg.Add(1)

		go func() {
			_, err = pool.Execute(context.Background(), func(ectx *wasm.ExecutionContext) (interface{}, error) {
				err = testRunner.Run(ectx)
				if err != nil {
					return nil, trace.Wrap(err)
				}

				return nil, nil
			})

			if err != nil {
				bail("%v", trace.Wrap(err))
			}

			wg.Done()
		}()
	}

	wg.Wait()

	fmt.Println("Success!")
}
