import { Metadata } from "next";
import Link from "next/link";
import { SectionImagePlaceholder } from "@/components/product/SectionImagePlaceholder";
import { ProofBadges } from "@/components/brand/ProofBadges";

export const metadata: Metadata = {
  title: "من نحن | وازن",
  description: "وازن وُجدت لراحة السيارة في السعودية. اعرف أكثر عن قصتنا وقيمنا.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFFDF8]">
      {/* Hero */}
      <section className="bg-gradient-to-bl from-[#0F172A] to-[#1E3A5F] text-white py-14 px-4 text-center">
        <div className="max-w-content mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            وازن وُجدت لراحة السيارة في السعودية
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            نؤمن أن القيادة اليومية تستحق منتجات حقيقية تحل مشاكل حقيقية.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">لماذا وازن؟</h2>
              <p className="text-[#64748B] leading-relaxed mb-4">
                مناخ السعودية مختلف. الحرارة الشديدة، الغبار المستمر، والمشاوير اليومية الطويلة تحتاج منتجات مصممة خصيصاً، لا نسخ رخيصة من أسواق بعيدة.
              </p>
              <p className="text-[#64748B] leading-relaxed mb-4">
                وازن اختارت منتجاتها بناءً على المشاكل الفعلية التي يعاني منها السائقون في المملكة يومياً: المقود الحار، الجوال الضائع، والسيارة التي تحتاج تنظيفاً بعد كل مشوار.
              </p>
              <p className="text-[#64748B] leading-relaxed">
                كل منتج اخترناه يحل مشكلة واحدة بشكل عملي — بجودة تتحمل الاستخدام المتكرر في بيئة السعودية.
              </p>
            </div>
            <div>
              <SectionImagePlaceholder labelAr="قصة وازن" aspectRatio="4:3" color="#0EA5E9" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Saudi */}
      <section className="py-12 px-4 bg-[#F8FAFC]">
        <div className="max-w-content mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8">
            ليش المناخ السعودي يحتاج منتجات مختلفة؟
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-right">
            {[
              {
                icon: "🌡️",
                title: "حرارة تصل 70 درجة",
                desc: "الشمس المباشرة تسخن داخل السيارة لمستويات خطرة على المقود والديكور.",
              },
              {
                icon: "🌪️",
                title: "غبار ورمل مستمر",
                desc: "الرمل الناعم يتسرب لكل مكان ويتراكم في الزوايا وبين المقاعد.",
              },
              {
                icon: "🚗",
                title: "مشاوير يومية طويلة",
                desc: "الأسرة السعودية تقضي وقتاً طويلاً في السيارة — الراحة والترتيب ليست رفاهية.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                <span className="text-3xl block mb-2">{item.icon}</span>
                <h3 className="font-bold text-[#0F172A] mb-1">{item.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we pick */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[#0F172A] text-center mb-6">
            كيف نختار منتجاتنا؟
          </h2>
          <div className="space-y-4">
            {[
              { n: "01", title: "تحديد المشكلة أولاً", desc: "نبدأ من المشكلة الحقيقية، لا من المنتج." },
              { n: "02", title: "اختيار المواد المناسبة", desc: "نختار مواد تتحمل الحرارة والاستخدام المتكرر في بيئة السعودية." },
              { n: "03", title: "التصميم العملي", desc: "المنتج لازم يُستخدم بسهولة يومياً بدون تعليمات معقدة." },
              { n: "04", title: "الوقوف خلف المنتج", desc: "نضمن الاستبدال عند وجود عيب ونقدم دعم عربي سريع." },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                <span className="text-2xl font-bold text-[#0EA5E9] flex-shrink-0">{step.n}</span>
                <div>
                  <p className="font-bold text-[#0F172A]">{step.title}</p>
                  <p className="text-sm text-[#64748B] mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-12 px-4 bg-[#F0FDF4]">
        <div className="max-w-content mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">وعدنا لك</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-right">
            {[
              { icon: "💳", text: "الدفع عند الاستلام دائماً" },
              { icon: "🔄", text: "استبدال عند وجود عيب مصنعي" },
              { icon: "💬", text: "دعم عربي عبر واتساب" },
              { icon: "🚚", text: "توصيل لجميع مناطق المملكة" },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-[#10B981]/20 flex items-center gap-3">
                <span className="text-2xl">{p.icon}</span>
                <span className="font-medium text-[#0F172A] text-sm">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <ProofBadges />
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 px-4 text-center bg-[#F8FAFC]">
        <Link
          href="/collections"
          className="inline-block bg-[#10B981] hover:bg-[#059669] text-white font-bold px-10 py-4 rounded-xl transition-colors text-base"
        >
          اطلع على منتجات وازن
        </Link>
      </section>
    </div>
  );
}
