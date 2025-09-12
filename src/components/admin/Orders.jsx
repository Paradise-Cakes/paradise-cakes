import React, { useState, forwardRef } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import MuiLikeDateRangePicker from "../extras/MuiLikeDateRangePicker";

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
    </Container>
  );
}
