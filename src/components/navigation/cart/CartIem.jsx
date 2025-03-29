import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import QuantityButton from "../../extras/QuantityButton";
import { CgClose } from "react-icons/cg";
import { useCartStore } from "../../../store/useCartStore";

export default function CartItem({
  id,
  name,
  size,
  price,
  itemQuantity,
  coverImage,
}) {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(itemQuantity);
  const { setCart } = useCartStore();

  // remove the item from the cart that matches the size and dessert
  const handleRemove = () => {
    setCart((prev) => {
      return prev.filter(
        (cartItem) => cartItem.id !== id || cartItem.size !== size
      );
    });
  };

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.dark.main}`,
        width: "100%",
        margin: "0.5rem",
        borderRadius: "4px",
        height: "auto",
        padding: "15px",
        display: "flex",
        position: "relative",
      }}
    >
      <Box>
        <img
          src={coverImage}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "4px",
            display: "block",
            marginRight: "1rem",
          }}
        />
      </Box>
      <Box>
        <Typography variant="h6" fontSize="1rem">
          {name} - {size}
        </Typography>
        <Typography variant="h6" fontSize="1rem">
          ${price * quantity}
        </Typography>
        <QuantityButton
          quantity={quantity}
          setQuantity={setQuantity}
          cartItem={{ id, name, size, price }}
        />
        <CgClose
          style={{
            cursor: "pointer",
            width: "25px",
            height: "25px",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={() => handleRemove()}
        />
      </Box>
    </Box>
  );
}
