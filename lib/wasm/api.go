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

	"github.com/gravitational/teleport/api/types"
	"github.com/gravitational/trace"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// TeleportClient represents interface to Teleport client API wrapper
type TeleportClient interface {
	UpsertLock(context.Context, types.Lock) error
}

// TeleportAPITrait represents Teleport API functions bound to the specific instance
type TeleportAPI struct {
	client TeleportClient
}

// NewTeleportAPI creates new NewTeleportAPI collection instance
func NewTeleportAPI(client TeleportClient) *TeleportAPI {
	return &TeleportAPI{client: client}
}

// RegisterExports registers protobuf interop exports (nothing in our case)
func (e *TeleportAPI) ExportMethodsToWASM(exports *Exports) {
	exports.Define(
		"api",
		map[string]Export{
			"upsertLock": {
				wasmer.NewValueTypes(wasmer.I32), // lock: DataView
				wasmer.NewValueTypes(),           // void
				e.upsertLock,
			},
		},
	)
}

// upsertLock upserts the new lock
func (e *TeleportAPI) upsertLock(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	lock := &types.LockV2{}

	handle := args[0]

	err := ectx.MemoryInterop.ReceiveMessage(ectx, handle, lock)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	err = lock.CheckAndSetDefaults()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	err = e.client.UpsertLock(ectx.CurrentContext, lock)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return []wasmer.Value{}, nil
}
