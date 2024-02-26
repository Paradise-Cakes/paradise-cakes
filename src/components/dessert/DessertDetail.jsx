import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import Carousel from "../carousel/Carousel";
import _ from "lodash";

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
          xs={4}
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
            <Typography component="div">{description}</Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", marginTop: "8px", marginBottom: "8px" }}
            >
              Select Size:
            </Typography>
            <Grid container justifyContent="space-between">
              <Grid item xs={5.8}>
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "18px",
                    display: "block",
                    border: "1px solid black",
                    textAlign: "left",
                    color: "black",
                    height: "60px",
                    width: "100%",
                  }}
                >
                  <Box sx={{ marginBottom: "-8px", marginTop: "-8px" }}>
                    <b>6 inch</b> - $30
                  </Box>
                  <Box sx={{ marginBottom: "-8px", marginTop: "-8px" }}>
                    Serves groups of 8-12
                  </Box>
                </Button>
              </Grid>
              <Grid item xs={5.8}>
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "18px",
                    display: "block",
                    border: "1px solid black",
                    textAlign: "left",
                    color: "black",
                    height: "60px",
                    width: "100%",
                  }}
                >
                  <Box sx={{ marginBottom: "-8px", marginTop: "-8px" }}>
                    <b>10 inch</b> - $100
                  </Box>
                  <Box sx={{ marginBottom: "-8px", marginTop: "-8px" }}>
                    Serves groups of 20-30
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
