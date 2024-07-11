import React, { useEffect } from "react";
import { Box, CircularProgress, Button, useTheme } from "@mui/material";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import Section from "./Section";
import _ from "lodash";
import { Link, Element, scroller } from "react-scroll";
import { useLocation, Link as RouterLink } from "react-router-dom";

export default function Shop() {
  const location = useLocation();
  const theme = useTheme();
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;

  useEffect(() => {
    if (location.hash) {
      scroller.scrollTo(location.hash.substring(1), {
        smooth: "easeInOut",
        offset: -225,
        duration: 250,
      });
    }
  }, [location]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: theme.palette.warning.main,
          padding: "1rem 0",
          position: "fixed",
          top: {
            xs: "calc(6rem + 10px)",
            sm: "calc(7rem + 2px)",
            md: "calc(9rem + 8px)",
            lg: "calc(9rem + 8px)",
          },
          width: "100%",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            borderRadius: "1rem",
            margin: "0 1rem",
          }}
          component={RouterLink}
          to="/shop#cakes"
        >
          Cakes
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            borderRadius: "1rem",
            margin: "0 1rem",
          }}
          component={RouterLink}
          to="/shop#cupcakes"
        >
          Cupcakes
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            borderRadius: "1rem",
            margin: "0 1rem",
          }}
          component={RouterLink}
          to="/shop#cookies"
        >
          Cookies
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            borderRadius: "1rem",
            margin: "0 1rem",
          }}
          component={RouterLink}
          to="/shop#pies"
        >
          Pies
        </Button>
      </Box>
      {!isGetDessertsLoading && isGetDessertsSuccess ? (
        <Box>
          <Element name="cakes">
            <Section
              title="Cakes"
              description="Our cakes are made with the finest ingredients and are perfect for any occasion."
              items={_.filter(desserts, { dessert_type: "cake" })}
              isSectionLoading={isGetDessertsLoading}
            />
          </Element>
          <Element name="cupcakes">
            <Section
              title="Cupcakes"
              description="Our cupcakes are made with the finest ingredients and are perfect for any occasion."
              items={_.filter(desserts, { dessert_type: "cupcake" })}
              isSectionLoading={isGetDessertsLoading}
            />
          </Element>
          <Element name="cookies">
            <Section
              title="Cookies"
              description="Our cookies are made with the finest ingredients and are perfect for any occasion."
              items={_.filter(desserts, { dessert_type: "cookie" })}
              isSectionLoading={isGetDessertsLoading}
            />
          </Element>
          <Element name="pies">
            <Section
              title="Pies"
              description="Our pies are made with the finest ingredients and are perfect for any occasion."
              items={_.filter(desserts, { dessert_type: "pie" })}
              isSectionLoading={isGetDessertsLoading}
            />
          </Element>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
