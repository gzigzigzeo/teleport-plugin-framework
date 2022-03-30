package internal

import (
	"fmt"
	"os"
)

// bail prints the error message and exits
func bail(message string, args ...interface{}) {
	fmt.Println()
	fmt.Println(fmt.Sprintf(message, args...))
	os.Exit(-1)
}
