import EditDessert from "../../../components/admin/EditDessert";
import {
  usePatchDessert,
  useGetDessertById,
} from "../../../hooks/dessert/DessertHook.mock";

export default {
  component: EditDessert,
};

export const BasePrefilled = {
  decorators: [
    (Story) => {
      useGetDessertById.mockReturnValue({
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
              url: "https://picsum.photos/id/237/200/300",
              position: 1,
              file_name: "image1.jpg",
              file_type: "jpg",
            },
            {
              image_id: "IMAGE-2",
              url: "https://picsum.photos/id/238/200/300",
              position: 2,
              file_name: "image2.jpg",
              file_type: "jpg",
            },
            {
              image_id: "IMAGE-3",
              url: "https://picsum.photos/id/239/200/300",
              position: 3,
              file_name: "image2.jpg",
              file_type: "jpg",
            },
          ],
          special_tag: "on sale",
        },
        isLoading: false,
        isSuccess: true,
      });
      return <Story />;
    },
  ],
};
