import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/playfair-display";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/dancing-script/400.css";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/pacifico/400.css";
import "@fontsource/montserrat/400.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./amplifyConfig";

const THEME = createTheme({
  typography: {
    fontFamily: `"Bebas Neue", "Montserrat", "Archivo Black", "Roboto", "Helvetica", "Arial", sans-serif`,
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
      main: "#CDCBBC",
      contrastText: "#000000",
    },
    info: {
      main: "#A3BFD8",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#DDAFAC",
      contrastText: "#000000",
    },
    dark: {
      main: "#292929",
      contrastText: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#FFFFFF",
        color: "#292929",
      },
    },
    light: {
      main: "#E6EFEE",
      contrastText: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: "#9CAFAF", // Example for primary variant
          "&:hover": {
            backgroundColor: "#9CAFAF",
            color: "#FFFFFF",
          },
        },
        outlinedSecondary: {
          borderColor: "#CBD8D8", // Adjust as needed
        },
        // Add other color variants here following the same pattern
        outlinedSuccess: {
          borderColor: "#A3D8A3", // For success variant
        },
        outlinedError: {
          borderColor: "#DDAFAC", // For error variant
        },
        outlinedWarning: {
          borderColor: "#D8BFA3", // For warning variant
        },
        outlinedInfo: {
          borderColor: "#A3BFD8", // For info variant
        },
      },
    },
  },
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
