import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { fontWeight } from "@mui/system";

export default function Shop() {
  return (
    <Grid
      container
      style={{
        paddingTop: "256px",
        paddingBottom: "256px",
        paddingLeft: "256px",
        paddingRight: "256px",
        width: "100%",
      }}
      spacing={5}
      justifyContent={"center"}
    >
      <Grid item sx={{ width: "250px" }}>
        <Typography
          variant="h4"
          fontWeight={1000}
          sx={{
            textAlign: "center",
            paddingBottom: "8px",
            paddingTop: "24px",
            textAlign: "left",
          }}
        >
          CAKES
        </Typography>
        <Typography sx={{ textAlign: "left" }}>
          Indulge in my delectable selection of freshly baked cakes, made with
          the finest ingredients and crafted with care.
        </Typography>
      </Grid>
      <Grid item>
        <Card sx={{ maxWidth: 500, borderRadius: "12px" }}>
          <CardActionArea>
            <CardMedia component="img" image="https://place-hold.it/500/666" />
            <CardContent
              sx={{
                fontWeight: "800",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                CARROT CAKE
              </Typography>
              <Typography variant="body2" component="div">
                Flavorful and moist cake with a hint of spice, topped with
                creamy frosting.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ maxWidth: 500, borderRadius: "12px" }}>
          <CardActionArea>
            <CardMedia component="img" image="https://place-hold.it/500/666" />
            <CardContent
              sx={{
                fontWeight: "800",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                CHOCOLATE CAKE
              </Typography>
              <Typography variant="body2" component="div">
                Indulge in rich, velvety layers of cocoa goodness.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ maxWidth: 500, borderRadius: "12px" }}>
          <CardActionArea>
            <CardMedia component="img" image="https://place-hold.it/500/666" />
            <CardContent
              sx={{
                fontWeight: "800",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                RED VELVET CAKE
              </Typography>
              <Typography variant="body2" component="div">
                A cocoa-infused, scarlet sensation with creamy frosting.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
