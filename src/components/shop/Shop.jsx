import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export default function Shop() {
  return (
    <div
      style={{
        paddingTop: "120px",
        paddingLeft: "64px",
        paddingRight: "64px",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={1000}
        sx={{ textAlign: "center", paddingBottom: "16px" }}
      >
        CAKES
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Card sx={{ maxWidth: 500, borderRadius: "12px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              image="https://place-hold.it/300/666"
            />
            <CardContent
              sx={{ fontWeight: "800", fontSize: "1rem", textAlign: "center" }}
            >
              <div>LEMON BLUEBERRY CAKE</div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 500, borderRadius: "12px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              image="https://place-hold.it/300/666"
              alt="green iguana"
            />
            <CardContent
              sx={{ fontWeight: "800", fontSize: "1rem", textAlign: "center" }}
            >
              <div>LEMON BLUEBERRY CAKE</div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 500, borderRadius: "12px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              image="https://place-hold.it/300/666"
              alt="green iguana"
            />
            <CardContent
              sx={{ fontWeight: "800", fontSize: "1rem", textAlign: "center" }}
            >
              <div>LEMON BLUEBERRY CAKE</div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
