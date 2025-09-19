import React, { useState } from "react";
import { Container, Box, Typography, Button, Tab, Tabs } from "@mui/material";
import ViewDesserts from "./ViewDesserts";
import CreateDessert from "./CreateDessert";
import Orders from "./Orders";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index} className="__tab-panel">
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

export default function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box className="admin-dashboard">
      <Tabs
        orientation="vertical"
        value={tabValue}
        onChange={handleTabChange}
        className="__main-tabs"
      >
        <Tab label="View Desserts" />
        <Tab label="Add Dessert" />
        <Tab label="View Orders" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <ViewDesserts />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <CreateDessert />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Orders />
      </TabPanel>
    </Box>
  );
}
