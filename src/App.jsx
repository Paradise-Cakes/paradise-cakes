import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import NavSideDrawer from "./components/navigation/NavSideDrawer";
import About from "./components/about/About";
import Shop from "./components/shop/Shop";
import { DrawerProvider } from "./context/DrawerContext";
import { Route, Routes } from "react-router-dom";
import DessertDetail from "./components/dessert/DessertDetail";
import CreateDessert from "./components/admin/CreateDessert";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "@mui/system";

const queryClient = new QueryClient();

function App() {
  return (
    <Container
      sx={{
        my: { xs: 12, sm: 12, lg: 24 },
      }}
      maxWidth={"false"}
    >
      <QueryClientProvider client={queryClient}>
        <DrawerProvider drawerOpen={false}>
          <Navbar />
          <NavSideDrawer />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/create-dessert" element={<CreateDessert />} />
            <Route
              path="/desserts/cakes/:dessertId/:dessertName"
              element={<DessertDetail />}
            />
          </Routes>
        </DrawerProvider>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
