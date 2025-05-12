import React, { useEffect, useState } from "react";
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
import { useCartStore } from "../../../store/useCartStore";
import { CgClose } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import CartItem from "./CartIem";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cartOpen, closeCart, cart } = useCartStore();
  const [zip, setZip] = useState("");

  const calculateCartSubtotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  return (
    <Drawer
      hideBackdrop={false}
      anchor="right"
      open={cartOpen}
      onClose={closeCart}
      sx={{
        position: "relative",
      }}
      PaperProps={{
        sx: {
          overflowX: "hidden",
        },
      }}
    >
      <Container sx={{ height: "90%", width: { xs: "100vw", sm: "450px" } }}>
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
            data-testid="close-cart"
            style={{
              cursor: "pointer",
              width: "25px",
              height: "25px",
              marginRight: "1rem",
            }}
            onClick={() => closeCart()}
          />
          <Typography variant="h6" fontSize="1rem">
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
        {cart?.length > 0 && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            sx={{ height: "100%" }}
          >
            <Box>
              {cart?.map((item) => (
                <Box
                  display="flex"
                  justifyContent={"center"}
                  key={`${item.dessert_id} - ${item.size}`}
                >
                  <CartItem
                    id={`${item.dessert_id} - ${item.size}`}
                    name={item.name}
                    size={item.size}
                    price={item.price}
                    itemQuantity={item.quantity}
                    coverImage={item.images[0].url}
                  />
                </Box>
              ))}
            </Box>
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
                  data-testid="zip-code"
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
                  value={zip}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setZip(value);
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
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "1rem",
                  padding: "10px",
                  marginTop: "1rem",
                }}
              >
                ENTER ZIP CODE
              </Button>
            </Box>
          </Box>
        )}

        {cart.length === 0 && (
          <Box>
            <Typography
              variant="h6"
              fontSize="1rem"
              sx={{ textAlign: "center" }}
            >
              Your cart is empty, start shopping now!
            </Typography>
            <Button
              data-testid="shop-all-button"
              color="dark"
              variant="contained"
              sx={{
                margin: "16px auto",
                display: "block",
                width: "fit-content",
              }}
              onClick={() => {
                navigate("/shop");
                closeCart();
              }}
            >
              Shop All
            </Button>
          </Box>
        )}
      </Container>
    </Drawer>
  );
}
