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
func NewMockSecretsCache(c map[string]string) *MockSecretsCache {
	return &MockSecretsCache{c}
}

// GetSecretString returns secret string from an internal cache
func (c *MockSecretsCache) GetSecretString(secretId string) (string, error) {
	value, ok := c.c[secretId]
	if !ok {
		return "", trace.Errorf("Secret not found!")
	}

	return value, nil
}

// Testing represents WASM testing trait
type Testing struct {
	FixtureIndex  *FixtureIndex
	MockAPIClient *MockAPIClient
	run           NativeFunctionWithExecutionContext
}

// NewTesting creates new test runner instance
func NewTesting(dir string) (*Testing, error) {
	index, err := NewFixtureIndex(dir)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &Testing{FixtureIndex: index, MockAPIClient: NewMockAPI()}, nil
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
			"getFixtureSize": {
				wasmer.NewValueTypes(wasmer.I32), // n:i32
				wasmer.NewValueTypes(wasmer.I32), // i32
				r.getFixtureSize,
			},
			"getFixtureBody": {
				wasmer.NewValueTypes(wasmer.I32, wasmer.I32), // n:i32, addr:usize
				wasmer.NewValueTypes(),                       // void
				r.getFixtureBody,
			},
			"getLatestAPIRequestSize": {
				wasmer.NewValueTypes(),
				wasmer.NewValueTypes(wasmer.I32), // i32
				r.getLatestAPIRequestSize,
			},
			"getLatestAPIRequestBody": {
				wasmer.NewValueTypes(wasmer.I32), // n:i32, addr:usize
				wasmer.NewValueTypes(),           // void
				r.getLatestAPIRequestBody,
			},
		})
}

// getFixtureSize returns size of a fixture number n
func (r *Testing) getFixtureSize(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	n := int(args[0].I32())

	fixture := r.FixtureIndex.Get(n)
	if fixture == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("Fixture %v not found", n)
	}

	size := proto.Size(fixture)

	return []wasmer.Value{wasmer.NewI32(size)}, nil
}

// getFixtureBody copies fixture number n to the provided memory segment
func (r *Testing) getFixtureBody(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	n := int(args[0].I32())
	addr := int(args[1].I32())
	data := ectx.Memory.Data()

	fixture := r.FixtureIndex.Get(n)
	if fixture == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("Fixture %v not found", n)
	}

	bytes, err := proto.Marshal(fixture)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// DMA copy
	copy(data[addr:], bytes)

	return nil, nil
}

// getLatestAPIRequestSize returns size of a latest API request
func (r *Testing) getLatestAPIRequestSize(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	request := r.MockAPIClient.GetLatestRequest(ectx.CurrentContext)
	if request == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("There were no API requests")
	}

	size := proto.Size(request)

	return []wasmer.Value{wasmer.NewI32(size)}, nil
}

// getLatestAPIRequestBody copies fixture number n to the provided memory segment
func (r *Testing) getLatestAPIRequestBody(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	addr := int(args[0].I32())
	data := ectx.Memory.Data()

	request := r.MockAPIClient.GetLatestRequest(ectx.CurrentContext)
	if request == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("There were no API requests")
	}

	bytes, err := proto.Marshal(request)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// DMA copy
	copy(data[addr:], bytes)

	return nil, nil
}

// Run runs test suite
func (r *Testing) Run(ectx *ExecutionContext) error {
	_, err := r.run(ectx)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}
