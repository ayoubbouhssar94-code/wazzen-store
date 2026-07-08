"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Shield } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { isValidKSAPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { generateEventId } from "@/lib/events";
import {
  fireMetaInitiateCheckout,
  fireTikTokInitiateCheckout,
} from "@/lib/tracking";

const checkoutSchema = z.object({
  name: z.string().min(3, "اكتبي الاسم الكامل"),
  phone: z
    .string()
    .min(7, "رقم الجوال لازم يكون رقم سعودي صحيح مثل 05XXXXXXXX")
    .refine((v) => isValidKSAPhone(v), {
      message: "رقم الجوال لازم يكون رقم سعودي صحيح مثل 05XXXXXXXX",
    }),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

type CheckoutModalProps = {
  onValidSubmit: (data: CheckoutForm) => void;
};

export function CheckoutModal({ onValidSubmit }: CheckoutModalProps) {
  const { isCheckoutOpen, closeCheckout, subtotal, items } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    if (submitted) return;
    setSubmitted(true);

    const eventId = generateEventId("initiate_checkout");
    const total = subtotal();
    fireMetaInitiateCheckout(total, eventId);
    fireTikTokInitiateCheckout(total, eventId);

    onValidSubmit(data);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-60 transition-opacity duration-300",
          isCheckoutOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCheckout}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full",
          "bg-white rounded-t-3xl md:rounded-3xl z-60 shadow-2xl transition-transform duration-300",
          isCheckoutOpen
            ? "translate-y-0 md:scale-100"
            : "translate-y-full md:scale-95 pointer-events-none opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="إتمام الطلب"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-xl text-[#0F172A]">أكملي طلبك</h2>
            <button
              onClick={closeCheckout}
              className="p-2 rounded-full hover:bg-[#F8FAFC] transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F8FAFC] rounded-xl p-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">إجمالي الطلب</span>
              <span className="font-bold text-[#0F172A]">{subtotal()} ريال</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#10B981] mt-1">
              <Shield className="w-3 h-3" />
              <span>الدفع عند الاستلام · بدون دفع الآن</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label htmlFor="co-name" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                الاسم الكامل
              </label>
              <input
                id="co-name"
                type="text"
                autoComplete="name"
                placeholder="مثال: فاطمة الأحمدي"
                className={cn(
                  "w-full border rounded-xl px-4 py-3 text-right text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-shadow",
                  errors.name
                    ? "border-red-400 focus:ring-red-200"
                    : "border-[#E2E8F0] focus:ring-[#0EA5E9]/30"
                )}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="co-phone" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                رقم الجوال السعودي
              </label>
              <input
                id="co-phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="05XXXXXXXX"
                className={cn(
                  "w-full border rounded-xl px-4 py-3 text-left text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-shadow",
                  errors.phone
                    ? "border-red-400 focus:ring-red-200"
                    : "border-[#E2E8F0] focus:ring-[#0EA5E9]/30"
                )}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="w-full bg-[#10B981] hover:bg-[#059669] disabled:opacity-70 text-white font-bold py-4 rounded-xl transition-colors text-base mt-2"
            >
              {isSubmitting || submitted
                ? "جاري التأكيد..."
                : "تأكيد الطلب - الدفع عند الاستلام"}
            </button>
          </form>

          <p className="text-xs text-center text-[#64748B] mt-3">
            بعد الطلب، راح يتواصل معك فريق التوصيل لتأكيد الموعد.
          </p>
        </div>
      </div>
    </>
  );
}
