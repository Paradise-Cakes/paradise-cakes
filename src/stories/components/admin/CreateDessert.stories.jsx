import CreateDessert from "../../../components/admin/CreateDessert";
import { usePostDessert } from "../../../hooks/dessert/DessertHook.mock";

export default {
  component: CreateDessert,
};

export const Base = {};

export const Submitting = {
  async beforeEach() {
    usePostDessert.mockReturnValue({
      mutateAsync: async () => Promise.resolve(),
      isLoading: true,
      error: null,
    });
  },
};
