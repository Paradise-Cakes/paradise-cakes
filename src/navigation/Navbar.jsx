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
} from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#CDCBBC" }}>
      <Container maxWidth={"false"} sx={{ margin: 0, width: "100%" }}>
        <Toolbar disableGutters sx={{ width: "100%" }}>
          <img src={AppBarLogo} width="120px" style={{ marginTop: "4px" }} />
          <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
            <Button sx={{ color: "#fff" }}>Cakes</Button>
            <Button sx={{ color: "#fff" }}>Cupcakes</Button>
            <Button sx={{ color: "#fff" }}>Flavors</Button>
            <Button sx={{ color: "#fff" }}>All Products</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
