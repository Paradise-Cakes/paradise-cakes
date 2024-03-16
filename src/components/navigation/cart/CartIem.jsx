import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import QuantityButton from "../../extras/QuantityButton";
import { CgClose } from "react-icons/cg";
import { CartContext } from "../../../context/CartContext";

export default function CartItem({ item }) {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(item.quantity);
  const { setCartItems } = useContext(CartContext);

  const handleRemove = () => {
    setCartItems((prev) => {
      return prev.filter((cartItem) => cartItem.dessert !== item.dessert);
    });
    setQuantity(0);
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
          src="https://placehold.co/687"
          style={{
            width: "100px",
            height: "100%",
            borderRadius: "4px",
            display: "block",
            marginRight: "1rem",
          }}
        />
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={1000} fontSize="1rem">
          {item.dessert.name}
        </Typography>
        <Typography variant="h6" fontSize="1rem">
          ${item.dessert.price * quantity}
        </Typography>
        <QuantityButton
          quantity={quantity}
          setQuantity={setQuantity}
          cartItem={item}
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
