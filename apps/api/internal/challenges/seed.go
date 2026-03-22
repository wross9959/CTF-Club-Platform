package challenges

import (
	"context"
	"os"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"gopkg.in/yaml.v3"
)

func SeedFromFile(ctx context.Context, db *pgxpool.Pool, path string) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	var seedFile ChallengeSeedFile
	if err := yaml.Unmarshal(data, &seedFile); err != nil {
		return err
	}

	for _, c := range seedFile.Challenges {
		_, err := db.Exec(ctx, `
			INSERT INTO challenges (
				id, title, slug, description, category, difficulty, points, is_active, author, file_url, external_url
			)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
			ON CONFLICT (slug) DO NOTHING
		`,
			uuid.New().String(),
			c.Title,
			c.Slug,
			c.Description,
			c.Category,
			c.Difficulty,
			c.Points,
			c.IsActive,
			c.Author,
			c.FileURL,
			c.ExternalURL,
		)
		if err != nil {
			return err
		}
	}

	return nil
}