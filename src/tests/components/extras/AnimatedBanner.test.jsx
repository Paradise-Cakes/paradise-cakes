import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AnimatedBanner from "../../../components/extras/AnimatedBanner";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { Query, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsContext } from "../../../context/IngredientsContext";
import { act } from "react";

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsContext.Provider value={undefined}>
            <AnimatedBanner
              messages={[
                "Welcome to Paradise Cakes!",
                "Delicious cakes made fresh daily",
                "Order online for quick delivery",
              ]}
              cycleTime={1000}
            />
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("AnimatedBanner Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("renders the animated banner with messages", () => {
    renderComponent();

    const message1 = screen.getByText(/Welcome to Paradise Cakes!/i);
    expect(message1).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const message2 = screen.getByText(/Delicious cakes made fresh daily/i);
    expect(message2).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const message3 = screen.getByText(/Order online for quick delivery/i);
    expect(message3).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(message1).toBeInTheDocument();
  });
});
