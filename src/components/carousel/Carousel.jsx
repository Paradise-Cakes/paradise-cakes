import React from "react";
import { Grid, Typography, Box, Hidden, useTheme } from "@mui/material";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

export default function Carousel({ images }) {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Grid item container sx={{ userSelect: "none" }}>
      <Hidden lgDown>
        <Grid
          md={1.5}
          lg={2}
          item
          sx={{
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "24px",
          }}
        >
          {images?.map((i, index) => (
            <img
              key={i.uri}
              src={i.uri}
              style={{
                borderRadius: "12px",
                margin: "8px",
                maxWidth: "100%",
                height: "auto",
                cursor: "pointer",
                border:
                  index === currentImageIndex
                    ? `5px solid ${theme.palette.error.main}`
                    : "",
              }}
              width={"100px"}
              height={"100px"}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </Grid>
      </Hidden>
      <Grid
        item
        sx={{ position: "relative" }}
        xs={12}
        lg={7.5}
        md={12}
        justifyContent="center"
      >
        {images && (
          <img
            src={images[currentImageIndex]?.uri}
            style={{ borderRadius: "12px", maxWidth: "100%", height: "auto" }}
            alt="cake"
          />
        )}
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
      </Grid>
    </Grid>
  );
}
