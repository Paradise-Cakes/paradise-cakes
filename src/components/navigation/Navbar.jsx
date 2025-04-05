import React, { useContext, useEffect, useState } from "react";
import AppBarLogo from "../../assets/brand.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Container, Toolbar, Hidden, useTheme, Button } from "@mui/material";
import { CgMenu, CgClose } from "react-icons/cg";
import { BsCart2 } from "react-icons/bs";
import { DrawerContext } from "../../context/DrawerContext";
import NavLink from "./NavLink";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { LuCakeSlice } from "react-icons/lu";
import AnimatedBanner from "../extras/AnimatedBanner";
import { VscAccount } from "react-icons/vsc";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { useCartStore } from "../../store/useCartStore";
import {
  useProtectedNavigate,
  useProtectedAdminNavigate,
} from "../../hooks/ProtectedNavigateHook";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);
  const { openCart, cart } = useCartStore();
  const protectedNavigate = useProtectedNavigate();
  const protectedAdminNavigate = useProtectedAdminNavigate();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#9CAFAF",
        display: "block",
        marginBottom: { xs: "0px", md: "20rem" },
      }}
    >
      <AnimatedBanner
        messages={[
          "Located in the Austin, TX area",
          "Free delivery on orders $100+",
          "Custom orders available",
        ]}
      />
      <Container
        maxWidth={"false"}
        sx={{
          margin: 0,
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "block",
          }}
        >
          <Hidden mdDown implementation="css">
            <Box
              style={{
                textAlign: "center",
                display: "block",
                position: "relative",
                top: "10px",
              }}
            >
              <img
                src={AppBarLogo}
                width="120px"
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => navigate("/")}
              />
            </Box>
            <Box
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                display: "flex",
                width: "600px",
                justifyContent: "space-between",
              }}
            >
              <NavLink title="Home" toLink={"/"} />
              <NavLink title="Shop" toLink={"/shop"} />
              <NavLink title="Custom Order" toLink={"/custom-order"} />
            </Box>
          </Hidden>
          <Hidden mdUp implementation="css">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {drawerOpen ? (
                <CgClose
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={() => setDrawerOpen(false)}
                />
              ) : (
                <CgMenu
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={() => setDrawerOpen(true)}
                />
              )}
              <img
                src={AppBarLogo}
                width="120px"
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={() => navigate("/")}
              />
            </div>
          </Hidden>
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              right: "1%",
              cursor: "pointer",
              display: "flex",
              width: isAuthenticated && isAdmin ? "120px" : "80px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              onClick={() => {
                protectedNavigate("/account");
              }}
            >
              <VscAccount
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </Box>
            <Box onClick={() => openCart()} sx={{ position: "relative" }}>
              <BsCart2
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
              {cart.length > 0 && (
                <GoDotFill
                  style={{
                    position: "absolute",
                    width: "25px",
                    height: "25px",
                    color: `${theme.palette.error.main}`,
                    top: "-4px",
                    right: "-8px",
                  }}
                />
              )}
            </Box>
            {isAdmin && isAuthenticated && (
              <Box onClick={() => protectedAdminNavigate("/admin/home")}>
                <LuCakeSlice
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
