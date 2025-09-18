import React, { useState, forwardRef } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import MuiLikeDateRangePicker from "../extras/MuiLikeDateRangePicker";
import Order from "./Order";
import { MdOutlineExpandCircleDown } from "react-icons/md";

export default function Orders() {
  return (
    <Box className="orders">
      <Box className="search-filter">
        <Paper className="header" elevation={2}>
          <Box className="controls">
            <Box className="search">
              <Typography variant="h4" align="center" gutterBottom>
                Orders
              </Typography>
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
            </Box>
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
      <Box className="accordion-cats">
        <Accordion>
          <AccordionSummary
            expandIcon={
              <MdOutlineExpandCircleDown style={{ fontSize: "1.5rem" }} />
            }
          >
            <Typography component="span">new</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="new-accord-orders-list">
              <Order label="New" color="info" status="NEW" />
              <Order label="New" color="info" status="NEW" />
              <Order label="New" color="info" status="NEW" />
              <Order label="New" color="info" status="NEW" />
              <Order label="New" color="info" status="NEW" />
              <Order label="New" color="info" status="NEW" />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <MdOutlineExpandCircleDown style={{ fontSize: "1.5rem" }} />
            }
          >
            <Typography component="span">in-progress</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="new-accord-orders-list">
              <Order label="In-Progress" color="warning" status="IN_PROGRESS" />
              <Order label="In-Progress" color="warning" status="IN_PROGRESS" />
              <Order label="In-Progress" color="warning" status="IN_PROGRESS" />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <MdOutlineExpandCircleDown style={{ fontSize: "1.5rem" }} />
            }
          >
            <Typography component="span">Ready</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="new-accord-orders-list">
              <Order label="ready" color="error" status="READY" />
              <Order label="ready" color="error" status="READY" />
              <Order label="ready" color="error" status="READY" />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <MdOutlineExpandCircleDown style={{ fontSize: "1.5rem" }} />
            }
          >
            <Typography component="span">Completed</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="new-accord-orders-list">
              <Order label="Completed" color="success" status="COMPLETED" />
              <Order label="Completed" color="success" status="COMPLETED" />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className="orders-list">
        <Order label="New" color="info" status="NEW" />
        <Order label="In-Progress" color="warning" status="IN_PROGRESS" />
        <Order label="Ready" color="error" status="READY" />
        <Order label="Completed" color="success" status="COMPLETED" />
      </Box>
    </Box>
  );
}
