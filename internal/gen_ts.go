package internal

import (
	"bytes"
	"embed"
	"fmt"
	"os"
	"reflect"
	"sort"
	"strings"
	"text/template"

	"github.com/ettle/strcase"
	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/trace"
)

type payload struct {
	Type   string
	Const  string
	Method string
}

// GenTS generates the required boilerplate AssemblyScript files from the templates in _tpl folder
func GenTS(fs embed.FS) {
	fmt.Println("Generating AssemblyScript files...")

	eventTypes := proto.GetProperties(reflect.TypeOf(events.OneOf{})).OneofTypes
	eventNames := make([]string, 0, len(eventTypes))

	for k := range eventTypes {
		eventNames = append(eventNames, k)
	}

	sort.Strings(eventNames)

	p := make([]payload, len(eventNames))
	for n, name := range eventNames {
		cnst := strings.ReplaceAll(fmt.Sprintf("EVENT_%s_INDEX", strcase.ToSNAKE(name)), "X_11", "X11")

		p[n] = payload{
			Type:   name,
			Const:  cnst,
			Method: strcase.ToCamel(name),
		}
	}

	t, err := template.ParseFS(fs, "_tpl/*")
	if err != nil {
		bail("Failed to parse templates : %v", trace.Wrap(err))
	}

	var b bytes.Buffer

	err = t.ExecuteTemplate(&b, "handle_event.ts.tpl", p)
	if err != nil {
		bail("Failed to render template : %v", trace.Wrap(err))
	}

	err = os.WriteFile("boilerplate/vendor/handle_event.ts", b.Bytes(), perms)
	if err != nil {
		bail("Failed to write file : %v", trace.Wrap(err))
	}
}
