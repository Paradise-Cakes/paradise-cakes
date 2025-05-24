import React from "react";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../src/theme";
import { IngredientsContext } from "../src/context/IngredientsContext";

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
