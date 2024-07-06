import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  useGetDesserts,
  useGetDisplayImages,
} from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { Box, Container } from "@mui/system";
import { Button, useTheme, CircularProgress } from "@mui/material";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dessert from "../dessert/Dessert";

function CustomTabPanel(props) {
  const { children, value, dessertType, ...other } = props;

  return (
    <Container
      sx={{
        marginTop: "3.5rem",
        marginBottom: "3.5rem",
        display: value === dessertType ? "block" : "none",
      }}
      maxWidth="false"
      role="tabpanel"
      id={`simple-tabpanel-${dessertType}`}
      aria-labelledby={`simple-tab-${dessertType}`}
      {...other}
    >
      {value === dessertType && children}
    </Container>
  );
}

export default function Shop() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;
  const getDisplayImagesQuery = useGetDisplayImages();
  const {
    data: displayImages,
    isLoading: isGetDisplayImagesLoading,
    isSuccess: isGetDisplayImagesSuccess,
  } = getDisplayImagesQuery;
  const theme = useTheme();
  const [value, setValue] = useState("cake");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="false">
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
        The perfect dessert every time, made for you.
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
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
          overflow: "hidden",
          border: "10px solid green",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            border: "1px solid red",
            width: "100%",
            height: "500px",
            position: "relative",
          }}
        >
          {/* {_.map(displayImages, (image, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "1rem",
                border: `10px solid ${theme.palette.primary.main}`,
                width: "fit-content",
                position: "absolute",
                animation: "scroller 10s linear infinite",
                marginLeft: `${index * 500}px`, // Adjust the margin as needed
                "@keyframes scroller": {
                  "0%": { left: `calc(40% - ${index * 500}px)` }, // Adjust start position
                  "100%": { left: `calc(-40% - ${index * 500}px)` }, // Adjust end position
                },
              }}
            >
              <img
                src={image}
                alt={`Display ${index}`}
                style={{
                  borderRadius: "1rem",
                }}
              />
            </Box>
          ))} */}

          {_.map(_.reverse(displayImages), (image, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "1rem",
                border: `10px solid ${theme.palette.error.main}`,
                width: "fit-content",
                position: "absolute",
                animation: "scrollerd 10s linear infinite",
                marginRight: `${index * 500}px`, // Adjust the margin as needed
                "@keyframes scrollerd": {
                  "0%": { right: `calc(0% - ${index * 500}px)` }, // Adjust start position
                  "100%": { right: `calc(40% - ${index * 500}px)` }, // Adjust end position
                },
                // left: `calc(0% + ${index * 500}px)`,
              }}
            >
              <img
                src={image}
                alt={`Display ${index}`}
                style={{
                  borderRadius: "1rem",
                }}
              />
            </Box>
          ))}
        </Box>
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
        <Box>
          {_.map(_.uniqBy(desserts, "dessert_type"), (dessert) => (
            <CustomTabPanel value={value} dessertType={dessert.dessert_type}>
              <Grid container spacing={10} justifyContent={"center"}>
                {_.filter(desserts, { dessert_type: value })?.map((d) => (
                  <Grid key={d?.dessert_id} item xl={3}>
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
