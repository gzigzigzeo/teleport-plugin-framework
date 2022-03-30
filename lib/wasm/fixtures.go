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
	"embed"
	"encoding/json"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"text/template"
	"time"

	"github.com/gogo/protobuf/jsonpb"
	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/trace"
	"github.com/hashicorp/go-uuid"
)

var (
	//go:embed fixtures/*.json
	fixtures embed.FS
	// fixtureRegexp regexp to extract id from the file name
	fixtureRegexp = regexp.MustCompile(`(\d+)-`)
)

// templateBuilder represents fixture JSON template renderer
type templateBuilder struct {
	template *template.Template
}

// fixture respresents fixture template
type fixture struct {
	// Name represents fixture template name
	Name string `json:"name"`
	// Type represents fixture proto type
	Type string `json:"type"`
	// Description represents fixture template description
	Description string `json:"description"`
	// Data represents fixture data in json format
	Data json.RawMessage `json:"data"`
}

// FixtureIndex represents the index of a json-encoded protobuf messages
type FixtureIndex struct {
	fixtures map[int]proto.Message
	dir      string
}

// NewTemplateBuilder creates template builder instance
func NewTemplateBuilder() (*templateBuilder, error) {
	c := &templateBuilder{}

	t, err := template.New("").Funcs(template.FuncMap{
		"uuid": c.uuid,
		"time": c.time,
	}).ParseFS(fixtures, "fixtures/*.json")

	if err != nil {
		return nil, trace.Wrap(err)
	}

	c.template = t

	return c, nil
}

// uuid represents template function which generates UUID
func (c *templateBuilder) uuid() string {
	u, err := uuid.GenerateUUID()
	if err != nil {
		return "error generating uuid" // In case of failure, user would fill this in by himself
	}
	return u
}

// time represents template function which returns current time
func (c *templateBuilder) time() string {
	return time.Now().Format(time.RFC3339)
}

// Get returns fixture by template name
func (c *templateBuilder) Get(name string) (*fixture, error) {
	b := &strings.Builder{}
	err := c.template.ExecuteTemplate(b, name, struct{}{})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	f := &fixture{
		Name: strings.TrimSuffix(name, filepath.Ext(name)),
	}
	err = json.Unmarshal([]byte(b.String()), f)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return f, nil
}

// All returns all fixture templates
func (c *templateBuilder) All() ([]*fixture, error) {
	t := c.template.Templates()
	var r = make([]*fixture, len(t))

	for i, tpl := range t {
		f, err := c.Get(tpl.Name())
		if err != nil {
			return nil, trace.Wrap(err)
		}
		r[i] = f
	}

	return r, nil
}

// GetProtoMessage returns proto message of a fixture
func (f *fixture) GetProtoMessage() (proto.Message, error) {
	// FIXME: Resolve from type
	m := &events.OneOf{}

	err := jsonpb.UnmarshalString(string(f.Data), m)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return m, nil
}

// ToJSON returns JSON representation of a fixture
func (f *fixture) ToJSON() ([]byte, error) {
	return json.MarshalIndent(f, "", "  ")
}

// NewFixtureIndex reads fixtures from directory and unmarshals them to the proto.Message
func NewFixtureIndex(dir string) (*FixtureIndex, error) {
	_, err := os.Stat(dir)
	if err != nil {
		return nil, trace.BadParameter("Error reading fixture directory %v", dir)
	}
	if os.IsNotExist(err) {
		return nil, trace.BadParameter("Fixture directory does not exists %v", dir)
	}

	matches, err := filepath.Glob(path.Join(dir, "*.json"))
	if err != nil {
		return nil, trace.Wrap(err)
	}

	i := &FixtureIndex{
		fixtures: make(map[int]proto.Message),
		dir:      dir,
	}

	for _, m := range matches {
		subs := fixtureRegexp.FindStringSubmatch(m)
		if len(subs) < 2 {
			continue
		}

		id := subs[1]
		n, err := strconv.Atoi(id)
		if err != nil {
			return nil, trace.BadParameter("Failed to parse fixture file name %v %v", m, err)
		}
		err = i.read(n, m)
		if err != nil {
			return nil, trace.Wrap(err)
		}
	}

	return i, nil
}

// read reads proto message from json file
func (i *FixtureIndex) read(idx int, filename string) error {
	c, err := os.ReadFile(filename)
	if err != nil {
		return trace.Wrap(err)
	}

	f := &fixture{}
	err = json.Unmarshal(c, f)
	if err != nil {
		return trace.Wrap(err)
	}

	msg, err := f.GetProtoMessage()
	if err != nil {
		return trace.Wrap(err)
	}

	i.fixtures[idx] = msg

	return nil
}

// Get returns fixture
func (i *FixtureIndex) Get(idx int) proto.Message {
	return i.fixtures[idx]
}

// Add adds the new fixture generated from template
func (i *FixtureIndex) Add(template string, name string) (string, error) {
	builder, err := NewTemplateBuilder()
	if err != nil {
		return "", trace.Wrap(err)
	}

	fixture, err := builder.Get(template + ".json")
	if err != nil {
		return "", trace.Wrap(err)
	}

	msg, err := fixture.GetProtoMessage()
	if err != nil {
		return "", trace.Wrap(err)
	}

	bytes, err := fixture.ToJSON()
	if err != nil {
		return "", trace.Wrap(err)
	}

	id := i.getMaxID() + 1
	fileName := path.Join(i.dir, strconv.Itoa(id)+"-"+name+".json")

	err = ioutil.WriteFile(fileName, bytes, 0777)
	if err != nil {
		return "", trace.Wrap(err)
	}

	i.fixtures[id] = msg

	return fileName, nil
}

// getMaxID returns max ID in fixture index
func (i *FixtureIndex) getMaxID() int {
	max := 0

	for k := range i.fixtures {
		if k > max {
			max = k
		}
	}

	return max
}
