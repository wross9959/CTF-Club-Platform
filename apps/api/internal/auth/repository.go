package auth

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	DB *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{DB: db}
}

func (r *Repository) CreateUser(ctx context.Context, username, email, passwordHash string) (*User, error) {
	user := &User{
		ID:           uuid.New().String(),
		Username:     username,
		Email:        email,
		Role:         "user",
		PasswordHash: passwordHash,
	}

	_, err := r.DB.Exec(ctx, `
		INSERT INTO users (id, username, email, password_hash, role)
		VALUES ($1, $2, $3, $4, $5)
	`, user.ID, user.Username, user.Email, user.PasswordHash, user.Role)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *Repository) GetUserByEmailOrUsername(ctx context.Context, value string) (*User, error) {
	row := r.DB.QueryRow(ctx, `
		SELECT id, username, email, password_hash, role, created_at
		FROM users
		WHERE email = $1 OR username = $1
	`, value)

	var user User
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
		&user.CreatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *Repository) GetUserByID(ctx context.Context, id string) (*User, error) {
	row := r.DB.QueryRow(ctx, `
		SELECT id, username, email, password_hash, role, created_at
		FROM users
		WHERE id = $1
	`, id)

	var user User
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
		&user.CreatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &user, nil
}