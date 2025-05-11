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
      <Toolbar sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              visibility: { xs: "visible", md: "hidden" },
            }}
          >
            {drawerOpen ? (
              <CgClose
                data-testid="menu-button-close"
                style={{ width: "100%", height: "100%" }}
                onClick={() => setDrawerOpen(false)}
              />
            ) : (
              <CgMenu
                data-testid="menu-button-open"
                style={{ width: "100%", height: "100%" }}
                onClick={() => setDrawerOpen(true)}
              />
            )}
          </Box>
          <Box
            sx={{
              width: "100px",
              height: "50px",
              cursor: "pointer",
              userSelect: "none",
              position: "absolute",
              left: "50%",
              right: "50%",
              bottom: "0%",
              transform: "translate(-50%)",
            }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              alt="app-logo-1"
              src={AppBarLogo}
              onClick={() => navigate("/")}
            />
          </Box>
          <Box display={"flex"} gap={1.5}>
            <Box
              data-testid="account-button"
              onClick={() => {
                protectedNavigate("/account");
              }}
              sx={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              <VscAccount
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Box
              data-testid="cart-button"
              onClick={() => openCart()}
              sx={{ position: "relative", cursor: "pointer" }}
            >
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
              <Box
                data-testid="admin-button"
                onClick={() => protectedAdminNavigate("/admin/home")}
                sx={{ width: "30px", height: "30px", cursor: "pointer" }}
              >
                <LuCakeSlice
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            width: "600px",
            justifyContent: "space-between",
            display: { xs: "none", md: "flex" },
          }}
        >
          <NavLink title="Home" toLink={"/"} />
          <NavLink title="Shop" toLink={"/shop"} />
          <NavLink title="Custom Order" toLink={"/custom-order"} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
