import React, { useState } from "react";
import { Button } from "@mui/material";
import NavLinkDrawer from "./NavLinkDrawer";

export default function NavLink({ title, drawerItems }) {
  const [height, setHeight] = useState(0);

  const handleMouseEnter = () => {
    setHeight(300);
  };

  const handleMouseLeave = () => {
    setHeight(0);
  };

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ color: "#fff", position: "static" }}
    >
      {title}
      <NavLinkDrawer height={height} items={drawerItems} />
    </Button>
  );
}
