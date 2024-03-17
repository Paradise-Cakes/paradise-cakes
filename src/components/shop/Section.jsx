import React, { useEffect, useState } from "react";
import { Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageSlider from "../image-slider/ImageSlider";
import Dessert from "../dessert/Dessert";
import { Container } from "@mui/system";
import { CircularProgress, Box } from "@mui/material";

// A function to preload a single image
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
}

export default function Section({
  title,
  description,
  items,
  isGetSectionSuccess,
  isSectionLoading,
}) {
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);

  useEffect(() => {
    if (isGetSectionSuccess) {
      const preloadPromises = items?.map((item) => {
        // If there are image URLs, use Promise.race to preload the first image
        if (item?.image_urls?.length) {
          return Promise.race(
            item.image_urls.map((img) => preloadImage(img.uri))
          );
        }
        return Promise.resolve(); // Return a resolved promise if no image URLs
      });

      // Wait for all first images from all items to be preloaded
      Promise.all(preloadPromises)
        .then(() => setCoverImageLoaded(true))
        .catch((error) => console.error("Error preloading images", error));
    }
  }, [isGetSectionSuccess, items]);

  return (
    <Container sx={{ marginBottom: "3.5rem" }} maxWidth="false">
      <Grid
        container
        spacing={3}
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
          <Typography sx={{ textAlign: { md: "center", lg: "left" } }}>
            {description}
          </Typography>
        </Grid>
        {/* <ImageSlider items={items} /> */}
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
                  isCoverImageLoaded={coverImageLoaded}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
