import React from "react";
import { Grid, useTheme } from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import NavSideDrawer from "./components/navigation/NavSideDrawer";
import Cart from "./components/navigation/cart/Cart";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import { DrawerProvider } from "./context/DrawerContext";
import { CartProvider } from "./context/CartContext";
import { AccountProvider } from "./context/AccountContext";
import { Route, Routes } from "react-router-dom";
import DessertDetail from "./components/dessert/DessertDetail";
import CreateDessert from "./components/admin/CreateDessert";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "@mui/system";
import { IngredientsProvider } from "./context/IngredientsContext";
import CustomOrderForm from "./components/forms/custom-order/CustomOrderForm";
import SignIn from "./components/navigation/auth/SignIn";
import SignUp from "./components/navigation/auth/SignUp";
import ConfirmationCode from "./components/navigation/auth/ConfirmationCode";
import LoggedInModal from "./components/navigation/auth/LoggedInModal";
import AccountDashboard from "./components/account/AccountDashboard";
import ViewDesserts from "./components/admin/ViewDesserts";
import EditDessert from "./components/admin/EditDessert";
import Footer from "./components/footer/Footer";
import NotFound from "./components/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <Container
      sx={{
        mt: { xs: 16, sm: 16, md: 24 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
      maxWidth={"false"}
    >
      <QueryClientProvider client={queryClient}>
        <DrawerProvider drawerOpen={false}>
          <AccountProvider
            signInModalOpen={false}
            signUpModalOpen={false}
            confirmationCodeModalOpen={false}
          >
            <CartProvider cartOpen={false} cartItems={[]}>
              <IngredientsProvider ingredientsOpen={false}>
                <Navbar />
                <NavSideDrawer />
                <SignIn />
                <ConfirmationCode />
                <LoggedInModal />
                <SignUp />
                <Cart />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/about-me" element={<About />} />
                  <Route
                    path="/admin/desserts/create"
                    element={<CreateDessert />}
                  />
                  <Route
                    path="/admin/edit-dessert/:dessertId"
                    element={<EditDessert />}
                  />
                  <Route path="/admin/desserts" element={<ViewDesserts />} />
                  <Route
                    path="/desserts/cakes/:dessertId/:dessertName"
                    element={<DessertDetail />}
                  />
                  <Route path="/custom-order" element={<CustomOrderForm />} />
                  <Route path="/account" element={<AccountDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </IngredientsProvider>
            </CartProvider>
          </AccountProvider>
        </DrawerProvider>
      </QueryClientProvider>
      <Footer />
    </Container>
  );
}

export default App;
