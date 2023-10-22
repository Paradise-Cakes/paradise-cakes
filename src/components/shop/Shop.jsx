import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Shop() {
  return (
    <Grid
      container
      direction={"column"}
      style={{
        paddingTop: "132px",
        paddingLeft: "64px",
        paddingRight: "64px",
        width: "100%",
      }}
    >
      <Grid item>
        <Typography
          variant="h4"
          fontWeight={1000}
          sx={{ textAlign: "center", paddingBottom: "16px" }}
        >
          CAKES
        </Typography>
      </Grid>
      <Grid item container alignItems="center" justifyContent="space-between">
        <Grid item container justifyContent="center" xl={3} lg={4} md={6}>
          <Card sx={{ maxWidth: 500, borderRadius: "12px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="500"
                width="500"
                image="https://place-hold.it/500/666"
              />

              <CardContent
                sx={{
                  fontWeight: "800",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <div>LEMON BLUEBERRY CAKE</div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
