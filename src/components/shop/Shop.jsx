import React from "react";
import Section from "./Section";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { Box, Container } from "@mui/system";

export default function Shop() {
  const getDessertsQuery = useGetDesserts();
  const { data: desserts, isLoading: isGetDessertsLoading } = getDessertsQuery;

  return (
    <Container>
      {isGetDessertsLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container justifyContent={"center"}>
          <Section
            title="cakes"
            description="Indulge in my delectable selection of freshly baked cakes, made with
          the finest ingredients and crafted with care."
            items={_.filter(desserts?.desserts, { dessert_type: "cake" })}
          />
          <Section
            title="cupcakes"
            description="Explore our delectable cupcake collection: From classic flavors to creative concoctions, each bite is a miniature delight."
            items={_.filter(desserts?.desserts, { dessert_type: "cupcake" })}
          />
        </Grid>
      )}
    </Container>
  );
}
