import React from "react";
import AnimateHeight from "react-animate-height";

export default function NavLinkDrawer({ open }) {
  return (
    open && (
      <div style={{ position: "relative" }}>
        <ul style={{ position: "absolute" }}>
          <li>Hi</li>
          <li>Hi</li>
          <li>Hi</li>
        </ul>
      </div>
    )
  );
}
