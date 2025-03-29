import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HomeContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),

  // --- Hero Section ---
  ".home-grid-container-1": {
    [theme.breakpoints.up("md")]: {
      flexWrap: "wrap",
    },
    [theme.breakpoints.up("lg")]: {
      flexWrap: "nowrap",
    },
    justifyContent: "space-evenly",
  },

  ".home-grid-item-1": {
    marginLeft: "1rem",
    marginRight: "1rem",
    display: "flex",
    flexWrap: "nowrap",
    gap: theme.spacing(2),
  },

  ".home-grid-item-img-1 img, .home-grid-item-img-2 img": {
    borderRadius: "1rem",
    width: "100%",
    height: "auto",
    display: "block",
  },

  ".home-grid-item-2": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  ".home-grid-item-2-box": {
    textAlign: "center",
    padding: theme.spacing(2),
  },

  ".home-hero-heading": {
    fontSize: "3rem",
    marginBottom: 0,
    marginRight: "1rem",
  },

  ".home-hero-subheading": {
    marginTop: "0.5rem",
    fontSize: "1.25rem",
    marginLeft: "1rem",
    marginRight: "1rem",
  },

  ".home-hero-cta-button": {
    borderRadius: "1rem",
    fontSize: "1.25rem",
    display: "block",
    margin: "0 auto",
    width: "10rem",
    marginTop: theme.spacing(2),
  },

  // --- Section Header ---
  ".home-section-title": {
    marginTop: "4rem",
    textAlign: "center",
    fontSize: "2.25rem",
    marginBottom: "2.5rem",
  },

  // --- Feature Section ---
  ".home-grid-container-2": {
    justifyContent: "space-evenly",
  },

  ".home-feature-box": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "250px",
    textAlign: "center",
    padding: theme.spacing(2),
  },

  ".home-feature-title": {
    marginTop: theme.spacing(1),
    marginBottom: 0,
    fontSize: "1.25rem",
  },

  ".home-feature-description": {
    marginTop: 0,
    fontSize: "1rem",
    fontWeight: 400,
  },
}));
