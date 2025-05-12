import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminDashboard from "../../../components/admin/AdminDashboard";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

describe("AdminDashboard Component", () => {
  test("renders the admin dashboard", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <AdminDashboard />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/my dashboard/i)).toBeInTheDocument();
    expect(
      screen.getByText(/welcome to the admin dashboard/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /add dessert/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view my desserts/i })
    ).toBeInTheDocument();
  });
});
