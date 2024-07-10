import React from "react";
import { Box, CircularProgress, Button, useTheme } from "@mui/material";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import Section from "./Section";
import _ from "lodash";

export default function Shop() {
  const theme = useTheme();
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: theme.palette.error.main,
          padding: "1rem 0",
          position: "fixed",
          top: {
            xs: "calc(6rem + 12px)",
            sm: "calc(7rem + 3px)",
            md: "calc(9rem + 9px)",
            lg: "calc(9rem + 9px)",
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
        >
          Pies
        </Button>
      </Box>
      {!isGetDessertsLoading && isGetDessertsSuccess ? (
        <Box>
          <Section
            title="Cakes"
            description="Our cakes are made with the finest ingredients and are perfect for any occasion."
            items={_.filter(desserts, { dessert_type: "cake" })}
            isSectionLoading={isGetDessertsLoading}
          />
          <Section
            title="Cupcakes"
            description="Our cupcakes are made with the finest ingredients and are perfect for any occasion."
            items={_.filter(desserts, { dessert_type: "cupcake" })}
            isSectionLoading={isGetDessertsLoading}
          />
          <Section
            title="Cookies"
            description="Our cookies are made with the finest ingredients and are perfect for any occasion."
            items={_.filter(desserts, { dessert_type: "cookie" })}
            isSectionLoading={isGetDessertsLoading}
          />
          <Section
            title="Pies"
            description="Our pies are made with the finest ingredients and are perfect for any occasion."
            items={_.filter(desserts, { dessert_type: "pie" })}
            isSectionLoading={isGetDessertsLoading}
          />
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
