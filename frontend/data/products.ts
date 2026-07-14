export type ProductOffer = {
  qty: 1 | 2 | 3;
  label: string;
  benefit: string;   // what the client gains — shown below the label
  badge?: string;
  price: number;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  /** Real product photo served from /public/products */
  image: string;
  /** How the photo should fill its frame on cards and PDP */
  imageFit?: "cover" | "contain";
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
    id: "wazzen-windshield-crack-repair-kit",
    sku: "WAZ-GLS-CRK01",
    slug: "wazzen-windshield-crack-repair-kit",
    image: "/products/wazzen-glassguard-chip-system.png",
    imageFit: "contain",
    nameAr: "عدة وازن لإصلاح شقوق ونقر الزجاج الأمامي",
    nameEn: "WAZZEN Windshield Crack Repair Kit",
    headlineAr: "عالج النقرة المناسبة قبل أن تتحول إلى شرخ أكبر",
    subheadingAr: "عدة إصلاح منزلية عملية تساعد على ملء النقر المناسبة وتقليل وضوحها.",
    cardHeadingAr: "لا تؤجل النقرة الصغيرة",
    cardSubAr: "عدة إصلاح ريزن للنقر المناسبة قبل أن تتمدد وتكلفك أكثر.",
    painAr: "حصاة صغيرة على الطريق قد تترك نقرة مزعجة في الزجاج. مع الحرارة والاهتزاز، النقرة قد تتمدد وتتحول لشرخ أكبر وتكلفة أعلى. عدة WAZZEN Crack Repair Kit تعطيك تدخل سريع للنقر المناسبة قبل تفاقم المشكلة.",
    mechanismAr: [
      "محقن ريزن يساعد على تعبئة مسارات النقرة المناسبة",
      "شرائح معالجة لتسوية سطح الإصلاح بعد الحقن",
      "خطوات واضحة للاستخدام المنزلي خلال دقائق",
      "مناسب للنقر الصغيرة المحددة وليس للشروخ الطويلة أو العميقة",
    ],
    offers: [
      {
        qty: 1,
        label: "عدة إصلاح واحدة",
        benefit: "ابدأ علاج النقرة المناسبة قبل أن تتمدد",
        price: 199,
      },
      {
        qty: 2,
        label: "عدتان — وفر 119 ريال",
        benefit: "لإصلاح إضافي أو للاحتفاظ بواحدة في السيارة الثانية",
        badge: "الأكثر اختياراً",
        price: 279,
      },
      {
        qty: 3,
        label: "3 عدد — وفر 248 ريال",
        benefit: "للعائلة أو أكثر من سيارة بأفضل قيمة",
        price: 349,
      },
    ],
    crossSellIds: ["wazzen-foldable-windshield-umbrella", "wazzen-portable-tire-inflator"],
    ratingValue: "4.8",
    ratingCount: "+860 طلب",
    color: "#D97706",
  },
  {
    id: "wazzen-foldable-windshield-umbrella",
    sku: "WAZ-UMB-FLD01",
    slug: "wazzen-foldable-windshield-umbrella",
    image: "/products/nano-titanium-windshield-umbrella.png",
    imageFit: "contain",
    nameAr: "مظلة وازن القابلة للطي للزجاج الأمامي",
    nameEn: "WAZZEN Foldable Windshield Sun Umbrella",
    headlineAr: "افتحها بثوانٍ وقلل حرارة المقود والطبلون وقت الوقوف",
    subheadingAr: "تصميم مظلة سريع مع طبقة عاكسة لتخفيف أثر الشمس المباشرة داخل السيارة.",
    cardHeadingAr: "ظل فوري لزجاج سيارتك الأمامي",
    cardSubAr: "مظلة زجاج أمامي عملية تطوى بسرعة وتخفف الإحساس بحرارة المقصورة.",
    painAr: "ترجع لسيارتك بعد الظهر وتلقى المقود والمقاعد شديدي السخونة. الأغطية التقليدية مزعجة في التركيب والتخزين. مظلة WAZZEN القابلة للطي تنفتح بسرعة وتوفر حاجزاً يومياً عملياً من الشمس المباشرة.",
    mechanismAr: [
      "هيكل مظلة مرن يفتح ويغلق بسرعة بدون ألواح كبيرة",
      "طبقة عاكسة تساعد على تقليل تعرض المقصورة للشمس المباشرة",
      "تصميم مدمج سهل التخزين في باب السيارة أو الدرج",
      "طرف مبطن لتقليل الاحتكاك أثناء التثبيت",
    ],
    offers: [
      {
        qty: 1,
        label: "مظلة واحدة",
        benefit: "حماية يومية سريعة أثناء الوقوف تحت الشمس",
        price: 199,
      },
      {
        qty: 2,
        label: "مظلتان — وفر 119 ريال",
        benefit: "واحدة لكل سيارة أو هدية عملية",
        badge: "الأكثر اختياراً",
        price: 279,
      },
      {
        qty: 3,
        label: "3 مظلات — وفر 248 ريال",
        benefit: "مثالية للعائلة أو أكثر من سيارة",
        price: 349,
      },
    ],
    crossSellIds: ["wazzen-windshield-crack-repair-kit", "wazzen-portable-tire-inflator"],
    ratingValue: "4.8",
    ratingCount: "+1,180 طلب",
    color: "#0EA5E9",
  },
  {
    id: "wazzen-portable-tire-inflator",
    sku: "WAZ-AIR-PT01",
    slug: "wazzen-portable-tire-inflator",
    image: "/products/wazzen-airsafe-tire-inflator.png",
    imageFit: "cover",
    nameAr: "منفاخ وازن المحمول الذكي للإطارات",
    nameEn: "WAZZEN Portable Smart Tire Inflator",
    headlineAr: "حدد الضغط المطلوب واترك الجهاز يكمل المهمة تلقائياً",
    subheadingAr: "منفاخ رقمي محمول للسيارة والدراجة مع قراءة ضغط واضحة وملحقات متعددة.",
    cardHeadingAr: "لا تبحث عن محطة هواء بعد اليوم",
    cardSubAr: "منفاخ ذكي يقيس الضغط وينفخ حتى الرقم المحدد مع توقف تلقائي.",
    painAr: "تنبيه ضغط منخفض قبل السفر أو أثناء الطريق يعطل خطتك ويزيد التوتر. منفاخ WAZZEN المحمول يعطيك حل سريع في مكانك: قِس الضغط، حدد الهدف، ودع الجهاز ينفخ حتى القيمة المطلوبة.",
    mechanismAr: [
      "شاشة رقمية تعرض الضغط الحالي والقيمة المستهدفة",
      "إيقاف تلقائي عند الوصول للضغط الذي تحدده — بدون تخمين",
      "أوضاع PSI وBAR وKPA لمختلف الاستخدامات",
      "ملحقات للسيارة والدراجة والكرات مع تصميم سهل الحمل",
    ],
    offers: [
      {
        qty: 1,
        label: "جهاز AirSafe واحد",
        benefit: "خله في الشنطة ليكون جاهزاً عند انخفاض الضغط",
        price: 199,
      },
      {
        qty: 2,
        label: "جهازان — وفر 119 ريال",
        benefit: "واحد لكل سيارة أو هدية عملية للعائلة",
        badge: "الأكثر اختياراً",
        price: 279,
      },
      {
        qty: 3,
        label: "3 أجهزة — وفر 248 ريال",
        benefit: "استعداد لثلاث سيارات بأفضل قيمة",
        price: 349,
      },
    ],
    crossSellIds: ["wazzen-foldable-windshield-umbrella", "wazzen-windshield-crack-repair-kit"],
    ratingValue: "4.8",
    ratingCount: "+980 طلب",
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
    "wazzen-windshield-crack-repair-kit",
    "wazzen-foldable-windshield-umbrella",
    "wazzen-portable-tire-inflator",
  ];
  return allIds
    .filter((id) => !cartIds.includes(id))
    .slice(0, 2)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}
