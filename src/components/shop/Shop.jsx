import React from "react";
import Section from "./Section";
import Grid from "@mui/material/Grid";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";

export default function Shop() {
  const getCakeDessertsQuery = useGetDesserts("cake");
  const getCupcakeDessertsQuery = useGetDesserts("cupcake");

  const { data: cakes, isLoading: isGetCakesLoading } = getCakeDessertsQuery;
  const { data: cupcakes, isLoading: isGetCupcakesLoading } =
    getCupcakeDessertsQuery;

  return (
    <Grid
      container
      sx={{
        px: { xs: 2, sm: 12, md: 10, xl: 36, xxl: 0 },
        py: { xs: 6, sm: 12, md: 24, xxl: 12 },
      }}
      spacing={5}
      justifyContent={"center"}
    >
      <Section
        title="cakes"
        description="Indulge in my delectable selection of freshly baked cakes, made with
          the finest ingredients and crafted with care."
        items={cakes}
      />
      <Section
        title="cupcakes"
        description="Explore our delectable cupcake collection: From classic flavors to creative concoctions, each bite is a miniature delight."
        items={cupcakes}
      />
    </Grid>
  );
}
