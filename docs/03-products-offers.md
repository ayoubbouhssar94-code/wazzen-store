# Products, Offers, and AOV

## Product Catalog

### 1. WAZZEN Windshield Crack Repair Kit

SKU: `WAZ-GLS-CRK01`  
Slug: `wazzen-windshield-crack-repair-kit`  
Arabic name: `عدة وازن لإصلاح شقوق ونقر الزجاج الأمامي`  
Short card heading: `لا تؤجل النقرة الصغيرة`  
Card subheading: `عدة إصلاح ريزن للنقر المناسبة قبل أن تتمدد وتكلفك أكثر.`  
Primary pain: suitable small windshield chips or micro-cracks that may spread.  
Emotion: urgency, savings, control.  
Mechanism: resin injector, curing films, and clear suitability instructions.

### 2. WAZZEN Foldable Windshield Sun Umbrella

SKU: `WAZ-UMB-FLD01`  
Slug: `wazzen-foldable-windshield-umbrella`  
Arabic name: `مظلة وازن القابلة للطي للزجاج الأمامي`  
Short card heading: `ظل فوري لزجاج سيارتك الأمامي`  
Card subheading: `مظلة زجاج أمامي عملية تطوى بسرعة وتخفف الإحساس بحرارة المقصورة.`  
Primary pain: direct sun exposure while parked.  
Emotion: relief, comfort, convenience.  
Mechanism: reflective layer, umbrella-style quick fold, compact storage.

### 3. WAZZEN Portable Smart Tire Inflator

SKU: `WAZ-AIR-PT01`  
Slug: `wazzen-portable-tire-inflator`  
Arabic name: `منفاخ وازن المحمول الذكي للإطارات`  
Short card heading: `ضغط الإطار الصحيح بضغطة واحدة`  
Card subheading: `منفاخ ذكي يقيس الضغط وينفخ حتى الرقم المحدد مع توقف تلقائي.`  
Primary pain: low tire pressure before a commute or trip.  
Emotion: preparedness, control, safety.  
Mechanism: digital pressure reading, target preset, automatic stop, compact body.

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

- If cart has the foldable umbrella, recommend the crack repair kit and tire inflator.
- If cart has the tire inflator, recommend the foldable umbrella and crack repair kit.
- If cart has the crack repair kit, recommend the foldable umbrella and tire inflator.
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

- Main cart contains foldable umbrella only -> upsell tire inflator.
- Main cart contains tire inflator only -> upsell foldable umbrella.
- Main cart contains crack repair kit only -> upsell tire inflator.
- Cart contains foldable umbrella + tire inflator -> upsell crack repair kit.
- Cart contains foldable umbrella + crack repair kit -> upsell tire inflator.
- Cart contains tire inflator + crack repair kit -> upsell foldable umbrella.
- Cart contains all three -> upsell one additional foldable umbrella or crack repair kit depending on available margin.

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
