import React from "react";
import Section from "./Section";
import Grid from "@mui/material/Grid";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import _ from "lodash";

export default function Shop() {
  const getDessertsQuery = useGetDesserts();
  const { data: desserts, isLoading: isGetDessertsLoading } = getDessertsQuery;

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
        items={_.filter(desserts?.desserts, { dessert_type: "cake" })}
      />
      <Section
        title="cupcakes"
        description="Explore our delectable cupcake collection: From classic flavors to creative concoctions, each bite is a miniature delight."
        items={_.filter(desserts?.desserts, { dessert_type: "cupcake" })}
      />
    </Grid>
  );
}
