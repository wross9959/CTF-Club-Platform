package challenges

import (
	"crypto/sha256"
	"encoding/hex"
	"strings"
)

func HashFlag(flag string) string {
	sum := sha256.Sum256([]byte(strings.TrimSpace(flag)))
	return hex.EncodeToString(sum[:])
}