import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  calculateBundlePrice,
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
  SHIPPING_COST,
  type ProductId,
} from "@/lib/products";

export type CartItem = { id: ProductId; qty: number };

type CartState = {
  items: CartItem[];
  add: (id: ProductId, qty?: number) => void;
  addMany: (ids: ProductId[]) => void;
  remove: (id: ProductId) => void;
  setQty: (id: ProductId, qty: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (id, qty = 1) => {
        const items = get().items.map((item) => ({ ...item }));
        const existing = items.find((item) => item.id === id);
        if (existing) existing.qty += qty;
        else items.push({ id, qty });
        set({ items });
      },
      addMany: (ids) => {
        const items = get().items.map((item) => ({ ...item }));
        for (const id of ids) {
          const existing = items.find((item) => item.id === id);
          if (existing) existing.qty += 1;
          else items.push({ id, qty: 1 });
        }
        set({ items });
      },
      remove: (id) =>
        set({ items: get().items.filter((item) => item.id !== id) }),
      setQty: (id, qty) => {
        if (qty <= 0) {
          get().remove(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, qty } : item,
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "lomma_cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function cartTotals(items: CartItem[]) {
  const quantity = cartCount(items);
  const baseSubtotal = items.reduce(
    (sum, item) => sum + PRODUCTS[item.id].price * item.qty,
    0,
  );
  const subtotal = calculateBundlePrice(quantity);
  const discount = baseSubtotal - subtotal;
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  return {
    quantity,
    baseSubtotal,
    subtotal,
    discount,
    shipping,
    total: subtotal + shipping,
    missingForFree: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}
