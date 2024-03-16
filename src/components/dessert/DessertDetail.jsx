import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
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

export default function DessertDetail() {
  const { dessertId } = useParams();
  const getDessertQuery = useGetDessertById(dessertId);
  const { data: dessert, isLoading: isGetDessertLoading } = getDessertQuery;
  const { cartItems, setCartItems, setCartOpen } = useContext(CartContext);

  const [size, setSize] = useState("6 inch");

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSize(newSize);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState("details");
  const [price, setPrice] = useState(0);

  const calculatePrice = (currentSize, currentQuantity) => {
    let basePrice = dessert?.dessert?.price || 0;
    if (currentSize === "10 inch") {
      return (basePrice + 50) * currentQuantity;
    }
    return basePrice * currentQuantity;
  };

  const handleAddToCart = () => {
    const cartItem = {
      dessert: dessert?.dessert,
      quantity: quantity,
    };

    if (_.find(cartItems, { dessert: dessert?.dessert })) {
      // If the item is already in the cart, update the quantity
      setCartItems((prev) => {
        return prev.map((item) => {
          if (item.dessert === dessert?.dessert) {
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
      setPrice(calculatePrice(size, quantity));
    }
  }, [dessert, size, quantity]);

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
            <Carousel images={dessert?.dessert?.image_urls} />
          </Grid>
          <Grid item my={6} xs={10} md={7} lg={4}>
            <Box>
              <Typography variant="h4" fontWeight={1000}>
                {dessert?.dessert?.name.toUpperCase()}
              </Typography>
              <Box>
                <TabContext value={tabValue}>
                  <Box>
                    <TabList
                      onChange={(event, newValue) => setTabValue(newValue)}
                    >
                      <Tab label="Details" value="details" />
                      <Tab label="Ingredients" value="ingredients" />
                    </TabList>
                    <TabPanel value="details">
                      <Typography component="div">
                        {dessert?.dessert?.description}
                      </Typography>
                    </TabPanel>
                    <TabPanel value="ingredients">
                      <Typography component="div">
                        Cake ingredients here
                      </Typography>
                    </TabPanel>
                  </Box>
                </TabContext>
              </Box>
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", marginTop: "8px", marginBottom: "8px" }}
              >
                Select Size:
              </Typography>
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
                <ToggleButton
                  sx={{
                    textTransform: "none",
                    fontSize: "18px",
                    display: "block",
                    textAlign: "left",
                    color: "black",
                    height: "60px",
                    width: "49%",
                  }}
                  value={"6 inch"}
                >
                  <Box
                    sx={{
                      marginBottom: "-8px",
                      marginTop: "-8px",
                    }}
                  >
                    <b>6 inch</b> - ${dessert?.dessert?.price}
                  </Box>
                  <Box
                    sx={{
                      marginBottom: "-8px",
                      marginTop: "-8px",
                      fontSize: "14px",
                    }}
                  >
                    Serves groups of 8-12
                  </Box>
                </ToggleButton>
                <ToggleButton
                  sx={{
                    textTransform: "none",
                    fontSize: "18px",
                    display: "block",
                    textAlign: "left",
                    color: "black",
                    height: "60px",
                    width: "49%",
                  }}
                  value={"10 inch"}
                >
                  <Box
                    sx={{
                      marginBottom: "-8px",
                      marginTop: "-8px",
                    }}
                  >
                    <b>10 inch</b> - ${dessert?.dessert?.price + 50}
                  </Box>
                  <Box
                    sx={{
                      marginBottom: "-8px",
                      marginTop: "-8px",
                      fontSize: "14px",
                    }}
                  >
                    Serves groups of 20-30
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
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
                    sx={{ width: "100%" }}
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
