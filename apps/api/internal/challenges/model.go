package challenges

import "time"

type Challenge struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Slug        string    `json:"slug"`
	Description string    `json:"description"`
	Category    string    `json:"category"`
	Difficulty  string    `json:"difficulty"`
	Points      int       `json:"points"`
	IsActive    bool      `json:"is_active"`
	Author      string    `json:"author"`
	FileURL     string    `json:"file_url"`
	ExternalURL string    `json:"external_url"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}