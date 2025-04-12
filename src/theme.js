import { createTheme } from "@mui/material/styles";

export const THEME = createTheme({
  typography: {
    fontFamily: `"Bebas Neue", "Montserrat", "Archivo Black", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: { main: "#9CAFAF", contrastText: "#FFFFFF" },
    secondary: { main: "#CBD8D8", contrastText: "#000000" },
    success: { main: "#A3D8A3", contrastText: "#000000" },
    warning: { main: "#CDCBBC", contrastText: "#000000" },
    info: { main: "#A3BFD8", contrastText: "#FFFFFF" },
    error: { main: "#DDAFAC", contrastText: "#000000" },
    dark: {
      main: "#292929",
      contrastText: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#FFFFFF",
        color: "#292929",
      },
    },
    light: { main: "#E6EFEE", contrastText: "#000000" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: "#9CAFAF",
          "&:hover": {
            backgroundColor: "#9CAFAF",
            color: "#FFFFFF",
          },
        },
        outlinedSecondary: { borderColor: "#CBD8D8" },
        outlinedSuccess: { borderColor: "#A3D8A3" },
        outlinedError: { borderColor: "#DDAFAC" },
        outlinedWarning: { borderColor: "#D8BFA3" },
        outlinedInfo: { borderColor: "#A3BFD8" },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          'input, textarea, select, button': {
            fontFamily: `"Montserrat", sans-serif`,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: { fontFamily: `"Montserrat", sans-serif` },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontFamily: `"Montserrat", sans-serif` },
      },
    },
  },
});
