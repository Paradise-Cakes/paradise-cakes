import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Box sx={{ maxWidth: "300px", margin: "0 auto" }}>
        <Button
          fullWidth
          variant="contained"
          color="info"
          component={Link}
          to="/admin/desserts/create"
          sx={{ marginTop: "1.25rem", fontSize: "1.25rem", color: "black" }}
        >
          Add Dessert
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="success"
          component={Link}
          to="/admin/desserts"
          sx={{ marginTop: "1.25rem", fontSize: "1.25rem" }}
        >
          View My Desserts
        </Button>
      </Box>
    </Container>
  );
}
