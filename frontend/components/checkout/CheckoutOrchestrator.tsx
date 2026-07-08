"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CheckoutModal } from "./CheckoutModal";
import { UpsellModal } from "./UpsellModal";
import { useCartStore } from "@/lib/cart";
import { getUpsellProducts } from "@/data/products";
import { submitOrder } from "@/lib/api";
import { generateEventId, readSession } from "@/lib/events";
import {
  fireMetaPurchase,
  fireTikTokPurchase,
  fireSnapPurchase,
} from "@/lib/tracking";

type CheckoutFormData = { name: string; phone: string };
type Phase = "form" | "upsell" | "submitting" | "done";

export function CheckoutOrchestrator() {
  const router = useRouter();
  const { items, addUpsell, clearCart } = useCartStore();
  const [phase, setPhase] = useState<Phase>("form");
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);

  const mainItems = items.filter((i) => !i.isUpsell);
  const mainProductIds = mainItems.map((i) => i.productId);
  const upsellProducts = getUpsellProducts(mainProductIds);

  const handleFormSubmit = useCallback((data: CheckoutFormData) => {
    setFormData(data);
    setPhase("upsell");
  }, []);

  const submitFinalOrder = useCallback(
    async (upsellIds: string[]) => {
      if (!formData) return;
      setPhase("submitting");

      const session = readSession();
      const purchaseEventId = generateEventId("purchase");

      const orderItems = [
        ...mainItems.map((i) => ({
          product_id: i.productId,
          quantity: i.quantity,
          is_upsell: false,
        })),
        ...upsellIds.map((id) => ({ product_id: id, quantity: 1, is_upsell: true })),
      ];

      try {
        const result = await submitOrder({
          customer_name: formData.name,
          phone: formData.phone,
          items: orderItems,
          ...session,
          current_url: typeof window !== "undefined" ? window.location.href : "",
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          meta_event_id: purchaseEventId,
          tiktok_event_id: purchaseEventId,
          snap_event_id: purchaseEventId,
        });

        const contents = orderItems.map((i) => ({
          id: i.product_id,
          quantity: i.quantity,
          price: 0,
        }));

        fireMetaPurchase(result.total_sar, contents, purchaseEventId);
        fireTikTokPurchase(result.total_sar, contents, purchaseEventId);
        fireSnapPurchase(result.total_sar, result.order_number, purchaseEventId);

        // Register upsell items in cart store for tracking
        upsellIds.forEach((id) => {
          const p = upsellProducts.find((up) => up.id === id);
          if (p) addUpsell(p.id, p.nameAr);
        });

        clearCart();
        setPhase("done");
        router.push(
          `/thank-you?order=${result.order_number}&name=${encodeURIComponent(result.customer_name)}&total=${result.total_sar}`
        );
      } catch (err) {
        console.error("Order submission error:", err);
        setPhase("form");
        alert(
          err instanceof Error
            ? err.message
            : "حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى."
        );
      }
    },
    [formData, mainItems, upsellProducts, addUpsell, clearCart, router]
  );

  return (
    <>
      <CheckoutModal onValidSubmit={handleFormSubmit} />
      <UpsellModal
        products={upsellProducts}
        isOpen={phase === "upsell"}
        onAccept={(selectedIds) => submitFinalOrder(selectedIds)}
        onDecline={() => submitFinalOrder([])}
      />
      {phase === "submitting" && (
        <div className="fixed inset-0 bg-white/85 backdrop-blur-sm z-80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-8 shadow-2xl border border-[#E2E8F0]">
            <div className="w-12 h-12 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-[#0F172A]">جاري تأكيد طلبك...</p>
          </div>
        </div>
      )}
    </>
  );
}
