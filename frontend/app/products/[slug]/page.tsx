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
  "nano-titanium-windshield-umbrella": {
    hook: "كم مرة رجعت لسيارتك والمقود يحرق يدك من شمس الظهر؟",
    questions: [
      "هل تقف سيارتك تحت الشمس ساعات كل يوم؟",
      "هل تتعب من ألواح الشمس الكبيرة التي يصعب طيها وتخزينها؟",
      "هل تريد حاجزاً سريعاً يحمي المقود والطبلون من التعرض المباشر؟",
    ],
    imageGallery: [
      {
        label: "المنتج الرئيسي",
        caption: "طبقة نانو-تيتانيوم عاكسة",
        detail: "حاجز عملي بين داخل سيارتك والشمس المباشرة",
      },
      {
        label: "اختبار واقعي",
        caption: "قارن السطح المكشوف بالمظلل",
        detail: "اعرض القياس بنفس السيارة والوقت والظروف",
      },
      {
        label: "هيكل المظلة",
        caption: "دعامات مرنة وطرف مبطن",
        detail: "تصميم سريع مع تقليل احتكاك المقبض بالطبلون",
      },
      {
        label: "سهولة الاستخدام",
        caption: "فتح وطي خلال ثوانٍ",
        detail: "تدخل في الجراب وتُخزن في الباب أو الدرج",
      },
    ],
    proofImages: [
      { label: "قياس السطح", caption: "مقارنة موثقة قبل الاستخدام وبعده" },
      { label: "تغطية الزجاج", caption: "اختر المقاس المناسب لزجاج سيارتك" },
      { label: "فتح سريع", caption: "تركيب عملي للاستخدام اليومي" },
      { label: "داخل الجراب", caption: "تخزين مدمج بدون فوضى" },
    ],
  },
  "wazzen-airsafe-tire-inflator": {
    hook: "ظهر تنبيه ضغط الإطار — هل تبحث عن محطة أم تحلها مكانك؟",
    questions: [
      "هل تعرف ضغط إطاراتك الحقيقي قبل السفر؟",
      "هل سبق أن بحثت عن محطة هواء وإطارك ناقص؟",
      "هل تريد جهازاً يقيس وينفخ ثم يتوقف عند الرقم المحدد؟",
    ],
    imageGallery: [
      {
        label: "المنتج الرئيسي",
        caption: "قياس ونفخ في جهاز واحد",
        detail: "شاشة رقمية تعرض الضغط الحالي والمستهدف",
      },
      {
        label: "الإيقاف التلقائي",
        caption: "حدد الضغط واضغط تشغيل",
        detail: "يتوقف الجهاز تلقائياً عند الوصول للقيمة المطلوبة",
      },
      {
        label: "ملحقات متعددة",
        caption: "للسيارة والدراجة والكرات",
        detail: "رؤوس مرفقة للاستخدامات اليومية المختلفة",
      },
      {
        label: "إضاءة الطوارئ",
        caption: "وضوح أفضل وقت الليل",
        detail: "إضاءة مدمجة للاستخدام عند التوقف",
      },
    ],
    proofImages: [
      { label: "قراءة أولية", caption: "اعرف الضغط قبل بدء النفخ" },
      { label: "المؤقت الحقيقي", caption: "اختبار نفخ متواصل بدون قص الفيديو" },
      { label: "توقف تلقائي", caption: "يتوقف عند الضغط الذي اخترته" },
      { label: "داخل الحقيبة", caption: "الجهاز وملحقاته جاهزة في الشنطة" },
    ],
  },
  "wazzen-glassguard-chip-system": {
    hook: "نقرة صغيرة اليوم — شرخ مكلف غداً. لا تؤجلها.",
    questions: [
      "هل ظهرت نقرة نجمية أو دائرية صغيرة في الزجاج الأمامي؟",
      "هل تخشى أن تتحول مع تغير الحرارة إلى شرخ أطول؟",
      "هل تريد معرفة إن كانت نقرتك مناسبة للإصلاح المنزلي قبل الطلب؟",
    ],
    imageGallery: [
      {
        label: "المنتج الرئيسي",
        caption: "نظام حقن ريزن متكامل",
        detail: "قاعدة ضغط وأفلام معالجة وخطوات واضحة",
      },
      {
        label: "قبل وبعد",
        caption: "نتيجة واقعية بنفس الإضاءة",
        detail: "تقليل وضوح النقرة المناسبة والمساعدة على الحد من تمددها",
      },
      {
        label: "أنواع الضرر",
        caption: "للنقر الصغيرة المحددة",
        detail: "ليس للشروخ الطويلة أو العميقة أو تلف حافة الزجاج",
      },
      {
        label: "خطوات الاستخدام",
        caption: "تنظيف وحقن ومعالجة",
        detail: "اتبع الدليل العربي والوقت المحدد لكل خطوة",
      },
    ],
    proofImages: [
      { label: "نقرة مناسبة", caption: "مثال لنقرة نجمية صغيرة قبل الإصلاح" },
      { label: "الحقن", caption: "ضغط الريزن داخل مسارات النقرة" },
      { label: "بعد المعالجة", caption: "النتيجة الحقيقية تحت نفس الإضاءة" },
      { label: "متى تتوقف؟", caption: "الضرر الكبير يحتاج مختص زجاج" },
    ],
  },
};

const pdpFaqs: Record<string, { q: string; a: string }[]> = {
  "nano-titanium-windshield-umbrella": [
    { q: "هل تناسب كل السيارات؟", a: "تتوفر بالمقاس المحدد في صفحة الطلب وتناسب معظم الزجاج الأمامي القياسي. قِس عرض وارتفاع الزجاج قبل الطلب، خصوصاً للسيارات الصغيرة جداً أو الكبيرة." },
    { q: "هل تجعل السيارة باردة تماماً؟", a: "لا. هي حاجز عاكس يقلل التعرض المباشر للمقود والطبلون، لكنها لا تستبدل المكيف ولا تمنع تراكم حرارة الهواء داخل سيارة مغلقة." },
    { q: "هل تلامس الطبلون؟", a: "يأتي المقبض بطرف مبطن، ومع ذلك ثبّت المظلة بلطف ولا تضغطها على الشاشة أو الأسطح الحساسة." },
    { q: "كيف أخزنها؟", a: "تُطوى داخل جرابها وتُخزن في باب السيارة أو الدرج." },
  ],
  "wazzen-airsafe-tire-inflator": [
    { q: "هل يصلح لكل السيارات؟", a: "مخصص لإطارات سيارات الركوب والدراجات والاستخدامات الصغيرة المبيّنة في الدليل. ليس بديلاً عن كمبروسر الشاحنات أو الإطارات الصناعية." },
    { q: "هل يتوقف تلقائياً؟", a: "نعم، اختر وحدة القياس والضغط المستهدف ثم ابدأ النفخ؛ يتوقف عند الوصول للقيمة المحددة." },
    { q: "ما الضغط الصحيح لإطاري؟", a: "استخدم القيمة الموجودة على ملصق باب السائق أو دليل السيارة، وليس الرقم الأقصى المكتوب على جانب الإطار." },
    { q: "هل يصلح إطاراً مثقوباً؟", a: "لا. AirSafe يعيد ضغط الهواء فقط. الثقب أو التلف يحتاج إصلاحاً لدى مختص." },
  ],
  "wazzen-glassguard-chip-system": [
    { q: "ما أنواع الضرر المناسبة؟", a: "النقر الدائرية أو النجمية الصغيرة في الزجاج الأمامي المصفح قد تكون مناسبة. راجع مخطط الأشكال والمقاسات قبل الطلب." },
    { q: "هل يختفي الأثر تماماً؟", a: "لا نضمن اختفاءه. الهدف هو ملء النقرة المناسبة وتقليل وضوحها والمساعدة على الحد من تمددها، والنتيجة تختلف حسب نوع الضرر ونظافته." },
    { q: "متى أحتاج مختصاً؟", a: "للشرخ الطويل أو العميق، تلف حافة الزجاج، أو الضرر في مجال الرؤية الحرج للسائق، استشر مختص زجاج ولا تستخدم النظام." },
    { q: "هل أستخدمه بعد غسل السيارة؟", a: "يجب أن تكون النقرة جافة ونظيفة حسب الدليل. الماء والأوساخ داخلها قد يؤثران في النتيجة." },
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
                  labelAr={rich?.imageGallery[0]?.label ?? product.nameAr}
                  aspectRatio="1:1"
                  color={product.color}
                  className="rounded-2xl"
                  src={product.image}
                  imageFit={product.imageFit ?? "cover"}
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
                <p className="text-[11px] text-[#94A3B8] mt-1" dir="ltr">
                  SKU: {product.sku}
                </p>
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
                src={product.image}
                imageFit={product.imageFit ?? "cover"}
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
