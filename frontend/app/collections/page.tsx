import { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "كل منتجات وازن | مظلة، حشوة كونسول، مكنسة سيارة",
  description: "تصفح منتجات وازن لراحة السيارة في السعودية: مظلة عاكسة، حشوة جلد، مكنسة HEPA. الدفع عند الاستلام.",
};

const benefits = [
  { label: "حماية من الحرارة", icon: "☀️", productId: "titanium-silver-sunshade" },
  { label: "ترتيب داخلي", icon: "📱", productId: "premium-leather-gap-console" },
  { label: "تنظيف سريع", icon: "🌪️", productId: "hepa-car-vacuum" },
];

export default function CollectionsPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-bl from-[#0F172A] to-[#1E3A5F] text-white py-12 px-4 text-center">
        <div className="max-w-content mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            كل حلول وازن في مكان واحد
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            ثلاثة منتجات لأكثر مشاكل السيارة شيوعاً في السعودية — اختر الحل اللي تحتاجه
          </p>
        </div>
      </section>

      {/* Benefit Tabs */}
      <section className="py-6 px-4 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-content mx-auto flex gap-3 justify-center flex-wrap">
          {benefits.map((b) => (
            <a
              key={b.productId}
              href={`#${b.productId}`}
              className="flex items-center gap-2 bg-[#F8FAFC] hover:bg-[#E0F2FE] border border-[#E2E8F0] rounded-full px-4 py-2 text-sm font-medium text-[#0F172A] transition-colors"
            >
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} id={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Education */}
      <section className="py-12 px-4 bg-[#F0F9FF]">
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            ليش الباقة أذكى من قطعة واحدة؟
          </h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { title: "لقطعتين", price: "279 ريال", desc: "مناسب للسيارة الواحدة وتوفير واضح." },
              { title: "لـ 3 قطع", price: "349 ريال", desc: "مثالي للعائلة أو سيارتين مختلفتين." },
              { title: "إضافة الثلاثة", price: "ابتداءً من 199 ريال", desc: "كمّلي الحل بالمنتجات الثلاثة لأقصى راحة." },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#E2E8F0] text-right">
                <p className="font-bold text-[#0F172A]">{b.title}</p>
                <p className="text-[#10B981] font-bold text-lg">{b.price}</p>
                <p className="text-[#64748B] text-sm mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip repeat */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: "🚚", text: "توصيل لكل مناطق المملكة" },
            { icon: "💳", text: "الدفع عند الاستلام" },
            { icon: "🔄", text: "ضمان الاستبدال عند العيب" },
            { icon: "💬", text: "دعم واتساب سريع" },
          ].map((t, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-3">
              <span className="text-2xl">{t.icon}</span>
              <span className="text-xs text-[#64748B] font-medium">{t.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
