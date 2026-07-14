# Architecture

## Stack

Frontend:

- Next.js App Router, React, TypeScript.
- Tailwind CSS.
- shadcn/ui for accessible primitives where useful.
- Zustand for cart/checkout state.
- React Hook Form + Zod for checkout validation.
- `next/image` for optimized responsive images.
- `next/script` for deferred browser pixels.

Backend:

- Python FastAPI.
- Pydantic v2 schemas.
- SQLAlchemy 2.x async ORM.
- Alembic migrations.
- PostgreSQL database: `wazzen`.
- httpx for outbound webhook and CAPI requests.
- Docker image with startup migration command.

## Domains

- Frontend: `https://wazzen.shop`
- Backend API: `https://api.wazzen.shop`

Frontend calls the backend through `NEXT_PUBLIC_API_BASE_URL=https://api.wazzen.shop`.

## High-Level Flow

```text
Ad click
  -> frontend page
  -> browser pixel PageView/ViewContent
  -> product bundle CTA
  -> AddToCart browser event + optional server event
  -> cart drawer
  -> COD checkout popup
  -> InitiateCheckout browser/server event
  -> validated name + phone
  -> upsell screen 10-15s
  -> backend creates order
  -> Postgres order + order_items
  -> Google Sheets webhook
  -> Meta/TikTok/Snap CAPI Purchase
  -> thank-you page
```

## Frontend Routes

```text
/
/collections
/products/wazzen-foldable-windshield-umbrella
/products/wazzen-portable-tire-inflator
/products/wazzen-windshield-crack-repair-kit
/about
/contact
/thank-you
/privacy
/returns
/shipping
/terms
```

## Backend Endpoints

```text
GET  /health
GET  /products
POST /orders
POST /tracking/events
```

`POST /orders` is the main conversion endpoint. It must:

1. Validate order data.
2. Normalize and validate Saudi phone.
3. Calculate totals server-side from product IDs and offer quantities.
4. Store order in Postgres.
5. Send order row to Google Sheets webhook.
6. Send CAPI `Purchase` events when configured.
7. Return `order_id`, `order_number`, `total_sar`, and redirect-safe thank-you data.

## Database Model

Minimum tables:

- `products`
- `orders`
- `order_items`
- `tracking_events`
- `webhook_deliveries`

Products can be seeded by migration or startup seed script.

Orders must store:

- order number
- customer name
- normalized phone formats
- line items
- upsell accepted/declined
- subtotal, upsell total, final total
- source, UTM fields, click IDs
- browser event IDs for dedup
- client IP and user agent for CAPI
- sheet webhook status
- created timestamp

## Runtime Boundaries

Frontend owns:

- UI, cart drawer, bundle selection, checkout modal, upsell modal.
- Browser pixels.
- Capture UTM, `fbclid`, `fbc`, `fbp`, `ttclid`, `_ttp`, Snap click IDs/cookies when available.
- Generate event IDs and pass them to backend.

Backend owns:

- Price calculation.
- Phone normalization.
- Order persistence.
- Google Sheets delivery.
- CAPI hashing and server-side event delivery.
- Retry logging for external calls.

## Security

- Never expose CAPI tokens in frontend.
- CORS allow only `https://wazzen.shop` plus local dev origins.
- Rate-limit order submission by IP and phone.
- Store only the minimum needed customer data.
- Do not log raw phone numbers in production logs.
