import React, { useContext } from "react";
import AppBarLogo from "../../assets/brand.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Button, Container, Toolbar, Hidden, Drawer } from "@mui/material";
import { CgMenu } from "react-icons/cg";
import { DrawerContext } from "../../context/DrawerContext";

export default function Navbar() {
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#CDCBBC" }}>
      <Container maxWidth={"false"} sx={{ margin: 0, width: "100%" }}>
        <Toolbar disableGutters sx={{ width: "100%" }}>
          <Hidden smDown>
            <img
              src={AppBarLogo}
              width="120px"
              style={{
                marginTop: "4px",
                cursor: "pointer",
                userSelect: "none",
              }}
            />
            <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
              <Button sx={{ color: "#fff" }}>Cakes</Button>
              <Button sx={{ color: "#fff" }}>Cupcakes</Button>
              <Button sx={{ color: "#fff" }}>Flavors</Button>
              <Button sx={{ color: "#fff" }}>All Products</Button>
            </Box>
          </Hidden>
          <Hidden smUp>
            <img
              src={AppBarLogo}
              width="120px"
              style={{
                marginTop: "4px",
                marginLeft: "auto",
                marginRight: "auto",
                cursor: "pointer",
                userSelect: "none",
              }}
            />
            <CgMenu
              style={{
                width: "25px",
                height: "25px",
                cursor: "pointer",
              }}
              onClick={() => setDrawerOpen(!drawerOpen)}
            />
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
