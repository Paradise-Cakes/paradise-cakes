import { useQuery } from "react-query";
import { getDesserts, getDessertById } from "../../api/ParadiseCakesApi";

export const useGetDessertById = (dessert_id) => {
  return useQuery(["dessert", dessert_id], () => getDessertById(dessert_id), {
    select: (data) => data.data,
  });
};

export const useGetDesserts = () => {
  return useQuery(["desserts"], () => getDesserts(), {
    select: (data) => data.data,
  });
};
