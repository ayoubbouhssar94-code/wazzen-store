# WAZZEN Store Build Docs

Brand: `وازن / WAZZEN`  
Domains: `wazzen.shop` and `api.wazzen.shop`  
Market: Saudi Arabia, Arabic-first, COD-only DTC ecommerce  
Database: PostgreSQL database named `wazzen`

## Build Goal

Build a premium branded DTC store that sells high-priced car comfort/protection products to Saudi women and family buyers through Snapchat, TikTok, and AI/UGC video traffic. The site must feel like WAZZEN owns and engineers the products, not like a generic dropshipping store.

The conversion system is:

1. Arabic RTL homepage and product pages create trust, emotion, authority, and proof.
2. Product page CTA adds selected bundle offer to cart and opens cart drawer.
3. Cart drawer shows cross-sells and a COD checkout CTA.
4. Checkout popup collects only name and Saudi phone number.
5. Valid checkout triggers a 10-15 second one-time upsell at `99 SAR`.
6. Order is stored in Postgres and sent to Google Sheets through a webhook.
7. Thank-you page sets delivery expectations to increase COD confirmation and delivery.

## Required Output Folders

The AI coder must deliver:

```text
frontend/
backend/
docs/
```

Both `frontend` and `backend` must be Docker-ready, production-ready, and deployable on EasyPanel or similar hosting.

## Docs Index

- `01-architecture.md` - system architecture, data flow, folders, domain split.
- `02-brand-positioning-icp.md` - positioning, ICP, emotional angles, Saudi dialect copy.
- `03-products-offers.md` - products, bundles, prices, cross-sell/upsell rules.
- `04-frontend-spec.md` - Next.js frontend implementation requirements.
- `05-backend-spec.md` - FastAPI backend implementation requirements.
- `06-cro-page-sections.md` - homepage, collection, PDP, about, contact, footer.
- `07-design-system.md` - colors, typography, RTL layout, image placeholders.
- `08-tracking-pixels-capi.md` - Meta, TikTok, Snapchat pixel/CAPI requirements.
- `09-google-sheets-webhook.md` - Apps Script webhook and sheet behavior.
- `10-deployment-env-docker.md` - Docker, EasyPanel, env vars, migrations.
- `11-coding-rules.md` - standards for the AI coder.
- `12-ai-coder-prompt.md` - copy/paste prompt for the implementation agent.

CSV/template files:

- `sheet-template.csv` - Google Sheet columns.
- `product-catalog.csv` - product catalog seed data.
- `google-apps-script-webhook.js` - paste into Google Apps Script for the Sheet webhook.

## Non-Negotiables

- Arabic is the primary language. Use `lang="ar"` and `dir="rtl"`.
- COD only. No payment gateway in v1.
- Phone validation must only accept valid KSA mobile numbers.
- Browser pixels must be deferred/lazy enough not to hurt speed.
- CAPI must hash PII server-side before sending to ad platforms.
- Browser and server events must share event IDs for deduplication.
- Do not claim real certifications unless the merchant provides proof. Use careful wording such as "مواد مختبرة" and "مطابق لمتطلبات الجودة عند توفر الشهادات".
- The store must feel premium, trustworthy, and Saudi-local.
