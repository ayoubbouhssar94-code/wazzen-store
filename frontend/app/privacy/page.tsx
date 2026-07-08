import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | وازن",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12 px-4">
      <div className="max-w-content mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-8">سياسة الخصوصية</h1>
        <div className="prose prose-sm text-[#64748B] space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#0F172A]">جمع البيانات</h2>
            <p>نجمع فقط البيانات الضرورية لإتمام طلبك وتوصيله: الاسم ورقم الجوال. لا نجمع معلومات بطاقة ائتمانية لأن الدفع يكون عند الاستلام.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#0F172A]">استخدام البيانات</h2>
            <p>نستخدم بياناتك حصراً لتأكيد وتوصيل طلبك، والتواصل معك بشأن الطلب عند الحاجة. لا نبيع بياناتك لأطراف ثالثة.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#0F172A]">ملفات تعريف الارتباط (Cookies)</h2>
            <p>قد نستخدم ملفات تعريف الارتباط لتحليل حركة الزيارات وتحسين تجربتك عبر منصات التتبع المعتمدة (Meta، TikTok، Snapchat). هذه البيانات مجهولة الهوية وتستخدم لتحسين الإعلانات فقط.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#0F172A]">حقوقك</h2>
            <p>يمكنك طلب حذف بياناتك الشخصية في أي وقت عبر التواصل معنا على واتساب أو البريد الإلكتروني.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#0F172A]">التواصل</h2>
            <p>لأي استفسارات تتعلق بالخصوصية: support@wazzen.shop</p>
          </section>
        </div>
      </div>
    </div>
  );
}
