import React, { useState } from "react";
import Section from "./Section";
import Grid from "@mui/material/Grid";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { Box, Container, maxWidth } from "@mui/system";
import { Button, useTheme, CircularProgress } from "@mui/material";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dessert from "../dessert/Dessert";
import Megan from "../../assets/Megan2.png";

function CustomTabPanel(props) {
  const { children, value, dessertType, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== dessertType}
      id={`simple-tabpanel-${dessertType}`}
      aria-labelledby={`simple-tab-${dessertType}`}
      {...other}
    >
      {value === dessertType && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Shop() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;
  const theme = useTheme();
  const [value, setValue] = useState("cake");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ maxWidth: "2000px" }} maxWidth="false">
      <h1
        style={{
          fontFamily: "Pacifico",
          fontSize: "3rem",
          textAlign: "center",
          marginBottom: "0",
        }}
      >
        Desserts Made from Scratch
      </h1>
      <h2 style={{ textAlign: "center", marginBottom: "-1rem" }}>
        The perfect dessert everytime, made for you.
      </h2>
      <h2 style={{ textAlign: "center" }}>Place an order today!</h2>
      <Button
        id="order-now-btn"
        color="primary"
        variant="contained"
        sx={{
          margin: "0 auto",
          display: "block",
          fontSize: "1rem",
          textAlign: "left",
          width: "8rem",
          borderRadius: "2rem",
        }}
      >
        <Box display="flex" justifyContent={"space-between"}>
          <span style={{ color: "white" }}>Order now</span>
          <FaRegArrowAltCircleRight
            id="order-now-arrow"
            style={{
              width: "1.25rem",
              height: "1.25rem",
              color: "white",
              position: "relative",
              top: "0.2rem",
              right: "0.5rem",
            }}
          />
        </Box>
      </Button>
      <Box
        display={"flex"}
        justifyContent={"center"}
        sx={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        <img
          src={Megan}
          style={{ height: "450px", width: "600px", borderRadius: "1rem" }}
        />
      </Box>
      <Box>
        <h2 style={{ textAlign: "center" }}>What I make</h2>
      </Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          sx={{
            ".MuiTabs-indicator": {
              display: "none", // Remove the underline
            },
          }}
        >
          {_.map(
            _.sortBy(_.uniqBy(desserts, "dessert_type"), (d) => d.dessert_type),
            (dessert) => (
              <Tab
                key={dessert.dessert_type}
                label={dessert.dessert_type + "s"}
                value={dessert.dessert_type}
                sx={{
                  fontSize: "1rem",
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "1rem",
                  margin: "0 1rem",
                  "&.Mui-selected": {
                    color: "white",
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
            )
          )}
        </Tabs>
      </Box>
      {isGetDessertsLoading ? (
        <CircularProgress sx={{ display: "block", margin: "5rem auto" }} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {_.map(_.uniqBy(desserts, "dessert_type"), (dessert) => (
            <CustomTabPanel
              key={dessert.dessert_type}
              value={value}
              dessertType={dessert.dessert_type}
            >
              <Grid container spacing={5} justifyContent={"center"}>
                {_.filter(desserts, { dessert_type: value })?.map((d) => (
                  <Grid
                    key={d?.dessert_id}
                    item
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                  >
                    <Dessert
                      id={d?.dessert_id}
                      name={d?.name}
                      description={d?.description}
                      image_url={d?.images[0]?.url}
                    />
                  </Grid>
                ))}
              </Grid>
            </CustomTabPanel>
          ))}
        </Box>
      )}
    </Container>
  );
}
