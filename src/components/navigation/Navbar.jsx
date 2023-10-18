import React, { useContext } from "react";
import AppBarLogo from "../../assets/brand.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Button, Container, Toolbar, Hidden, Drawer } from "@mui/material";
import { CgMenu, CgClose } from "react-icons/cg";
import { DrawerContext } from "../../context/DrawerContext";

export default function Navbar() {
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);

  return (
    <AppBar position="relative" sx={{ backgroundColor: "#CDCBBC" }}>
      <Container maxWidth={"false"} sx={{ margin: 0, width: "100%" }}>
        <Toolbar disableGutters sx={{ width: "100%", display: "block" }}>
          <Hidden smDown>
            <div
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
              <Button sx={{ color: "#fff" }}>Cakes</Button>
              <Button sx={{ color: "#fff" }}>Cupcakes</Button>
              <Button sx={{ color: "#fff" }}>Flavors</Button>
              <Button sx={{ color: "#fff" }}>All Products</Button>
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
                  }}
                  onClick={() => setDrawerOpen(false)}
                />
              ) : (
                <CgMenu
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
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
                  position: "relative",
                  top: "2.5px",
                }}
              />
            </div>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
