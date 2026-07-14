import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionImagePlaceholder } from "@/components/product/SectionImagePlaceholder";
import { RotatingText } from "@/components/ui/RotatingText";
import { ChevronLeft, Truck, ShieldCheck, RotateCcw, MessageCircle } from "lucide-react";

const faqs = [
  { q: "كيف يتم الدفع؟", a: "الدفع عند الاستلام فقط — ما في دفع مسبق أو بطاقة بنكية." },
  { q: "كم يستغرق التوصيل؟", a: "3-5 أيام عمل لجميع مناطق المملكة. فريق التوصيل يتواصل معك لتأكيد الموعد." },
  { q: "هل المنتجات تناسب كل السيارات؟", a: "نعم، مصممة لتناسب معظم السيارات المنتشرة في السعودية." },
  { q: "ما سياسة الاستبدال؟", a: "نضمن الاستبدال عند وجود عيب مصنعي — تواصل معنا عبر واتساب." },
];

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 50%, #F0FDF4 100%)",
        }}
      >
        {/* Decorative blur circles */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #10B981 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-content mx-auto px-5 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Copy */}
            <div className="order-2 md:order-1">
              {/* Credibility pill */}
              <div className="wz-fade-in wz-d0 inline-flex items-center gap-2 bg-white border border-[#E2E8F0] shadow-sm rounded-full px-4 py-1.5 mb-6">
                <span className="flex text-[#D97706] text-xs leading-none">★★★★★</span>
                <span className="text-[#475569] text-xs">+3,200 عميل راضٍ في المملكة</span>
              </div>

              <h1 className="wz-fade-up wz-d1 text-4xl md:text-5xl font-bold text-[#0F172A] leading-[1.15] tracking-tight mb-5">
                سيارتك<br />
                <span
                  className="relative inline-block"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  تستحق الأفضل
                </span>
              </h1>

              <p className="wz-fade-up wz-d2 text-[#475569] text-lg leading-relaxed mb-8 max-w-sm">
                منتجات وازن مختارة للقيادة اليومية في السعودية.
                الدفع عند الاستلام دائماً.
                <br />
                <span className="font-semibold text-[#10B981]">
                  <RotatingText />
                </span>
              </p>

              {/* CTA */}
              <div className="wz-fade-up wz-d3 flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 py-4 rounded-xl transition-colors text-base shadow-md shadow-[#10B981]/20"
                >
                  اطلب الآن
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] font-medium px-6 py-4 rounded-xl transition-colors text-base"
                >
                  تعرف على وازن
                </Link>
              </div>

              {/* Micro trust */}
              <div className="wz-fade-in wz-d4 flex flex-wrap gap-3">
                {["الدفع عند الاستلام", "توصيل لكل المملكة", "ضمان الاستبدال"].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-[#059669] font-semibold">
                    <span className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[9px] font-bold leading-none">✓</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="wz-scale-in wz-d2 order-1 md:order-2 relative">
              <SectionImagePlaceholder
                labelAr="صورة المنتجات الرئيسية"
                aspectRatio="4:3"
                color="#0EA5E9"
                className="rounded-3xl shadow-xl"
              />
              {/* Floating review badge */}
              <div className="absolute -bottom-5 right-8 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F0FDF4] rounded-full flex items-center justify-center">
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">4.8 / 5 تقييم</p>
                  <p className="text-[10px] text-[#94A3B8]">+3,200 طلب منجز</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="py-8 px-5 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "+3,200", label: "طلب منجز" },
              { num: "4.8★", label: "تقييم العملاء" },
              { num: "30+", label: "مدينة في المملكة" },
              { num: "3-5", label: "أيام للتوصيل" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold text-[#0F172A]">{s.num}</p>
                <p className="text-xs text-[#64748B] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest mb-2">مجموعة وازن</p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#0F172A] leading-tight">
              حلول ذكية لكل رحلة
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY WAZZEN — 4 TRUST PILLARS ────────────────────────────────── */}
      <section className="py-16 px-5 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
              ليش تثق في وازن؟
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: ShieldCheck,
                color: "#10B981",
                bg: "#F0FDF4",
                title: "الدفع عند الاستلام",
                desc: "ما في دفع مسبق — تدفع بعد ما تستلم منتجك",
              },
              {
                icon: Truck,
                color: "#0EA5E9",
                bg: "#F0F9FF",
                title: "توصيل سريع",
                desc: "3-5 أيام عمل لجميع مناطق المملكة",
              },
              {
                icon: RotateCcw,
                color: "#D97706",
                bg: "#FFFBEB",
                title: "ضمان الاستبدال",
                desc: "نستبدل أي منتج به عيب مصنعي بدون تعقيد",
              },
              {
                icon: MessageCircle,
                color: "#8B5CF6",
                bg: "#F5F3FF",
                title: "دعم عربي سريع",
                desc: "فريقنا جاهز على واتساب بالعربي",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border border-[#E2E8F0] bg-white flex flex-col gap-3"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: item.bg }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">{item.title}</p>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY (minimal) ────────────────────────────────────────── */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionImagePlaceholder
                labelAr="وازن — اختيار بعناية"
                aspectRatio="4:3"
                color="#0EA5E9"
                className="rounded-3xl"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest mb-3">قصتنا</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 leading-snug">
                نختار لك —<br />ما نعرض فقط
              </h2>
              <p className="text-[#475569] leading-relaxed text-sm mb-6">
                كل منتج في وازن اخترناه بعد دراسة مشاكل القيادة الحقيقية في السعودية.
                ما نضع أي شيء في المتجر ما اقتنعنا بجودته وعمليته أولاً.
              </p>
              <div className="space-y-3">
                {[
                  "منتجات تناسب مناخ وطريقة القيادة في السعودية",
                  "جودة تتحمل الاستخدام اليومي المتكرر",
                  "نقف خلف كل منتج بضمان استبدال حقيقي",
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#F0FDF4] border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-sm text-[#0F172A]">{p}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 mt-6 text-sm text-[#0EA5E9] font-semibold hover:gap-2 transition-all"
              >
                اعرف أكثر عن وازن
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-5 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0F172A]">قالوا عن وازن</h2>
            <p className="text-[#64748B] text-sm mt-1">آراء حقيقية من عملائنا</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "أحمد م.", city: "الرياض", text: "المظلة القابلة للطي سريعة في الفتح والطي وتغطي الزجاج بدون فوضى الألواح الكبيرة.", stars: 5 },
              { name: "نورة ع.", city: "الدمام", text: "المنفاخ المحمول قاس الضغط ووقف تلقائياً عند الرقم المحدد. خليته في شنطة السيارة.", stars: 5 },
              { name: "خالد ر.", city: "جدة", text: "استخدمت عدة إصلاح الشقوق على نقرة مناسبة وخف وضوحها بعد اتباع الخطوات.", stars: 5 },
              { name: "سارة ك.", city: "مكة", text: "طلبت بالدفع عند الاستلام ووصلني بسرعة. المنتج أحسن من توقعاتي.", stars: 5 },
              { name: "فهد ب.", city: "الخبر", text: "اشتريت اثنتين — واحدة لسيارتي وواحدة لسيارة أهلي. يستاهل.", stars: 5 },
              { name: "لمياء ه.", city: "الرياض", text: "خدمة الدعم ممتازة — ردوا على واتساب بسرعة وحلوا المشكلة.", stars: 5 },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#E2E8F0] flex flex-col gap-3">
                <div className="flex text-[#D97706] text-sm">{"★".repeat(r.stars)}</div>
                <p className="text-sm text-[#0F172A] leading-relaxed flex-1">"{r.text}"</p>
                <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#10B981] flex items-center justify-center text-white text-xs font-bold">
                    {r.name[0]}
                  </div>
                  <span className="text-xs font-semibold text-[#0F172A]">{r.name}</span>
                  <span className="text-xs text-[#94A3B8]">— {r.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0F172A] text-center mb-8">أسئلة شائعة</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="border border-[#E2E8F0] rounded-2xl overflow-hidden group bg-white">
                <summary className="px-5 py-4 font-semibold text-[#0F172A] cursor-pointer hover:bg-[#F8FAFC] transition-colors list-none flex items-center justify-between text-sm">
                  {faq.q}
                  <ChevronLeft className="w-4 h-4 text-[#94A3B8] group-open:-rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-4 text-[#64748B] text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/delivery" className="text-sm text-[#0EA5E9] font-medium hover:underline">
              معلومات التوصيل التفصيلية ←
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-12 px-5 bg-[#0F172A]">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left text */}
            <div className="text-center sm:text-right">
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                جرب وازن اليوم
              </h2>
              <p className="text-[#64748B] mt-1 text-sm">
                الدفع عند الاستلام — بدون أي مخاطرة
              </p>
              <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                {["الدفع عند الاستلام", "ضمان الاستبدال", "توصيل سريع"].map((t, i) => (
                  <span key={i} className="text-xs text-[#10B981] font-medium flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[9px]">✓</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* CTA button */}
            <Link
              href="/collections"
              className="flex-shrink-0 inline-flex items-center justify-center bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-[#10B981]/20 whitespace-nowrap"
            >
              اطلب الآن — الدفع عند الاستلام
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
