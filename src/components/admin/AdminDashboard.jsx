import React from "react";
import { Container, Breadcrumbs, Box, Link, Typography } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" align="center">
          My Dashboard
        </Typography>
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Montserrat",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        Welcome to the Admin Dashboard
      </Typography>
    </Container>
  );
}
