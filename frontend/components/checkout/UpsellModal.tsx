"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { UPSELL_PRICE, UPSELL_BUNDLE_PRICE } from "@/data/products";
import { SectionImagePlaceholder } from "@/components/product/SectionImagePlaceholder";
import { Zap, CheckCircle } from "lucide-react";

const UPSELL_DURATION = 13;

type UpsellModalProps = {
  products: Product[];
  onAccept: (selectedIds: string[]) => void;
  onDecline: () => void;
  isOpen: boolean;
};

export function UpsellModal({ products, onAccept, onDecline, isOpen }: UpsellModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(UPSELL_DURATION);
  // Start with all products selected
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Refs to always call the LATEST callbacks — avoids the "setState during render" error
  // because we never put these in useEffect dependency arrays
  const onDeclineRef = useRef(onDecline);
  const onAcceptRef  = useRef(onAccept);
  useEffect(() => { onDeclineRef.current = onDecline; });
  useEffect(() => { onAcceptRef.current  = onAccept;  });

  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasActed  = useRef(false);
  const isOpenRef = useRef(isOpen);
  useEffect(() => { isOpenRef.current = isOpen; });

  // Reset state when modal opens — nothing pre-selected, client chooses freely
  useEffect(() => {
    if (isOpen) {
      setSelected({});
      setSecondsLeft(UPSELL_DURATION);
      hasActed.current = false;

      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, products]);

  // Auto-decline when timer hits zero — runs AFTER render, never during
  useEffect(() => {
    if (secondsLeft === 0 && isOpenRef.current && !hasActed.current) {
      hasActed.current = true;
      onDeclineRef.current();
    }
    // ⚠️ Intentionally NOT including onDeclineRef in deps — it's a ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const toggleProduct = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedIds = products.map((p) => p.id).filter((id) => selected[id]);
  const selectedCount = selectedIds.length;

  const totalPrice =
    selectedCount === 2
      ? UPSELL_BUNDLE_PRICE
      : selectedCount === 1
      ? UPSELL_PRICE
      : 0;

  const savings =
    selectedCount === 2 ? UPSELL_PRICE * 2 - UPSELL_BUNDLE_PRICE : 0;

  const handleAccept = () => {
    if (hasActed.current || selectedCount === 0) return;
    hasActed.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    onAcceptRef.current(selectedIds);
  };

  const handleDecline = () => {
    if (hasActed.current) return;
    hasActed.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    onDeclineRef.current();
  };

  const progress = ((UPSELL_DURATION - secondsLeft) / UPSELL_DURATION) * 100;

  if (!isOpen && secondsLeft === UPSELL_DURATION) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-70 transition-all duration-300",
          isOpen
            ? "bg-black/60 backdrop-blur-sm opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        onClick={handleDecline}
        aria-hidden="true"
      />

      {/* Modal — wider to fit 2 products */}
      <div
        className={cn(
          "fixed bottom-0 inset-x-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:mx-4",
          "bg-white rounded-t-3xl md:rounded-3xl z-70 shadow-2xl overflow-hidden transition-all duration-300",
          isOpen
            ? "translate-y-0 opacity-100 md:scale-100"
            : "translate-y-full opacity-0 pointer-events-none md:scale-95"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="عرض حصري — أكمل حماية سيارتك"
      >
        {/* Countdown bar — drains right to left (RTL) */}
        <div className="h-1.5 bg-[#E2E8F0] overflow-hidden">
          <div
            className="h-full bg-[#0EA5E9] transition-all duration-1000 ease-linear"
            style={{ width: `${100 - progress}%` }}
          />
        </div>

        {/* Navy header */}
        <div className="bg-[#0F172A] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0EA5E9] rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">أكمل حماية سيارتك — عرض لمرة واحدة</p>
              <p className="text-xs font-semibold mt-0.5 text-[#94A3B8]">
                {secondsLeft > 0
                  ? `ينتهي خلال ${secondsLeft} ثانية`
                  : "انتهى العرض"}
              </p>
            </div>
          </div>

          {/* Countdown ring */}
          <div className="relative w-10 h-10 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#1E293B" strokeWidth="3" />
              <circle
                cx="20" cy="20" r="16"
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {secondsLeft}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Subtitle */}
          <p className="text-xs text-center text-[#64748B] mb-4">
            اختر المنتجات التي تريد إضافتها — بسعر حصري قبل تأكيد الطلب
          </p>

          {/* 2 Product cards — horizontal grid */}
          {products.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {products.map((product) => {
                const isChecked = selected[product.id] ?? true;
                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={cn(
                      "relative rounded-2xl border-2 p-3 text-right transition-all flex flex-col gap-2",
                      isChecked
                        ? "border-[#0EA5E9] bg-[#F0F9FF] shadow-md"
                        : "border-[#E2E8F0] bg-white hover:border-[#0EA5E9]/50"
                    )}
                  >
                    {/* Checkmark */}
                    <div
                      className={cn(
                        "absolute top-2.5 left-2.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        isChecked
                          ? "bg-[#0EA5E9] border-[#0EA5E9]"
                          : "bg-white border-[#CBD5E1]"
                      )}
                    >
                      {isChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>

                    <div className="rounded-xl overflow-hidden">
                      <SectionImagePlaceholder
                        labelAr={product.nameAr}
                        aspectRatio="1:1"
                        color={product.color}
                        className="rounded-xl"
                        src={product.image}
                        imageFit={product.imageFit ?? "cover"}
                      />
                    </div>

                    <p className="text-xs font-bold text-[#0F172A] leading-snug line-clamp-2">
                      {product.cardHeadingAr}
                    </p>

                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-[#10B981]">
                        {UPSELL_PRICE} ريال
                      </span>
                      <span className="text-xs text-[#94A3B8] line-through">199</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Bundle savings callout */}
          {selectedCount === 2 && savings > 0 && (
            <div className="bg-[#F0FDF4] border border-[#10B981]/30 rounded-xl px-4 py-2.5 flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#059669]">
                🎉 وفرت {savings} ريال بطلب الاثنين معاً!
              </span>
              <span className="text-sm font-bold text-[#0F172A]">
                المجموع: {UPSELL_BUNDLE_PRICE} ريال
              </span>
            </div>
          )}
          {selectedCount === 1 && (
            <div className="bg-[#F0F9FF] border border-[#0EA5E9]/20 rounded-xl px-4 py-2 mb-4 text-xs text-[#0EA5E9] font-medium text-center">
              أضف المنتج الثاني بـ {UPSELL_BUNDLE_PRICE - UPSELL_PRICE} ريال إضافية فقط
            </div>
          )}

          {/* Horizontal CTA buttons */}
          <div className="flex gap-2.5">
            <button
              onClick={handleDecline}
              className="flex-shrink-0 border-2 border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC] font-bold px-5 py-3.5 rounded-xl transition-colors text-sm"
            >
              تخطي
            </button>
            <button
              onClick={handleAccept}
              disabled={selectedCount === 0}
              className={cn(
                "flex-1 text-white font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg",
                selectedCount === 0
                  ? "bg-[#CBD5E1] cursor-not-allowed shadow-none"
                  : "bg-[#0EA5E9] hover:bg-[#0284C7] shadow-[#0EA5E9]/20"
              )}
            >
              <Zap className="w-4 h-4 flex-shrink-0" />
              {selectedCount > 0
                ? `أضف للطلب — ${totalPrice} ريال`
                : "اختر منتجاً أولاً"}
            </button>
          </div>

          <p className="text-[10px] text-center text-[#CBD5E1] mt-3">
            هذا السعر يظهر مرة واحدة — لن يتكرر بعد إغلاق النافذة
          </p>
        </div>
      </div>
    </>
  );
}
