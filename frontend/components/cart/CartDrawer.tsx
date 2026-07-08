"use client";

import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { products } from "@/data/products";
import { getCrossSells } from "@/data/products";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    openCheckout,
    removeItem,
    addCrossSell,
    subtotal,
    total,
  } = useCartStore();

  const mainItems = items.filter((i) => !i.isUpsell);
  const cartProductIds = mainItems.map((i) => i.productId);
  const allCrossSells = cartProductIds.flatMap((id) =>
    getCrossSells(id).map((p) => p)
  );
  const uniqueCrossSells = allCrossSells.filter(
    (p, idx, arr) =>
      arr.findIndex((x) => x.id === p.id) === idx &&
      !cartProductIds.includes(p.id)
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300",
          isCartOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="سلة المشتريات"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
          <h2 className="font-bold text-lg text-[#0F172A]">سلة المشتريات</h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-[#F8FAFC] transition-colors"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {mainItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingBag className="w-12 h-12 text-[#E2E8F0]" />
              <p className="text-[#64748B]">السلة فارغة</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              {mainItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl p-3"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#0F172A] line-clamp-2">
                      {item.nameAr}
                    </p>
                    <p className="text-xs text-[#64748B] mt-1">
                      {item.quantity} {item.quantity === 1 ? "قطعة" : "قطع"} — {item.pricePerBundle} ريال
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-[#64748B]"
                    aria-label={`حذف ${item.nameAr}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Cross-sells */}
              {uniqueCrossSells.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-bold text-[#64748B] uppercase tracking-wide mb-2">
                    كمّلي حماية سيارتك
                  </p>
                  {uniqueCrossSells.slice(0, 2).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-3 bg-[#F0F9FF] rounded-xl p-3 mb-2"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#0F172A] line-clamp-1">
                          {p.cardHeadingAr}
                        </p>
                        <p className="text-xs text-[#64748B]">ينطلب كثير مع هذا المنتج</p>
                      </div>
                      <button
                        onClick={() => addCrossSell(p.id, p.nameAr)}
                        className="shrink-0 bg-white border border-[#10B981] text-[#10B981] text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#10B981] hover:text-white transition-colors"
                      >
                        + 199 ريال
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {mainItems.length > 0 && (
          <div className="px-5 py-4 border-t border-[#E2E8F0] bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">الإجمالي</span>
              <span className="text-xl font-bold text-[#0F172A]">{subtotal()} ريال</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#10B981]">
              <span>✓</span>
              <span>الدفع عند الاستلام · بدون دفع الآن</span>
            </div>
            <button
              onClick={openCheckout}
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 rounded-xl transition-colors text-base"
            >
              تأكيد الطلب - الدفع عند الاستلام
            </button>
          </div>
        )}
      </div>
    </>
  );
}
