# Frontend Spec

## Framework

Use Next.js App Router with TypeScript.

Recommended packages:

- `next`
- `react`
- `typescript`
- `tailwindcss`
- `zod`
- `react-hook-form`
- `@hookform/resolvers`
- `zustand`
- `lucide-react`
- `clsx`
- `tailwind-merge`
- `class-variance-authority`
- `shadcn/ui`

## App Requirements

- Arabic-first and RTL.
- Use `<html lang="ar" dir="rtl">`.
- Responsive from 360px mobile to desktop.
- Fast loading on TikTok/Snap in-app browsers.
- Use static/local product data first. Backend can expose products too, but do not block page rendering on API.
- All CTAs must be touch-friendly.
- Product image areas must use sample placeholders until real images are provided.

## Suggested Folder Structure

```text
frontend/
  app/
    layout.tsx
    page.tsx
    collections/page.tsx
    products/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
    thank-you/page.tsx
    privacy/page.tsx
    returns/page.tsx
    shipping/page.tsx
    terms/page.tsx
  components/
    brand/
    cart/
    checkout/
    layout/
    product/
    sections/
    tracking/
    ui/
  data/
    products.ts
    reviews.ts
  lib/
    api.ts
    cart.ts
    events.ts
    phone.ts
    tracking.ts
    utils.ts
  public/
    images/placeholders/
```

## Header

Layout in RTL:

- Right side: circular `W` mark in brand color.
- Next to it: Arabic logo `وازن`, below/near it small English `wazzen`.
- Menu links: الرئيسية، المنتجات، من نحن، تواصل معنا.
- Cart icon with item count.

Desktop: logo right, menu center, cart left.  
Mobile: logo right, cart left, hamburger if needed.

## Cart State

Use Zustand store:

- items
- addBundle(productId, quantity, price)
- addCrossSell(productId)
- addUpsell(productId)
- removeItem
- updateQuantity
- clearCart
- openCart/closeCart
- openCheckout/closeCheckout

Every PDP CTA must:

1. Add the selected offer to cart.
2. Fire browser `AddToCart` event with generated event ID.
3. Open cart drawer immediately.

## Checkout Popup

Fields:

- `name`
- `phone`

Validation:

- Name: at least 2 visible words or at least 3 Arabic/Latin letters.
- Phone: accept KSA mobile only.

Valid phone inputs:

- `05XXXXXXXX`
- `5XXXXXXXX`
- `9665XXXXXXXX`
- `+9665XXXXXXXX`

Normalize for backend:

- local display: `05XXXXXXXX`
- E.164: `+9665XXXXXXXX`
- digits for Meta/Snap hashing: `9665XXXXXXXX`

Form CTA:

`تأكيد الطلب - الدفع عند الاستلام`

After valid form submit:

1. Open upsell modal.
2. Start 10-15 second countdown.
3. If accepted, add upsell at `99 SAR`.
4. If declined or timer expires, continue.
5. Submit final order to backend.
6. Redirect to `/thank-you?order=ORDER_NUMBER`.

## API Client

Use `NEXT_PUBLIC_API_BASE_URL`.

`POST /orders` payload must include:

- customer name
- phone raw and normalized
- cart line items
- upsell item if accepted
- final total shown
- UTM parameters
- click IDs/cookies
- browser event IDs
- landing page
- current URL
- user agent

Backend must recalculate totals and not trust frontend totals.

## Performance

- Use `next/image` for all images.
- Use responsive image sizes.
- Defer all third-party scripts using `next/script` with `afterInteractive` or load pixels only after consent/interaction if implemented.
- Keep the main hero light.
- Avoid large animation libraries in v1.
- Use CSS transitions and small client components.

## Accessibility

- Buttons must be real `<button>` elements.
- Modals must trap focus or use accessible primitives.
- Form errors must be visible in Arabic.
- Color contrast must pass basic accessibility.

## Required Components

- `Header`
- `Footer`
- `TrustStrip`
- `ProductCard`
- `OfferSelector`
- `CartDrawer`
- `CheckoutModal`
- `UpsellModal`
- `ReviewStars`
- `ProofBadges`
- `SectionImagePlaceholder`
- `TrackingProvider`

## Placeholder Images

Create simple placeholder cards or gradient blocks with Arabic labels:

- `صورة المنتج`
- `فيديو تجربة العميل`
- `قبل / بعد`
- `اختبار الحرارة`

The layout must be ready for real product photos and UGC videos later.
