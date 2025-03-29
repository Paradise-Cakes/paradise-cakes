import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
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
    <Container
      maxWidth="false"
      sx={{
        margin: "4rem 0 6rem 0",
      }}
    >
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        {title.toUpperCase()}
      </Typography>
      <Grid
        container
        sx={{
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
      >
        <Grid
          item
          container
          xl={6.5}
          lg={9}
          sm={12}
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
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
                isLoading={isSectionLoading}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
