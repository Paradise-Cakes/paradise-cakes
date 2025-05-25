import DessertDetail from "../../../components/dessert/DessertDetail";
import { useGetDessertById } from "../../../hooks/dessert/DessertHook.mock";

export default {
  component: DessertDetail,
};

export const Base = {
  decorators: [
    (Story) => {
      useGetDessertById.mockReturnValue({
        data: {},
        isLoading: false,
        error: null,
      });
      return <Story />;
    },
  ],
};
