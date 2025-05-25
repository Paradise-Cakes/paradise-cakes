import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../src/theme";
import { IngredientsContext } from "../src/context/IngredientsContext";
import "../src/index.css"; // Ensure global styles are applied
import "@fontsource/playfair-display";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/dancing-script/400.css";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/pacifico/400.css";
import "@fontsource/montserrat/400.css";

export default {
  decorators: [
    (Story, { parameters }) => {
      return (
        <BrowserRouter>
          <QueryClientProvider client={new QueryClient()}>
            <ThemeProvider theme={THEME}>
              <IngredientsContext.Provider value={undefined}>
                <Story />
              </IngredientsContext.Provider>
            </ThemeProvider>
          </QueryClientProvider>
        </BrowserRouter>
      );
    },
  ],
  tags: ["autodocs"],
};
