import React, { useState } from "react";
import { Button } from "@mui/material";
import "./NavLink.css";

export default function NavLink({ title, drawerItems, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMouseEnter = () => {
    setDrawerOpen(true);
  };

  const handleMouseLeave = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <Button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          color: "#fff",
          position: "static",
          width: "125px",
          padding: "6px",
        }}
      >
        {title}
      </Button>
      <div
        className={"div " + (drawerOpen ? "active" : "inactive")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "200px",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          {drawerItems?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 32px",
              }}
            >
              <img src={item.img} />
              <div>{item.itemName}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            width: "500px",
            display: "flex",
            justifyContent: "space-around",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "32px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
