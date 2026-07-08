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
    productId: "titanium-silver-sunshade",
    authorAr: "أم عبدالله",
    city: "الرياض",
    textAr: "كنت أعاني من حرارة المقود كل يوم، المظلة فرقت معي خصوصاً وقت الظهر.",
    rating: 5,
    date: "2026-06-10",
  },
  {
    id: "r2",
    productId: "titanium-silver-sunshade",
    authorAr: "سارة م.",
    city: "جدة",
    textAr: "سهلة الاستخدام وتخزينها بسيط. السيارة ما تصير فرن وقت الوقوف.",
    rating: 5,
    date: "2026-06-15",
  },
  {
    id: "r3",
    productId: "premium-leather-gap-console",
    authorAr: "نورة ع.",
    city: "الدمام",
    textAr: "الحشوة رتبت السيارة، الجوال والمفاتيح صار لها مكان واضح.",
    rating: 5,
    date: "2026-05-28",
  },
  {
    id: "r4",
    productId: "premium-leather-gap-console",
    authorAr: "هند ك.",
    city: "مكة المكرمة",
    textAr: "شكلها يبدو فاخر وتركيبها ما احتاج أدوات. اشتريت اثنتين للسيارتين.",
    rating: 5,
    date: "2026-06-01",
  },
  {
    id: "r5",
    productId: "hepa-car-vacuum",
    authorAr: "ريم ب.",
    city: "الرياض",
    textAr: "المكنسة ممتازة للرمل بعد المشاوير، حجمها عملي وتتنظف بسرعة.",
    rating: 5,
    date: "2026-06-20",
  },
  {
    id: "r6",
    productId: "hepa-car-vacuum",
    authorAr: "لمياء ه.",
    city: "الخبر",
    textAr: "طلبت بالدفع عند الاستلام ووصلني خلال أيام. المنتج أحسن من توقعاتي.",
    rating: 4,
    date: "2026-06-08",
  },
];

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
