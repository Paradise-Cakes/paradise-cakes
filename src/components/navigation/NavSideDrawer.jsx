import React, { useContext } from "react";
import { Drawer, List } from "@mui/material";
import { DrawerContext } from "../../context/DrawerContext";
import DrawerItem from "./DrawerItem";

export default function NavSideDrawer() {
  const { drawerOpen } = useContext(DrawerContext);

  return (
    <Drawer
      hideBackdrop={true}
      anchor="left"
      open={drawerOpen}
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
        <DrawerItem toLink={"/"} text={"home"} />
        <DrawerItem toLink={"/shop"} text={"shop"} />
        <DrawerItem toLink={"/custom-order"} text={"custom order"} />
      </List>
    </Drawer>
  );
}
