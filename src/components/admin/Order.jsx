import {
  Paper,
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

export default function Order(props) {
  return (
    <Paper elevation={2} className="order">
      <Box className="cat-header">
        <Typography variant="h6">Johnny Doeman</Typography>
        <Chip label={props.label} color={props.color} />
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
      <Box className="actions">
        {props.status === "NEW" && (
          <IconButton color="warning">
            <FaArrowAltCircleRight />
          </IconButton>
        )}
        {props.status === "IN_PROGRESS" && (
          <>
            <IconButton color="info">
              <FaArrowAltCircleLeft />
            </IconButton>
            <IconButton color="error">
              <FaArrowAltCircleRight />
            </IconButton>
          </>
        )}
      </Box>
    </Paper>
  );
}
