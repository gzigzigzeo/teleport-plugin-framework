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
	"io/ioutil"
	"os"
	"path"
	"testing"

	"github.com/gravitational/teleport/api/types/events"
	"github.com/stretchr/testify/require"
)

func TestFixtureBuilderContext(t *testing.T) {
	c, err := NewTemplateBuilder()
	require.NoError(t, err)

	f, err := c.Get("events.user_create.json")
	require.NoError(t, err)

	msg, err := f.GetProtoMessage()
	require.NoError(t, err)

	oneof := msg.(*events.OneOf)
	require.NotNil(t, oneof)

	evt, err := events.FromOneOf(*oneof)
	require.NoError(t, err)

	userCreate := evt.(*events.UserCreate)
	require.NotNil(t, userCreate)

	require.Equal(t, userCreate.UserMetadata.Login, "foo")
	require.NotEmpty(t, userCreate.Metadata.ID)
}

func TestFixtureIndex(t *testing.T) {
	c, err := NewTemplateBuilder()
	require.NoError(t, err)

	f, err := c.Get("events.user_create.json")
	require.NoError(t, err)

	b, err := f.ToJSON()
	require.NoError(t, err)

	dir, err := ioutil.TempDir(os.TempDir(), "test-fixtures")
	require.NoError(t, err)
	defer os.RemoveAll(dir)

	ioutil.WriteFile(path.Join(dir, "1-user_create.json"), b, 0777)
	ioutil.WriteFile(path.Join(dir, "2-user_create.json"), b, 0777)
	ioutil.WriteFile(path.Join(dir, "5-user_create.json"), b, 0777)
	ioutil.WriteFile(path.Join(dir, "6abc-create-user.json"), b, 0777)
	ioutil.WriteFile(path.Join(dir, "zzz-create-user.json"), b, 0777)

	i, err := NewFixtureIndex(dir)
	require.NoError(t, err)

	require.NotNil(t, i.Get(1))
	require.NotNil(t, i.Get(2))
	require.NotNil(t, i.Get(5))
	require.Nil(t, i.Get(12))
	require.Nil(t, i.Get(6))

	_, err = i.Add("events.user_create", "user_create")
	require.NoError(t, err)
	require.NotNil(t, i.Get(6))
}
