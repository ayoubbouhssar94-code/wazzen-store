import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الاستبدال والاسترجاع | وازن",
};

export default function ReturnsPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12 px-4">
      <div className="max-w-content mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-8">سياسة الاستبدال والاسترجاع</h1>
        <div className="space-y-6 text-[#64748B] text-sm leading-relaxed">
          <section className="bg-[#F0FDF4] rounded-2xl p-5 border border-[#10B981]/20">
            <h2 className="text-base font-bold text-[#0F172A] mb-2">ضمان الاستبدال</h2>
            <p>نضمن استبدال المنتج في حالة وجود عيب مصنعي يظهر عند الاستلام أو خلال 7 أيام من تاريخ الاستلام. تواصل معنا عبر واتساب مع صورة للعيب.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">شروط الاستبدال</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>المنتج في حالته الأصلية لم يُستخدم بشكل غير صحيح.</li>
              <li>وجود دليل واضح على عيب مصنعي (صورة أو فيديو).</li>
              <li>التواصل خلال 7 أيام من تاريخ الاستلام.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">حالات لا يشملها الضمان</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>الضرر الناتج عن الاستخدام الخاطئ أو الإهمال.</li>
              <li>الطلبات التي انقضت عليها 7 أيام من تاريخ الاستلام.</li>
              <li>رفض الاستلام من المندوب دون سبب موجه.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">كيفية الإرجاع</h2>
            <p>تواصل معنا عبر واتساب مع رقم الطلب وصورة المنتج، وسيوجهك فريقنا للخطوات التالية. لا نقبل الإرجاع بدون تنسيق مسبق.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">الاسترداد المالي</h2>
            <p>بما أن الدفع يكون عند الاستلام فقط، لا يوجد استرداد نقدي إلكتروني. في حالة وجود عيب، نستبدل المنتج مجاناً.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
