import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import NavDrawer from "./components/navigation/NavDrawer";
import { DrawerProvider } from "./context/DrawerContext";

function App() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <DrawerProvider drawerOpen={false}>
        <Navbar />
        <NavDrawer />
      </DrawerProvider>
    </Grid>
  );
}

export default App;
