import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Paper,
  Divider,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useNavigate } from "react-router-dom";
import { usePostLogout } from "../../hooks/auth/AuthHook";
import _ from "lodash";
import { fetchUserAttributes } from "aws-amplify/auth";

export default function AccountDashboard() {
  const [value, setValue] = useState("dashboard");
  const navigate = useNavigate();
  const postLogoutQuery = usePostLogout();
  const { mutateAsync: postLogout, isLoading: postLogoutLoading } =
    postLogoutQuery;
  const [user, setUser] = useState(false);

  const handleLogout = async () => {
    try {
      await postLogout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        setUser(userAttributes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Container
      maxWidth="false"
      sx={{
        maxWidth: "1500px",
      }}
    >
      <TabContext value={value}>
        <Grid
          container
          justifyContent={"center"}
          spacing={5}
          sx={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }}
        >
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ padding: 4, borderRadius: "8px" }}>
              <Typography variant="h6" gutterBottom>
                My Account
              </Typography>
              {!user ? (
                <Skeleton variant="text" animation="wave" />
              ) : (
                <Typography variant="h3" gutterBottom>
                  HI {_.upperCase(user.given_name)}!
                </Typography>
              )}

              <TabList
                onChange={(e, newValue) => setValue(newValue)}
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
              <Button onClick={handleLogout} sx={{ padding: "12px 16px" }}>
                Logout
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <TabPanel
              value="dashboard"
              sx={{ paddingTop: "0", paddingRight: 0, paddingLeft: 0 }}
            >
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
                  <Typography>First Name</Typography>
                  {!user ? (
                    <Skeleton variant="text" animation="wave" width={"8rem"} />
                  ) : (
                    <Typography>{user.given_name}</Typography>
                  )}
                </Box>
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  marginBottom={"1rem"}
                >
                  <Typography>Last Name</Typography>
                  {!user ? (
                    <Skeleton variant="text" animation="wave" width={"8rem"} />
                  ) : (
                    <Typography>{user.family_name}</Typography>
                  )}
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
            <TabPanel value="order_history">
              <Typography variant="h5" marginBottom={"1rem"}>
                ORDER HISTORY
              </Typography>
              <Typography>
                No previous orders found -{" "}
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                  }}
                  onClick={() => navigate("/")}
                >
                  shop today!
                </span>
              </Typography>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </Container>
  );
}
