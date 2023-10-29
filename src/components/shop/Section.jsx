import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageSlider from "../image-slider/ImageSlider";
import Dessert from "../dessert/Dessert";

export default function Section({ title, description, items }) {
  return (
    <Grid item container spacing={3}>
      <Grid item md={2} sm={12} xxl={12}>
        <Typography
          variant="h4"
          fontWeight={1000}
          sx={{
            paddingBottom: "8px",
            paddingTop: "24px",
            textAlign: { md: "left", xs: "center", xxl: "center" },
          }}
        >
          {title.toUpperCase()}
        </Typography>
        <Typography
          sx={{ textAlign: { md: "left", xs: "center", xxl: "center" } }}
        >
          {description}
        </Typography>
      </Grid>
      <ImageSlider items={items} />
      <Grid
        item
        container
        xs={12}
        md={10}
        xxl={12}
        spacing={2}
        justifyContent={"left"}
        sx={{ display: { xxl: "none" } }}
      >
        {items?.map((item, index) => (
          <Grid
            key={index}
            item
            sx={{ textAlign: "center" }}
            xs={12}
            sm={6}
            md={4}
            justifyContent={"center"}
          >
            <Dessert
              id={item.id}
              name={item.name}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
