package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/wross9959/CTF-Club-Platform/internal/challenges"
	appconfig "github.com/wross9959/CTF-Club-Platform/internal/config"
	"github.com/wross9959/CTF-Club-Platform/internal/database"
	apphttp "github.com/wross9959/CTF-Club-Platform/internal/http"
)

func main() {
	configPath := os.Getenv("APP_CONFIG")
	if configPath == "" {
		configPath = "../../configs/default.yaml"
	}

	cfg, err := appconfig.Load(configPath)
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	dbPool, err := database.NewPool()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	seedPath := os.Getenv("CHALLENGE_SEED_PATH")
	if seedPath != "" {
		if err := challenges.SeedFromFile(context.Background(), dbPool, seedPath); err != nil {
			log.Fatalf("failed to seed challenges: %v", err)
		}
	}

	router := apphttp.NewRouter(cfg, dbPool)

	addr := ":8080"
	log.Printf("starting server on %s", addr)
	log.Fatal(http.ListenAndServe(addr, router))
}