import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام | وازن",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12 px-4">
      <div className="max-w-content mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-8">الشروط والأحكام</h1>
        <div className="space-y-6 text-[#64748B] text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">قبول الشروط</h2>
            <p>باستخدام موقع وازن أو إتمام طلب، توافقين على هذه الشروط. إذا لم توافقي على أي شرط، يُرجى عدم الاستمرار في الاستخدام.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">المنتجات والأسعار</h2>
            <p>تُعرض المنتجات بدقة قدر الإمكان. الأسعار بالريال السعودي وقابلة للتغيير دون إشعار مسبق. السعر المعروض عند تأكيد الطلب هو السعر المعتمد.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">الطلبات والدفع</h2>
            <p>جميع الطلبات بالدفع عند الاستلام فقط. عند الرفض المتكرر لاستلام الطلبات، نحتفظ بحق رفض الطلبات المستقبلية.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">حدود المسؤولية</h2>
            <p>وازن غير مسؤولة عن أي أضرار غير مباشرة ناتجة عن استخدام المنتجات. ضماننا محدود باستبدال المنتج المعيب.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">الاختصاص القضائي</h2>
            <p>تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع يُحل وفق الأنظمة السعودية المعمول بها.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">التعديلات</h2>
            <p>نحتفظ بحق تعديل هذه الشروط في أي وقت. يُنصح بمراجعة الصفحة بشكل دوري.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
