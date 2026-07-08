# Coding Rules for the AI Coder

## General

- Build only what is required for v1.
- Keep the code clean, typed, and easy to deploy.
- Do not hardcode secrets.
- Do not expose backend tokens in frontend.
- Use Arabic RTL as the default, not an afterthought.
- Prefer simple, reliable code over complex abstractions.

## Frontend Rules

- Use TypeScript everywhere.
- Use React Server Components by default in Next.js. Use client components only for cart, modals, forms, and tracking.
- Keep cart and checkout state in a small Zustand store.
- Use Zod schemas for form validation.
- Keep product seed data centralized in `data/products.ts`.
- Use semantic HTML.
- Make CTAs obvious and repeated, especially mobile sticky CTA on PDP.
- Do not import large animation libraries for simple transitions.

## Backend Rules

- Use Pydantic schemas for every request/response.
- Recalculate prices server-side.
- Normalize phone on backend even if frontend already did it.
- Use async database sessions.
- Use migrations, not manual SQL.
- Store external API failures without breaking order creation.
- Add tests for pricing, phone, and order validation.

## Tracking Rules

- Generate event IDs in frontend.
- Pass event IDs to browser pixels and backend.
- Hash PII only in backend for CAPI.
- Keep platform-specific phone normalization exact:
  - Meta: `9665XXXXXXXX`
  - TikTok: `+9665XXXXXXXX`
  - Snap: `9665XXXXXXXX`
- Do not load pixel scripts before the app is interactive.
- Never place CAPI access tokens in frontend code.

## Copy Rules

- Arabic copy must sound Saudi-friendly and premium.
- Speak to the buyer as a woman where natural.
- Do not exaggerate certifications or scientific claims.
- Use proof placeholders only until real proof exists.
- Keep every product page focused on one pain.

## UX Rules

- Product CTA adds selected offer and opens cart drawer.
- Cart drawer checkout CTA opens COD checkout modal.
- Checkout modal has only name and phone.
- Valid submit shows upsell for 10-15 seconds.
- After upsell accept/decline/timeout, submit order and redirect to thank-you.
- Cart cross-sells must be visible but not annoying.

## Done Criteria

The project is done when:

- `frontend` and `backend` run locally.
- Both have Dockerfiles.
- Backend migrations run on start.
- All pages exist.
- All 3 product pages work.
- Cart drawer, checkout popup, upsell, thank-you flow work.
- Orders are stored in Postgres.
- Orders are sent to Google Sheets.
- Env examples are complete.
- Pixel/CAPI integration is implemented behind env flags.
- Basic tests pass.
