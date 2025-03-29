import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Dessert from "../dessert/Dessert";
import { Container } from "@mui/system";

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
        margin: "2rem 0 6rem 0",
      }}
    >
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        {title.toUpperCase()}
      </Typography>
      <Grid container>
        <Grid item container spacing={2}>
          {items?.map((item) => (
            <Grid
              key={item?.dessert_id}
              item
              sx={{ textAlign: "center" }}
              xs={12}
              md={4}
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
