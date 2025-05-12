import { vi, describe, test, expect } from "vitest";
import {
  render,
  screen,
  within,
  renderHook,
  waitFor,
  act,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useGetDessertById,
  useGetDesserts,
  usePostDessert,
  usePatchDessert,
  useDeleteDessert,
} from "../../../hooks/dessert/DessertHook";
import * as api from "../../../../src/api/DessertsApi";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("DessertHook", () => {
  test("returns dessert by id", async () => {
    const mockData = { data: { id: "dessert-123", name: "Chocolate Cake" } };

    vi.spyOn(api, "getDessertById").mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetDessertById("dessert-123"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData.data);
    expect(api.getDessertById).toHaveBeenCalledWith("dessert-123");
  });

  test("returns desserts list", async () => {
    const mockData = {
      data: [
        { id: "dessert-001", name: "Vanilla Cake" },
        { id: "dessert-002", name: "Chocolate Cake" },
      ],
    };

    vi.spyOn(api, "getDesserts").mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetDesserts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData.data);
    expect(api.getDesserts).toHaveBeenCalled();
  });

  test("posts a dessert", async () => {
    const mockDessert = { name: "Vanilla Cake" };
    const mockResponse = { data: { id: "dessert-001", ...mockDessert } };
    const mockPost = vi
      .spyOn(api, "postDessert")
      .mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePostDessert(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      const res = await result.current.mutateAsync({ dessert: mockDessert });
      expect(res).toEqual(mockResponse);
    });

    expect(mockPost).toHaveBeenCalledWith(mockDessert);
  });

  test("patches a dessert", async () => {
    const mockDessert = { name: "Vanilla Cake" };
    const mockResponse = { data: { id: "dessert-001", ...mockDessert } };
    const mockPatch = vi
      .spyOn(api, "patchDessert")
      .mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePatchDessert("dessert-001"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      const res = await result.current.mutateAsync({
        dessert_id: "dessert-001",
        dessert: mockDessert,
      });
      expect(res).toEqual(mockResponse);
    });

    expect(mockPatch).toHaveBeenCalledWith("dessert-001", mockDessert);
  });

  test("deletes a dessert", async () => {
    const mockDelete = vi.spyOn(api, "deleteDessert").mockResolvedValue({});

    const { result } = renderHook(() => useDeleteDessert("dessert-001"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(mockDelete).toHaveBeenCalledWith("dessert-001");
  });
});
