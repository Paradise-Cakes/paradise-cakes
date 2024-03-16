import React, { createContext, useEffect, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems") !== null
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartOpen, setCartOpen, cartItems, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
