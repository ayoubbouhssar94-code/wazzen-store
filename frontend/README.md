# WAZZEN Frontend

Next.js Arabic-first RTL ecommerce store for WAZZEN / وازن — premium car comfort products for Saudi Arabia.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS (IBM Plex Sans Arabic font)
- Zustand (cart state)
- React Hook Form + Zod (checkout validation)
- Lucide React (icons)

## Quick Start

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_API_BASE_URL and pixel IDs

npm install
npm run dev
```

App available at: `http://localhost:3000`

## Docker

```bash
docker build -t wazzen-frontend .
docker run -p 3000:3000 --env-file .env wazzen-frontend
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, products, proof, FAQ |
| `/collections` | All products collection page |
| `/products/titanium-silver-sunshade` | Sunshade PDP |
| `/products/premium-leather-gap-console` | Gap console PDP |
| `/products/hepa-car-vacuum` | Vacuum PDP |
| `/about` | About WAZZEN |
| `/contact` | WhatsApp + email contact |
| `/thank-you` | Post-order thank you page |
| `/privacy` | Privacy policy |
| `/returns` | Returns & replacement policy |
| `/shipping` | Shipping information |
| `/terms` | Terms & conditions |

## Conversion Flow

1. **Product page** → User selects bundle (1/2/3 pieces), clicks CTA
2. **AddToCart event** fired → Cart drawer opens
3. **Cart drawer** shows cross-sells → User clicks "تأكيد الطلب"
4. **Checkout modal** — name + KSA phone validation only (COD)
5. **Upsell modal** — 10-12 second countdown with discounted product at 99 SAR
6. **Order submitted** to backend → Thank-you redirect

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://wazzen.shop
NEXT_PUBLIC_API_BASE_URL=https://api.wazzen.shop
NEXT_PUBLIC_META_PIXEL_ID=          # Optional
NEXT_PUBLIC_TIKTOK_PIXEL_CODE=      # Optional
NEXT_PUBLIC_SNAP_PIXEL_ID=          # Optional
NEXT_PUBLIC_TRACKING_ENABLED=true
```

## Tracking

- **Browser pixels**: Meta, TikTok, Snapchat — loaded with `afterInteractive` strategy
- **Event IDs**: Generated frontend-side, passed to backend for CAPI deduplication
- **No CAPI tokens** in frontend — all server-side events handled by backend
- UTM params + click IDs persisted to `sessionStorage` on first visit

## Design System

| Token | Value |
|-------|-------|
| Primary | `#0F172A` Navy |
| CTA | `#10B981` Emerald |
| Accent | `#0EA5E9` Ice Blue |
| Scarcity | `#D97706` Sand Gold |
| Font | IBM Plex Sans Arabic |
