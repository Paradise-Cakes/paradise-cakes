import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageSlider from "../image-slider/ImageSlider";
import Dessert from "../dessert/Dessert";
import { Container } from "@mui/system";

export default function Section({ title, description, items }) {
  return (
    <Container sx={{ marginBottom: "2.5rem" }}>
      <Grid container spacing={3}>
        <Grid item md={12} lg={3}>
          <Typography
            variant="h4"
            fontWeight={1000}
            sx={{
              paddingBottom: "8px",
              paddingTop: "24px",
              textAlign: { md: "center", lg: "left" },
            }}
          >
            {title.toUpperCase()}
          </Typography>
          <Typography sx={{ textAlign: { md: "center", lg: "left" } }}>
            {description}
          </Typography>
        </Grid>
        <ImageSlider items={items} />
        <Grid
          item
          container
          lg={9}
          sm={12}
          sx={{
            justifyContent: { md: "center", lg: "left" },
          }}
        >
          {items?.map((item) => (
            <Grid
              key={item?.dessert_id}
              item
              sx={{ textAlign: "center" }}
              xs={12}
              md={5}
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
    </Container>
  );
}
