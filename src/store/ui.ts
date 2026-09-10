import { create } from "zustand";
import type { ProductId } from "@/lib/products";

type UiState = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addedProductId: ProductId | null;
  setAddedProduct: (id: ProductId | null) => void;
};

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  addedProductId: null,
  setAddedProduct: (addedProductId) => set({ addedProductId }),
}));
