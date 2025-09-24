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
    <Box className="carousel" data-testid="image-carousel">
      <Box className="__mini-images-container">
        {!areImagesLoading
          ? images?.map((i, index) => (
              <Box
                className="__mini-image-container"
                key={i.image_id}
                onClick={() => handleImageChange(index)}
                sx={{
                  border:
                    index === currentImageIndex &&
                    `5px solid ${theme.palette.error.main}`,
                }}
              >
                <img src={i.url} alt={`Image ${index}`} />
              </Box>
            ))
          : images?.map((i, index) => (
              <Box className="__mini-image-container">
                <Skeleton
                  data-testid="carousel-mini-image-skeleton"
                  variant="rectangular"
                  animation="wave"
                />
              </Box>
            ))}
      </Box>
      <Box className="__main-image-container">
        {!areImagesLoading ? (
          <img
            data-testid="carousel-image"
            src={images[currentImageIndex]?.url}
            alt="dessert"
          />
        ) : (
          <Skeleton
            data-testid="carousel-image-skeleton"
            variant="rectangular"
            animation="wave"
          />
        )}
        {images?.length > 1 && (
          <RiArrowRightSLine
            className="__right-arrow"
            data-testid="carousel-right-arrow"
            onClick={() => {
              handleImageChange((currentImageIndex + 1) % images.length);
            }}
          />
        )}
        {images?.length > 1 && (
          <RiArrowLeftSLine
            className="__left-arrow"
            data-testid="carousel-left-arrow"
            onClick={() => {
              handleImageChange(
                (currentImageIndex - 1 + images.length) % images.length
              );
            }}
          />
        )}
      </Box>
      <Box className="__mini-images-container-bottom">
        {!areImagesLoading
          ? images?.map((i, index) => (
              <Box
                className="__mini-image-container"
                key={i.image_id}
                onClick={() => handleImageChange(index)}
                sx={{
                  border:
                    index === currentImageIndex &&
                    `5px solid ${theme.palette.error.main}`,
                }}
              >
                <img src={i.url} alt={`Image ${index}`} />
              </Box>
            ))
          : images?.map((i, index) => (
              <Box className="__mini-image-container">
                <Skeleton
                  data-testid="carousel-mini-image-skeleton"
                  variant="rectangular"
                  animation="wave"
                />
              </Box>
            ))}
      </Box>
    </Box>
  );
}
