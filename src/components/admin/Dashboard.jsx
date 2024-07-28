import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
  return (
    <Grid
      container
      sx={{
        paddingLeft: "3rem",
        paddingRight: "3rem",
      }}
    >
      <Grid item md={12} lg={3}>
        <Typography
          variant="h4"
          fontWeight={1000}
          sx={{
            paddingBottom: "8px",
            paddingTop: "24px",
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          Dashboard
        </Typography>
        <Typography
          sx={{
            textAlign: { xs: "center", md: "center", lg: "left" },
            marginRight: "1.5rem",
            marginBottom: { xs: "1.5rem", md: "0" },
            fontSize: "1.25rem",
            fontFamily: "Montserrat",
          }}
        >
          Welcome to the Admin Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
}
