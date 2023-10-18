import React from "react";
import AnimateHeight from "react-animate-height";

export default function NavLinkDrawer({ height, title }) {
  return (
    <AnimateHeight
      height={height}
      duration={500}
      style={{
        position: "absolute",
        width: "100%",
        padding: 0,
        top: "98px",
        left: 0,
        right: 0,
        backgroundColor: "#CDCBBC",
        opacity: "85%",
        boxShadow: "0 4px 2px -2px silver",
      }}
    >
      <div>{title}</div>
    </AnimateHeight>
  );
}
