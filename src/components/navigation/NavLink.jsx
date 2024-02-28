import React, { useState } from "react";
import { Button } from "@mui/material";
import "./NavLink.css";
import { useNavigate } from "react-router-dom";

export default function NavLink({ title, drawerItems, buttons }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
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
      {drawerItems && (
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
            {buttons?.map((button, index) => (
              <Button
                key={index}
                variant="contained"
                sx={{
                  width: "160px",
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
                onClick={() => {
                  navigate(button.link);
                  setDrawerOpen(false);
                }}
              >
                {button.title}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
