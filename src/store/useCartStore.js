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
      addToCart: (newItem) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === newItem.id);

          if (existing) {
            // Update quantity if item already exists
            return {
              cart: state.cart.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          } else {
            // Add new item to cart
            return {
              cart: [...state.cart, newItem],
            };
          }
        }),
      updateCartItemQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + delta }
                : item
            )
            .filter((item) => item.quantity > 0), // auto-remove zero-quantity,
        })),
      removeCartItem: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "cart-store",
      getStorage: () => localStorage,
    }
  )
);
