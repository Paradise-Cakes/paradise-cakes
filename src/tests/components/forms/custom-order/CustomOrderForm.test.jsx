import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomOrderForm from "../../../../components/forms/custom-order/CustomOrderForm";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../../theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsContext } from "../../../../context/IngredientsContext";
import { debug } from "vitest-preview";

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsContext.Provider value={undefined}>
            <CustomOrderForm />
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("CustomOrderForm Component", () => {
  test("renders the custom order form", () => {
    renderComponent();

    expect(
      screen.getByText(
        "Please fill out the form below to place a custom order. Please allow 2-3 days for a response."
      )
    ).toBeInTheDocument();
  });

  test("fills out the form and submits", async () => {
    renderComponent();

    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const phoneField = screen.getByLabelText(/phone number/i);
    const descriptionField = screen.getByLabelText(/description/i);
    const dateField = screen.getByLabelText(/delivery date/i);

    await userEvent.type(firstNameField, "John");
    await userEvent.type(lastNameField, "Doe");
    await userEvent.type(emailField, "john.doe@gmail.com");
    await userEvent.type(phoneField, "1234567890");
    await userEvent.type(descriptionField, "This is a custom order.");
    await userEvent.type(dateField, "05/17/2025 12:00 AM");

    const submitButton = screen.getByRole("button", { name: /place order/i });
    await userEvent.click(submitButton);
  });
});
