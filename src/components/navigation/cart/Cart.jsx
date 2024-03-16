import React from "react";
import {
  Grid,
  Typography,
  Drawer,
  Container,
  Box,
  useTheme,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { CgClose } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import CartItem from "./CartIem";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cartOpen, setCartOpen, cartItems } = useContext(CartContext);

  const toggleCart = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCartOpen(open);
  };

  const calculateCartSubtotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.dessert.price;
    });
    return total;
  };

  return (
    <Drawer
      hideBackdrop={false}
      anchor="right"
      open={cartOpen}
      onClose={toggleCart(false)}
      sx={{
        position: "relative",
      }}
      PaperProps={{
        sx: {
          overflowX: "hidden",
        },
      }}
    >
      <Container sx={{ height: "80%", width: { xs: "100vw", sm: "450px" } }}>
        <Box
          px={3}
          py={2}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            width: "100%",
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
              top: "50px",
              right: 0,
              left: 0,
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          {cartItems?.map((item, index) => (
            <Box
              display="flex"
              justifyContent={"center"}
              key={item.dessert.dessert_id}
            >
              <CartItem item={item} />
            </Box>
          ))}
          {cartItems.length === 0 && (
            <Box>
              <Typography
                variant="h6"
                fontWeight={1000}
                fontSize="1rem"
                sx={{ textAlign: "center" }}
              >
                Your cart is empty, start shopping now!
              </Typography>
              <Button
                color="dark"
                variant="contained"
                sx={{
                  margin: "16px auto",
                  display: "block",
                  width: "fit-content",
                }}
                onClick={() => {
                  navigate("/");
                  setCartOpen(false);
                }}
              >
                Shop All
              </Button>
            </Box>
          )}
          {cartItems.length > 0 && (
            <Box
              display="flex"
              padding="1rem"
              flexDirection={"column"}
              sx={{
                borderTop: `1px solid ${theme.palette.light.main}`,
                borderRadius: "0.5rem",
                boxShadow: "20px 0 20px 0 rgba(0,0,0,0.1)",
              }}
              position={"relative"}
            >
              <Box
                display="flex"
                justifyContent={"space-between"}
                width="100%"
                alignItems="center"
              >
                <Typography variant="h6" fontSize="1rem">
                  Delivery Zip
                </Typography>
                <TextField
                  sx={{ width: "120px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoLocationOutline />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    e.target.value = value.replace(/[^0-9]/g, "");
                  }}
                />
              </Box>
              <Box marginTop={"1rem"}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h6" fontSize={"1rem"}>
                    SHIPPING + HANDLING
                  </Typography>
                  <Typography variant="h6" fontSize={"1rem"}>
                    TBD
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h6" fontSize={"1rem"}>
                    SUBTOTAL
                  </Typography>
                  <Typography variant="h6" fontSize={"1rem"}>
                    ${calculateCartSubtotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Drawer>
  );
}
