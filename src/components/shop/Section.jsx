import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageSlider from "../image-slider/ImageSlider";
import Dessert from "../dessert/Dessert";
import { Container } from "@mui/system";
import { CircularProgress, Box } from "@mui/material";

export default function Section({
  title,
  description,
  items,
  isSectionLoading,
}) {
  return (
    <Container sx={{ marginBottom: "3.5rem" }} maxWidth="false">
      <Grid
        container
        sx={{
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
      >
        <Grid item md={12} lg={3}>
          <Typography
            variant="h4"
            fontWeight={1000}
            sx={{
              paddingBottom: "8px",
              paddingTop: "24px",
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            {title.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              textAlign: { xs: "center", md: "center", lg: "left" },
              marginRight: "1.5rem",
              marginBottom: { xs: "1.5rem", md: "0" },
            }}
          >
            {description}
          </Typography>
        </Grid>
        {isSectionLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            item
            container
            xl={6.5}
            lg={9}
            sm={12}
            sx={{
              justifyContent: { md: "center", lg: "flex-start" },
              marginTop: { sm: "0.25rem", lg: "0" },
            }}
            spacing={5}
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
                  image_url={item?.images[0]?.url}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
