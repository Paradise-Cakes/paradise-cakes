import React, { useContext, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { MdAdd, MdRemove } from "react-icons/md";
import { useCartStore } from "../../store/useCartStore";

export default function QuantityButton({
  quantity,
  setQuantity,
  cartItem = null,
}) {
  const { setCart } = useCartStore();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    // Update the quantity in the cart
    if (cartItem) {
      setCart((prev) => {
        return prev.map((item) => {
          if (item.id === cartItem.id && item.size === cartItem.size) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1 || cartItem) {
      setQuantity((prev) => prev - 1);
    }
    // Update the quantity in the cart
    if (cartItem) {
      setCart((prev) => {
        return prev.map((item) => {
          if (item.id === cartItem.id && item.size === cartItem.size) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      });
    }
  };

  useEffect(() => {
    if (quantity === 0) {
      setCart((prev) => {
        return prev.filter(
          (item) => item.id !== cartItem.id || item.size !== cartItem.size
        );
      });
    }
  }, [quantity]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      my={2}
    >
      <Button onClick={handleDecrement} startIcon={<MdRemove />} />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ width: "64px", height: "32px" }}
      >
        {quantity}
      </Box>
      <Button onClick={handleIncrement} startIcon={<MdAdd />} />
    </Box>
  );
}
