import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/playfair-display";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const THEME = createTheme({
  typography: {
    fontFamily: `"Archivo Black", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#9CAFAF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#CBD8D8",
      contrastText: "#000000",
    },
    success: {
      main: "#A3D8A3",
      contrastText: "#000000",
    },
    warning: {
      main: "#D8BFA3",
      contrastText: "#000000",
    },
    info: {
      main: "#A3BFD8",
      contrastText: "#000000",
    },
    error: {
      main: "#DDAFAC",
      contrastText: "#000000",
    },
    dark: {
      main: "#292929",
      contrastText: "#FFFFFF",
    },
    light: {
      main: "#E6EFEE",
      contrastText: "#000000",
    },
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         fontSize: "1rem",
  //       },
  //       // Primary variant
  //       containedPrimary: {
  //         backgroundColor: "#9CAFAF",
  //         "&:hover": {
  //           backgroundColor: "#8b9b9b",
  //         },
  //       },
  //       // Alternate Primary variant
  //       containedPrimaryAlt: {
  //         backgroundColor: "#CBD8D8",
  //         "&:hover": {
  //           backgroundColor: "#b2c2c3",
  //         },
  //         color: "#000000", // Override text color for better contrast
  //       },
  //       // Secondary variant
  //       containedSecondary: {
  //         backgroundColor: "#C0D7D8",
  //         "&:hover": {
  //           backgroundColor: "#afc8c9",
  //         },
  //       },
  //       // First Alternate Secondary variant
  //       containedSecondaryAlt1: {
  //         backgroundColor: "#CDCBBC",
  //         "&:hover": {
  //           backgroundColor: "#b8bdb1",
  //         },
  //       },
  //       // Second Alternate Secondary variant
  //       containedSecondaryAlt2: {
  //         backgroundColor: "#DDAFAC",
  //         "&:hover": {
  //           backgroundColor: "#c99a93",
  //         },
  //       },
  //       // Text and outlined variants can be added here similarly,
  //       // using the same color scheme as above for consistency.
  //     },
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
