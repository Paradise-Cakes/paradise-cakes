import { vi, describe, test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import DrawerItem from "../../../components/navigation/DrawerItem";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { DrawerContext } from "../../../context/DrawerContext";
import { IngredientsContext } from "../../../context/IngredientsContext";
import { AuthContext } from "../../../context/AuthContext";
import { debug } from "vitest-preview";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // preserve other exports
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderComponent(toLink, text) {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <DrawerContext.Provider value={{ setDrawerOpen: vi.fn() }}>
            <DrawerItem toLink={toLink} text={text} />
          </DrawerContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("DrawerItem Component", () => {
  test("handles navigating to the link", async () => {
    const toLink = "/test-link";
    const text = "Test Link";

    renderComponent(toLink, text);

    const linkButton = screen.getByTestId("drawer-item");
    await userEvent.click(linkButton);

    expect(mockNavigate).toHaveBeenCalledWith(toLink);
  });
});
