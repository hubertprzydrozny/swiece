import { create } from "zustand";

type UiState = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  lastAdded: string | null;
  setLastAdded: (name: string | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  lastAdded: null,
  setLastAdded: (lastAdded) => set({ lastAdded }),
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));
