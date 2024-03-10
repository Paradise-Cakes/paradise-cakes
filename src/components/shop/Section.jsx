import React from "react";
import { Typography } from "@mui/material";
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
        {items?.map((item) => (
          <Grid
            key={item?.dessert_id}
            item
            sx={{ textAlign: "center" }}
            xs={12}
            sm={6}
            md={4}
            justifyContent={"center"}
          >
            <Dessert
              id={item?.dessert_id}
              name={item?.name}
              description={item?.description}
              image_url={item?.image_urls[0].uri}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
