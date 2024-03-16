import React, { useContext } from "react";
import AppBarLogo from "../../assets/brand.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Container, Toolbar, Hidden, useTheme } from "@mui/material";
import { CgMenu, CgClose } from "react-icons/cg";
import { BsCart2 } from "react-icons/bs";
import { DrawerContext } from "../../context/DrawerContext";
import { CartContext } from "../../context/CartContext";
import NavLink from "./NavLink";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

export default function Navbar() {
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);
  const { setCartOpen, cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#9CAFAF",
      }}
    >
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
              <NavLink
                title="Shop"
                drawerItems={[
                  { itemName: "Cakes", img: "https://place-hold.it/150" },
                  { itemName: "Pies", img: "https://place-hold.it/150" },
                  { itemName: "Cupcakes", img: "https://place-hold.it/150" },
                  { itemName: "Cookies", img: "https://place-hold.it/150" },
                ]}
                buttons={[{ title: "Shop All", link: "/" }]}
              />

              <NavLink title="About Me" />
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
              />
            </div>
          </Hidden>
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              right: "1%",
            }}
          >
            <BsCart2
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
              onClick={() => setCartOpen(true)}
            />
            {cartItems.length > 0 && (
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
            {/* {console.log(cartItems.length)}
            {console.log(cartItems)} */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
