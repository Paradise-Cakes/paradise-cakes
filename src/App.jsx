import React from "react";
import { Grid } from "@mui/material";
import LogoSvg from "./assets/paradise-cakes-logo.svg";

function App() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <img width="450px" height="253px" src={LogoSvg} />
    </Grid>
  );
}

export default App;
