import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, getCrossSells } from "@/data/products";
import { getProductReviews } from "@/data/reviews";
import { SectionImagePlaceholder } from "@/components/product/SectionImagePlaceholder";
import { ReviewStars } from "@/components/product/ReviewStars";
import { ProofBadges } from "@/components/brand/ProofBadges";
import { ProductCard } from "@/components/product/ProductCard";
import { PDPClient } from "./PDPClient";
import { Shield, ChevronLeft, CheckCircle } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.nameAr} | وازن`,
    description: product.subheadingAr,
  };
}

// ─── Per-product rich content ──────────────────────────────────────────────

type PDPRichContent = {
  hook: string;
  questions: string[];
  imageGallery: { label: string; caption: string; detail: string }[];
  proofImages: { label: string; caption: string }[];
};

const richContent: Record<string, PDPRichContent> = {
  "titanium-silver-sunshade": {
    hook: "كم مرة وصلت لسيارتك الظهر والمقود يحرق يدك؟",
    questions: [
      "هل تنتظر دقائق قبل ما تقدر تلمس المقود في الصيف؟",
      "هل المقاعد والديكور تعبت من الشمس المباشرة؟",
      "تساءلت كم تكلفتك الشمس على شكل سيارتك من الداخل؟",
    ],
    imageGallery: [
      {
        label: "المنتج الرئيسي",
        caption: "تعكس 99% من الأشعة",
        detail: "مقود بارد فعلاً من أول لمسة",
      },
      {
        label: "قبل وبعد",
        caption: "الفرق واضح من أول يوم",
        detail: "تقليل واضح في درجة الحرارة بالداخل",
      },
      {
        label: "تفاصيل المواد",
        caption: "طبقات تيتانيوم فضية",
        detail: "تعكس الحرارة — لا تمتصها",
      },
      {
        label: "سهولة الاستخدام",
        caption: "تنطوي في 10 ثوانٍ",
        detail: "تُخزن في باب السيارة بدون أي مجهود",
      },
    ],
    proofImages: [
      { label: "اختبار الحرارة", caption: "نتائج قياس درجة الحرارة قبل وبعد" },
      { label: "مقود بارد", caption: "لمسة أولى بدون ألم في الصيف" },
      { label: "تركيب سريع", caption: "جاهزة خلال 30 ثانية" },
      { label: "تجربة عميل", caption: "استخدام يومي في الرياض — درجة الحرارة 47°" },
    ],
  },
  "premium-leather-gap-console": {
    hook: "الجوال يطيح بين المقعد كل يوم — وأنت تبحث عنه وهو بالطريق؟",
    questions: [
      "هل سبق لك أن فقدت جوالك تحت المقعد وأنت تقود؟",
      "المفاتيح والسماعات والبطاقات — كل شيء يطيح في نفس المكان؟",
      "هل تعبت من فوضى الكونسول والداخلية كل يوم؟",
    ],
    imageGallery: [
      {
        label: "المنتج الرئيسي",
        caption: "يسد الفراغ تماماً",
        detail: "لا شيء يطيح من الآن",
      },
      {
        label: "قبل وبعد",
        caption: "من فوضى كاملة",
        detail: "إلى ترتيب مثالي بدون جهد",
      },
      {
        label: "جودة الجلد",
        caption: "جلد PU فاخر",
        detail: "مقاوم للخدش والحرارة والاستخدام اليومي",
      },
      {
        label: "التركيب",
        caption: "ثابت بدون أدوات",
        detail: "دقيقة وحدة — وكل شيء في مكانه",
      },
    ],
    proofImages: [
      { label: "قبل — فوضى", caption: "جوال ومفاتيح وفتات في كل مكان" },
      { label: "بعد — نظام", caption: "كل شيء له مكان ثابت ومرتب" },
      { label: "جودة المادة", caption: "جلد PU مقاوم لحرارة السيارة" },
      { label: "تجربة عميل", caption: "ركب في سيارة نيسان ولاندكروزر" },
    ],
  },
  "hepa-car-vacuum": {
    hook: "بعد كل رحلة بر والرمل في كل زاوية — تدفع المغسلة أو تتركها؟",
    questions: [
      "كم مرة رجعت من رحلة والغبار في كل مكان داخل السيارة؟",
      "هل تعبت من كابلات المكنسة العادية اللي ما توصل كل الزوايا؟",
      "هل تحب تكون سيارتك نظيفة دائماً بدون وقت وبدون مغسلة؟",
    ],
    imageGallery: [
      {
        label: "المنتج الرئيسي",
        caption: "شفط قوي وعميق",
        detail: "ينظف الزوايا الضيقة في دقيقتين",
      },
      {
        label: "قبل وبعد",
        caption: "سيارة مليانة رمل",
        detail: "نظيفة تماماً بدون مغسلة",
      },
      {
        label: "فلتر HEPA",
        caption: "يحبس الغبار الدقيق",
        detail: "لا يعيد الغبار للهواء اللي تتنفسه",
      },
      {
        label: "لاسلكية",
        caption: "شحن USB سريع",
        detail: "تشتغل بدون كابلات في أي مكان",
      },
    ],
    proofImages: [
      { label: "قبل — رمل كثير", caption: "بعد رحلة بر أو شاطئ" },
      { label: "بعد — نظافة تامة", caption: "دقيقتان وكأنك من المغسلة" },
      { label: "فلتر HEPA", caption: "يحجز 99.97% من الجسيمات الدقيقة" },
      { label: "تجربة عميل", caption: "قطعة واحدة نظّفت 3 سيارات للعائلة" },
    ],
  },
};

const pdpFaqs: Record<string, { q: string; a: string }[]> = {
  "titanium-silver-sunshade": [
    { q: "هل المظلة تناسب كل السيارات؟", a: "نعم، المظلة قابلة للتعديل وتناسب معظم السيارات المنتشرة في السعودية." },
    { q: "كيف أخزنها؟", a: "تنطوي بسرعة وتُخزن في كيس صغير داخل الباب أو الدرج." },
    { q: "هل يمكن استبدالها؟", a: "نعم، في حالة وجود عيب مصنعي نستبدلها فوراً عبر واتساب." },
    { q: "كم تستمر؟", a: "مصنوعة لتتحمل الاستخدام اليومي — المواد مختارة لبيئة الحرارة السعودية." },
  ],
  "premium-leather-gap-console": [
    { q: "هل تناسب كل السيارات؟", a: "نعم، مصممة بمرونة لتسد الفراغ بين معظم مقاعد ووحدات الكونسول." },
    { q: "كيف تُثبَّت؟", a: "تُثبَّت بسهولة بدون أدوات — فقط ضعها في مكانها وتثبت بثقلها." },
    { q: "ما الخامة المستخدمة؟", a: "جلد PU فاخر، مقاوم للخدش والحرارة والاستخدام اليومي المتكرر." },
    { q: "هل تتحمل حرارة السعودية؟", a: "نعم، المواد مختارة خصيصاً لتتحمل درجات الحرارة العالية." },
  ],
  "hepa-car-vacuum": [
    { q: "كم تدوم الشحنة؟", a: "تعمل لوقت كافٍ لتنظيف السيارة الكاملة بشحنة واحدة." },
    { q: "هل الفلتر قابل للغسيل؟", a: "نعم، الفلتر قابل للتنظيف وإعادة الاستخدام — لا تحتاج فلاتر استبدال." },
    { q: "هل تناسب الرمل الدقيق؟", a: "نعم، فلتر HEPA يحجز الغبار الناعم والرمل الصغير بكفاءة عالية." },
    { q: "هل يأتي معها ملحقات؟", a: "نعم، تأتي مع رأس للزوايا الضيقة بين المقاعد والتفاصيل الصغيرة." },
  ],
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const crossSells = getCrossSells(product.id);
  const reviews = getProductReviews(product.id);
  const faqs = pdpFaqs[slug] ?? [];
  const rich = richContent[slug] ?? null;

  return (
    <div className="bg-[#FFFDF8]">

      {/* ─── HOOK BANNER ────────────────────────────────────────── */}
      {rich && (
        <div
          className="py-3 px-5 text-center text-sm font-semibold"
          style={{ background: `linear-gradient(90deg, ${product.color}18, ${product.color}30, ${product.color}18)` }}
        >
          <span className="text-[#0F172A]">🎯 {rich.hook}</span>
        </div>
      )}

      {/* ─── MAIN PRODUCT SECTION ─────────────────────────────── */}
      <section className="py-8 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Gallery with captions */}
            <div className="space-y-3">
              <div className="relative">
                <SectionImagePlaceholder
                  labelAr={rich?.imageGallery[0]?.label ?? "صورة المنتج"}
                  aspectRatio="1:1"
                  color={product.color}
                  className="rounded-2xl"
                />
                {rich?.imageGallery[0] && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl px-4 pb-3 pt-6">
                    <p className="text-white font-bold text-sm leading-tight">
                      {rich.imageGallery[0].caption}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">
                      {rich.imageGallery[0].detail}
                    </p>
                  </div>
                )}
              </div>

              {/* Thumbnail row with captions */}
              {rich && (
                <div className="grid grid-cols-3 gap-2">
                  {rich.imageGallery.slice(1).map((img, i) => (
                    <div key={i} className="space-y-1">
                      <div className="relative">
                        <SectionImagePlaceholder
                          labelAr={img.label}
                          aspectRatio="1:1"
                          color={product.color}
                          className="rounded-xl opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent rounded-b-xl px-2 pb-1.5 pt-4">
                          <p className="text-white text-[10px] font-semibold leading-tight">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#64748B] leading-tight px-0.5">
                        {img.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info + Express Checkout */}
            <div className="space-y-5">
              <div>
                <p className="text-xs text-[#0EA5E9] font-bold uppercase tracking-widest mb-1">وازن</p>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-snug">
                  {product.nameAr}
                </h1>
                <p className="text-base text-[#64748B] font-medium mt-1.5">
                  {product.headlineAr}
                </p>
              </div>

              <ReviewStars value={product.ratingValue} count={product.ratingCount} />

              <div className="flex gap-2 flex-wrap">
                <span className="bg-[#F0FDF4] text-[#10B981] text-xs font-bold px-3 py-1.5 rounded-full border border-[#10B981]/30">
                  ✓ الدفع عند الاستلام
                </span>
                <span className="bg-[#FEF3C7] text-[#D97706] text-xs font-bold px-3 py-1.5 rounded-full border border-[#D97706]/30">
                  🔥 كمية محدودة
                </span>
                <span className="bg-[#E0F2FE] text-[#0EA5E9] text-xs font-bold px-3 py-1.5 rounded-full border border-[#0EA5E9]/30">
                  🚚 توصيل سريع
                </span>
              </div>

              {/* Express Checkout — PDPClient */}
              <PDPClient product={product} />

              <div className="flex items-center gap-2 text-xs text-[#64748B] bg-[#F8FAFC] rounded-xl px-4 py-3 border border-[#E2E8F0]">
                <Shield className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>الدفع فقط عند الاستلام · بدون بطاقة الآن · ضمان الاستبدال عند العيب</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CUSTOMER QUESTIONS (HOOK SECTION) ──────────────────── */}
      {rich && (
        <section className="py-10 px-4 bg-[#0F172A] text-white">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs text-[#0EA5E9] font-bold uppercase tracking-widest mb-4">
              هل مررت بهذا؟
            </p>
            <div className="space-y-4">
              {rich.questions.map((q, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-right bg-white/5 rounded-2xl px-5 py-4 border border-white/10"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: product.color, color: "#fff" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[#E2E8F0] text-sm leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
            <p className="text-[#94A3B8] mt-6 text-sm">
              وازن صنعت الحل — ومعك ضمان استبدال إذا ما عجبك.
            </p>
          </div>
        </section>
      )}

      {/* ─── MECHANISM ──────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs text-[#0EA5E9] font-bold uppercase tracking-widest mb-3">
                ليش وازن؟
              </p>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                {product.headlineAr}
              </h2>
              <ul className="space-y-4">
                {product.mechanismAr.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: product.color }}
                    />
                    <span className="text-[#0F172A] text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <SectionImagePlaceholder
                labelAr="آلية عمل المنتج"
                aspectRatio="4:3"
                color={product.color}
                className="rounded-3xl"
              />
              <div className="absolute -bottom-4 right-4 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">{product.ratingValue} تقييم</p>
                    <p className="text-[10px] text-[#94A3B8]">{product.ratingCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROOF IMAGES WITH CAPTIONS ─────────────────────────── */}
      {rich && (
        <section className="py-12 px-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#0F172A]">شوف الفرق بنفسك</h2>
              <p className="text-sm text-[#64748B] mt-1">صور حقيقية من عملاء وازن</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rich.proofImages.map((img, i) => (
                <div key={i} className="space-y-2">
                  <SectionImagePlaceholder
                    labelAr={img.label}
                    aspectRatio="16:9"
                    color={product.color}
                    className="rounded-2xl"
                  />
                  <div className="px-1">
                    <p className="text-xs font-semibold text-[#0F172A] leading-tight">{img.label}</p>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-tight">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── REVIEWS ────────────────────────────────────────────── */}
      {reviews.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="text-xl font-bold text-[#0F172A] mb-1 text-center">
              قالوا عن هذا المنتج
            </h2>
            <p className="text-sm text-center text-[#64748B] mb-6">آراء حقيقية من عملاء وازن</p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {reviews.map((r) => (
                <div key={r.id} className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                  <div className="flex text-[#D97706] mb-2 text-sm">{"★".repeat(r.rating)}</div>
                  <p className="text-sm text-[#0F172A] leading-relaxed mb-3">"{r.textAr}"</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9]">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: product.color }}
                    >
                      {r.authorAr[0]}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#0F172A]">{r.authorAr}</span>
                      <span className="text-xs text-[#94A3B8] mr-1"> — {r.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── COMPARISON TABLE ────────────────────────────────────── */}
      <section className="py-12 px-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-content mx-auto max-w-2xl">
          <h2 className="text-xl font-bold text-[#0F172A] text-center mb-6">
            وازن مقابل البدائل الرخيصة
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <div className="grid grid-cols-2">
              <div className="bg-[#0F172A] text-white p-4 text-center font-bold text-sm">وازن</div>
              <div className="bg-[#F1F5F9] text-[#64748B] p-4 text-center font-bold text-sm">منتجات عامة</div>
            </div>
            {[
              ["مواد مختارة للحر والغبار", "مواد قد تتآكل بسرعة"],
              ["تصميم مدروس للاستخدام اليومي", "مظهر عام بدون دراسة"],
              ["خدمة عربية + استبدال عند العيب", "لا ضمان بعد الشراء"],
              ["الدفع عند الاستلام بثقة", "دفع مسبق من موقع مجهول"],
            ].map(([waz, gen], i) => (
              <div key={i} className="grid grid-cols-2 border-t border-[#E2E8F0]">
                <div className="bg-white p-3.5 text-sm text-[#0F172A] flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span>
                  {waz}
                </div>
                <div className="bg-[#FFF8F8] p-3.5 text-sm text-[#94A3B8] flex items-center gap-2">
                  <span className="text-red-300">✗</span>
                  {gen}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CROSS-SELLS ─────────────────────────────────────────── */}
      {crossSells.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="text-xl font-bold text-[#0F172A] mb-1 text-center">
              أكمل حماية سيارتك
            </h2>
            <p className="text-sm text-center text-[#64748B] mb-6">
              كثير من عملائنا يطلبون هذه المنتجات معاً
            </p>
            <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
              {crossSells.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ─────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-12 px-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-content mx-auto max-w-2xl">
            <h2 className="text-xl font-bold text-[#0F172A] text-center mb-6">أسئلة شائعة</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="border border-[#E2E8F0] rounded-2xl overflow-hidden group bg-white"
                >
                  <summary className="px-5 py-4 font-semibold text-[#0F172A] cursor-pointer hover:bg-[#F8FAFC] transition-colors list-none flex items-center justify-between text-sm">
                    {faq.q}
                    <ChevronLeft className="w-4 h-4 text-[#94A3B8] group-open:-rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-4 text-[#64748B] text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PROOF BADGES ────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <ProofBadges />
        </div>
      </section>
    </div>
  );
}
