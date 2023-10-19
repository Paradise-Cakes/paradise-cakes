import React, { useState } from "react";
import { Button } from "@mui/material";
import NavLinkDrawer from "./NavLinkDrawer";
import "./NavLink.css";

export default function NavLink({ title, drawerItems }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMouseEnter = () => {
    setDrawerOpen(true);
  };

  const handleMouseLeave = () => {
    setDrawerOpen(false);
  };

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ color: "#fff", position: "static", border: "1px solid green" }}
    >
      {title}
      <div style={{ position: "relative" }}>
        <ul style={{ position: "absolute" }} className="active">
          <li>Hi</li>
          <li>Hi</li>
          <li>Hi</li>
        </ul>
      </div>
    </Button>
  );
}
