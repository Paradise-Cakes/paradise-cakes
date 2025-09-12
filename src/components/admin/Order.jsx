import { Paper, Box, Typography, Chip } from "@mui/material";
import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Order() {
  return (
    <Paper elevation={2} className="order">
      <Box className="header">
        <FaRegCircleUser fontSize="2rem" />
        <Typography variant="h6">Johnny Doeman</Typography>
        <Chip label="Paid" color="success" />
      </Box>
      <Box>
        <Typography>Order ID:</Typography>
        <Typography>#1234567890</Typography>
      </Box>
      <Box>
        <Typography>Payment Method:</Typography>
        <Typography>**** 1234</Typography>
      </Box>
      <Box>
        <Typography>Date:</Typography>
        <Typography>09/10/2025</Typography>
      </Box>
      <Box>
        <Typography>Price:</Typography>
        <Typography>$56.89</Typography>
      </Box>
    </Paper>
  );
}
