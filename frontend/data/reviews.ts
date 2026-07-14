export type Review = {
  id: string;
  productId: string;
  authorAr: string;
  city: string;
  textAr: string;
  rating: number;
  date: string;
};

// Seed placeholder reviews — replace with real UGC after launch
export const reviews: Review[] = [
  {
    id: "r1",
    productId: "wazzen-foldable-windshield-umbrella",
    authorAr: "أم عبدالله",
    city: "الرياض",
    textAr: "تركيبها أسرع من المظلة القديمة، وتدخل في الجراب بدون ما تأخذ مساحة في السيارة.",
    rating: 5,
    date: "2026-06-10",
  },
  {
    id: "r2",
    productId: "wazzen-foldable-windshield-umbrella",
    authorAr: "سارة م.",
    city: "جدة",
    textAr: "تغطي الزجاج بشكل جيد وتساعد على حماية المقود والطبلون من الشمس المباشرة.",
    rating: 5,
    date: "2026-06-15",
  },
  {
    id: "r3",
    productId: "wazzen-portable-tire-inflator",
    authorAr: "نورة ع.",
    city: "الدمام",
    textAr: "ظهر عندي تنبيه الضغط، حددت الرقم وشغلته ووقف تلقائياً عند القيمة المطلوبة.",
    rating: 5,
    date: "2026-05-28",
  },
  {
    id: "r4",
    productId: "wazzen-portable-tire-inflator",
    authorAr: "هند ك.",
    city: "مكة المكرمة",
    textAr: "الشاشة واضحة والجهاز صغير مع ملحقاته. خليته دائماً في شنطة السيارة.",
    rating: 5,
    date: "2026-06-01",
  },
  {
    id: "r5",
    productId: "wazzen-windshield-crack-repair-kit",
    authorAr: "ريم ب.",
    city: "الرياض",
    textAr: "اتبعت الخطوات على نقرة صغيرة والنتيجة خففت وضوحها. مهم تتأكد أن نوع النقرة مناسب.",
    rating: 5,
    date: "2026-06-20",
  },
  {
    id: "r6",
    productId: "wazzen-windshield-crack-repair-kit",
    authorAr: "لمياء ه.",
    city: "الخبر",
    textAr: "الدليل واضح والأدوات مرتبة. ما استخدمته على الشرخ الطويل لأن الصفحة توضح أنه يحتاج مختص.",
    rating: 4,
    date: "2026-06-08",
  },
];

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
