import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Link as MuiLink,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import { useGetDesserts } from "#hooks/dessert/DessertHook";
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
    <Box className="view-desserts">
      <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
        My Desserts
      </Typography>
      <Button
        className="__new-dessert-btn"
        color="success"
        variant="contained"
        component={RouterLink}
        to="/admin/desserts/create"
      >
        New Dessert
      </Button>
      <Box className="__tabs-container">
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
        >
          <Tab label="All" />
          <Tab label="Cakes" />
          <Tab label="Cupcakes" />
          <Tab label="Cookies" />
          <Tab label="Pies" />
          <Tab label="Visible" />
          <Tab label="Hidden" />
        </Tabs>
      </Box>
      <Box className="__desserts-container">
        {filteredDesserts?.map((dessert) => (
          <Dessert
            key={dessert?.dessert_id}
            dessert={dessert}
            inAdminView={true}
            isLoading={isGetDessertsLoading}
            isVisible={dessert?.visible}
          />
        ))}
      </Box>
    </Box>
  );
}
