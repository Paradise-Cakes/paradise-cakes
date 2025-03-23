import React from "react";
import Cat from "../../assets/cat.png";

export default function UnderConstruction() {
  return (
    <div>
      <img
        src={Cat}
        width="150px"
        height={"150px"}
        alt="Under Construction"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "150px",
          display: "block",
        }}
      />
      <h2 style={{ textAlign: "center" }}>
        This page is under construction. Please check back later.
      </h2>
    </div>
  );
}
