package http

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/wross9959/CTF-Club-Platform/internal/challenges"
	"github.com/wross9959/CTF-Club-Platform/internal/auth"
	"github.com/wross9959/CTF-Club-Platform/internal/config"
)
func NewRouter(ctg *config.Config, dbPool *pgxpool.Pool) http.Handler {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
	}))

	authRepo := auth.NewRepository(dbPool)
	authHandler := auth.NewHandler(authRepo)
	authMiddleware := auth.Middleware(authRepo)

	challengeRepo := challenges.NewRepository(dbPool)
	challengeHandler := challenges.NewHandler(challengeRepo)

	r.Get("/api/health", func(w http.ResponseWriter, r *http.Request) {
		_ = json.NewEncoder(w).Encode(map[string]string{
			"status": "ok",
		})
	})

	r.Get("/api/public/config", func(w http.ResponseWriter, r *http.Request) {
		_ = json.NewEncoder(w).Encode(map[string]any{
			"platform": map[string]any{
				"name":          ctg.Platform.Name,
				"short_name":    ctg.Platform.ShortName,
				"site_url":      ctg.Platform.SiteURL,
				"support_email": ctg.Platform.SupportEmail,
				"timezone":      ctg.Platform.Timezone,
			},
			"branding": map[string]any{
				"hero_title":       ctg.Branding.HeroTitle,
				"hero_subtitle":    ctg.Branding.HeroSubtitle,
				"logo_url":         ctg.Branding.LogoURL,
				"primary_color":    ctg.Branding.PrimaryColor,
				"accent_color":     ctg.Branding.AccentColor,
				"background_color": ctg.Branding.BackgroundColor,
				"foreground_color": ctg.Branding.ForegroundColor,
			},
		})
	})

	r.Post("/api/auth/register", authHandler.Register)
	r.Post("/api/auth/login", authHandler.Login)
	r.Post("/api/auth/logout", authHandler.Logout)

	r.Group(func(protected chi.Router) {
		protected.Use(authMiddleware)
		protected.Get("/api/auth/me", authHandler.Me)
		protected.Post("/api/challenges/{slug}", challengeHandler.GetChallengeBySlug)
	})

	r.Get("/api/challenges", challengeHandler.ListChallenges)
	

	return r
}