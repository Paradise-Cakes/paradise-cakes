import React from "react";
import {
  Grid,
  Typography,
  Drawer,
  Container,
  Box,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { CgClose } from "react-icons/cg";

export default function Cart() {
  const theme = useTheme();
  const { cartOpen, setCartOpen } = useContext(CartContext);

  const toggleCart = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCartOpen(open);
  };

  return (
    <Drawer
      hideBackdrop={false}
      anchor="right"
      open={cartOpen}
      onClose={toggleCart(false)}
    >
      <Container sx={{ width: "450px" }}>
        <Box
          px={3}
          py={2}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <CgClose
            style={{
              cursor: "pointer",
              width: "25px",
              height: "25px",
              marginRight: "1rem",
            }}
            onClick={() => setCartOpen(false)}
          />
          <Typography variant="h6" fontWeight={1000} fontSize="1rem">
            YOUR ORDER
          </Typography>
          <Box
            sx={{
              borderBottom: `4px solid ${theme.palette.dark.main}`,
              width: "80%",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
          ></Box>
        </Box>
      </Container>
    </Drawer>
  );
}
