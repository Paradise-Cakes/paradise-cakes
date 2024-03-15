import React from "react";
import { Grid, Typography, Box, Hidden, useTheme } from "@mui/material";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

export default function Carousel({ images }) {
  const theme = useTheme();
  return (
    <Grid item container>
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
              }}
              width={"100px"}
              height={"100px"}
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
            src={images[0]?.uri}
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
          }}
        />
      </Grid>
    </Grid>
  );
}
