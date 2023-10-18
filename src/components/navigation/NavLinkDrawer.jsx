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
      <div
        style={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "space-evenly",
          paddingLeft: "200px",
          paddingRight: "200px",
        }}
      >
        <img src={"https://place-hold.it/200"} />
        <img src={"https://place-hold.it/200"} />
      </div>
    </AnimateHeight>
  );
}
