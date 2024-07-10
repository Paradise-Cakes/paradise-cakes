import React, { useContext } from "react";
import { Drawer, List } from "@mui/material";
import { DrawerContext } from "../../context/DrawerContext";
import DrawerItem from "./DrawerItem";

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
          position: "relative",
          boxShadow: "none",
          width: "100%",
        },
      }}
      sx={{
        top: { xs: "110px", sm: "114px" },
      }}
    >
      <List sx={{ paddingTop: "0" }}>
        <DrawerItem toLink={"/home"} text={"home"} />
        <DrawerItem toLink={"/shop"} text={"shop"} />
        <DrawerItem toLink={"/custom-order"} text={"custom order"} />
        <DrawerItem toLink={"/about"} text={"about me"} />
      </List>
    </Drawer>
  );
}
