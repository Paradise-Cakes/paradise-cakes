import { describe, expect, test, beforeEach } from "vitest";
import { useCartStore } from "../../../src/store/useCartStore";

// Clear Zustand + localStorage state between tests
beforeEach(() => {
  localStorage.clear();
  useCartStore.persist.clearStorage();
  useCartStore.setState({ cart: [], cartOpen: false });
});

describe("useCartStore with persist", () => {
  test("starts with empty cart and closed drawer", () => {
    expect(useCartStore.getState().cart).toEqual([]);
    expect(useCartStore.getState().cartOpen).toBe(false);
  });

  test("opens and closes the cart", () => {
    useCartStore.getState().openCart();
    expect(useCartStore.getState().cartOpen).toBe(true);

    useCartStore.getState().closeCart();
    expect(useCartStore.getState().cartOpen).toBe(false);
  });

  test("adds a new item to the cart", () => {
    useCartStore.getState().addToCart({ id: "cake1", quantity: 1 });

    expect(useCartStore.getState().cart).toEqual([
      { id: "cake1", quantity: 1 },
    ]);
  });

  test("increments quantity of existing item", () => {
    useCartStore.getState().addToCart({ id: "cake1", quantity: 1 });
    useCartStore.getState().addToCart({ id: "cake1", quantity: 2 });

    expect(useCartStore.getState().cart).toEqual([
      { id: "cake1", quantity: 3 },
    ]);
  });

  test("updates item quantity and removes if zero", () => {
    useCartStore.getState().addToCart({ id: "cake1", quantity: 3 });
    useCartStore.getState().updateCartItemQuantity("cake1", -3);

    expect(useCartStore.getState().cart).toEqual([]);
  });

  test("removes a cart item", () => {
    useCartStore.getState().addToCart({ id: "cake1", quantity: 2 });
    useCartStore.getState().addToCart({ id: "cake2", quantity: 1 });

    useCartStore.getState().removeCartItem("cake1");

    expect(useCartStore.getState().cart).toEqual([
      { id: "cake2", quantity: 1 },
    ]);
  });

  test("clears the cart", () => {
    useCartStore.getState().setCart([{ id: "x", quantity: 1 }]);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().cart).toEqual([]);
  });

  test("persists state to localStorage", () => {
    useCartStore.getState().addToCart({ id: "cakeX", quantity: 1 });
    const saved = localStorage.getItem("cart-store");

    expect(saved).toContain("cakeX");
  });

  test("addToCart leaves other items unchanged", () => {
    const store = useCartStore.getState();

    store.addToCart({ id: "cake1", quantity: 1 });
    store.addToCart({ id: "cake2", quantity: 1 }); // won't match cake1

    store.addToCart({ id: "cake1", quantity: 1 });

    expect(useCartStore.getState().cart).toEqual([
      { id: "cake1", quantity: 2 }, // updated
      { id: "cake2", quantity: 1 }, // unchanged
    ]);
  });

  test("updateCartItemQuantity leaves other items unchanged", () => {
    const store = useCartStore.getState();

    store.addToCart({ id: "cake1", quantity: 1 });
    store.addToCart({ id: "cake2", quantity: 1 });
    store.addToCart({ id: "cake1", quantity: 1 });
    store.updateCartItemQuantity("cake2", 1); // increment cake2

    expect(useCartStore.getState().cart).toEqual([
      { id: "cake1", quantity: 2 }, // unchanged
      { id: "cake2", quantity: 2 }, // updated
    ]);
  });
});
