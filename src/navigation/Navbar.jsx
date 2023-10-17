import React, { useState } from "react";
import AppBarLogo from "../assets/brand.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Hidden,
} from "@mui/material";
import { CgMenu } from "react-icons/cg";

function Navbar() {
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
            <CgMenu
              style={{
                width: "25px",
                height: "25px",
                cursor: "pointer",
                marginLeft: "auto",
              }}
            />
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
