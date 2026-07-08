import { Metadata } from "next";
import { Truck, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "الشحن والتوصيل | وازن",
};

export default function ShippingPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12 px-4">
      <div className="max-w-content mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-8">الشحن والتوصيل</h1>

        <div className="space-y-4 mb-8">
          {[
            {
              icon: Truck,
              title: "التوصيل لجميع مناطق المملكة",
              desc: "نوصّل لجميع مناطق المملكة العربية السعودية بما فيها المدن الرئيسية والمدن الصغيرة.",
              color: "#10B981",
            },
            {
              icon: Clock,
              title: "مدة التوصيل",
              desc: "عادةً 3-5 أيام عمل من تأكيد الطلب. قد تختلف المدة حسب المنطقة والطلب.",
              color: "#0EA5E9",
            },
            {
              icon: Phone,
              title: "تأكيد الموعد",
              desc: "فريق التوصيل سيتواصل معك على رقمك المسجل لتحديد وقت مناسب للتوصيل.",
              color: "#D97706",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-2xl border border-[#E2E8F0] p-5"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${item.color}15` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">{item.title}</p>
                <p className="text-sm text-[#64748B] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0] text-sm text-[#64748B] space-y-2">
          <p className="font-bold text-[#0F172A]">ملاحظات مهمة:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>الدفع يكون عند استلام المنتج فقط — لا يُطلب أي دفع مسبق.</li>
            <li>خلي جوالك قريب عشان ما يتأخر طلبك.</li>
            <li>في حالة عدم الرد، سيحاول المندوب التواصل مرة أخرى.</li>
            <li>تكاليف الشحن مجانية على جميع الطلبات حالياً.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
