package internal

import (
	"embed"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path"
	"strings"

	"github.com/Masterminds/semver"
	"github.com/gravitational/trace"
)

var (
	// perms represents permissions for target directory
	perms os.FileMode = 0777
	// nodeVersionGte minimal node version
	nodeVersionGte = "16.13"
	// nodeVersionLt max node version
	nodeVersionLt = "19"
)

type Exceptions []string

func (e Exceptions) Has(a string) bool {
	for _, b := range e {
		if b == a {
			return true
		}
	}
	return false
}

// GenerateBoilerplate generates boilerplate setup for plugin framework
func GenerateBoilerplate(fs embed.FS, targetDir string, example string) {
	fmt.Println("[1] Checking node & yarn versions...")

	// Check node version
	out, err := exec.Command("node", "--version").Output()
	if err != nil {
		bail("node executable is not found in the system %v : %v", out, trace.Wrap(err))
	}

	ver := strings.TrimSpace(string(out))

	s := fmt.Sprintf("    - Found node %v", ver)
	if !checkVersion(ver, nodeVersionGte, nodeVersionLt) {
		bail("Node version %v is invalid: must be >= %v < %v. Please, use https://github.com/nvm-sh/nvm to install the required version.\n", ver, nodeVersionGte, nodeVersionLt)
	}

	fmt.Println(s)

	// Check yarn version
	out, err = exec.Command("yarn", "-version").Output()
	if err != nil {
		bail("yarn executable is not found in the system %v : %v", out, trace.Wrap(err))
	}

	fmt.Printf("    - Found yarn %v", string(out))

	// Create target directories
	fmt.Printf("[2] Writing files to %v...\n", targetDir)

	// Check if target directory exists
	_, err = os.Stat(targetDir)
	if !os.IsNotExist(err) {
		bail("Error: target directory exists. Please specify the new path which does not exist. %v", trace.Wrap(err))
	}

	// Write everything except boilerplate
	err = writeFS(fs, ".", targetDir, []string{"boilerplate"})
	if err != nil {
		bail("Error writing target directory %v : %v", targetDir, err)
	}

	// Write boilerplate to the root folder
	err = writeFS(fs, "boilerplate", targetDir, []string{})
	if err != nil {
		bail("Error writing target directory %v : %v", targetDir, err)
	}

	// Yarn install in target dir
	fmt.Printf("[4] Running yarn install in %v...\n\n", targetDir)

	cmd := exec.Command("yarn")
	cmd.Dir = targetDir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err = cmd.Run()
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	fmt.Println()

	fmt.Printf("[5] Copying terraform-plugin-framework binary %v.\n\n", targetDir)

	targetBinary := path.Join(targetDir, path.Base(os.Args[0]))
	err = cp(os.Args[0], targetBinary)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	err = os.Chmod(targetBinary, perms)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	if example != "" {
		err = initExample(example, targetDir)
		if err != nil {
			bail("%v", trace.Wrap(err))
		}

		fmt.Printf("Example %v copied...\n\n", example)
	}

	fmt.Printf("Now you can run: cd %v && yarn test\n\n", targetDir)

	// TODO: Replace with the actual docs
	fmt.Println("Please, check Teleport Plugin Framework documentation: https://goteleport.com/docs")

	fmt.Printf("Happy hacking!")

	fmt.Println()
}

func initExample(name string, targetDir string) error {
	assemblyDir := path.Join(targetDir, "examples", name, "assembly")
	targetAssemblyDir := path.Join(targetDir, "assembly")
	fixturesDir := path.Join(targetDir, "examples", name, "fixtures")
	targetFixturesDir := path.Join(targetDir, "fixtures")

	err := cpDir(assemblyDir, targetAssemblyDir, map[string]string{"../../..": ".."})
	if err != nil {
		return trace.Wrap(err)
	}

	err = cpDir(fixturesDir, targetFixturesDir, nil)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// cpDir copies directory content to target location on real fs, non-hierarchically
func cpDir(src, dst string, replacements map[string]string) error {
	entries, err := os.ReadDir(src)
	if err != nil {
		return trace.Wrap(err)
	}

	for _, entry := range entries {
		targetName := path.Join(dst, entry.Name())

		err = cp(path.Join(src, entry.Name()), targetName)
		if err != nil {
			return trace.Wrap(err)
		}

		if (replacements != nil) && (len(replacements) > 0) {
			content, err := os.ReadFile(targetName)
			if err != nil {
				return trace.Wrap(err)
			}

			for what, with := range replacements {
				content = []byte(strings.ReplaceAll(string(content), what, with))
			}

			err = os.WriteFile(targetName, content, perms)
			if err != nil {
				return trace.Wrap(err)
			}
		}
	}
	return nil
}

// cp copies src file to dst from local file system
func cp(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, in)
	if err != nil {
		return err
	}
	return out.Close()
}

// WriteFS writes filesystem piece from fs src directory to dst target path
func writeFS(fs embed.FS, src, dst string, skip Exceptions) error {
	err := os.MkdirAll(dst, perms)
	if err != nil {
		return trace.Wrap(err)
	}

	entries, err := fs.ReadDir(src)
	if err != nil {
		return trace.Wrap(err)
	}

	for _, entry := range entries {
		srcPath := path.Join(src, entry.Name())
		dstPath := path.Join(dst, entry.Name())

		if skip.Has(srcPath) {
			continue
		}

		if entry.IsDir() {
			err = writeFS(fs, srcPath, dstPath, skip)
			if err != nil {
				return trace.Wrap(err)
			}
			continue
		}

		b, err := fs.ReadFile(srcPath)
		if err != nil {
			return trace.Wrap(err)
		}

		err = os.WriteFile(dstPath, b, perms)
		if err != nil {
			return trace.Wrap(err)
		}
	}

	return nil
}

// checkVersion checks that a version is within the bounds
func checkVersion(version, gte, lt string) bool {
	cgte, err := semver.NewConstraint(fmt.Sprintf(">= %v", gte))
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	clt, err := semver.NewConstraint(fmt.Sprintf("< %v", lt))
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	v, err := semver.NewVersion(strings.TrimSpace(version))
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	return cgte.Check(v) && clt.Check(v)
}
