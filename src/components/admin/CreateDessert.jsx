import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

export default function CreateDessert() {
  return (
    <Grid container spacing={2} my={12} mx={5}>
      <Grid item xs={12}>
        <Typography variant="h4">Create Dessert</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <TextField label="Name" fullWidth />
        </Grid>
      </Grid>
    </Grid>
  );
}
