package main

import (
	"embed"
	"fmt"
	"os"
	"time"

	"github.com/gravitational/kingpin"
	"github.com/gravitational/teleport-plugin-framework/internal"
	_ "github.com/gravitational/teleport/api/types"
	"github.com/sirupsen/logrus"
)

var (
	pluginFrameworkName = fmt.Sprintf("WASM plugin framework app %v", Version)

	// We have to place it here because embed does not support relative names in paths

	//go:embed boilerplate/*
	//go:embed boilerplate/vendor/teleport/__proto.ts
	//go:embed fixtures/*
	//go:embed .eslintrc.json
	//go:embed .prettierrc
	//go:embed asconfig.json
	fs embed.FS

	//go:embed _tpl/*
	tpls embed.FS
)

// args represents cli args
type args struct {
	targetDir string

	// fixtures generate
	fixtureTemplate string
	fixtureName     string

	// test
	testConcurrency int
	fixturesPath    string
	binary          string
	timeout         time.Duration

	// new
	example string
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
	genTS := app.Command("gen-ts", "Regenerate ts files from a templates").Hidden()
	genMockTemplates := app.Command("gen-mock-templates", "Regenerate fixture templates").Hidden()

	new.Arg("dir", "Path to the new plugin").Required().StringVar(&args.targetDir)

	test.Flag("fixturesPath", "Fixtures directory").Default("fixtures").Short('f').StringVar(&args.fixturesPath)
	test.Flag("concurrency", "Run multiple concurrent test suites").Short('c').Default("1").IntVar(&args.testConcurrency)
	test.Flag("bin", "Binary file location").Default("build/test.wasm").Short('b').StringVar(&args.binary)
	test.Flag("timeout", "WASM method timeout").Default("2s").Short('t').DurationVar(&args.timeout)

	generateFixture.Flag("fixturesPath", "Path to fixtures directory").Short('f').Default("fixtures").StringVar(&args.fixturesPath)

	generateFixture.Arg("template", "Fixture template name (use `fixtures list-templates` to get a name)").
		Required().
		StringVar(&args.fixtureTemplate)

	generateFixture.Arg("name", "Fixture name").
		Required().
		StringVar(&args.fixtureName)

	new.Flag("example", "Start with example (check examples/ folder)").Default("dump").Short('e').StringVar(&args.example)

	switch kingpin.MustParse(app.Parse(os.Args[1:])) {
	case new.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()

		internal.GenerateBoilerplate(fs, args.targetDir, args.example)
	case test.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()

		internal.RunTests(log, args.binary, args.fixturesPath, args.timeout, args.testConcurrency)
	case generateFixture.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()

		internal.GenerateFixture(log, args.fixtureTemplate, args.fixtureName, args.fixturesPath)
	case listTemplates.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()

		internal.ListTemplates(log)
	case genTS.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()
		internal.GenTS(tpls)

	case genMockTemplates.FullCommand():
		fmt.Println(pluginFrameworkName)
		fmt.Println()
		internal.GenMockTemplates()
	}
}
