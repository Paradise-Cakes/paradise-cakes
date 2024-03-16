import React, { createContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider
      value={{ cartOpen, setCartOpen, cartItems, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
