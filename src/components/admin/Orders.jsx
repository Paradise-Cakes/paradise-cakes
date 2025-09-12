import React, { useState, forwardRef } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Chip,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import MuiLikeDateRangePicker from "../extras/MuiLikeDateRangePicker";
import Order from "./Order";

export default function Orders() {
  return (
    <Container className="orders">
      <Box className="header">
        <Typography variant="h4" align="center" gutterBottom>
          Orders
        </Typography>
        <Box className="controls">
          <TextField
            placeholder="Search Orders"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CiSearch />
                </InputAdornment>
              ),
            }}
          />
          <MuiLikeDateRangePicker />
        </Box>
      </Box>
      <Box className="cats">
        <Box className="cat">
          <Paper elevation={2}>
            <Chip label="Paid" color="success" />
            <Typography>100 Orders</Typography>
          </Paper>
          <Box>
            <Order />
            <Order />
            <Order />
            <Order />
          </Box>
        </Box>
        <Paper elevation={2}>
          <Chip label="Pending" color="warning" />
          <Typography>100 Orders</Typography>
        </Paper>
        <Paper elevation={2}>
          <Chip label="Refunded" color="info" />
          <Typography>100 Orders</Typography>
        </Paper>
        <Paper elevation={2}>
          <Chip label="Canceled" color="error" />
          <Typography>100 Orders</Typography>
        </Paper>
      </Box>
    </Container>
  );
}
