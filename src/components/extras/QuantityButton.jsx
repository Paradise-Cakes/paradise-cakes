import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { MdAdd, MdRemove } from "react-icons/md";

export default function QuantityButton() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      my={2}
    >
      <Button onClick={handleDecrement} startIcon={<MdRemove />} />
      <span>{quantity}</span>
      <Button onClick={handleIncrement} startIcon={<MdAdd />} />
    </Box>
  );
}
