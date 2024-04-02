import React from "react";
import { Box, Typography, Container } from "@mui/material";
import DessertForm from "../forms/dessert/DessertForm";

export default function CreateDessert() {
  return (
    <Container>
      <Box px={8} sx={{ paddingTop: { xs: "1rem" } }}>
        <Typography
          variant="h4"
          sx={{ textAlign: { xs: "center", sm: "start" } }}
        >
          New Dessert
        </Typography>
        <DessertForm />
      </Box>
    </Container>
  );
}
