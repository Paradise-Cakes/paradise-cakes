import React from "react";
import {
  Grid,
  Typography,
  Box,
  Hidden,
  useTheme,
  Skeleton,
  Container,
} from "@mui/material";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

export default function Carousel({ images, areImagesLoading }) {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const old = () => {
    return (
      <Grid item container sx={{ userSelect: "none" }}>
        <Hidden lgDown>
          <Grid
            md={1.5}
            lg={1.8}
            item
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "24px",
            }}
          >
            {!areImagesLoading
              ? images?.map((i, index) => (
                  <img
                    key={i.image_id}
                    src={i.url}
                    style={{
                      borderRadius: "12px",
                      margin: "8px",
                      cursor: "pointer",
                      aspectRatio: "4/3",
                      width: "100%",
                      border:
                        index === currentImageIndex
                          ? `5px solid ${theme.palette.error.main}`
                          : "",
                    }}
                    width={"100px"}
                    height={"100px"}
                    onClick={() => handleImageChange(index)}
                  />
                ))
              : images?.map((i, index) => (
                  <Skeleton
                    key={i.url}
                    variant="rectangular"
                    width="100%"
                    sx={{ pt: "100%", margin: "8px", borderRadius: "12px" }}
                  />
                ))}
          </Grid>
        </Hidden>
        <Grid
          md={8}
          lg={8}
          item
          sx={{
            position: "relative",
          }}
          justifyContent="center"
        >
          {!areImagesLoading ? (
            <img
              src={images[currentImageIndex]?.url}
              style={{
                borderRadius: "12px",
                aspectRatio: "4/3",
                width: "100%",
                height: "100%",
              }}
              alt="dessert"
            />
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ pt: "100%", borderRadius: "12px" }}
            />
          )}
          {images?.length > 1 && (
            <Box>
              <RiArrowRightSLine
                style={{
                  width: "64px",
                  height: "64px",
                  position: "absolute",
                  top: "50%",
                  right: "0px",
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleImageChange((currentImageIndex + 1) % images.length);
                }}
              />
              <RiArrowLeftSLine
                style={{
                  width: "64px",
                  height: "64px",
                  position: "absolute",
                  top: "50%",
                  left: "0px",
                  color: theme.palette.primary.main,
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
        </Grid>
      </Grid>
    );
  };

  /**
   * 1. Represents how big the container is that wraps the images
   * 2. Represents how big the container is for each image
   */
  return (
    <Container
      maxWidth="lg"
      sx={{
        border: "2px solid green",
        marginTop: "3.5rem",
      }}
    >
      <Grid
        container
        item
        xl={2}
        lg={9}
        sm={12}
        sx={{
          justifyContent: { md: "center" },
          border: `2px solid red`,
        }}
      >
        {areImagesLoading
          ? images?.map((i, index) => (
              // 1
              <Grid item xs={12} md={9} my={1}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{
                    pt: "100%",
                    borderRadius: "12px",
                    aspectRatio: "4/3",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Grid>
            ))
          : images?.map((i, index) => (
              // 2
              <Grid
                item
                xs={12}
                md={9}
                my={1}
                onClick={() => handleImageChange(index)}
              >
                <img
                  src={images[index]?.url}
                  style={{
                    borderRadius: "12px",
                    aspectRatio: "4/3",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    border:
                      index === currentImageIndex
                        ? `5px solid ${theme.palette.error.main}`
                        : "",
                  }}
                  alt="dessert"
                />
              </Grid>
            ))}
      </Grid>
      <Grid container item xs={2} sx={{ border: "2px solid blue" }}>
        {areImagesLoading ? (
          <Grid item xs={12} md={12} my={1}>
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{
                pt: "100%",
                borderRadius: "12px",
                aspectRatio: "4/3",
                width: "100%",
                height: "100%",
              }}
            />
          </Grid>
        ) : (
          <Grid item>
            <img
              src={images[currentImageIndex]?.url}
              style={{
                borderRadius: "12px",
                aspectRatio: "4/3",
                width: "900px",
                height: "600px",
              }}
              alt="dessert"
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
