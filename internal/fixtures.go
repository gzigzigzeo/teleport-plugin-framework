package internal

import (
	"fmt"
	"os"

	"github.com/gravitational/teleport-plugin-framework/lib/wasm"
	"github.com/gravitational/trace"
	"github.com/sirupsen/logrus"
)

const (
	// directory containing fixtures
	fixturesDir = "fixtures"
)

// GenerateFixture generates fixture
func GenerateFixture(log logrus.FieldLogger, template string, name string) {
	index, err := wasm.NewFixtureIndex(fixturesDir)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	f, err := index.Add(template, name)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	fmt.Printf("Fixture generated: %v\n", f)
}

// ListTemplates prints a list of defined fixture templates
func ListTemplates(log logrus.FieldLogger) {
	b, err := wasm.NewTemplateBuilder()
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	templates, err := b.All()
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	for _, t := range templates {
		fmt.Printf("%40v - %v\n%42v%v\n\n", t.Name, t.Description, " ", fmt.Sprintf("%v fixtures generate %v <name>", os.Args[0], t.Name))
	}
}
