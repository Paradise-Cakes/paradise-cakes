import { useQuery, useMutation } from "react-query";
import { getDesserts, getDessertById, postDessertImage, postDessert } from "../../api/ParadiseCakesApi";

export const useGetDessertById = (dessert_id) => {
  return useQuery(["dessert", dessert_id], () => getDessertById(dessert_id), {
    select: (data) => data.data,
  });
};

export const useGetDesserts = (dessert_type) => {
  return useQuery(["desserts", dessert_type], () => getDesserts(dessert_type), {
    select: (data) => data.data,
  });
};

export const usePostDessertImage = (dessert_id) => {
  return useMutation(({ dessertImage }) => postDessertImage(dessert_id, dessertImage), {
    onSuccess: () => console.log("SUCCESS"),
  });
};

export const usePostDessert = () => {
  return useMutation(({ dessert }) => postDessert(dessert), {
    onSuccess: () => console.log("SUCCESS"),
  });
}
