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
	nodeVersionLt = "17"
)

// GenerateBoilerplate generates boilerplate setup for plugin framework
func GenerateBoilerplate(fs embed.FS, targetDir string) {
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
	fmt.Printf("[2] Creating target directory structure: %v, %v/assembly, %v/vendor\n", targetDir, targetDir, targetDir)

	_, err = os.Stat(targetDir)
	if !os.IsNotExist(err) {
		bail("Error: target directory exists. Please specify the new path which does not exist. %v", trace.Wrap(err))
	}

	err = os.MkdirAll(targetDir, perms)
	if err != nil {
		bail("Error: failed to create target directory. %v", trace.Wrap(err))
	}

	err = os.MkdirAll(path.Join(targetDir, "assembly"), perms)
	if err != nil {
		bail("Error: failed to create target directory. %v", trace.Wrap(err))
	}

	err = os.MkdirAll(path.Join(targetDir, "vendor"), perms)
	if err != nil {
		bail("Error: failed to create target directory. %v", trace.Wrap(err))
	}

	err = os.MkdirAll(path.Join(targetDir, "fixtures"), perms)
	if err != nil {
		bail("Error: failed to create target directory. %v", trace.Wrap(err))
	}

	// Write target files
	fmt.Printf("[3] Writing template files\n")

	writeDirFromFS(fs, targetDir, "boilerplate/assembly", "assembly")
	writeDirFromFS(fs, targetDir, "boilerplate/vendor", "vendor")
	writeDirFromFS(fs, targetDir, "fixtures", "fixtures")

	writeFileFromFS(fs, targetDir, "boilerplate/package.json", "package.json")
	writeFileFromFS(fs, targetDir, "boilerplate/tsconfig.json", "tsconfig.json")
	writeFileFromFS(fs, targetDir, ".prettierrc", ".prettierrc")
	writeFileFromFS(fs, targetDir, "asconfig.json", "asconfig.json")
	writeFileFromFS(fs, targetDir, ".eslintrc.json", ".eslintrc.json")
	writeFileFromFS(fs, targetDir, "boilerplate/gitignore", ".gitignore")

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

	fmt.Printf("Now you can run: cd %v && yarn test\n\n", targetDir)

	// TODO: Replace with the actual docs
	fmt.Println("Please, check Teleport Plugin Framework documentation: https://goteleport.com/docs")

	fmt.Printf("Happy hacking!")

	fmt.Println()
}

// cp copies src file to dst
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

// writeDirFromFS copies directory from embedded fs to target directory on disk
func writeDirFromFS(fs embed.FS, targetDir, srcPath, targetPath string) {
	files, err := fs.ReadDir(srcPath)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	for _, f := range files {
		writeFileFromFS(fs, targetDir, path.Join(srcPath, f.Name()), path.Join(targetPath, f.Name()))
	}
}

// writeFileFromFS copies file from embedded fs to target directory on disk
func writeFileFromFS(fs embed.FS, targetDir, srcPath, targetPath string) {
	b, err := fs.ReadFile(srcPath)
	if err != nil {
		bail("%v", trace.Wrap(err))
	}

	err = os.WriteFile(path.Join(targetDir, targetPath), b, perms)
	if err != nil {
		bail("Error writing target file: %v : %v", srcPath, trace.Wrap(err))
	}
}
