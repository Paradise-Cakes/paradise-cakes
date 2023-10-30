import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Carousel from "../carousel/Carousel";

export default function DessertDetail() {
  const name = "Carrot Cake";
  const description =
    "A delightful, moist dessert bursting with the natural sweetness of carrots, complemented by warm spices and a luscious cream cheese frosting.";
  const images = [
    "https://place-hold.it/800/666",
    "https://place-hold.it/800/666",
    "https://place-hold.it/800/666",
    "https://place-hold.it/800/666",
  ];
  return (
    <Grid
      container
      sx={{
        px: { xs: 2, lg: 0, xl: 0, xxl: 32 },
        py: { xs: 12, md: 18 },
        border: "4px solid black",
      }}
    >
      <Grid
        item
        container
        xs={12}
        sx={{
          border: "1px solid orange",
        }}
        justifyContent={"center"}
      >
        <Grid item container md={6} sx={{ border: "1px solid red" }}>
          <Carousel images={images} />
        </Grid>
        <Grid
          item
          container
          xs={3}
          sx={{ padding: "256px 32px", border: "1px solid blue" }}
        >
          <Box>
            <Typography
              variant="h3"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {name.toUpperCase()}
            </Typography>
            <Typography variant="body1" component="div">
              {description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
