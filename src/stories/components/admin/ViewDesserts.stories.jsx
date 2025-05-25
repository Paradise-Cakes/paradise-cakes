import ViewDesserts from "../../../components/admin/ViewDesserts";

import { useGetDesserts } from "../../../hooks/dessert/DessertHook.mock";
import { desserts } from "../../mocks/mockDesserts";

export default {
  component: ViewDesserts,
};

export const Base = {
  decorators: [
    (Story) => {
      useGetDesserts.mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      });
      return <Story />;
    },
  ],
};

export const WithDesserts = {
  decorators: [
    (Story) => {
      useGetDesserts.mockReturnValue({
        data: desserts,
        isLoading: false,
        error: null,
        refetch: () => Promise.resolve(desserts),
      });
      return <Story />;
    },
  ],
};

export const DessertSkeletons = {
  decorators: [
    (Story) => {
      useGetDesserts.mockReturnValue({
        data: desserts,
        isLoading: true,
        error: null,
      });
      return <Story />;
    },
  ],
};
