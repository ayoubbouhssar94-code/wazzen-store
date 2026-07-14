# AI Coder Prompt

Copy this prompt into the AI coding agent that will build the website.

```text
You are building WAZZEN / وازن, a premium Arabic-first COD ecommerce store for Saudi Arabia.

Read every file in the docs folder before coding:

- docs/README.md
- docs/01-architecture.md
- docs/02-brand-positioning-icp.md
- docs/03-products-offers.md
- docs/04-frontend-spec.md
- docs/05-backend-spec.md
- docs/06-cro-page-sections.md
- docs/07-design-system.md
- docs/08-tracking-pixels-capi.md
- docs/09-google-sheets-webhook.md
- docs/10-deployment-env-docker.md
- docs/11-coding-rules.md
- docs/sheet-template.csv
- docs/product-catalog.csv
- docs/google-apps-script-webhook.js

Deliver two production-ready folders:

frontend/
backend/

Frontend requirements:

- Use Next.js App Router, React, TypeScript, Tailwind CSS.
- Arabic-first with html lang="ar" dir="rtl".
- Use the WAZZEN design system from docs/07-design-system.md.
- Build pages: home, collections, 3 product pages, about, contact, thank-you, privacy, returns, shipping, terms.
- Build header with circular W mark, Arabic logo وازن, English wazzen below/near it, menu, and cart.
- Build product cards and PDPs for:
  1. Nano-Titanium Windshield Umbrella / مظلة وازن النانو-تيتانيوم الحرارية للزجاج الأمامي
  2. WAZZEN AirSafe Auto-Stop Tire Inflator / منفاخ وازن AirSafe الذكي للإطارات بإيقاف تلقائي
  3. WAZZEN GlassGuard Windshield Chip System / نظام وازن GlassGuard لإصلاح نقر الزجاج الأمامي
- Each product has offers:
  - 1 piece = 199 SAR
  - 2 pieces = 279 SAR
  - 3 pieces = 349 SAR
- Default selected offer is 2 pieces.
- Product CTA adds selected offer to cart and opens cart drawer.
- Cart drawer shows current items, total, and cross-sells for products not in cart.
- Cart checkout CTA opens a COD checkout popup.
- Checkout popup has only name and KSA mobile number.
- Validate KSA mobile numbers and show Arabic errors.
- Valid submit opens a 10-15 second one-time upsell at 99 SAR.
- Accept adds upsell to order. Decline or timeout continues without upsell.
- Submit final order to backend and redirect to thank-you.
- Use placeholder images/components where real images are missing.
- Include deferred browser pixels for Meta, TikTok, and Snapchat behind env flags.
- Generate event IDs in frontend and reuse them for browser pixels and backend CAPI dedup.
- Provide frontend Dockerfile, .dockerignore, README, and .env.example.

Backend requirements:

- Use Python FastAPI, Pydantic v2, SQLAlchemy async, asyncpg, Alembic, httpx.
- Use Postgres database named wazzen.
- Database URL in EasyPanel will be:
  postgresql+asyncpg://wazzen:wazzen@wazzen_database:5432/wazzen
- Build endpoints:
  - GET /health
  - GET /products
  - POST /orders
  - POST /tracking/events if needed
- Add DB models for products, orders, order_items, tracking_events, webhook_deliveries.
- Add migrations and run alembic upgrade head on backend start when RUN_MIGRATIONS_ON_START=true.
- Seed the 3 products.
- POST /orders must validate KSA phone, recalculate totals server-side, store order, send Google Sheets webhook, and send CAPI Purchase events when env tokens are configured.
- Hash PII server-side for CAPI:
  - Meta phone hash input: 9665XXXXXXXX
  - TikTok phone hash input: +9665XXXXXXXX
  - Snap phone hash input: 9665XXXXXXXX
- Use same event IDs from frontend for browser/server dedup.
- Never expose CAPI access tokens to frontend.
- Provide backend Dockerfile, docker-compose.yml, README, .env.example, migrations, and tests for phone/pricing/order validation.

Google Sheets:

- Use docs/google-apps-script-webhook.js as the Apps Script webhook.
- Use docs/sheet-template.csv as the Sheet columns.
- Backend env GOOGLE_SHEETS_WEBHOOK_URL and GOOGLE_SHEETS_WEBHOOK_SECRET control delivery.

Deployment:

- Frontend domain: https://wazzen.shop
- Backend domain: https://api.wazzen.shop
- EasyPanel services must be Docker-ready.
- Backend CORS should allow wazzen.shop, www.wazzen.shop, and localhost dev only.

Quality bar:

- Responsive and fast on mobile.
- Premium branded look, not a dropshipping template.
- Saudi Arabic copy, emotional selling, proof/authority sections, social proof placeholders, and clear COD trust.
- No fake certification claims. Use safe proof language until real certificates/assets exist.
- Keep code clean, typed, and deployable.
```
