import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import "./NavLink.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavLink({ title, drawerItems, buttons, toLink }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setDrawerOpen(true);
  };

  const handleMouseLeave = () => {
    setDrawerOpen(false);
  };

  return (
    <Box>
      <Button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          color: "#555555",
          position: "static",
          width: "fit-content",
          padding: "6px",
          fontWeight: "bolder",
          fontSize: "14px",
        }}
        component={Link}
        to={toLink}
      >
        {title}
      </Button>
      {drawerItems && (
        <div
          className={"NavLink " + (drawerOpen ? "active" : "inactive")}
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
                <div style={{ color: "#555555", fontWeight: "bolder" }}>
                  {item.itemName}
                </div>
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
    </Box>
  );
}
