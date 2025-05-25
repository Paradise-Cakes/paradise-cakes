import DessertForm from "../../../../components/forms/dessert/DessertForm";

export default {
  component: DessertForm,
};

export const Create = {};

export const Edit = {
  args: {
    dessert: {
      dessert_id: "1",
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      dessert_type: "cake",
      ingredients: [
        "flour",
        "sugar",
        "cocoa powder",
        "eggs",
        "butter",
        "baking powder",
      ],
      images: [
        {
          image_id: 1,
          url: "https://picsum.photos/id/237/200/300",
        },
        {
          image_id: 2,
          url: "https://picsum.photos/id/238/200/300",
        },
      ],
      prices: [
        { size: "6 inch", base_price: 10 },
        { size: "8 inch", base_price: 15 },
        { size: "10 inch", base_price: 20 },
      ],
      special_tag: "new!",
      visible: true,
    },
  },
};

export const Loading = {
  args: {
    isLoading: true,
  },
};
