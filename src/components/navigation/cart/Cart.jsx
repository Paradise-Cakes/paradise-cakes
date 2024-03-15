import { Grid, Typography } from "@mui/material";
import React from "react";

export default function Cart() {
  return (
    <Container>
      <Typography variant="h6">YOUR ORDER</Typography>
      <Grid container justifyContent={"center"}>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
}
