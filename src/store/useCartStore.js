import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      cartOpen: false,
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
      setCart: (cart) => set({ cart }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-store",
      getStorage: () => localStorage,
    }
  )
);
