import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { Box, Container } from "@mui/system";
import { Button, useTheme, CircularProgress, Typography } from "@mui/material";
import { GiFlour } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { BsCake2 } from "react-icons/bs";
import { HomeContainer } from "./HomeStyles";

export default function Home() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;

  return (
    <HomeContainer maxWidth={false}>
      <Grid className="home-grid-container-1" container>
        <Grid className="home-grid-item-1" item container xl={8}>
          <Grid className="home-grid-item-img-1" item>
            <img src={"https://placehold.co/1200x1600"} />
          </Grid>
          <Grid className="home-grid-item-img-2" item>
            <img src={"https://placehold.co/1200x1600"} />
          </Grid>
        </Grid>
        <Grid className="home-grid-item-2" item container xl={4}>
          <Box className="home-grid-item-2-box">
            <h1 className="home-hero-heading">Desserts Made from Scratch</h1>
            <Typography sx={{ fontSize: "1.25rem" }}>
              The perfect dessert everytime, made for you. Place an order today!
            </Typography>
            <Button
              className="home-hero-cta-button"
              color="primary"
              variant="contained"
            >
              Order Now
            </Button>
          </Box>
        </Grid>
      </Grid>
      <h2 className="home-section-title">Why order from paradise cakes?</h2>
      <Grid
        className="home-grid-container-2"
        container
        justifyContent={"space-evenly"}
      >
        <Grid item>
          <Box className="home-feature-box">
            <GiFlour style={{ width: "50px", height: "50px" }} />
            <h3 className="home-feature-title">Homemade</h3>
            <Typography sx={{ fontSize: "1rem", fontFamily: "Montserrat" }}>
              All my desserts are made from scratch with high quality
              ingredients.
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box className="home-feature-box">
            <MdDeliveryDining style={{ width: "50px", height: "50px" }} />
            <h3 className="home-feature-title">Local Delivery</h3>
            <Typography sx={{ fontSize: "1rem", fontFamily: "Montserrat" }}>
              Delivery is available in the greater Austin, TX area.
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box className="home-feature-box">
            <BsCake2 style={{ width: "50px", height: "50px" }} />
            <h3 className="home-feature-title">Customized Desserts</h3>
            <Typography sx={{ fontSize: "1rem", fontFamily: "Montserrat" }}>
              Personalize your cake to suit any occasion or preference!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </HomeContainer>
  );
}
