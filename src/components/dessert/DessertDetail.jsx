import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import Carousel from "../carousel/Carousel";
import _, { set } from "lodash";
import { useGetDessertById } from "#hooks/dessert/DessertHook";
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
  const { addToCart, openCart } = useCartStore();
  const { setIngredientsOpen } = useContext(IngredientsContext);
  const [size, setSize] = useState();

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSize(newSize);

      const selected = dessert?.prices.find((p) => p.size === newSize);
      setPrice(selected.base_price);

      setQuantity(1);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const handleAddToCart = () => {
    const cartItem = {
      ...dessert,
      id: `${dessertId} - ${size}`,
      quantity: quantity,
      price: price,
      size: size,
    };

    addToCart(cartItem);
    openCart();
  };

  useEffect(() => {
    if (dessert && !size) {
      setSize(dessert?.prices[0].size);
      setPrice(dessert?.prices[0].base_price);
    }
  }, [dessert, size]);

  return (
    <Box className="dessert-detail" data-testid="dessert-detail">
      <Box className="__carousel">
        <Carousel
          images={dessert?.images}
          areImagesLoading={isGetDessertLoading}
        />
      </Box>
      <Box className="__details">
        <Typography variant="h3">{dessert?.name?.toUpperCase()}</Typography>
        <Box className="__drawer-tabs">
          <Button>Details</Button>
          <Button onClick={() => setIngredientsOpen(true)}>Ingredients</Button>
          <Ingredients ingredients={dessert?.ingredients} />
          <Typography sx={{ padding: "2rem 0", fontSize: "1.25rem" }}>
            {dessert?.description}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{ fontSize: "1rem", marginTop: "8px", marginBottom: "8px" }}
        >
          Select Size:
        </Typography>
        {dessert?.prices?.length > 1 && (
          <ToggleButtonGroup
            className="__toggle-buttons"
            exclusive
            value={size}
            onChange={handleSizeChange}
          >
            {dessert?.prices.map((price) => (
              <ToggleButton key={price.base_price} value={price.size}>
                <b>{price.size}</b> - ${price.base_price}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
        <Button
          className="__add-to-cart-button"
          data-testid="dessert-detail-add-to-cart-button"
          variant="contained"
          onClick={handleAddToCart}
        >
          Add to Cart - ${price}
        </Button>
      </Box>
    </Box>
  );
}
