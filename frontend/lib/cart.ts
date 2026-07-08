"use client";

import { create } from "zustand";
import { OFFER_PRICES, UPSELL_PRICE } from "@/data/products";

export type CartItem = {
  productId: string;
  nameAr: string;
  quantity: number;
  pricePerBundle: number;
  isUpsell: boolean;
};

type CartStore = {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;

  addBundle: (productId: string, nameAr: string, quantity: 1 | 2 | 3) => void;
  addCrossSell: (productId: string, nameAr: string) => void;
  addUpsell: (productId: string, nameAr: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;

  subtotal: () => number;
  upsellTotal: () => number;
  total: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isCartOpen: false,
  isCheckoutOpen: false,

  addBundle: (productId, nameAr, quantity) => {
    const price = OFFER_PRICES[quantity];
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === productId && !i.isUpsell
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === productId && !i.isUpsell
              ? { ...i, quantity, pricePerBundle: price }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { productId, nameAr, quantity, pricePerBundle: price, isUpsell: false },
        ],
      };
    });
  },

  addCrossSell: (productId, nameAr) => {
    set((state) => {
      const exists = state.items.find((i) => i.productId === productId);
      if (exists) return state;
      return {
        items: [
          ...state.items,
          { productId, nameAr, quantity: 1, pricePerBundle: OFFER_PRICES[1], isUpsell: false },
        ],
      };
    });
  },

  addUpsell: (productId, nameAr) => {
    set((state) => {
      const exists = state.items.find((i) => i.productId === productId && i.isUpsell);
      if (exists) return state;
      return {
        items: [
          ...state.items,
          { productId, nameAr, quantity: 1, pricePerBundle: UPSELL_PRICE, isUpsell: true },
        ],
      };
    });
  },

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  clearCart: () => set({ items: [], isCartOpen: false, isCheckoutOpen: false }),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  subtotal: () => {
    const { items } = get();
    return items
      .filter((i) => !i.isUpsell)
      .reduce((sum, i) => sum + i.pricePerBundle, 0);
  },

  upsellTotal: () => {
    const { items } = get();
    return items
      .filter((i) => i.isUpsell)
      .reduce((sum, i) => sum + i.pricePerBundle, 0);
  },

  total: () => {
    const { subtotal, upsellTotal } = get();
    return subtotal() + upsellTotal();
  },

  itemCount: () => {
    const { items } = get();
    return items.filter((i) => !i.isUpsell).length;
  },
}));
