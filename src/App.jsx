import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import NavSideDrawer from "./components/navigation/NavSideDrawer";
import { DrawerProvider } from "./context/DrawerContext";

function App() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <DrawerProvider drawerOpen={false}>
        <Navbar />
        <NavSideDrawer />
      </DrawerProvider>
    </Grid>
  );
}

export default App;
