# Products, Offers, and AOV

## Product Catalog

### 1. Titanium-Silver Sunshade Umbrella

Slug: `titanium-silver-sunshade`  
Arabic name: `مظلة التيتانيوم الفضية العاكسة ضد حرارة الـ 70 درجة`  
Short card heading: `ودّعي حرارة السيارة وقت الظهر`  
Card subheading: `مظلة عاكسة تساعد على حماية المقود، المقاعد، والديكور من الشمس الحادة.`  
Primary pain: burning cabin heat.  
Emotion: relief, protection, comfort for family.  
Mechanism: reflective titanium-silver surface, umbrella-style quick fold, compact storage.

### 2. Premium PU Leather Gap Console

Slug: `premium-leather-gap-console`  
Arabic name: `حشوة الجلد الفاخر للسيارة ضد ضياع الجوال والفوضى`  
Short card heading: `خلي جوالك ومفاتيحك بمكانها`  
Card subheading: `حشوة جلد فاخرة تسد الفراغ وتضيف مساحة عملية بدون تركيب معقد.`  
Primary pain: lost phone, clutter, unsafe searching while driving.  
Emotion: order, calm, confidence.  
Mechanism: premium PU leather, gap-fill fit, storage slots.

### 3. High-Suction HEPA Car Vacuum

Slug: `hepa-car-vacuum`  
Arabic name: `مكنسة الفلتر الذكي اللاسلكية ضد الغبار والرمل العميق`  
Short card heading: `نظافة سريعة من الرمل والغبار`  
Card subheading: `مكنسة لاسلكية بفلتر HEPA لتنظيف الرمل، الفتات، والغبار من تفاصيل السيارة.`  
Primary pain: sand, dust, crumbs, dirty interior.  
Emotion: satisfaction, pride, cleanliness.  
Mechanism: cordless suction, HEPA filter, compact car storage.

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

- If cart has sunshade, recommend gap console and vacuum.
- If cart has gap console, recommend sunshade and vacuum.
- If cart has vacuum, recommend sunshade and gap console.
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

- Main cart contains sunshade only -> upsell gap console.
- Main cart contains gap console only -> upsell sunshade.
- Main cart contains vacuum only -> upsell gap console.
- Cart contains sunshade + gap console -> upsell vacuum.
- Cart contains sunshade + vacuum -> upsell gap console.
- Cart contains gap console + vacuum -> upsell sunshade.
- Cart contains all three -> upsell one additional sunshade or vacuum depending on highest margin.

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
