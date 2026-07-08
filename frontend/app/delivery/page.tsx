import { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, Phone, MapPin, Package, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "التوصيل والشحن | وازن",
  description: "معلومات التوصيل لطلبات وازن — 3-5 أيام عمل لجميع مناطق المملكة، الدفع عند الاستلام.",
};

const cities = [
  "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة",
  "الدمام", "الخبر", "الظهران", "الأحساء",
  "القصيم", "تبوك", "أبها", "خميس مشيط",
  "جازان", "نجران", "حائل", "الطائف",
];

const steps = [
  {
    icon: Package,
    color: "#0EA5E9",
    bg: "#F0F9FF",
    step: "01",
    title: "تأكيد الطلب",
    desc: "بعد تسجيل طلبك، سيصلك تأكيد فوري برقم الطلب.",
  },
  {
    icon: Phone,
    color: "#10B981",
    bg: "#F0FDF4",
    step: "02",
    title: "التواصل للتأكيد",
    desc: "فريق التوصيل سيتصل بك على رقمك المسجل لتأكيد الموعد والعنوان.",
  },
  {
    icon: Truck,
    color: "#D97706",
    bg: "#FFFBEB",
    step: "03",
    title: "شحن الطلب",
    desc: "يُشحن طلبك خلال 1-2 يوم عمل من تأكيد البيانات.",
  },
  {
    icon: CheckCircle,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    step: "04",
    title: "الاستلام والدفع",
    desc: "تستلم منتجك وتدفع عند الاستلام — بدون أي دفع مسبق.",
  },
];

export default function DeliveryPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen">

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-14 px-5 text-center">
        <div className="max-w-content mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <Truck className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm text-[#CBD5E1]">الدفع عند الاستلام دائماً</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">التوصيل والشحن</h1>
          <p className="text-[#94A3B8] max-w-md mx-auto">
            نوصّل لجميع مناطق المملكة — 3 إلى 7 أيام عمل، والدفع بعد ما تستلم.
          </p>
        </div>
      </section>

      {/* Key info strip */}
      <section className="py-8 px-5 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Clock, val: "3-5 أيام", label: "مدة التوصيل", color: "#0EA5E9" },
              { icon: Truck, val: "مجاني", label: "الشحن حالياً", color: "#10B981" },
              { icon: MapPin, val: "30+ مدينة", label: "تغطية المملكة", color: "#D97706" },
              { icon: CheckCircle, val: "عند الاستلام", label: "طريقة الدفع", color: "#8B5CF6" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <p className="font-bold text-[#0F172A] text-sm">{item.val}</p>
                <p className="text-xs text-[#64748B]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 px-5">
        <div className="max-w-content mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-[#0F172A] text-center mb-8">
            كيف يصلك طلبك؟
          </h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white rounded-2xl border border-[#E2E8F0] p-5"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: step.bg }}
                >
                  <step.icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold"
                      style={{ color: step.color }}
                    >
                      {step.step}
                    </span>
                    <p className="font-bold text-[#0F172A] text-sm">{step.title}</p>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-12 px-5 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-content mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-[#0EA5E9]" />
            <h2 className="text-xl font-bold text-[#0F172A]">مناطق التوصيل</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city, i) => (
              <span
                key={i}
                className="bg-white border border-[#E2E8F0] text-sm text-[#475569] font-medium px-3 py-1.5 rounded-full"
              >
                {city}
              </span>
            ))}
            <span className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] text-sm font-bold px-3 py-1.5 rounded-full">
              وجميع مناطق المملكة
            </span>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-content mx-auto max-w-2xl">
          <h2 className="text-xl font-bold text-[#0F172A] mb-5">ملاحظات مهمة</h2>
          <div className="space-y-3">
            {[
              { icon: "📱", text: "خلّي جوالك قريب بعد الطلب — فريق التوصيل سيتصل بك لتأكيد الموعد." },
              { icon: "💳", text: "الدفع يكون عند استلام المنتج فقط — ما في أي دفع مسبق." },
              { icon: "🔄", text: "في حالة عدم التواصل، سنحاول مرة أخرى قبل إغلاق الطلب." },
              { icon: "📦", text: "إذا أردت تغيير العنوان، تواصل معنا قبل خروج الشحنة." },
            ].map((note, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                <span className="text-lg flex-shrink-0">{note.icon}</span>
                <p className="text-sm text-[#475569] leading-relaxed">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-5 text-center bg-[#F0FDF4]">
        <p className="text-[#64748B] text-sm mb-4">جاهز للطلب؟</p>
        <Link
          href="/collections"
          className="inline-block bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 py-4 rounded-xl transition-colors text-base shadow-md shadow-[#10B981]/20"
        >
          اطلب الآن — الدفع عند الاستلام
        </Link>
      </section>
    </div>
  );
}
