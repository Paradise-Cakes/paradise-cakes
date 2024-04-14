import React from "react";
import { Box, Typography, Container } from "@mui/material";
import DessertForm from "../forms/dessert/DessertForm";

export default function CreateDessert() {
  return (
    <Container
      maxWidth="xl"
      // sx={{
      //   border: {
      //     xs: "1px solid red",
      //     sm: "1px solid blue",
      //     md: "1px solid green",
      //     lg: "1px solid orange",
      //     xl: "1px solid purple",
      //   },
      // }}
    >
      <Box px={4} sx={{ paddingTop: { xs: "1rem" } }}>
        <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
          New Dessert
        </Typography>
        <DessertForm />
      </Box>
    </Container>
  );
}
