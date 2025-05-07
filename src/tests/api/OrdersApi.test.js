import { describe, it, vi, expect, beforeEach } from "vitest";
import axios from "axios";
import {
  getOrderById,
  getOrdersForCustomer,
  patchOrder,
  postOrder,
} from "../../api/OrdersApi";

vi.mock("axios");

describe("Order API calls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls getOrderById with correct url", async () => {
    const orderId = "ORDER-0";
    const mockedResponse = { data: { id: orderId } };
    axios.get.mockResolvedValueOnce(mockedResponse);

    const res = await getOrderById(orderId);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/orders/${orderId}`)
    );
    expect(res).toEqual(mockedResponse);
  });

  it("calls getOrdersForCustomer with correct url", async () => {
    const customerName = "John Doe";
    const mockedResponse = { data: [{ id: "ORDER-0" }] };
    axios.get.mockResolvedValueOnce(mockedResponse);

    const res = await getOrdersForCustomer(customerName);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/orders?customer_full_name=${customerName}`)
    );
    expect(res).toEqual(mockedResponse);
  });
  it("calls postOrder with correct payload", async () => {
    const payload = { customer_full_name: "John Doe" };
    const mockedResponse = { data: { id: "ORDER-0" } };
    axios.post.mockResolvedValueOnce(mockedResponse);

    const res = await postOrder(payload);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/orders"),
      payload,
      expect.objectContaining({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
    expect(res).toEqual(mockedResponse);
  });
  it("calls patchOrder with correct payload", async () => {
    const orderId = "ORDER-0";
    const payload = { status: "completed" };
    const mockedResponse = { data: { id: orderId } };
    axios.patch.mockResolvedValueOnce(mockedResponse);

    const res = await patchOrder(orderId, payload);

    expect(axios.patch).toHaveBeenCalledWith(
      expect.stringContaining(`/orders/${orderId}`),
      payload
    );
    expect(res).toEqual(mockedResponse);
  });
  it("uses prod API URL in production", async () => {
    vi.stubEnv("VITE_DEPLOY_ENV", "prod");
    vi.resetModules();
    const { getOrdersForCustomer } = await import("../../api/OrdersApi");

    expect(import.meta.env.VITE_DEPLOY_ENV).toBe("prod");

    const mockedResponse = { data: [{ id: "ORDER-0" }] };
    axios.get.mockResolvedValueOnce(mockedResponse);
    await getOrdersForCustomer("John Doe");
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/orders?customer_full_name=John Doe")
    );
  });
});
