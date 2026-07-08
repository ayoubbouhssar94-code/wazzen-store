import { Metadata } from "next";
import { MessageCircle, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصل معنا | وازن",
  description: "تواصل مع فريق وازن عبر واتساب أو البريد الإلكتروني.",
};

const deliveryFAQ = [
  {
    q: "متى سيتم التواصل معي بعد الطلب؟",
    a: "فريق التوصيل سيتواصل معك خلال 24-48 ساعة من وقت الطلب.",
  },
  {
    q: "كيف أتتبع طلبي؟",
    a: "تواصل معنا على واتساب مع رقم الطلب وسنحدثك بآخر المستجدات.",
  },
  {
    q: "ماذا لو لم يصلني الطلب؟",
    a: "إذا تأخر التوصيل عن الوعد، تواصل معنا فوراً وسنحل المشكلة.",
  },
  {
    q: "هل يمكنني تغيير العنوان بعد الطلب؟",
    a: "نعم، تواصل معنا قبل خروج الشحنة وسنعدل التفاصيل.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-12 px-4 text-center">
        <div className="max-w-content mx-auto">
          <h1 className="text-3xl font-bold mb-2">تواصل معنا</h1>
          <p className="text-[#94A3B8]">فريق وازن جاهز لمساعدتك</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-content mx-auto max-w-2xl">
          {/* Contact options */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-5 hover:bg-[#25D366]/20 transition-colors"
            >
              <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">واتساب</p>
                <p className="text-sm text-[#64748B]">الأسرع للرد — راسلنا الآن</p>
              </div>
            </a>

            <a
              href="mailto:support@wazzen.shop"
              className="flex items-center gap-4 bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-2xl p-5 hover:bg-[#0EA5E9]/20 transition-colors"
            >
              <div className="w-12 h-12 bg-[#0EA5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">البريد الإلكتروني</p>
                <p className="text-sm text-[#64748B]">support@wazzen.shop</p>
              </div>
            </a>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl p-4 mb-8 border border-[#E2E8F0]">
            <Clock className="w-5 h-5 text-[#0EA5E9] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#0F172A] text-sm">ساعات الدعم</p>
              <p className="text-xs text-[#64748B]">الأحد - الخميس: 9 صباحاً - 10 مساءً | السبت: 10 صباحاً - 6 مساءً</p>
            </div>
          </div>

          {/* Delivery FAQ */}
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">أسئلة عن التوصيل والطلبات</h2>
          <div className="space-y-3">
            {deliveryFAQ.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                <p className="font-semibold text-[#0F172A] text-sm mb-1">{faq.q}</p>
                <p className="text-xs text-[#64748B] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
