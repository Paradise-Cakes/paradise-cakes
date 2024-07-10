import React from "react";
import {
  useTheme,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { DrawerContext } from "../../context/DrawerContext";
import { useNavigate } from "react-router-dom";

export default function DrawerItem({ toLink, text }) {
  const theme = useTheme();
  const { setDrawerOpen } = useContext(DrawerContext);
  const navigate = useNavigate();

  return (
    <ListItem
      sx={{
        paddingTop: "0",
        paddingBottom: "0",
        width: "100%",
        borderBottom: `1px dashed ${theme.palette.primary.main}`,
      }}
    >
      <ListItemButton
        onClick={() => {
          navigate(toLink);
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
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
