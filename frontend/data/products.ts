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
    id: "nano-titanium-windshield-umbrella",
    sku: "WAZ-UMB-NT01",
    slug: "nano-titanium-windshield-umbrella",
    image: "/products/nano-titanium-windshield-umbrella.png",
    imageFit: "cover",
    nameAr: "مظلة وازن النانو-تيتانيوم الحرارية للزجاج الأمامي",
    nameEn: "Nano-Titanium Windshield Umbrella",
    headlineAr: "افتحها بثوانٍ — ودّع حرارة المقود وقت الظهر",
    subheadingAr: "طبقة نانو-تيتانيوم عاكسة وتصميم مظلة سريع يناسب معظم السيارات.",
    cardHeadingAr: "ودّع حرارة المقود وقت الظهر",
    cardSubAr: "مظلة نانو-تيتانيوم تنفتح بثوانٍ وتعكس الشمس عن المقود والطبلون والمقاعد.",
    painAr: "تقف سيارتك تحت شمس الظهر ساعات، وترجع لتجد المقود والطبلون يحرقان يدك. الألواح الكبيرة مزعجة في الطي والتخزين. مظلة وازن تنفتح كالمظلة خلال ثوانٍ وتصنع حاجزاً عاكساً يقلل وصول الحرارة المباشرة للداخل.",
    mechanismAr: [
      "طبقة نانو-تيتانيوم عاكسة تقلل وصول الإشعاع المباشر للداخل",
      "هيكل مظلة مرن ينفتح ويُطوى خلال ثوانٍ — بدون ألواح كبيرة",
      "طرف مبطن يقلل احتكاك المقبض بالطبلون والشاشة",
      "جراب مدمج يدخل في باب السيارة أو الدرج",
    ],
    offers: [
      {
        qty: 1,
        label: "مظلة لسيارتك",
        benefit: "حماية يومية سريعة للمقود والطبلون وقت الوقوف",
        price: 199,
      },
      {
        qty: 2,
        label: "مظلتان — وفر 119 ريال",
        benefit: "للسيارة الثانية أو هدية عملية لأحد أفراد العائلة",
        badge: "الأكثر اختياراً",
        price: 279,
      },
      {
        qty: 3,
        label: "3 مظلات — وفر 248 ريال",
        benefit: "غطِ سيارات العائلة بسعر القطعة الأفضل",
        price: 349,
      },
    ],
    crossSellIds: ["wazzen-glassguard-chip-system", "wazzen-airsafe-tire-inflator"],
    ratingValue: "4.8",
    ratingCount: "+1,200 طلب",
    color: "#0EA5E9",
  },
  {
    id: "wazzen-glassguard-chip-system",
    sku: "WAZ-GLS-GG01",
    slug: "wazzen-glassguard-chip-system",
    image: "/products/wazzen-glassguard-chip-system.png",
    imageFit: "contain",
    nameAr: "نظام وازن GlassGuard لإصلاح نقر الزجاج الأمامي",
    nameEn: "WAZZEN GlassGuard Windshield Chip System",
    headlineAr: "عالج النقرة المناسبة قبل أن تتمدد إلى شرخ أكبر",
    subheadingAr: "نظام حقن ريزن عملي للنقر النجمية والدائرية الصغيرة في الزجاج الأمامي المصفح.",
    cardHeadingAr: "لا تترك نقرة صغيرة تكلفك أكثر",
    cardSubAr: "نظام حقن ريزن يساعد على معالجة النقر المناسبة قبل أن تتمدد إلى شرخ أكبر.",
    painAr: "حصاة صغيرة على الطريق تترك نقرة في الزجاج. مع حرارة السعودية والاهتزاز، النقرة قد تتمدد وتتحول لمشكلة مكلفة. GlassGuard يمنحك طريقة عملية لمعالجة الأنواع المناسبة من النقر مبكراً — قبل أن تدفع أكثر عند الورشة.",
    mechanismAr: [
      "قاعدة حقن تضغط الريزن داخل النقرة المناسبة",
      "أفلام معالجة تساعد على تسوية سطح الإصلاح",
      "خطوات عربية واضحة للاستخدام المنزلي",
      "مناسب للنقر الصغيرة المحددة — وليس للشروخ الطويلة أو العميقة",
    ],
    offers: [
      {
        qty: 1,
        label: "نظام إصلاح واحد",
        benefit: "ابدأ معالجة النقرة المناسبة قبل أن تتمدد",
        price: 199,
      },
      {
        qty: 2,
        label: "نظامان — وفر 119 ريال",
        benefit: "لإصلاح ثانٍ أو للاحتفاظ بواحد في السيارة الأخرى",
        badge: "الأكثر اختياراً",
        price: 279,
      },
      {
        qty: 3,
        label: "3 أنظمة — وفر 248 ريال",
        benefit: "للعائلة أو لأكثر من سيارة بأفضل قيمة",
        price: 349,
      },
    ],
    crossSellIds: ["nano-titanium-windshield-umbrella", "wazzen-airsafe-tire-inflator"],
    ratingValue: "4.8",
    ratingCount: "+750 طلب",
    color: "#D97706",
  },
  {
    id: "wazzen-airsafe-tire-inflator",
    sku: "WAZ-AIR-AS01",
    slug: "wazzen-airsafe-tire-inflator",
    image: "/products/wazzen-airsafe-tire-inflator.png",
    imageFit: "cover",
    nameAr: "منفاخ وازن AirSafe الذكي للإطارات بإيقاف تلقائي",
    nameEn: "WAZZEN AirSafe Auto-Stop Tire Inflator",
    headlineAr: "اضبط الضغط المطلوب — واترك AirSafe يتوقف تلقائياً",
    subheadingAr: "منفاخ محمول بشاشة رقمية وقياس ضغط وإضاءة طوارئ لرحلات أكثر استعداداً.",
    cardHeadingAr: "لا تبحث عن محطة هواء بعد اليوم",
    cardSubAr: "منفاخ ذكي يقيس الضغط وينفخ حتى الرقم المحدد ثم يتوقف تلقائياً.",
    painAr: "تنبيه ضغط منخفض قبل المشوار، أو إطار ناقص بعيداً عن محطة الهواء — يعطل يومك ويضيع وقتك. AirSafe يقيس الضغط الحقيقي وينفخ حتى القيمة التي تحددها ثم يتوقف تلقائياً. خلّه في الشنطة وكن جاهزاً أينما كنت.",
    mechanismAr: [
      "شاشة رقمية تعرض الضغط الحالي والقيمة المستهدفة",
      "إيقاف تلقائي عند الوصول للضغط الذي تحدده — بدون تخمين",
      "أوضاع PSI وBAR وKPA لمختلف الاستخدامات",
      "إضاءة طوارئ وملحقات للسيارة والدراجة والكرات",
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
    crossSellIds: ["nano-titanium-windshield-umbrella", "wazzen-glassguard-chip-system"],
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
    "nano-titanium-windshield-umbrella",
    "wazzen-airsafe-tire-inflator",
    "wazzen-glassguard-chip-system",
  ];
  return allIds
    .filter((id) => !cartIds.includes(id))
    .slice(0, 2)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}
