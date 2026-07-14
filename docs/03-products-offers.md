# Products, Offers, and AOV

## Product Catalog

### 1. Nano-Titanium Windshield Umbrella

SKU: `WAZ-UMB-NT01`  
Slug: `nano-titanium-windshield-umbrella`  
Arabic name: `مظلة وازن النانو-تيتانيوم الحرارية للزجاج الأمامي`  
Short card heading: `حاجز سريع بين سيارتك وشمس الظهر`  
Card subheading: `مظلة نانو-تيتانيوم تنفتح بثوانٍ وتساعد على تقليل تسخين المقود والطبلون.`  
Primary pain: direct sun exposure while parked.  
Emotion: relief, protection, convenience.  
Mechanism: reflective nano-titanium layer, umbrella-style quick fold, padded tip, compact storage.

### 2. WAZZEN AirSafe Auto-Stop Tire Inflator

SKU: `WAZ-AIR-AS01`  
Slug: `wazzen-airsafe-tire-inflator`  
Arabic name: `منفاخ وازن AirSafe الذكي للإطارات بإيقاف تلقائي`  
Short card heading: `ضغط الإطار الصحيح بضغطة واحدة`  
Card subheading: `يقيس الضغط وينفخ حتى القيمة التي تحددها ثم يتوقف تلقائياً.`  
Primary pain: low tire pressure before a commute or trip.  
Emotion: preparedness, control, safety.  
Mechanism: digital pressure reading, target preset, automatic stop, emergency light.

### 3. WAZZEN GlassGuard Windshield Chip System

SKU: `WAZ-GLS-GG01`  
Slug: `wazzen-glassguard-chip-system`  
Arabic name: `نظام وازن GlassGuard لإصلاح نقر الزجاج الأمامي`  
Short card heading: `لا تترك نقرة صغيرة تتحول لمشكلة أكبر`  
Card subheading: `نظام حقن يساعد على ملء النقر المناسبة وتقليل وضوحها والحد من تمددها.`  
Primary pain: suitable small windshield chips that may spread.  
Emotion: urgency, savings, control.  
Mechanism: resin injector, curing films, and clear eligibility instructions.

## Bundle Pricing

Each product uses the same offer ladder:

```text
1 piece  = 199 SAR
2 pieces = 279 SAR
3 pieces = 349 SAR
```

Default selected offer on PDP: `2 pieces = 279 SAR` because it lifts AOV while feeling like the smart value.

Offer labels:

- 1 piece: `قطعة واحدة`
- 2 pieces: `قطعتين - الأكثر اختياراً`
- 3 pieces: `3 قطع - وفر أكثر للعائلة`

## Product Card Requirements

Each product card must include:

- Image placeholder.
- Arabic product name.
- Short benefit headline.
- Star rating placeholder: `★★★★★ 4.8 | +1,200 طلب`
- Price ladder teaser: `ابتداءً من 199 ريال`
- Scarcity line: `كمية محدودة`
- CTA: `اختاري العرض`

Use placeholder review counts until real numbers are available. Mark seed data clearly in code as demo content.

## Cross-Sell Rules

In product pages and cart drawer:

- If cart has the umbrella, recommend AirSafe and GlassGuard.
- If cart has AirSafe, recommend the umbrella and GlassGuard.
- If cart has GlassGuard, recommend the umbrella and AirSafe.
- Cross-sells before checkout are not discounted. Use the normal 1-piece price of `199 SAR`.

Cart drawer cross-sell copy:

- `كمّلي حماية سيارتك`
- `ينطلب كثير مع هذا المنتج`
- `إضافة للسلة - 199 ريال`

## One-Time Upsell Rules

After valid checkout form submit, show a 10-15 second upsell before final order submission or before final thank-you redirect.

Upsell price: `99 SAR`  
This is the only discounted product placement in the store.

Recommended upsell mapping:

- Main cart contains umbrella only -> upsell AirSafe.
- Main cart contains AirSafe only -> upsell umbrella.
- Main cart contains GlassGuard only -> upsell AirSafe.
- Cart contains umbrella + AirSafe -> upsell GlassGuard.
- Cart contains umbrella + GlassGuard -> upsell AirSafe.
- Cart contains AirSafe + GlassGuard -> upsell umbrella.
- Cart contains all three -> upsell one additional umbrella or GlassGuard depending on available margin.

Upsell copy:

```text
عرض خاص قبل تأكيد الطلب
أضيفي [اسم المنتج] لطلبك الآن بـ 99 ريال فقط.
هذا السعر يظهر مرة واحدة قبل إرسال الطلب.
```

Buttons:

- Accept: `إضافة للطلب بـ 99 ريال`
- Decline: `لا شكراً، تأكيد طلبي`

## AOV Targets

Target AOV:

- Minimum acceptable: `279 SAR`
- Strong: `349-448 SAR`
- Excellent: `500+ SAR`

Implementation must make the 2-piece and 3-piece offers visually stronger than the 1-piece offer.
