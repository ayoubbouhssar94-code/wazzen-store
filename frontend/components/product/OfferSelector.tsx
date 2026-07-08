"use client";

import { cn } from "@/lib/utils";
import type { ProductOffer } from "@/data/products";

type OfferSelectorProps = {
  offers: ProductOffer[];
  selected: 1 | 2 | 3;
  onChange: (qty: 1 | 2 | 3) => void;
};

export function OfferSelector({ offers, selected, onChange }: OfferSelectorProps) {
  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label="اختر الكمية">
      {offers.map((offer) => {
        const isSelected = selected === offer.qty;
        return (
          <button
            key={offer.qty}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(offer.qty)}
            className={cn(
              "relative flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all text-right w-full",
              isSelected
                ? "border-[#10B981] bg-[#F0FDF4] shadow-md"
                : "border-[#E2E8F0] bg-white hover:border-[#0EA5E9]"
            )}
          >
            {offer.badge && (
              <span
                className={cn(
                  "absolute -top-2.5 right-4 text-[11px] font-bold px-2 py-0.5 rounded-full",
                  isSelected
                    ? "bg-[#10B981] text-white"
                    : "bg-[#D97706] text-white"
                )}
              >
                {offer.badge}
              </span>
            )}
            <div className="flex flex-col items-start gap-0.5">
              <span
                className={cn(
                  "font-bold text-sm leading-snug",
                  isSelected ? "text-[#059669]" : "text-[#0F172A]"
                )}
              >
                {offer.label}
              </span>
              {offer.benefit && (
                <span
                  className={cn(
                    "text-xs leading-snug",
                    isSelected ? "text-[#059669]/80" : "text-[#64748B]"
                  )}
                >
                  {offer.benefit}
                </span>
              )}
            </div>
            <span
              className={cn(
                "text-lg font-bold",
                isSelected ? "text-[#10B981]" : "text-[#0F172A]"
              )}
            >
              {offer.price} ريال
            </span>
          </button>
        );
      })}
    </div>
  );
}
