# Design System

## Brand Feel

Premium, calm, engineered, Saudi-local. The design should feel like protection from heat and dust, not a discount gadget store.

## Color Palette

Primary:

- Midnight Navy: `#0F172A`
- Deep Navy: `#111827`

Cooling accent:

- Ice Blue: `#0EA5E9`
- Pale Ice: `#E0F2FE`

CTA:

- Trust Emerald: `#10B981`
- CTA Hover: `#059669`

Premium neutral:

- Warm White: `#FFFDF8`
- Slate Background: `#F8FAFC`
- Border: `#E2E8F0`
- Text: `#0F172A`
- Muted Text: `#64748B`

Scarcity/accent:

- Sand Gold: `#D97706`
- Soft Gold Background: `#FEF3C7`

## Usage Rules

- Use Emerald only for primary conversion CTAs.
- Use Ice Blue for proof/science icons and cooling highlights.
- Use Navy for header/footer and premium cards.
- Avoid red except form errors.
- Use generous whitespace.
- Cards should have soft borders, subtle shadows, and rounded corners.

## Typography

Recommended Arabic fonts:

- Primary: `IBM Plex Sans Arabic`
- Alternative: `Tajawal`

Logo text:

- Arabic `وازن`: use a heavier elegant Arabic font weight.
- English `wazzen`: small lowercase, spaced slightly.

Font loading:

- Use `next/font/google` if allowed.
- Use display swap.

## Logo/Header Spec

Header mark:

- Circle size: `40-48px` desktop, `36-40px` mobile.
- Background: `#0F172A` or Ice Blue gradient.
- Letter inside: uppercase `W` in white.

Text:

```text
وازن
wazzen
```

Arabic larger, English smaller below.

## Layout

Desktop:

- Max content width: `1180-1280px`.
- Sections use 2 columns when useful.
- Alternate product proof sections:
  - Section 1: text right, image left.
  - Section 2: image right, text left.

Mobile:

- Single column.
- Sticky bottom CTA on PDP.
- Cart drawer full-width or 92vw.
- Checkout modal full-width bottom sheet style.

## Components

Buttons:

- Primary: Emerald background, white text, strong rounded corners.
- Secondary: white background, navy border/text.
- Tertiary: link-style navy text.

Cards:

- Rounded `2xl`.
- Border `#E2E8F0`.
- Soft shadow.
- Top badge for "الأكثر اختياراً" or "كمية محدودة".

Offer selector:

- 3 stacked cards on mobile.
- 3 columns on desktop.
- Default selected: 2 pieces.
- Highlight with Emerald border and "الأكثر اختياراً".

Trust badges:

- Small icon + 1-line text.
- Use Ice Blue or Pale Ice backgrounds.

## Placeholder Image Style

Until real images exist:

- Use clean gradient blocks.
- Include Arabic labels.
- Do not use broken image icons.
- Make placeholders aspect-ratio accurate:
  - Hero: `4:3` or `1:1`.
  - PDP proof: `16:9`.
  - Product card: `1:1`.

Example placeholder labels:

- `صورة المنتج الرئيسية`
- `لقطة قبل / بعد`
- `تجربة عميلة`
- `تفاصيل المواد`

## Microcopy Style

Errors:

- `اكتبي الاسم الكامل`
- `رقم الجوال لازم يكون رقم سعودي صحيح مثل 05XXXXXXXX`

Success:

- `تمت إضافة العرض للسلة`
- `طلبك جاهز للتأكيد`

Trust:

- `بدون دفع الآن`
- `الدفع عند الاستلام`
- `تأكيد سريع عبر التواصل`

## Motion

Use subtle motion only:

- Cart drawer slide.
- Modal fade/scale.
- CTA hover.
- Countdown progress for upsell.

Avoid heavy parallax or large animation libraries.
