import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { height } from "@mui/system";

export default function Carousel({ images }) {
  return (
    <Grid item container justifyContent={"center"}>
      <Grid
        xs={1.5}
        item
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
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
      <Grid item sx={{ position: "relative" }}>
        <img
          src={images[0]}
          style={{ borderRadius: "12px", maxWidth: "100%", height: "auto" }}
          alt="cake"
        />
        <RiArrowRightSLine
          style={{
            width: "64px",
            height: "64px",
            position: "absolute",
            top: "50%",
            right: "0px",
            color: "#CDCBBC",
          }}
        />
        <RiArrowLeftSLine
          style={{
            width: "64px",
            height: "64px",
            position: "absolute",
            top: "50%",
            left: "0px",
            color: "#CDCBBC",
          }}
        />
      </Grid>
    </Grid>
  );
}
