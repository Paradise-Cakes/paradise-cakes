import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../../../components/navigation/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { DrawerContext } from "../../../context/DrawerContext";
import { IngredientsContext } from "../../../context/IngredientsContext";
import { AuthContext } from "../../../context/AuthContext";

const mockSetDrawerOpen = vi.fn();
const mockOpenCart = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // preserve other exports
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderComponent(drawerOpen, isAuthenticated, isAdmin) {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <DrawerContext.Provider
            value={{ drawerOpen, setDrawerOpen: mockSetDrawerOpen }}
          >
            <AuthContext.Provider
              value={{ isAuthenticated, isAdmin, user: {} }}
            >
              <Navbar />
            </AuthContext.Provider>
          </DrawerContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("Navbar Component", () => {
  test("handles going to the home page when logo is clicked", () => {
    renderComponent(true, false, false);

    const logo = screen.getByRole("img", { name: /app-logo-2/i });
    userEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
