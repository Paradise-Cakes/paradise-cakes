import { useQuery } from "react-query";
import { getDesserts, getDessertById } from "../../api/ParadiseCakesApi";

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
