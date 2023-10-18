import React, { useState } from "react";
import { Button } from "@mui/material";
import NavLinkDrawer from "./NavLinkDrawer";

export default function NavLink({ title }) {
  const [height, setHeight] = useState(0);

  const handleMouseEnter = () => {
    setHeight(400);
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
      <NavLinkDrawer height={height} title={title} />
    </Button>
  );
}
