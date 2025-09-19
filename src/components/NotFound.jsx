import React from "react";
import { Box, useTheme } from "@mui/material";
import { IoSadOutline } from "react-icons/io5";
import Typography from "@mui/material/Typography";

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
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">
        Uh oh! Looks like this page doesn't exist or can't be found.
      </Typography>
    </Box>
  );
}
