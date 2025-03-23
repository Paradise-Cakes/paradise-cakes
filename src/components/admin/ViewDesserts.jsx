import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import Dessert from "../dessert/Dessert";
import { CircularProgress } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ViewDesserts() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
          My Desserts
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginBottom: "1rem", marginRight: "auto" }}
        >
          <MuiLink
            color="inherit"
            underline="hover"
            component={RouterLink}
            to="/admin/home"
          >
            Admin Dashboard
          </MuiLink>
          <MuiLink
            underline="hover"
            color="text.primary"
            component={RouterLink}
            to="/admin/desserts"
            aria-current="page"
          >
            My Desserts
          </MuiLink>
        </Breadcrumbs>
        <Button
          color="success"
          variant="contained"
          sx={{ display: "block", margin: "0 auto", width: "fit-content" }}
          component={RouterLink}
          to="/admin/desserts/create"
        >
          New Dessert
        </Button>
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
                isLoading={isGetDessertsLoading}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
