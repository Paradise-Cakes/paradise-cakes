import { vi, describe, test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Shop from "../../../components/shop/Shop";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../../src/theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { DrawerContext } from "../../../../src/context/DrawerContext";
import { IngredientsContext } from "../../../../src/context/IngredientsContext";
import { AuthContext } from "../../../../src/context/AuthContext";
import { debug } from "vitest-preview";

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <DrawerContext.Provider value={{}}>
            <IngredientsContext.Provider value={{}}>
              <AuthContext.Provider value={{}}>
                <Shop />
              </AuthContext.Provider>
            </IngredientsContext.Provider>
          </DrawerContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("Shop Component", () => {
  test("renders the shop page", () => {
    renderComponent();

    expect(screen.getByText("CAKES")).toBeInTheDocument();
    expect(screen.getByText("CUPCAKES")).toBeInTheDocument();
    expect(screen.getByText("COOKIES")).toBeInTheDocument();
    expect(screen.getByText("PIES")).toBeInTheDocument();
  });
});
