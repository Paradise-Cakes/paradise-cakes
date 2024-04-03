import React from "react";
import { Box, Typography, Container } from "@mui/material";
import DessertForm from "../forms/dessert/DessertForm";

export default function CreateDessert() {
  return (
    <Container maxWidth={"false"}>
      <Box px={8} sx={{ paddingTop: { xs: "1rem" } }}>
        <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
          New Dessert
        </Typography>
        <DessertForm />
      </Box>
    </Container>
  );
}
