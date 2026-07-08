import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ThankYouClient } from "./ThankYouClient";

export const metadata: Metadata = {
  title: "شكراً على طلبك | وازن",
  description: "تم استلام طلبك بنجاح. فريق التوصيل سيتواصل معك قريباً.",
};

export default function ThankYouPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-12"
      style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #FFFDF8 40%, #EFF6FF 100%)" }}
    >
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 mt-20">
          <div className="w-12 h-12 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#64748B] text-sm">جاري التحميل...</p>
        </div>
      }>
        <ThankYouClient />
      </Suspense>
    </div>
  );
}
