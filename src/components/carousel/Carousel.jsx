import React from "react";
import { Grid, Box, useTheme, Skeleton, Container } from "@mui/material";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

export default function Carousel({ images, areImagesLoading }) {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Container mt={6} maxWidth="false" data-testid="image-carousel">
      <Grid container justifyContent="space-between">
        <Grid
          item
          lg={1.5}
          justifyContent="center"
          sx={{ display: { xs: "none", lg: "block" } }}
        >
          {!areImagesLoading
            ? images?.map((i, index) => (
                <Box
                  key={i.image_id}
                  onClick={() => handleImageChange(index)}
                  sx={{
                    width: "100%",
                    aspectRatio: "1/1",
                    position: "relative",
                    margin: "8px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    overflow: "hidden",
                    border:
                      index === currentImageIndex
                        ? `5px solid ${theme.palette.error.main}`
                        : "1px solid transparent",
                  }}
                >
                  <img
                    src={i.url}
                    alt={`Image ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </Box>
              ))
            : images?.map((i, index) => (
                <Box
                  key={i.url}
                  sx={{
                    width: "100%",
                    aspectRatio: "1/1",
                    position: "relative",
                    margin: "8px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Skeleton
                    data-testid="carousel-mini-image-skeleton"
                    variant="rectangular"
                    animation="wave"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "12px",
                    }}
                  />
                </Box>
              ))}
        </Grid>

        <Grid item xs={12} lg={10}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              position: "relative",
              margin: "8px auto",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {!areImagesLoading ? (
              <img
                data-testid="carousel-image"
                src={images[currentImageIndex]?.url}
                alt="dessert"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <Skeleton
                data-testid="carousel-image-skeleton"
                variant="rectangular"
                animation="wave"
                width="100%"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                }}
              />
            )}
            {images?.length > 1 && (
              <Box>
                <RiArrowRightSLine
                  data-testid="carousel-right-arrow"
                  style={{
                    width: "64px",
                    height: "64px",
                    position: "absolute",
                    top: "50%",
                    right: "0px",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleImageChange((currentImageIndex + 1) % images.length);
                  }}
                />
                <RiArrowLeftSLine
                  data-testid="carousel-left-arrow"
                  style={{
                    width: "64px",
                    height: "64px",
                    position: "absolute",
                    top: "50%",
                    left: "0px",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleImageChange(
                      (currentImageIndex - 1 + images.length) % images.length
                    );
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
