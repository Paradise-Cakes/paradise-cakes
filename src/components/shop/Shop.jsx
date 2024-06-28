import React from "react";
import Section from "./Section";
import Grid from "@mui/material/Grid";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { Box, Container, maxWidth } from "@mui/system";

export default function Shop() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;

  return (
    <Container sx={{ maxWidth: "2000px" }} maxWidth="false">
      <Section
        title="cakes"
        description="Indulge in my delectable selection of freshly baked cakes, made with
          the finest ingredients and crafted with care."
        items={_.filter(desserts, { dessert_type: "cake" })}
        isLoading={isGetDessertsLoading}
      />
      <Section
        title="cupcakes"
        description="Explore our delectable cupcake collection: From classic flavors to creative concoctions, each bite is a miniature delight."
        items={_.filter(desserts, { dessert_type: "cupcake" })}
        isLoading={isGetDessertsLoading}
      />
    </Container>
  );
}
