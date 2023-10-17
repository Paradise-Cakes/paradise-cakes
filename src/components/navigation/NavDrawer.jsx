import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { DrawerContext } from "../../context/DrawerContext";

export default function NavDrawer() {
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Drawer
      hideBackdrop={true}
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          position: "absolute",
          boxShadow: "none",
          width: "100%",
        },
      }}
      sx={{
        top: "60px",
      }}
    >
      <List sx={{ paddingTop: "0" }}>
        <ListItem sx={{ paddingTop: "0", paddingBottom: "0" }}>
          <ListItemButton
            sx={{
              borderBottom: "1px dashed #DDAFAC",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            <ListItemText primary="Cakes">Cakes</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ paddingTop: "0", paddingBottom: "0" }}>
          <ListItemButton
            sx={{
              borderBottom: "1px dashed #DDAFAC",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            <ListItemText primary="Cupcakes">Cupcakes</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ paddingTop: "0", paddingBottom: "0" }}>
          <ListItemButton
            sx={{
              borderBottom: "1px dashed #DDAFAC",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            <ListItemText primary="Flavors">Flavors</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ paddingTop: "0", paddingBottom: "0" }}>
          <ListItemButton sx={{ paddingTop: "16px", paddingBottom: "16px" }}>
            <ListItemText primary="All Products">All Products</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
