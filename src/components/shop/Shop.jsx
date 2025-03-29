import React from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import Section from "./Section";
import _ from "lodash";

export default function Shop() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;

  return (
    <Container maxWidth="false">
      <Section
        title="Cakes"
        // description="Our cakes are made with the finest ingredients and are perfect for any occasion."
        items={_.filter(desserts, { dessert_type: "cake" })}
        isSectionLoading={isGetDessertsLoading}
      />
      <Section
        title="Cupcakes"
        // description="Our cupcakes are made with the finest ingredients and are perfect for any occasion."
        items={_.filter(desserts, { dessert_type: "cupcake" })}
        isSectionLoading={isGetDessertsLoading}
      />
      <Section
        title="Cookies"
        // description="Our cookies are made with the finest ingredients and are perfect for any occasion."
        items={_.filter(desserts, { dessert_type: "cookie" })}
        isSectionLoading={isGetDessertsLoading}
      />
      <Section
        title="Pies"
        // description="Our pies are made with the finest ingredients and are perfect for any occasion."
        items={_.filter(desserts, { dessert_type: "pie" })}
        isSectionLoading={isGetDessertsLoading}
      />
    </Container>
  );
}
