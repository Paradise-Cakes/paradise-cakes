import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Shop() {
  return (
    <Grid
      container
      sx={{
        px: { xs: 2, md: 24 },
        py: { xs: 12, md: 12, xl: 24 },
      }}
      spacing={5}
      justifyContent={"center"}
    >
      <Grid item md={12} xl={2}>
        <Typography
          variant="h4"
          fontWeight={1000}
          sx={{
            paddingBottom: "8px",
            paddingTop: "24px",
            textAlign: { xl: "left", xs: "center" },
          }}
        >
          CAKES
        </Typography>
        <Typography sx={{ textAlign: { xl: "left", md: "center" } }}>
          Indulge in my delectable selection of freshly baked cakes, made with
          the finest ingredients and crafted with care.
        </Typography>
      </Grid>
      <Grid item sm={12} md={4} xl={3} sx={{ textAlign: "center" }}>
        <Card
          sx={{ borderRadius: "12px", maxWidth: "500px", margin: "0 auto" }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://place-hold.it/500/666"
              sx={{ maxWidth: "100%", height: "auto" }}
            />
            <CardContent
              sx={{
                fontWeight: "800",
                fontSize: "1rem",
                textAlign: "center",
                height: "64px",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                CARROT CAKE
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                A delightful, moist dessert bursting with the natural sweetness
                of carrots, complemented by warm spices and a luscious cream
                cheese frosting.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item sm={12} md={4} xl={3} sx={{ textAlign: "center" }}>
        <Card
          sx={{ borderRadius: "12px", maxWidth: "500px", margin: "0 auto" }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://place-hold.it/500/666"
              sx={{ maxWidth: "100%", height: "auto" }}
            />
            <CardContent
              sx={{
                fontWeight: "800",
                fontSize: "1rem",
                textAlign: "center",
                height: "64px",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                CHOCOLATE CAKE
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                Indulge in rich, velvety layers of cocoa goodness.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item sm={12} md={4} xl={3} sx={{ textAlign: "center" }}>
        <Card
          sx={{ borderRadius: "12px", maxWidth: "500px", margin: "0 auto" }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://place-hold.it/500/666"
              sx={{ maxWidth: "100%", height: "auto" }}
            />
            <CardContent
              sx={{
                fontWeight: "800",
                fontSize: "1rem",
                textAlign: "center",
                height: "64px",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                RED VELVET CAKE
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                A cocoa-infused, scarlet sensation with creamy frosting.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
