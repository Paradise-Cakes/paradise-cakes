import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EditDessert from "../../../components/admin/EditDessert";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsProvider } from "../../../context/IngredientsContext";
import userEvent from "@testing-library/user-event";
import { debug } from "vitest-preview";
import axios from "axios";
import * as reactRouterDom from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

reactRouterDom.useParams.mockReturnValue({ dessertId: "DESSERT-1" });

vi.mock("axios");

const patchDessertMock = vi.fn();

const mockConsoleError = vi
  .spyOn(console, "error")
  .mockImplementation(() => {});

vi.mock("../../../hooks/dessert/DessertHook", () => ({
  usePatchDessert: () => ({
    mutateAsync: patchDessertMock,
    isLoading: false,
    error: null,
  }),
  useGetDessertById: () => ({
    data: {
      dessert_id: "DESSERT-1",
      name: "Chocolate Cake",
      description: "A delicious chocolate cake  ",
      dessert_type: "cake",
      created_at: 1734004800,
      last_updated_at: 1734004800,
      visible: true,
      prices: [
        {
          dessert_id: "DESSERT-1",
          size: "6 inch",
          base_price: 15.0,
          discount: 0.0,
        },
        {
          dessert_id: "DESSERT-1",
          size: "8 inch",
          base_price: 140.0,
          discount: 0.0,
        },
        {
          dessert_id: "DESSERT-1",
          size: "10 inch",
          base_price: 120.0,
          discount: 0.0,
        },
      ],
      ingredients: ["flour", "sugar", "cocoa", "butter", "eggs"],
      images: [
        {
          image_id: "IMAGE-1",
          url: "https://example.com/image1.jpg",
          position: 1,
          file_name: "image1.jpg",
          file_type: "jpg",
        },
      ],
    },
    isLoading: false,
    isSuccess: true,
  }),
}));

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsProvider>
            <EditDessert />
          </IngredientsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("EditDessert Component", () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  test("renders the edit dessert form", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /edit dessert/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });
});
