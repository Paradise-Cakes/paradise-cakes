import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import NavSideDrawer from "./components/navigation/NavSideDrawer";
import About from "./components/about/About";
import Shop from "./components/shop/Shop";
import { DrawerProvider } from "./context/DrawerContext";
import { Route, Routes } from "react-router-dom";
import DessertDetail from "./components/dessert/DessertDetail";

function App() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <DrawerProvider drawerOpen={false}>
        <Navbar />
        <NavSideDrawer />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/desserts/cakes/:dessertId/:dessertName"
            element={<DessertDetail />}
          />
        </Routes>
      </DrawerProvider>
    </Grid>
  );
}

export default App;
