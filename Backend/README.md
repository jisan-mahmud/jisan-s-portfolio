# Portfolio Backend

Django REST Framework backend for the Jisan Mahmud portfolio website. All portfolio content is managed from Django admin and exposed through a public read-only API. Codeforces and LeetCode statistics are proxied and cached by the backend.

## Tech stack

- Python 3.12, Django 6, Django REST Framework
- Django Unfold for the portfolio admin interface
- PostgreSQL in Docker, SQLite automatically for local development
- Redis cache (in-memory fallback when `REDIS_CACHE_URL` is empty)
- drf-spectacular Swagger / ReDoc
- Docker, Docker Compose, uv

## Architecture

The backend is split into domain apps under `apps/`. Each app owns its models, migrations, admin, serializers, selectors, views, URLs, signals, and tests.

| App | Responsibility |
| --- | --- |
| `apps/core` | Site profile, social links, attached files, cache helpers, home aggregation, health |
| `apps/about` | About stats, paragraphs, interests |
| `apps/resume` | Experience, education, and inline highlights |
| `apps/skills` | Skill categories and skills |
| `apps/projects` | Projects, tags, tech, features, case studies, filtering |
| `apps/integrations` | Cached Codeforces and LeetCode proxy services |

`config/api_urls.py` composes the app routers under the existing public API paths. Domain apps only depend on `apps.core.cache` for invalidation; `apps.core.services` composes the aggregated home response.

## Quick start (local, SQLite)

```bash
cd Backend
cp .env.example .env
uv sync
uv run python manage.py migrate
uv run python manage.py seed_portfolio
uv run python manage.py createsuperuser
uv run python manage.py runserver 8007
```

- API: <http://localhost:8007/api/v1/portfolio/home/>
- Swagger: <http://localhost:8007/api/docs/>
- Admin: <http://localhost:8007/admin/>

## Docker

Use `.env.docker.example` for Docker. Do not use `.env.example`, which defaults to SQLite for non-Docker development.

```bash
cp .env.docker.example .env.local
docker compose -f docker-compose.local.yaml up --build
docker compose exec web python manage.py seed_portfolio
docker compose exec web python manage.py createsuperuser
```

Production: `docker compose up --build` (port `8007`).

To use Neon or another hosted PostgreSQL provider, set `DATABASE_URL` to the provider's connection string in your local ignored environment file or deployment secrets. The connection string takes precedence over `POSTGRES_*`; keep it private and do not commit it. `django-database-url` parses the URL and passes PostgreSQL connection options such as `sslmode` and `channel_binding` through to Django.

To store uploaded media in Cloudflare R2, set all five `R2_*` variables in your deployment environment. `R2_PUBLIC_DOMAIN` should be the public bucket hostname without `https://`. When the full configuration is present, Django stores uploaded images in R2 and serves their URLs from that domain; without any R2 values, local filesystem media storage remains enabled. Partial R2 configuration fails Django startup with an explicit error. Static files continue to use the existing Django/WhiteNoise storage and are not uploaded to R2.

## Environment

See `.env.example` (local) and `.env.docker.example` (Docker). Important values:

| Variable | Purpose |
| --- | --- |
| `DJANGO_SECRET_KEY` | Django secret key |
| `DEBUG` | Debug mode |
| `ALLOWED_HOSTS` | Comma-separated hosts |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins |
| `CSRF_TRUSTED_ORIGINS` | Comma-separated trusted origins for admin/forms |
| `DATABASE_URL` | Optional PostgreSQL connection URL parsed by `django-database-url`; takes precedence over `POSTGRES_*` |
| `POSTGRES_*` | PostgreSQL connection fields when `DATABASE_URL` is empty; leave `POSTGRES_DB` empty for SQLite |
| `REDIS_URL` | Redis connection URL (supports `rediss://` for TLS); empty for local memory cache |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_DOMAIN` | Optional Cloudflare R2 credentials, bucket, and public hostname for uploaded media; configure all five together |
| `PORTFOLIO_CACHE_TTL` / `PORTFOLIO_CACHE_VERSION` | Home cache lifetime and version |
| `CODEFORCES_HANDLE` / `LEETCODE_USERNAME` | Default integration handles |
| `INTEGRATION_TIMEOUT` | External request timeout in seconds |
| `INTEGRATION_CACHE_TTL` / `INTEGRATION_STALE_TTL` | Fresh and stale integration cache lifetimes |
| `SERVE_MEDIA` | Serve uploaded media directly from Django |
| `LOG_LEVEL` / `APP_LOG_LEVEL` | Root and app logging levels |

## API

### Portfolio — `/api/v1/portfolio/`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `home/` | Aggregated homepage payload |
| GET | `profile/` | Profile, socials, hero skills |
| GET | `about/` | Stats, paragraphs, interests |
| GET | `experience/` | Experience timeline |
| GET | `education/` | Education timeline |
| GET | `technologies/` | Skill categories |
| GET | `projects/` | Published projects (`featured`, `tag`, `search` query params) |
| GET | `projects/<slug>/` | Project detail with features and case study |

### Integrations — `/api/v1/integrations/`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `codeforces/` or `codeforces/<handle>/` | Cached Codeforces profile + contests |
| GET | `leetcode/` or `leetcode/<username>/` | Cached LeetCode profile + problem tags |

### Utility

| Endpoint | Description |
| --- | --- |
| `/health/` | Database and cache health |
| `/api/schema/` | OpenAPI schema |
| `/api/docs/` | Swagger UI |
| `/api/redoc/` | ReDoc |

## Managing content

Everything can be edited in Django admin:

- **Dashboard** — published and draft project counts, active resume entries, skill categories, and quick links
- **Navigation** — searchable sidebar grouped around site settings, portfolio content, and access
- **Site profile** — identity, bios, avatar, resume, availability, integration handles
- **Projects** — images, links, tags, tech, features, case study
- **Experience / Education** — searchable, ordered entries with inline highlights
- **Skill categories** — ordered skills with icon keys, editable directly within their category
- **About** — stats, paragraphs, interests
- **Social links**

The admin uses a responsive Unfold theme with dark mode, inline status/order editing, and access-aware navigation and dashboard summaries.

The `seed_portfolio` command imports the bundled portfolio content and images from `seed_assets/`. It is idempotent and can be re-run safely.

Home responses are cached and invalidated automatically on model saves, deletes, and project tag/tech changes. Use `PORTFOLIO_CACHE_VERSION` to invalidate the cache during deploys.

## Tests

```bash
uv run python manage.py test
```

Tests live beside each app. `apps/core/tests` covers the aggregated home response and cache invalidation; project, resume, skill, about, and integration apps cover their own API behavior and query budgets.
