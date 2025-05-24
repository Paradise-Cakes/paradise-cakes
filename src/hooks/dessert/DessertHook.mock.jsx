import { fn } from "@storybook/test";

import * as actual from "./DessertHook";

export const useGetDessertById = fn(actual.useGetDessertById).mockName(
  "useGetDessertById"
);
export const useGetDesserts = fn(actual.useGetDesserts).mockName(
  "useGetDesserts"
);
export const usePostDessert = fn(actual.usePostDessert).mockName(
  "usePostDessert"
);
export const usePatchDessert = fn(actual.usePatchDessert).mockName(
  "usePatchDessert"
);
export const useDeleteDessert = fn(actual.useDeleteDessert).mockName(
  "useDeleteDessert"
);
