"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Phone, Truck, Clock, MessageCircle, Package } from "lucide-react";

export function ThankYouClient() {
  const params = useSearchParams();
  const orderNumber = params.get("order") ?? "";
  const customerName = params.get("name") ?? "عميلنا";
  const total = params.get("total") ?? "";
  const productName = params.get("product") ?? "";
  const qty = params.get("qty") ?? "1";
  const firstName = customerName.split(" ")[0];

  return (
    <div className="max-w-md w-full">

      {/* ─── SUCCESS HERO ────────────────────────────────────────── */}
      <div className="text-center mb-6">
        <div className="relative inline-flex mb-5">
          <div className="w-24 h-24 bg-[#F0FDF4] rounded-full flex items-center justify-center">
            <CheckCircle className="w-14 h-14 text-[#10B981]" />
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#10B981]/40 animate-ping" />
        </div>

        <h1 className="text-2xl font-bold text-[#0F172A] mb-1">
          🎉 تم تأكيد طلبك، {firstName}!
        </h1>
        <p className="text-[#64748B] text-sm">
          سيتواصل معك فريق التوصيل قريباً لتأكيد الموعد
        </p>
      </div>

      {/* ─── ORDER SUMMARY CARD ──────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-5">

        {/* Product ordered */}
        {productName && (
          <div className="px-5 py-4 bg-gradient-to-l from-[#F0FDF4] to-[#FFFDF8] border-b border-[#E2E8F0]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#64748B] mb-0.5">المنتج الذي طلبته</p>
                <p className="font-bold text-[#0F172A] text-sm leading-snug">
                  {productName}
                </p>
                <p className="text-xs text-[#10B981] font-semibold mt-0.5">
                  الكمية: {qty} {parseInt(qty) > 1 ? "قطع" : "قطعة"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order details */}
        <div className="px-5 py-4 space-y-3">
          {orderNumber && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#64748B]">رقم الطلب</span>
              <span className="font-bold text-[#0EA5E9] tracking-wide bg-[#E0F2FE] px-2.5 py-1 rounded-lg text-xs">
                #{orderNumber}
              </span>
            </div>
          )}
          {total && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#64748B]">المبلغ الإجمالي</span>
              <span className="font-bold text-[#0F172A]">{total} ريال</span>
            </div>
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#64748B]">طريقة الدفع</span>
            <span className="font-bold text-[#10B981] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              عند الاستلام
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#64748B]">موعد التوصيل</span>
            <span className="font-semibold text-[#0F172A]">3-5 أيام عمل</span>
          </div>
        </div>
      </div>

      {/* ─── NEXT STEPS ──────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-5 mb-5">
        <h2 className="font-bold text-[#0F172A] mb-4 text-sm">ماذا يحدث الآن؟</h2>
        <div className="space-y-4">
          {[
            {
              icon: Phone,
              color: "#0EA5E9",
              bg: "#E0F2FE",
              step: "01",
              title: "اتصال للتأكيد",
              desc: "فريق التوصيل سيتصل بك على الرقم المسجل لتأكيد تفاصيل الطلب.",
            },
            {
              icon: Truck,
              color: "#10B981",
              bg: "#F0FDF4",
              step: "02",
              title: "شحن طلبك",
              desc: "بعد التأكيد، يُشحن طلبك في 1-2 يوم عمل.",
            },
            {
              icon: Clock,
              color: "#D97706",
              bg: "#FEF3C7",
              step: "03",
              title: "التوصيل والدفع",
              desc: "تستلم طلبك وتدفع عند الاستلام — بدون أي دفع الآن.",
            },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: step.bg }}
              >
                <step.icon className="w-4 h-4" style={{ color: step.color }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold" style={{ color: step.color }}>
                    {step.step}
                  </span>
                  <p className="font-semibold text-sm text-[#0F172A]">{step.title}</p>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── IMPORTANT TIP ───────────────────────────────────────── */}
      <div className="bg-[#FEF3C7] rounded-2xl p-4 mb-5 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">💡</span>
        <div>
          <p className="text-sm font-bold text-[#D97706]">مهم — خلي جوالك قريب</p>
          <p className="text-xs text-[#92400E] mt-1 leading-relaxed">
            فريق التوصيل سيتصل بك على رقمك المسجل. إذا ما رديت سيحاولون مرة أخرى.
          </p>
        </div>
      </div>

      {/* ─── ACTIONS ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <a
          href="https://wa.me/966500000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbb5b] text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md shadow-[#25D366]/20"
        >
          <MessageCircle className="w-4 h-4" />
          تواصل معنا عبر واتساب
        </a>
        <Link
          href="/collections"
          className="flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A] py-3.5 rounded-xl transition-colors text-sm font-medium"
        >
          تصفح منتجات أخرى
        </Link>
      </div>

      {/* ─── BRAND FOOTER NOTE ───────────────────────────────────── */}
      <p className="text-center text-xs text-[#94A3B8] mt-6 leading-relaxed">
        شكراً لثقتك في وازن 🤍<br />
        نقف خلف كل منتج بضمان استبدال حقيقي
      </p>
    </div>
  );
}
