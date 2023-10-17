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
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Cakes">Cakes</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Cupcakes">Cupcakes</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Flavors">Flavors</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="All Products">All Products</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
