package challenges

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	DB *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{DB: db}
}

func (r *Repository) List(ctx context.Context) ([]Challenge, error) {
	rows, err := r.DB.Query(ctx, `
		SELECT id, title, slug, description, category, difficulty, points, is_active, author, file_url, external_url, created_at, updated_at
		FROM challenges
		ORDER BY points ASC, title ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []Challenge

	for rows.Next() {
		var c Challenge
		if err := rows.Scan(
			&c.ID,
			&c.Title,
			&c.Slug,
			&c.Description,
			&c.Category,
			&c.Difficulty,
			&c.Points,
			&c.IsActive,
			&c.Author,
			&c.FileURL,
			&c.ExternalURL,
			&c.CreatedAt,
			&c.UpdatedAt,
		); err != nil {
			return nil, err
		}
		result = append(result, c)
	}

	return result, rows.Err()
}