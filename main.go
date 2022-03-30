package main

import (
	"embed"
	"fmt"
	"os"

	"github.com/gravitational/kingpin"
	"github.com/gravitational/teleport-plugin-framework/internal"
	_ "github.com/gravitational/teleport/api/types"
	"github.com/sirupsen/logrus"
)

var (
	pluginFrameworkName = fmt.Sprintf("WASM plugin framework app %v", Version)

	// We have to place it here because embed does not support relative names in paths

	//go:embed boilerplate/*
	//go:embed fixtures/*
	//go:embed .eslintrc.json
	//go:embed .prettierrc
	//go:embed asconfig.json
	fs embed.FS
)

// args represents cli args
type args struct {
	targetDir       string
	fixtureTemplate string
	fixtureName     string
}

func main() {
	log := logrus.StandardLogger()

	app := kingpin.New("plugin-framework", pluginFrameworkName)
	args := &args{}

	new := app.Command("new", "Generate plugin boilerplate")
	test := app.Command("test", "Run test suite")
	fixtures := app.Command("fixtures", "Fixtures")
	generateFixture := fixtures.Command("generate", "Generate fixture")
	listTemplates := fixtures.Command("list-templates", "List fixture templates")

	new.Arg("dir", "Path to the new plugin").
		Required().
		StringVar(&args.targetDir)

	generateFixture.Arg("template", "Fixture template name (use `fixtures list-templates` to get a name)").
		Required().
		StringVar(&args.fixtureTemplate)

	generateFixture.Arg("name", "Fixture name").
		Required().
		StringVar(&args.fixtureName)

	switch kingpin.MustParse(app.Parse(os.Args[1:])) {
	case new.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()

		internal.GenerateBoilerplate(fs, args.targetDir)
	case test.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()

		internal.RunTests(log)
	case generateFixture.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()

		internal.GenerateFixture(log, args.fixtureTemplate, args.fixtureName)
	case listTemplates.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()

		internal.ListTemplates(log)
	}
}
