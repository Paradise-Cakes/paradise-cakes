import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Dessert from "../../../components/dessert/Dessert";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { Query, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const mockPatchDessert = vi.fn().mockResolvedValue({});
const mockDeleteDessert = vi.fn().mockResolvedValue({});
const mockConsole = vi.spyOn(console, "error").mockImplementation(() => {});

vi.mock("../../../hooks/dessert/DessertHook", () => ({
  usePatchDessert: () => ({
    mutateAsync: mockPatchDessert,
    isLoading: false,
    error: null,
  }),
  useDeleteDessert: () => ({
    mutateAsync: mockDeleteDessert,
    isLoading: false,
    error: null,
  }),
}));

describe("Dessert Component", () => {
  test("renders the dessert with its details", () => {
    const dessert = {
      dessert_id: 1,
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
      special_tag: "FREE",
    };

    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <Dessert dessert={dessert} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/^chocolate cake$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Delicious chocolate cake$/i)).toBeInTheDocument();
  });

  test("renders the dessert with skeletons when loading", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <Dessert isLoading={true} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("dessert-card-image-skeleton")).toBeVisible();
    expect(screen.getByTestId("dessert-card-name-skeleton")).toBeVisible();
    expect(
      screen.getByTestId("dessert-card-description-skeleton")
    ).toBeVisible();
  });

  test("renders the dessert with admin actions", () => {
    const dessert = {
      dessert_id: 1,
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
      special_tag: "FREE",
    };

    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <Dessert dessert={dessert} inAdminView={true} isLoading={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/^edit$/i)).toBeInTheDocument();
    expect(screen.getByText(/^remove$/i)).toBeInTheDocument();
    expect(screen.getByText(/^hidden$/i)).toBeInTheDocument();
  });

  test("navigates to the dessert details page on click", async () => {
    const dessert = {
      dessert_id: 1,
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
    };

    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <Dessert dessert={dessert} isLoading={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByTestId("dessert-card"));

    expect(window.location.pathname).toBe(
      `/desserts/${dessert.dessert_id}/${dessert.name.replace(/\s+/g, "%20")}`
    );
  });

  test("handles visibility toggle", async () => {
    const dessert = {
      dessert_id: 1,
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
    };

    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <Dessert dessert={dessert} inAdminView={true} isLoading={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText(/hidden/i));

    expect(screen.getByText(/visible/i)).toBeInTheDocument();
    expect(mockPatchDessert).toHaveBeenCalled();
  });

  test("handles edit button click", async () => {
    const dessert = {
      dessert_id: 1,
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
    };

    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <Dessert dessert={dessert} inAdminView={true} isLoading={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText(/edit/i));

    expect(window.location.pathname).toBe(
      `/admin/desserts/edit-dessert/${dessert?.dessert_id}`
    );
  });

  test("handles remove button click", async () => {
    const dessert = {
      dessert_id: 1,
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
    };

    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <Dessert dessert={dessert} inAdminView={true} isLoading={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText(/remove/i));

    expect(mockDeleteDessert).toHaveBeenCalled();
  });

  test("console logs errors for failing to update visibility", async () => {
    const dessert = {
      dessert_id: 1,
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
    };

    mockPatchDessert.mockRejectedValue(new Error("Failed to update"));

    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <Dessert dessert={dessert} inAdminView={true} isLoading={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText(/hidden/i));

    expect(mockConsole).toHaveBeenCalledWith(
      "Failed to update dessert visibility:",
      expect.any(Error)
    );
  });
});
