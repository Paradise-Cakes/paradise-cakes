import React from "react";
import { Box, useTheme } from "@mui/material";
import { IoSadOutline } from "react-icons/io5";

export default function NotFound() {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      flexDirection={"column"}
      sx={{ margin: "6rem" }}
    >
      <IoSadOutline
        size="10rem"
        style={{ color: `${theme.palette.dark.main}` }}
      />
      <h1 style={{ textAlign: "center", fontSize: "4rem", marginBottom: "0" }}>
        404
      </h1>
      <h4 style={{ fontSize: "1rem", textAlign: "center" }}>
        Uh oh! Looks like this page doesn't exist or can't be found.
      </h4>
    </Box>
  );
}
