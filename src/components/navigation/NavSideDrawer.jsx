import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { DrawerContext } from "../../context/DrawerContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

export default function NavSideDrawer() {
  const theme = useTheme();
  const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);
  const navigate = useNavigate();

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
        <ListItem
          sx={{ paddingTop: "0", paddingBottom: "0", width: "fit-content" }}
        >
          <ListItemButton
            onClick={() => {
              navigate("/");
              setDrawerOpen(false);
            }}
            sx={{
              paddingTop: "16px",
              paddingBottom: "16px",
              "& .MuiTypography-root": {
                fontWeight: "1000",
              },
              "&:hover": {
                backgroundColor: "white",
                "& .MuiTypography-root": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem
          sx={{
            paddingTop: "0",
            paddingBottom: "0",
            width: "fit-content",
          }}
        >
          <ListItemButton
            sx={{
              paddingTop: "16px",
              paddingBottom: "16px",
              "& .MuiTypography-root": {
                fontWeight: "1000",
              },
              "&:hover": {
                backgroundColor: "white",
                "& .MuiTypography-root": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemText primary="About Me" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
