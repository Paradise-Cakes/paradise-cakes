import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavLink({ title, toLink }) {
  return (
    <Button
      disableRipple
      disableFocusRipple
      sx={{
        color: "#555555",
        position: "static",
        width: "fit-content",
        padding: "6px",
        fontWeight: "800",
        fontSize: "1rem",
      }}
      component={Link}
      to={toLink}
    >
      {title}
    </Button>
  );
}
