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

func (r *Repository) GetBySlug(ctx context.Context, slug string) (*Challenge, error) {
	row := r.DB.QueryRow(ctx, `
		SELECT id, title, slug, description, category, difficulty, points, is_active,
		       author, file_url, external_url, created_at, updated_at
		FROM challenges
		WHERE slug = $1
	`, slug)

	var c Challenge
	err := row.Scan(
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
	)
	if err != nil {
		return nil, err
	}

	return &c, nil
}

func (r *Repository) CheckFlag(ctx context.Context, slug string, submittedFlag string) (bool, error) {
	row := r.DB.QueryRow(ctx, `
		SELECT flag_hash
		FROM challenges
		WHERE slug = $1
	`, slug)

	var flagHash string
	if err := row.Scan(&flagHash); err != nil {
		return false, err
	}

	return HashFlag(submittedFlag) == flagHash, nil
}