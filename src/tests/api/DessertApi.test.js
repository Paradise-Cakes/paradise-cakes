import { describe, it, vi, expect, beforeEach } from "vitest";
import axios from "axios";
import * as AmplifyAuth from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import {
  deleteDessert,
  getDessertById,
  getDesserts,
  patchDessert,
  postDessert,
} from "../../api/DessertsApi";

vi.mock("axios");
vi.mock("aws-amplify/auth");

const mockToken = "mockAccessToken";

describe("Dessert API calls", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(AmplifyAuth, "fetchAuthSession").mockResolvedValue({
      tokens: {
        accessToken: {
          toString: () => mockToken,
        },
      },
    });
  });

  it("calls getDesserts with correct url and token", async () => {
    const mockedResponse = { data: [{ id: "DESSERT-0" }] };
    axios.get.mockResolvedValueOnce(mockedResponse);

    const res = await getDesserts();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/desserts")
    );
    expect(res).toEqual(mockedResponse);
  });
  it("calls getDessertById with correct url and token", async () => {
    const dessertId = "DESSERT-0";
    const mockedResponse = { data: { id: dessertId } };
    axios.get.mockResolvedValueOnce(mockedResponse);

    const res = await getDessertById(dessertId);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/desserts/${dessertId}`)
    );
    expect(res).toEqual(mockedResponse);
  });
  it("calls postDessert with correct payload and token", async () => {
    const payload = { name: "Chocolate Cake" };
    const mockedResponse = { data: { id: "DESSERT-0" } };
    axios.post.mockResolvedValueOnce(mockedResponse);

    const res = await postDessert(payload);

    expect(fetchAuthSession).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/desserts"),
      payload,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );
    expect(res).toEqual(mockedResponse);
  });
  it("calls patchDessert with correct payload and token", async () => {
    const dessertId = "DESSERT-0";
    const payload = { name: "Chocolate Cake" };
    const mockedResponse = { data: { id: dessertId } };
    axios.patch.mockResolvedValueOnce(mockedResponse);

    const res = await patchDessert(dessertId, payload);

    expect(axios.patch).toHaveBeenCalledWith(
      expect.stringContaining(`/desserts/${dessertId}`),
      payload,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );
    expect(res).toEqual(mockedResponse);
  });
  it("calls deleteDessert with correct url and token", async () => {
    const dessertId = "DESSERT-0";
    const mockedResponse = { data: {} };
    axios.delete.mockResolvedValueOnce(mockedResponse);

    const res = await deleteDessert(dessertId);

    expect(axios.delete).toHaveBeenCalledWith(
      expect.stringContaining(`/desserts/${dessertId}`),
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );
    expect(res).toEqual(mockedResponse);
  });
  it("uses prod API URL in production", async () => {
    vi.stubEnv("VITE_DEPLOY_ENV", "prod");
    vi.resetModules();
    const { getDesserts } = await import("../../api/DessertsApi");

    expect(import.meta.env.VITE_DEPLOY_ENV).toBe("prod");

    const mockedResponse = { data: [{ id: "DESSERT-0" }] };
    axios.get.mockResolvedValueOnce(mockedResponse);
    await getDesserts();
    expect(axios.get).toHaveBeenCalledWith(
      "https://desserts-api.megsparadisecakes.com/v1/desserts"
    );
  });
});
