import React, { useContext, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { MdAdd, MdRemove } from "react-icons/md";
import { useCartStore } from "../../store/useCartStore";

export default function QuantityButton({ quantity, setQuantity, cartItem }) {
  const { updateCartItemQuantity } = useCartStore();

  const handleIncrement = () => {
    setQuantity((q) => q + 1);
    updateCartItemQuantity(cartItem.id, 1);
  };

  const handleDecrement = () => {
    setQuantity((q) => q - 1);
    updateCartItemQuantity(cartItem.id, -1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      my={2}
    >
      <Button
        data-testid="quantity-dec"
        onClick={handleDecrement}
        startIcon={<MdRemove />}
      />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ width: "64px", height: "32px" }}
      >
        {quantity}
      </Box>
      <Button
        data-testid="quantity-inc"
        onClick={handleIncrement}
        startIcon={<MdAdd />}
      />
    </Box>
  );
}
