import React, { useState } from "react";
import { Button } from "@mui/material";
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
      sx={{
        color: "#fff",
        position: "static",
        width: "125px",
        padding: "6px",
      }}
    >
      {title}
      <div className={"div " + (drawerOpen ? "active" : "inactive")}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "200px",
            border: "1px solid red",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          {drawerItems?.map((item) => (
            <div
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
          <Button
            variant="contained"
            sx={{
              width: "150px",
              height: "40px",
              backgroundColor: "#DDAFAC",
              color: "white",
              border: "1px solid #DDAFAC",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#DDAFAC",
                color: "white",
                border: "1px solid #DDAFAC",
              },
            }}
          >
            Shop All
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "200px",
              height: "40px",
              backgroundColor: "#DDAFAC",
              color: "white",
              border: "1px solid #DDAFAC",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#DDAFAC",
                color: "white",
                border: "1px solid #DDAFAC",
              },
            }}
          >
            Order Delivery
          </Button>
        </div>
      </div>
    </Button>
  );
}
