# Deployment, Env, and Docker

## Deployment Target

Use EasyPanel:

- Frontend service: `wazzen-frontend`
- Backend service: `wazzen-backend`
- Existing Postgres service: `wazzen_database`

Public domains:

- `wazzen.shop` -> frontend
- `api.wazzen.shop` -> backend

## Frontend Docker

The frontend must include:

- `Dockerfile`
- `.dockerignore`
- `.env.example`
- production build command
- standalone or normal Next.js server deployment

Required env example:

```text
NEXT_PUBLIC_SITE_URL=https://wazzen.shop
NEXT_PUBLIC_API_BASE_URL=https://api.wazzen.shop
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_CODE=
NEXT_PUBLIC_SNAP_PIXEL_ID=
NEXT_PUBLIC_TRACKING_ENABLED=true
```

## Backend Docker

The backend must include:

- `Dockerfile`
- `.dockerignore`
- `docker-compose.yml` for local dev
- `.env.example`
- migration-on-start entrypoint

Required env example:

```text
APP_ENV=production
APP_NAME=WAZZEN API
FRONTEND_ORIGIN=https://wazzen.shop
DATABASE_URL=postgresql+asyncpg://wazzen:wazzen@wazzen_database:5432/wazzen
RUN_MIGRATIONS_ON_START=true
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
TRACKING_ENABLED=true
META_PIXEL_ID=
META_ACCESS_TOKEN=
TIKTOK_PIXEL_CODE=
TIKTOK_ACCESS_TOKEN=
SNAP_PIXEL_ID=
SNAP_ACCESS_TOKEN=
```

## Backend Startup Command

Use an entrypoint similar to:

```sh
#!/bin/sh
set -e

if [ "$RUN_MIGRATIONS_ON_START" = "true" ]; then
  alembic upgrade head
fi

exec uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## EasyPanel Notes

Backend:

- Internal port: `8000`.
- Health check: `/health`.
- Set `DATABASE_URL` to the internal database host:

```text
postgresql+asyncpg://wazzen:wazzen@wazzen_database:5432/wazzen
```

Frontend:

- Internal port depends on Dockerfile, usually `3000`.
- Set API base URL to `https://api.wazzen.shop`.

## CORS

Backend CORS allow list:

```text
https://wazzen.shop
https://www.wazzen.shop
http://localhost:3000
```

Do not allow wildcard CORS in production.

## GitHub Readiness

Repository must include:

- `frontend/README.md`
- `backend/README.md`
- `frontend/.env.example`
- `backend/.env.example`
- `.gitignore`
- Docker files
- migration files
- seed data
- clear setup commands

## Local Development

Suggested local commands:

```text
cd backend
docker compose up --build
```

```text
cd frontend
npm install
npm run dev
```

## Launch Checklist

- Frontend loads over HTTPS.
- Backend `/health` returns ok.
- `POST /orders` creates a DB row.
- Google Sheet receives a row.
- CAPI tokens are set only on backend.
- Browser pixels fire once.
- CAPI purchase dedups with browser purchase.
- Mobile checkout works in TikTok and Snapchat in-app browsers.
- Thank-you page appears after order.
