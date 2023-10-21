import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { DrawerContext } from "../../context/DrawerContext";

export default function NavSideDrawer() {
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
      anchor="left"
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
        top: "56px",
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
            <ListItemText primary="Shop" />
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
            <ListItemText primary="About Me" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
