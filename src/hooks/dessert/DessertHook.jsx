import { useQuery } from "react-query";
import { getDesserts, getDessertById } from "../../api/ParadiseCakesApi";

export const useGetDessertById = (uid) => {
  return useQuery(["dessert", uid], () => getDessertById(uid), {
    select: (data) => data.data,
  });
};

export const useGetDesserts = (dessert_type = null) => {
  return useQuery(["desserts", dessert_type], () => getDesserts(dessert_type), {
    select: (data) => data.data,
  });
};
