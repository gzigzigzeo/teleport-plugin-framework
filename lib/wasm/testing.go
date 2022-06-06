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
	"context"

	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/teleport/api/types"
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// Mock Teleport API client
type MockAPIClient struct {
	messages []proto.Message
}

// NewMockAPI creates new mock Teleport API client
func NewMockAPI() *MockAPIClient {
	return &MockAPIClient{messages: make([]proto.Message, 0)}
}

// UpsertLock creates new mock lock
func (a *MockAPIClient) UpsertLock(ctx context.Context, lock types.Lock) error {
	lockV2, ok := lock.(*types.LockV2)
	if !ok {
		return trace.BadParameter("Can not convert %T to types.LockV2", lock)
	}
	a.messages = append(a.messages, lockV2)
	return nil
}

// GetLatestRequest returns lates API request proto message
func (a *MockAPIClient) GetLatestRequest(ctx context.Context) proto.Message {
	if len(a.messages) == 0 {
		return nil
	}

	return a.messages[len(a.messages)-1]
}

// MockSecretsCache mock secrets cache
type MockSecretsCache struct {
	c map[string]string
}

// NewMockSecretsCache creates new mock secrets cache
func NewMockSecretsCache() *MockSecretsCache {
	return &MockSecretsCache{c: make(map[string]string)}
}

// GetSecretString returns secret string from an internal cache
func (c *MockSecretsCache) GetSecretString(secretId string) (string, error) {
	value, ok := c.c[secretId]
	if !ok {
		return "", trace.Errorf("Secret not found!")
	}

	return value, nil
}

// SetSecretString sets secret string
func (c *MockSecretsCache) SetSecretString(key, value string) {
	c.c[key] = value
}

// Testing represents WASM testing trait
type Testing struct {
	FixtureIndex     *FixtureIndex
	MockAPIClient    *MockAPIClient
	MockSecretsCache *MockSecretsCache
	Alerting         *Alerting
	run              NativeFunctionWithExecutionContext
}

// NewTesting creates new test runner instance
func NewTesting(dir string, alerting *Alerting) (*Testing, error) {
	index, err := NewFixtureIndex(dir)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &Testing{
		FixtureIndex:     index,
		MockAPIClient:    NewMockAPI(),
		MockSecretsCache: NewMockSecretsCache(),
		Alerting:         alerting,
	}, nil
}

// ImportMethodsFromWASM imports WASM methods to go side
func (r *Testing) ImportMethodsFromWASM(getFunction GetFunction) error {
	var err error

	r.run, err = getFunction("test")
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// ExportMethodsToWASM exports testing methods to go side
func (r *Testing) ExportMethodsToWASM(exports *Exports) {
	exports.Define(
		"test",
		map[string]Export{
			"getFixture": {
				wasmer.NewValueTypes(wasmer.I32), // n:i32
				wasmer.NewValueTypes(wasmer.I32), // i32
				r.sendFixture,
			},
			"getLatestAPIRequest": {
				wasmer.NewValueTypes(),
				wasmer.NewValueTypes(wasmer.I32), // i32
				r.getLatestAPIRequest,
			},
			"defineAWSsecret": {
				wasmer.NewValueTypes(wasmer.I32, wasmer.I32), // key:string, value:string
				wasmer.NewValueTypes(),                       // void
				r.defineAWSsecret,
			},
			"getAlert": {
				wasmer.NewValueTypes(),
				wasmer.NewValueTypes(wasmer.I32), // i32
				r.getAlert,
			},
		})
}

// sendFixture returns fixture number n
func (r *Testing) sendFixture(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	n := int(args[0].I32())

	fixture := r.FixtureIndex.Get(n)
	if fixture == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("Fixture %v not found", n)
	}

	addr, err := ectx.MemoryInterop.SendMessage(ectx, fixture)

	return []wasmer.Value{addr}, err
}

// getLatestAPIRequest returns latest API request
func (r *Testing) getLatestAPIRequest(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	request := r.MockAPIClient.GetLatestRequest(ectx.CurrentContext)
	if request == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("There were no API requests")
	}

	addr, err := ectx.MemoryInterop.SendMessage(ectx, request)

	return []wasmer.Value{addr}, err
}

// defineAWSsecret puts string to the mock secret cache
func (r *Testing) defineAWSsecret(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	key := ectx.MemoryInterop.GetString(ectx, args[0])
	value := ectx.MemoryInterop.GetString(ectx, args[1])

	r.MockSecretsCache.SetSecretString(key, value)

	return nil, nil
}

// getAlert returns next alert from a queue
func (r *Testing) getAlert(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	select {
	case evt := <-r.Alerting.Alerts:
		addr, err := ectx.MemoryInterop.SendMessage(ectx, &evt)
		return []wasmer.Value{addr}, err
	default:
		return []wasmer.Value{}, nil
	}
}

// Run runs test suite
func (r *Testing) Run(ectx *ExecutionContext) error {
	_, err := r.run(ectx)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}
