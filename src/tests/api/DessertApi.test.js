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

describe("Dessert API calls", () => {
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
});
