"use client";

import Link from "next/link";
import { SectionImagePlaceholder } from "./SectionImagePlaceholder";
import { ReviewStars } from "./ReviewStars";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        "group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <SectionImagePlaceholder
          labelAr="صورة المنتج"
          aspectRatio="1:1"
          color={product.color}
          className="rounded-none"
        />
        <span className="absolute top-3 right-3 bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#D97706]/20">
          كمية محدودة
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <ReviewStars value={product.ratingValue} count={product.ratingCount} />

        <h3 className="font-bold text-[#0F172A] text-[15px] leading-snug">
          {product.cardHeadingAr}
        </h3>

        <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
          {product.cardSubAr}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div>
            <span className="text-[11px] text-[#94A3B8]">ابتداءً من</span>
            <p className="text-xl font-bold text-[#0F172A] leading-none">199 ريال</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-[#10B981] font-semibold">قطعتين = 279</p>
            <p className="text-[10px] text-[#94A3B8]">الأكثر اختياراً</p>
          </div>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="block w-full bg-[#10B981] hover:bg-[#059669] text-white text-center font-bold py-3 rounded-xl transition-colors text-sm mt-1"
        >
          اختر العرض
        </Link>
      </div>
    </div>
  );
}
