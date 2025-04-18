import React, { useEffect, useState } from "react";
import Navbar from "./components/navigation/Navbar";
import NavSideDrawer from "./components/navigation/NavSideDrawer";
import Cart from "./components/navigation/cart/Cart";
import { DrawerProvider } from "./context/DrawerContext";
import { useSearchParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { IngredientsProvider } from "./context/IngredientsContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import SignInModal from "./components/navigation/auth/SignInModal";
import SignUpModal from "./components/navigation/auth/SignUpModal";
import ResetPasswordModal from "./components/navigation/auth/ResetPasswordModal";
import SentResetPasswordEmailModal from "./components/navigation/auth/SentResetPasswordEmailModal";
import ConfirmationCodeModal from "./components/navigation/auth/ConfirmationCodeModal";
import LoggedInModal from "./components/navigation/auth/LoggedInModal";
import Footer from "./components/footer/Footer";
import ForgotPasswordModal from "./components/navigation/auth/ForgotPasswordModal";
import { useModalStore } from "./store/useModalStore";
import AppRoutes from "./AppRoutes";
import { CircularProgress } from "@mui/material";
import UnderConstruction from "./components/extras/UnderConstruction";
import { Box } from "@mui/material";

const queryClient = new QueryClient();
const hostname = window.location.hostname;
const isDev = hostname.startsWith("dev.") || hostname.startsWith("localhost");

function App() {
  const [searchParams] = useSearchParams();
  const { openResetPasswordModal, setResetPasswordParams } = useModalStore();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
  }, []);

  useEffect(() => {
    if (searchParams.get("reset") === "true") {
      openResetPasswordModal();
      setResetPasswordParams({
        username: searchParams.get("username"),
        code: searchParams.get("code"),
      });
    }
  }, [searchParams, openResetPasswordModal, setResetPasswordParams]);

  if (!isDev) {
    return <UnderConstruction />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DrawerProvider drawerOpen={false}>
          <IngredientsProvider ingredientsOpen={false}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Navbar />
              <Box
                component="main"
                sx={{
                  flex: 1,
                  mt: { xs: "8rem", md: "12rem" },
                }}
              >
                {isAppReady ? (
                  <>
                    <NavSideDrawer />
                    <SignInModal />
                    <ConfirmationCodeModal />
                    <LoggedInModal />
                    <SignUpModal />
                    <ForgotPasswordModal />
                    <SentResetPasswordEmailModal />
                    <ResetPasswordModal />
                    <Cart />
                    <AppRoutes />
                  </>
                ) : (
                  <CircularProgress sx={{ margin: "0 auto" }} />
                )}
              </Box>
              <Footer />
            </Box>
          </IngredientsProvider>
        </DrawerProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
