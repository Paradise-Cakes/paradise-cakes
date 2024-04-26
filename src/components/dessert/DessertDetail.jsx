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
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Carousel from "../carousel/Carousel";
import _, { set } from "lodash";
import QuantityButton from "../extras/QuantityButton";
import { useGetDessertById } from "../../hooks/dessert/DessertHook";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { CartContext } from "../../context/CartContext";
import { IngredientsContext } from "../../context/IngredientsContext";
import Ingredients from "./Ingredients";

// A function to preload a single image
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
}

export default function DessertDetail() {
  const { dessertId } = useParams();
  const theme = useTheme();
  const getDessertQuery = useGetDessertById(dessertId);
  const {
    data: dessert,
    isLoading: isGetDessertLoading,
    isSuccess: isGetDessertSuccess,
  } = getDessertQuery;
  const { cartItems, setCartItems, setCartOpen } = useContext(CartContext);
  const { ingredientsOpen, setIngredientsOpen } =
    useContext(IngredientsContext);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [size, setSize] = useState();

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSize(newSize);
      setQuantity(1);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState("details");
  const [price, setPrice] = useState(0);

  const calculatePrice = (quantity) => {
    const selectedSize = dessert.prices.find((price) => price.size === size);
    return selectedSize?.base * quantity;
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...dessert,
      id: dessertId,
      quantity: quantity,
      price: price / quantity,
      size: size,
    };
    const existingItem = cartItems.find(
      (item) => item.dessert_id === dessertId && item.size === size
    );
    if (existingItem) {
      setCartItems((prev) => {
        return prev.map((item) => {
          if (item.dessert_id === dessertId && item.size === size) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      });
    } else {
      setCartItems((prev) => {
        return [...prev, cartItem];
      });
    }
    setCartOpen(true);
  };

  useEffect(() => {
    if (dessert) {
      setPrice(calculatePrice(quantity));
    }
  }, [dessert, size, quantity]);

  useEffect(() => {
    if (dessert) {
      setSize(dessert.prices[0].size);
    }
  }, [dessert]);

  // Effect to preload images once data is fetched
  useEffect(() => {
    if (isGetDessertSuccess && dessert?.images && !imagesLoaded) {
      Promise.all(dessert?.images.map((img) => preloadImage(img.url)))
        .then(() => setImagesLoaded(true))
        .catch((error) => console.error("Error preloading images", error));
    }
  }, [isGetDessertSuccess, dessert]);

  return (
    <Container
      sx={{
        maxWidth: "1800px",
      }}
      maxWidth={"false"}
    >
      {isGetDessertLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={9} md={7}>
            <Carousel images={dessert.images} areImagesLoaded={imagesLoaded} />
          </Grid>
          <Grid item my={6} xs={10} md={7} lg={4}>
            <Box>
              <Typography variant="h4" fontWeight={1000}>
                {dessert.name.toUpperCase()}
              </Typography>
              <Box
                display={"flex"}
                justifyContent="space-between"
                width={"100%"}
              >
                <Box>
                  <Button
                    sx={{
                      marginRight: "1.5rem",
                      borderBottom: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 0,
                      fontWeight: 800,
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
                      fontWeight: 800,
                    }}
                    onClick={() => setIngredientsOpen(true)}
                  >
                    Ingredients
                  </Button>
                  <Ingredients ingredients={dessert.ingredients} />
                  <Typography
                    component="div"
                    sx={{ padding: "2rem 0", fontSize: "1rem" }}
                  >
                    {dessert.description}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", marginTop: "8px", marginBottom: "8px" }}
              >
                Select Size:
              </Typography>
              {dessert.prices.length > 1 && (
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
                  {dessert.prices.map((price) => (
                    <ToggleButton
                      key={price.base}
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
                        <b>{price.size}</b> - ${price.base}
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
            </Box>
            <Box>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid item xs={2}>
                  <QuantityButton
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Button
                    variant="contained"
                    sx={{ width: "100%", fontWeight: 800 }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart - ${price}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
