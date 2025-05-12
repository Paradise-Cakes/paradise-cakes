import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavSideDrawer from "../../../components/navigation/NavSideDrawer";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { DrawerContext } from "../../../context/DrawerContext";
import { IngredientsContext } from "../../../context/IngredientsContext";

const mockSetDrawerOpen = vi.fn();

function renderComponent(drawerOpen) {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <DrawerContext.Provider
            value={{ drawerOpen, setDrawerOpen: mockSetDrawerOpen }}
          >
            <NavSideDrawer />
          </DrawerContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("NavSideDrawer Component", () => {
  test("renders the NavSideDrawer", () => {
    renderComponent(true);

    const drawer = screen.getByRole("presentation");
    expect(drawer).toBeInTheDocument();
  });
});
