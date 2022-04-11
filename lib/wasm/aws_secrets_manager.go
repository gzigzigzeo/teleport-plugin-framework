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
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// SecretsCache represents aws secretscache interface
type SecretsCache interface {
	GetSecretString(secretId string) (string, error)
}

// AWSSecretsManager represents awsSecretsManager trait
type AWSSecretsManager struct {
	cache SecretsCache
}

// sess, err := session.NewSession()
// if err != nil {
// 	return nil, trace.Wrap(err)
// }

// svc := secretsmanager.New(sess, aws.NewConfig().WithCredentialsChainVerboseErrors(true))
// cache, err := secretcache.New(
// 	func(c *secretcache.Cache) { c.Client = svc },
// )
// if err != nil {
// 	return nil, trace.Wrap(err)
// }

// NewAWSSecretsManager creates new AWSSecretsManager trait collection
func NewAWSSecretsManager(cache SecretsCache) (*AWSSecretsManager, error) {
	return &AWSSecretsManager{cache: cache}, nil
}

// ExportMethodsToWASM exports go methods to WASM
func (e *AWSSecretsManager) ExportMethodsToWASM(exports *Exports) {
	exports.Define(
		"aws_secrets_manager",
		map[string]Export{
			"getSecretString": {
				wasmer.NewValueTypes(
					wasmer.I32, // name: string
				),
				wasmer.NewValueTypes(
					wasmer.I32, // value: string
				), // void
				e.getSecretsString,
			},
		},
	)
}

// getSecretsString returns value from AWS secrets
func (e *AWSSecretsManager) getSecretsString(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
	secretName := ectx.MemoryInterop.GetString(ectx, args[0])

	secretValue, err := e.cache.GetSecretString(secretName)
	if err != nil {
		return []wasmer.Value{}, trace.Wrap(err)
	}

	s, err := ectx.MemoryInterop.PutString(ectx, secretValue)
	if err != nil {
		return []wasmer.Value{}, trace.Wrap(err)
	}

	return []wasmer.Value{s}, nil
}
