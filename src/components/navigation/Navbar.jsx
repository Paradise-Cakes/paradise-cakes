import React, { useContext } from "react";
import AppBarLogo from "../../assets/brand.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Container, Toolbar, Hidden, useTheme, Button } from "@mui/material";
import { CgMenu, CgClose } from "react-icons/cg";
import { BsCart2 } from "react-icons/bs";
import { DrawerContext } from "../../context/DrawerContext";
import { CartContext } from "../../context/CartContext";
import NavLink from "./NavLink";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import AnimatedBanner from "../extras/AnimatedBanner";
import { VscAccount } from "react-icons/vsc";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { useModalStore } from "../../store/useModalStore";
import { useAppStore } from "../../store/useAppStore";
import { useCartStore } from "../../store/useCartStore";

export default function Navbar() {
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);
  const { openCart, cart } = useCartStore();

  const { openSignInModal } = useModalStore();
  const { user } = useAppStore();
  const navigate = useNavigate();
  const theme = useTheme();
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
          disableGutters
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
              {!isGetDessertsLoading ? (
                <NavLink
                  title="Shop"
                  toLink={"/shop"}
                  drawerItems={
                    [
                      // {
                      //   itemName: "cakes",
                      //   img: _.filter(desserts, { dessert_type: "cake" })[0]
                      //     .images[0].url,
                      // },
                      // {
                      //   itemName: "cupcakes",
                      //   img: _.filter(desserts, { dessert_type: "cupcake" })[0]
                      //     .images[0].url,
                      // },
                      // {
                      //   itemName: "cookies",
                      //   img: _.filter(desserts, { dessert_type: "cookie" })[0]
                      //     .images[0].url,
                      // },
                      // {
                      //   itemName: "pies",
                      //   img: _.filter(desserts, { dessert_type: "pie" })[0]
                      //     .images[0].url,
                      // },
                    ]
                  }
                  buttons={[{ title: "Shop All", link: "/shop" }]}
                />
              ) : (
                <NavLink title="Shop" toLink={"/shop"} />
              )}
              <NavLink title="Custom Order" toLink={"/custom-order"} />
              <NavLink title="About Me" toLink={"/about-me"} />
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
                    padding: "16px",
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
                    padding: "16px",
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
              width: "80px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              onClick={() => {
                if (user.loggedIn) {
                  navigate("/account");
                } else {
                  openSignInModal();
                }
              }}
            >
              <VscAccount
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </Box>
            <Box onClick={() => openCart()}>
              <BsCart2
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </Box>

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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
