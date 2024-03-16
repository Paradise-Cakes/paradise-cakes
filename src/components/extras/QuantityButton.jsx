import React, { useContext } from "react";
import { Button, Box } from "@mui/material";
import { MdAdd, MdRemove } from "react-icons/md";
import { CartContext } from "../../context/CartContext";

export default function QuantityButton({ quantity, setQuantity, cartItem }) {
  const { setCartItems } = useContext(CartContext);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    // Update the quantity in the cart
    if (cartItem) {
      setCartItems((prev) => {
        return prev.map((item) => {
          if (item.dessert === cartItem.dessert) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    // Update the quantity in the cart
    if (cartItem) {
      setCartItems((prev) => {
        return prev.map((item) => {
          if (item.dessert === cartItem.dessert) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
      }}
      my={2}
    >
      <Button onClick={handleDecrement} startIcon={<MdRemove />} />
      <span>{quantity}</span>
      <Button onClick={handleIncrement} startIcon={<MdAdd />} />
    </Box>
  );
}
