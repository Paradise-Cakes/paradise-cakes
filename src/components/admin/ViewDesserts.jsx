import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Tabs,
  Tab,
  FormControlLabel,
  FormGroup,
  Switch,
  useTheme,
} from "@mui/material";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import Dessert from "../dessert/Dessert";
import { Link as RouterLink } from "react-router-dom";

export default function ViewDesserts() {
  const theme = useTheme();
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;

  const [currentTab, setCurrentTab] = useState(0);
  const dessertCategories = ["all", "cake", "cupcake", "cookie", "pie"];
  const filteredDesserts =
    currentTab === 0
      ? desserts
      : currentTab === 5
        ? desserts?.filter((d) => d.visible === true)
        : currentTab === 6
          ? desserts?.filter((d) => d.visible === false)
          : desserts?.filter(
              (d) =>
                d.dessert_type.toLowerCase() === dessertCategories[currentTab]
            );

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
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
          sx={{
            display: "block",
            margin: "0 auto",
            width: "fit-content",
            marginBottom: "2rem",
          }}
          component={RouterLink}
          to="/admin/desserts/create"
        >
          New Dessert
        </Button>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ marginBottom: "2rem", minWidth: "max-content" }}
            indicatorColor="primary"
          >
            <Tab label="All" sx={{ fontSize: "1rem" }} />
            <Tab label="Cakes" sx={{ fontSize: "1rem" }} />
            <Tab label="Cupcakes" sx={{ fontSize: "1rem" }} />
            <Tab label="Cookies" sx={{ fontSize: "1rem" }} />
            <Tab label="Pies" sx={{ fontSize: "1rem" }} />
            <Tab label="Visible" sx={{ fontSize: "1rem" }} />
            <Tab label="Hidden" sx={{ fontSize: "1rem" }} />
          </Tabs>
        </Box>
        <Grid container spacing={5}>
          {filteredDesserts?.map((dessert) => (
            <Grid
              key={dessert?.dessert_id}
              item
              sx={{ textAlign: "center" }}
              xs={12}
              md={4}
              justifyContent={"center"}
            >
              <Dessert
                id={dessert?.dessert_id}
                dessert={dessert}
                inAdminView={true}
                isLoading={isGetDessertsLoading}
                isVisible={dessert?.visible}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
