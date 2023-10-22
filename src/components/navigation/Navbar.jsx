import React, { useContext } from "react";
import AppBarLogo from "../../assets/brand.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Button, Container, Toolbar, Hidden } from "@mui/material";
import { CgMenu, CgClose } from "react-icons/cg";
import { DrawerContext } from "../../context/DrawerContext";
import NavLink from "./NavLink";

export default function Navbar() {
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#CDCBBC",
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
          <Hidden smDown>
            <div
              id="here"
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
              />
            </div>
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
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "150px",
                    height: "40px",
                    backgroundColor: "#DDAFAC",
                    color: "white",
                    border: "1px solid #DDAFAC",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#DDAFAC",
                      color: "white",
                      border: "1px solid #DDAFAC",
                    },
                  }}
                >
                  Shop All
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "200px",
                    height: "40px",
                    backgroundColor: "#DDAFAC",
                    color: "white",
                    border: "1px solid #DDAFAC",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#DDAFAC",
                      color: "white",
                      border: "1px solid #DDAFAC",
                    },
                  }}
                >
                  Order Delivery
                </Button>
              </NavLink>

              <NavLink title="About Me" />
            </Box>
          </Hidden>
          <Hidden smUp>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
