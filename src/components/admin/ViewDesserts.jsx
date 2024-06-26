import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import Dessert from "../dessert/Dessert";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function ViewDesserts() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;
  return (
    <Container maxWidth="xl">
      <Box px={4} sx={{ paddingTop: { xs: "1rem" } }}>
        <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
          My Desserts
        </Typography>
        <Button
          color="success"
          variant="contained"
          sx={{ display: "block", margin: "0 auto", width: "fit-content" }}
          component={Link}
          to="/admin/desserts/create"
        >
          New Dessert
        </Button>
        <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
          Desserts
        </Typography>
        {isGetDessertsLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            item
            container
            xl={6.5}
            lg={9}
            sm={12}
            sx={{
              justifyContent: { md: "center", lg: "flex-start" },
              marginTop: { sm: "0.25rem", lg: "0" },
            }}
            spacing={5}
          >
            {desserts?.map((dessert) => (
              <Grid
                key={dessert?.dessert_id}
                item
                sx={{ textAlign: "center" }}
                xs={12}
                md={6}
                justifyContent={"center"}
              >
                <Dessert
                  id={dessert?.dessert_id}
                  name={dessert?.name}
                  description={dessert?.description}
                  image_url={dessert?.images[0]?.url}
                  isCoverImageLoaded={true}
                  inAdminView={true}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
