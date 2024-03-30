import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Tab,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function AccountDashboard() {
  const [value, setValue] = useState("dashboard");

  return (
    <Container maxWidth="false" sx={{ maxWidth: "1500px" }}>
      <TabContext value={value}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4} md={3.5}>
            <Paper elevation={0} sx={{ padding: 4, borderRadius: "8px" }}>
              <Typography variant="h6" gutterBottom>
                My Account
              </Typography>
              <Typography variant="h3" fontWeight={1000} gutterBottom>
                HI ANTHONY!
              </Typography>
              <TabList
                onChange={(e, newValue) => setValue(newValue)}
                aria-label="simple tabs example"
                sx={{ marginBottom: 2 }}
                orientation="vertical"
                indicatorColor="white"
              >
                <Tab
                  label="Dashboard"
                  value="dashboard"
                  sx={{ alignItems: "flex-start" }}
                />
                <Tab
                  label="Order History"
                  value="order_history"
                  sx={{ alignItems: "flex-start" }}
                />
              </TabList>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <TabPanel value="dashboard">
              <Paper
                elevation={0}
                sx={{ padding: 4, marginBottom: 2, borderRadius: "8px" }}
              >
                <Typography variant="h6" gutterBottom>
                  PROFILE
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  marginBottom={"1rem"}
                >
                  <Typography fontWeight={1000}>First Name</Typography>
                  <Typography>Anthony</Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  marginBottom={"1rem"}
                >
                  <Typography fontWeight={1000}>Last Name</Typography>
                  <Typography>Viera</Typography>
                </Box>
              </Paper>
              <Paper elevation={0} sx={{ padding: 4, borderRadius: "8px" }}>
                <Typography variant="h6" gutterBottom>
                  RECENT ORDERS
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography>No order history</Typography>
              </Paper>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </Container>
  );
}
