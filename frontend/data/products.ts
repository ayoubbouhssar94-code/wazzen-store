export type ProductOffer = {
  qty: 1 | 2 | 3;
  label: string;
  benefit: string;   // what the client gains — shown below the label
  badge?: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  headlineAr: string;
  subheadingAr: string;
  cardHeadingAr: string;
  cardSubAr: string;
  painAr: string;
  mechanismAr: string[];
  offers: ProductOffer[];
  crossSellIds: string[];
  ratingValue: string;
  ratingCount: string;
  color: string;
};

export const OFFER_PRICES: Record<1 | 2 | 3, number> = { 1: 199, 2: 279, 3: 349 };
export const UPSELL_PRICE = 99;
export const UPSELL_BUNDLE_PRICE = 149;

export const products: Product[] = [
  {
    id: "titanium-silver-sunshade",
    slug: "titanium-silver-sunshade",
    nameAr: "مظلة التيتانيوم الفضية العاكسة ضد حرارة الـ 70 درجة",
    nameEn: "Titanium Silver Sunshade",
    headlineAr: "مقود بارد من أول لمسة — في أشد يوم حر",
    subheadingAr: "سطح فضي عاكس يساعد على تقليل امتصاص الحرارة ويحافظ على سيارتك.",
    cardHeadingAr: "ودّع حرارة المقود وقت الظهر",
    cardSubAr: "مظلة عاكسة تساعد على حماية المقود والمقاعد والديكور من الشمس الحادة.",
    painAr: "شمس السعودية ما ترحم: مقود حار، مقاعد تحرق، وديكور يتعب مع الوقت. مظلة وازن العاكسة تساعد تخفف التعرض المباشر للشمس وتحافظ على راحة السيارة وقت الوقوف.",
    mechanismAr: [
      "سطح فضي عاكس يساعد على تقليل امتصاص الحرارة",
      "تصميم ينفتح وينطوي بسرعة بدون أدوات",
      "تحمي المقود والطبلون من الشمس المباشرة",
      "تخزين سهل داخل الباب أو الدرج",
    ],
    offers: [
      {
        qty: 1,
        label: "احمِ سيارتك من الشمس",
        benefit: "مقود بارد ومقاعد لا تحرق — تفرق من أول يوم",
        price: 199,
      },
      {
        qty: 2,
        label: "أنت وشخص تحبه — وفر 119 ريال",
        benefit: "هدية عملية لأحد عزيز أو للسيارة الثانية",
        badge: "الأكثر اختياراً",
        price: 279,
      },
    ],
    crossSellIds: ["premium-leather-gap-console", "hepa-car-vacuum"],
    ratingValue: "4.8",
    ratingCount: "+1,200 طلب",
    color: "#0EA5E9",
  },
  {
    id: "premium-leather-gap-console",
    slug: "premium-leather-gap-console",
    nameAr: "حشوة الجلد الفاخر للسيارة ضد ضياع الجوال والفوضى",
    nameEn: "Premium PU Leather Gap Console",
    headlineAr: "الجوال ما يضيع بين المقاعد مرة ثانية",
    subheadingAr: "حشوة جلد فاخرة تسد الفراغ وتضيف مساحة مرتبة لكل ما تحتاجه.",
    cardHeadingAr: "جوالك ومفاتيحك في مكانها دائماً",
    cardSubAr: "حشوة جلد فاخرة تسد الفراغ وتضيف مساحة عملية بدون تركيب معقد.",
    painAr: "لحظة وحدة يطيح الجوال أو المفتاح بين المقعد والكونسول، وتبدأ الفوضى. حشوة وازن تسد الفراغ وتضيف مساحة مرتبة للأشياء اللي تحتاجها كل يوم.",
    mechanismAr: [
      "جلد PU فاخر يعطي شكل مرتب واحترافي",
      "يسد الفراغ بين المقعد والكونسول بالكامل",
      "مكان عملي للجوال والمفاتيح والبطاقات",
      "تركيب سريع بدون أدوات في أقل من دقيقة",
    ],
    offers: [
      {
        qty: 1,
        label: "رتّب سيارتك من اليوم",
        benefit: "جوالك ومفاتيحك في مكانها — لا فوضى أبداً",
        price: 199,
      },
      {
        qty: 2,
        label: "للسيارتين أو هدية مضمونة — وفر 119 ريال",
        benefit: "الثانية للعائلة أو الاستبدال المجاني",
        badge: "الأكثر اختياراً",
        price: 279,
      },
    ],
    crossSellIds: ["titanium-silver-sunshade", "hepa-car-vacuum"],
    ratingValue: "4.8",
    ratingCount: "+980 طلب",
    color: "#D97706",
  },
  {
    id: "hepa-car-vacuum",
    slug: "hepa-car-vacuum",
    nameAr: "مكنسة الفلتر الذكي اللاسلكية ضد الغبار والرمل العميق",
    nameEn: "High-Suction HEPA Car Vacuum",
    headlineAr: "الرمل والغبار ما يحتاجون مغسلة كل مرة",
    subheadingAr: "مكنسة لاسلكية بفلتر HEPA لتنظيف سريع وفعّال لكل تفاصيل السيارة.",
    cardHeadingAr: "نظافة سريعة من الرمل والغبار",
    cardSubAr: "مكنسة لاسلكية بفلتر HEPA لتنظيف الرمل والفتات والغبار من تفاصيل السيارة.",
    painAr: "بعد مشوار، أطفال، بحر، أو غبار، السيارة تتعب بسرعة. مكنسة وازن اللاسلكية تساعدك تنظف التفاصيل الصغيرة بسرعة وتحافظ على شكل السيارة من الداخل.",
    mechanismAr: [
      "لاسلكية وخفيفة — سهلة التخزين في أي مكان",
      "فلتر HEPA يساعد على حبس الغبار الناعم",
      "رأس مناسب للزوايا وبين المقاعد الضيقة",
      "شحن USB سريع — تعمل بدون كابلات",
    ],
    offers: [
      {
        qty: 1,
        label: "نظّف سيارتك بدون مغسلة",
        benefit: "سيارة نظيفة في دقيقتين — بدون كهرباء ولا خرطوم",
        price: 199,
      },
      {
        qty: 2,
        label: "للسيارة والبيت معاً — وفر 119 ريال",
        benefit: "واحدة في السيارة وواحدة في المنزل دائماً جاهزة",
        badge: "الأكثر اختياراً",
        price: 279,
      },
    ],
    crossSellIds: ["titanium-silver-sunshade", "premium-leather-gap-console"],
    ratingValue: "4.9",
    ratingCount: "+750 طلب",
    color: "#10B981",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCrossSells(productId: string): Product[] {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products.filter((p) => product.crossSellIds.includes(p.id));
}

/** Returns up to 2 upsell products (all products the customer hasn't ordered yet). */
export function getUpsellProducts(cartIds: string[]): Product[] {
  const allIds = [
    "titanium-silver-sunshade",
    "premium-leather-gap-console",
    "hepa-car-vacuum",
  ];
  return allIds
    .filter((id) => !cartIds.includes(id))
    .slice(0, 2)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}
