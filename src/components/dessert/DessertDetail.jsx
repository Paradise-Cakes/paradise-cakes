import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  useTheme,
  Link,
} from "@mui/material";
import Carousel from "../carousel/Carousel";
import _, { set } from "lodash";
import QuantityButton from "../extras/QuantityButton";
import { useGetDessertById } from "../../hooks/dessert/DessertHook";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { IngredientsContext } from "../../context/IngredientsContext";
import Ingredients from "./Ingredients";
import { useCartStore } from "../../store/useCartStore";

export default function DessertDetail() {
  const { dessertId } = useParams();
  const theme = useTheme();
  const getDessertQuery = useGetDessertById(dessertId);
  const {
    data: dessert,
    isLoading: isGetDessertLoading,
    isSuccess: isGetDessertSuccess,
  } = getDessertQuery;
  const { setCart, openCart, cart } = useCartStore();
  const { ingredientsOpen, setIngredientsOpen } =
    useContext(IngredientsContext);
  const [size, setSize] = useState();

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSize(newSize);
      // setPrice(price)
      setQuantity(1);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const calculatePrice = (quantity) => {
    const selectedSize = dessert?.prices.find((price) => price.size === size);
    return selectedSize?.base_price * quantity;
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...dessert,
      id: dessertId,
      quantity: quantity,
      price: price / quantity,
      size: size,
    };

    const existingItem = cart?.find(
      (item) => item.dessert_id === dessertId && item.size === size
    );

    if (existingItem) {
      const updatedCart = cart?.map((item) => {
        if (item.dessert_id === dessertId && item.size === size) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, cartItem]);
    }

    openCart();
  };

  // useEffect(() => {
  //   if (dessert) {
  //     setPrice(calculatePrice(quantity));
  //   }
  // }, [dessert, size, quantity]);

  useEffect(() => {
    if (dessert) {
      setSize(dessert?.prices[0].size);
    }
  }, [dessert]);

  return (
    <Container maxWidth="false" data-testid="dessert-detail">
      <Grid container>
        <Grid item lg={6} xs={12} sx={{ marginRight: { xs: "0", lg: "5rem" } }}>
          <Carousel
            images={dessert?.images}
            areImagesLoading={isGetDessertLoading}
          />
        </Grid>
        <Grid item my={6} xs={12} lg={5}>
          <Box px={3}>
            <Typography variant="h4">{dessert?.name.toUpperCase()}</Typography>
            <Box display={"flex"} justifyContent="space-between" width={"100%"}>
              <Box>
                <Button
                  sx={{
                    marginRight: "1.5rem",
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: 0,
                  }}
                >
                  Details
                </Button>
                <Button
                  sx={{
                    marginRight: "1.5rem",
                    borderBottom: `2px solid blue`,
                    borderRadius: 0,
                    color: "blue",
                  }}
                  onClick={() => setIngredientsOpen(true)}
                >
                  Ingredients
                </Button>
                <Ingredients ingredients={dessert?.ingredients} />
                <Typography sx={{ padding: "2rem 0", fontSize: "1rem" }}>
                  {dessert?.description}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", marginTop: "8px", marginBottom: "8px" }}
            >
              Select Size:
            </Typography>
            {dessert?.prices.length > 1 && (
              <ToggleButtonGroup
                className="toggle-button-size"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                exclusive
                value={size}
                onChange={handleSizeChange}
              >
                {dessert?.prices.map((price) => (
                  <ToggleButton
                    key={price.base_price}
                    sx={{
                      textTransform: "none",
                      fontSize: "18px",
                      display: "block",
                      textAlign: "center",
                      color: "black",
                      height: "60px",
                      width: "49%",
                    }}
                    value={price.size}
                  >
                    <Box
                      sx={{
                        marginBottom: "-8px",
                        marginTop: "-8px",
                      }}
                    >
                      <b>{price.size}</b> - ${price.base_price}
                    </Box>
                    <Box
                      sx={{
                        marginBottom: "-8px",
                        marginTop: "-8px",
                        fontSize: "14px",
                      }}
                    ></Box>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
            <Button
              data-testid="dessert-detail-add-to-cart-button"
              variant="contained"
              onClick={handleAddToCart}
              sx={{
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "250px",
                fontSize: "1.25rem",
                marginTop: "2rem",
              }}
            >
              Add to Cart - ${price}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
