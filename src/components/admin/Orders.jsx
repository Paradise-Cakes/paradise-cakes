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
    <Box className="orders">
      <Box className="search-filter">
        <Paper className="header" elevation={2}>
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
        </Paper>
        <Box className="cats">
          <Box className="cat">
            <Paper elevation={2}>
              <Chip label="New" color="info" />
              <Typography>100 Orders</Typography>
            </Paper>
          </Box>
          <Box className="cat">
            <Paper elevation={2}>
              <Chip label="In-Progress" color="warning" />
              <Typography>100 Orders</Typography>
            </Paper>
          </Box>
          <Box className="cat">
            <Paper elevation={2}>
              <Chip label="Ready" color="error" />
              <Typography>100 Orders</Typography>
            </Paper>
          </Box>
          <Box className="cat">
            <Paper elevation={2}>
              <Chip label="Completed" color="success" />
              <Typography>100 Orders</Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
      <Box className="orders-list">
        <Box className="new">
          <Order label="New" color="info" status="NEW" />
        </Box>
        <Box className="in-progress">
          <Order label="In-Progress" color="warning" status="IN_PROGRESS" />
        </Box>
        <Box className="ready">
          <Order label="Ready" color="error" status="READY" />
        </Box>
        <Box className="completed">
          <Order label="Completed" color="success" status="COMPLETED" />
        </Box>
      </Box>
    </Box>
  );
}
