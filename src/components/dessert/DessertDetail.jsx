import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Carousel from "../carousel/Carousel";
import _ from "lodash";
import QuantityButton from "../extras/QuantityButton";

export default function DessertDetail() {
  const name = "Carrot Cake";
  const description =
    "A delightful, moist dessert bursting with the natural sweetness of carrots, complemented by warm spices and a luscious cream cheese frosting.";
  const images = [
    "https://place-hold.it/600/666",
    "https://place-hold.it/600/666",
    "https://place-hold.it/600/666",
    "https://place-hold.it/600/666",
  ];

  const [size, setSize] = useState("6 inch");
  const handleSize = (event, newSize) => {
    setSize(newSize);
  };
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(30);
  const [tabValue, setTabValue] = useState("details");

  return (
    <Grid
      container
      sx={{
        px: { xs: 2, lg: 0, xl: 0, xxl: 32 },
        py: { xs: 12, md: 18 },
        border: "4px solid black",
      }}
      justifyContent="space-evenly"
      spacing={3}
    >
      <Grid item md={7}>
        <Carousel images={images} />
      </Grid>
      <Grid item md={4}>
        <Box>
          <Typography variant="h4" fontWeight={1000}>
            {name?.toUpperCase()}
          </Typography>
          <Box>
            <TabContext value={tabValue}>
              <Box>
                <TabList onChange={(event, newValue) => setTabValue(newValue)}>
                  <Tab label="Details" value="details" />
                  <Tab label="Ingredients" value="ingredients" />
                </TabList>
                <TabPanel value="details">
                  <Typography component="div">{description}</Typography>
                </TabPanel>
                <TabPanel value="ingredients">
                  <Typography component="div">Cake ingredients here</Typography>
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
            onChange={handleSize}
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
              onClick={() => setPrice(30)}
            >
              <Box
                sx={{
                  marginBottom: "-8px",
                  marginTop: "-8px",
                }}
              >
                <b>6 inch</b> - $30
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
              onClick={() => setPrice(100)}
            >
              <Box
                sx={{
                  marginBottom: "-8px",
                  marginTop: "-8px",
                }}
              >
                <b>10 inch</b> - $100
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
            <Grid item xs={3.25}>
              <QuantityButton quantity={quantity} setQuantity={setQuantity} />
            </Grid>
            <Grid item xs={8}>
              <Button variant="contained" sx={{ width: "100%" }}>
                Add to Cart - ${price * quantity}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
