# COTW Site Starter Plan

## Recommended stack

* Frontend: Next.js (TypeScript, App Router)
* Backend: Go
* Database: PostgreSQL
* Auth: JWT in HTTP-only cookies or server-side sessions
* Dev environment: Docker Compose
* Reverse proxy: Nginx or Caddy later if needed

## High-level architecture

### Frontend (Next.js)

Responsibilities:

* Landing page
* Login / register
* Challenge list and challenge details
* Scoreboard
* User profile
* Admin dashboard
* Announcements / writeups

### Backend (Go API)

Responsibilities:

* Authentication and authorization
* User and team management
* Challenge CRUD
* Flag submission and validation
* Scoring logic
* Leaderboard calculation
* Admin actions
* Audit logging

### Database (PostgreSQL)

Core data:

* users
* teams
* challenges
* submissions
* solves
* announcements
* seasons / events

## Suggested repo structure

### Option A: monorepo

```text
cotw/
  apps/
    web/            # Next.js frontend
    api/            # Go backend
  packages/
    types/          # shared API contracts or schemas if needed
  infra/
    docker/
    sql/
  docker-compose.yml
  README.md
```

### Frontend structure

```text
apps/web/
  app/
    page.tsx
    login/
    register/
    challenges/
    scoreboard/
    admin/
  components/
  lib/
  types/
  middleware.ts
```

### Backend structure

```text
apps/api/
  cmd/server/
    main.go
  internal/
    auth/
    users/
    teams/
    challenges/
    submissions/
    scoreboard/
    announcements/
    database/
    middleware/
    config/
  migrations/
  go.mod
```

## Core MVP features

### Phase 1

* User registration and login
* Challenge list page
* Challenge detail page
* Submit flag endpoint
* Dynamic scoreboard
* Basic admin dashboard
* Create/edit/archive challenges

### Phase 2

* Teams
* Challenge categories and difficulty tags
* Announcements
* Writeups after challenge closes
* Rate limiting and anti-bruteforce protections
* Better scoring rules

### Phase 3

* Seasons / weekly events
* Challenge file downloads
* Admin analytics
* Docker-backed hosted challenge metadata
* Discord integration

## Suggested API routes

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/logout`
* `GET /api/auth/me`

### Challenges

* `GET /api/challenges`
* `GET /api/challenges/:id`
* `POST /api/challenges/:id/submit`
* `POST /api/admin/challenges`
* `PATCH /api/admin/challenges/:id`
* `DELETE /api/admin/challenges/:id`

### Scoreboard

* `GET /api/scoreboard`
* `GET /api/scoreboard/users/:id`
* `GET /api/scoreboard/teams/:id`

### Teams

* `POST /api/teams`
* `GET /api/teams/:id`
* `POST /api/teams/:id/invite`

### Announcements

* `GET /api/announcements`
* `POST /api/admin/announcements`

## Database starter schema

### users

* id
* username
* email
* password_hash
* role
* created_at

### teams

* id
* name
* created_at

### team_members

* user_id
* team_id
* role

### challenges

* id
* title
* slug
* description
* category
* difficulty
* points
* flag_hash
* is_active
* opens_at
* closes_at
* created_at

### submissions

* id
* user_id
* challenge_id
* submitted_flag_hash_or_raw_temp
* is_correct
* submitted_at

### solves

* id
* user_id
* team_id
* challenge_id
* points_awarded
* solved_at

### announcements

* id
* title
* body
* published_at
* created_by

## Backend design notes

* Keep the Go API modular by feature, not by technical layer only.
* Start with plain `net/http` plus a small router like `chi`, or use Gin if you want speed of development.
* Use `sqlc` or `pgx` for database access.
* Add middleware for:

  * request logging
  * auth
  * admin authorization
  * rate limiting
  * panic recovery

## Frontend design notes

* Use Next.js App Router.
* Keep server/client boundaries clean.
* Use React Query or server actions depending on how you want data flow.
* Use shadcn/ui for quick admin dashboard components.

## Recommended first build order

1. Create monorepo folders
2. Initialize Next.js app
3. Initialize Go API
4. Add Docker Compose with Postgres
5. Add health check endpoint in Go
6. Connect Next.js to API
7. Build auth
8. Build challenge list/details
9. Build submissions
10. Build scoreboard
11. Build admin panel

## First concrete task

Set up the repo with:

* Next.js frontend
* Go backend
* PostgreSQL container
* one test route: `GET /api/health`
* one test frontend page that fetches backend health

## Nice-to-have later

* Discord OAuth
* per-event scoreboards
* hidden/unreleased challenges
* challenge attachments
* solve notifications
* admin audit logs
* containerized challenge deployment metadata

## Platform direction for open source use

### Product shape

Build this as a **single-tenant, self-hostable challenge platform** for clubs, teams, and student organizations.

Each deployment should support:

* custom branding
* configurable challenge categories
* feature flags
* scoring defaults
* event settings

Do not build multi-tenant first. One deployment = one organization.

### Config philosophy

Use configuration for:

* branding
* feature toggles
* scoring defaults
* event defaults
* site metadata

Use the database for:

* users
* teams
* challenges
* submissions
* solves
* announcements
* events
* writeups

### Suggested config file

Example `instance.yaml`:

```yaml
platform:
  name: "UNB Cyber Club"
  short_name: "UNBCyber"
  site_url: "http://localhost:3000"
  support_email: "cyber@unb.ca"
  timezone: "America/Moncton"

branding:
  hero_title: "Challenge of the Week"
  hero_subtitle: "Practice, learn, compete."
  logo_url: "/branding/logo.png"
  primary_color: "#0f172a"
  accent_color: "#22c55e"

features:
  enable_teams: true
  enable_announcements: true
  enable_writeups: true
  enable_public_scoreboard: true
  allow_public_registration: true

competition:
  mode: "ctf"
  categories:
    - web
    - crypto
    - pwn
    - reverse
    - osint
  scoring:
    type: "static"
    default_points: 100
  submissions:
    rate_limit_per_minute: 10
    flag_regex: "^flag\\{.*\\}$"
```

### Updated repo structure

```text
cotw-platform/
  apps/
    web/
    api/
  configs/
    default.yaml
    examples/
      unbcyber.yaml
      generic-club.yaml
  infra/
    docker/
    sql/
  docs/
  docker-compose.yml
  README.md
```

## Opinionated recommendation

Start simple. Do **not** overbuild challenge orchestration, distributed workers, or microservices at the beginning. Get a clean monorepo, one Go API, one Next app, Postgres, and one config file working first.

## Immediate implementation plan

### Step 1

Create the monorepo folders:

* `apps/web`
* `apps/api`
* `configs/examples`
* `infra/sql`
* `docs`

### Step 2

Bootstrap:

* Next.js app in `apps/web`
* Go API in `apps/api`
* Postgres in Docker Compose

### Step 3

Implement first working vertical slice:

* backend reads config file
* backend exposes `GET /api/health`
* backend exposes `GET /api/public/config`
* frontend fetches both and renders platform name + health status

### Step 4

After that, build in this order:

1. auth
2. challenge list
3. challenge detail
4. flag submit
5. scoreboard
6. admin challenge CRUD
7. announcements

## First concrete deliverable

A working local dev environment where someone can clone the repo, run Docker, and see:

* a branded homepage
* a health status from the Go backend
* values loaded from a club config file
