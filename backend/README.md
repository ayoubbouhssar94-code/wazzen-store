# WAZZEN Backend API

FastAPI backend for the WAZZEN Arabic-first COD ecommerce store.

## Stack

- Python 3.12 + FastAPI
- PostgreSQL (database: `wazzen`)
- SQLAlchemy 2.x async ORM
- Alembic migrations (run on startup)
- httpx for outbound requests (Google Sheets, Meta/TikTok/Snap CAPI)

## Quick Start (Docker)

```bash
cp .env.example .env
# Edit .env with your credentials

docker compose up --build
```

API available at: `http://localhost:8000`  
Docs (dev only): `http://localhost:8000/docs`

## Quick Start (Local)

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit DATABASE_URL to point to your local Postgres

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /health/db | DB connectivity |
| GET | /products | List active products |
| POST | /orders | Create COD order |
| POST | /tracking/events | Log tracking event |

## Environment Variables

See `.env.example` for all required and optional variables.

Key variables:
- `DATABASE_URL` — PostgreSQL async connection string
- `GOOGLE_SHEETS_WEBHOOK_URL` — Apps Script webhook URL
- `META_PIXEL_ID` + `META_ACCESS_TOKEN` — Meta CAPI
- `TIKTOK_PIXEL_CODE` + `TIKTOK_ACCESS_TOKEN` — TikTok Events API
- `SNAP_PIXEL_ID` + `SNAP_ACCESS_TOKEN` — Snap CAPI

## Migrations

Migrations run automatically on startup when `RUN_MIGRATIONS_ON_START=true`.

To run manually:
```bash
alembic upgrade head
```

## Tests

```bash
pytest tests/ -v
```

## Order Flow

1. Frontend sends `POST /orders` with customer name, phone, and cart items
2. Backend validates and normalizes KSA phone number
3. Recalculates prices server-side (never trusts frontend prices)
4. Creates order number: `WZ-YYYYMMDD-NNNNNN`
5. Stores order + line items in Postgres
6. Sends row to Google Sheets via webhook
7. Sends CAPI Purchase events to Meta/TikTok/Snap
8. Returns order details to frontend for thank-you redirect

## Phone Normalization

Accepts: `05XXXXXXXX`, `5XXXXXXXX`, `9665XXXXXXXX`, `+9665XXXXXXXX`

Returns:
- `local`: `05XXXXXXXX`
- `e164`: `+9665XXXXXXXX`
- `digits`: `9665XXXXXXXX` (used for CAPI hashing)
