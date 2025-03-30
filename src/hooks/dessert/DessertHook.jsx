import { useQuery, useMutation } from "react-query";
import {
  getDesserts,
  getDessertById,
  postDessert,
  patchDessert,
  deleteDessert,
} from "../../api/DessertsApi";
import { useQueryClient } from "react-query";

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

export const usePostDessert = () => {
  return useMutation(({ dessert }) => postDessert(dessert), {
    onSuccess: () => console.log("SUCCESSFUL POST DESSERT"),
  });
};

export const usePatchDessert = (dessert_id) => {
  const queryClient = useQueryClient();
  return useMutation(({ dessert }) => patchDessert(dessert_id, dessert), {
    onSuccess: () => {
      queryClient.invalidateQueries(["dessert", dessert_id]);
      queryClient.invalidateQueries(["desserts"]);
      console.log("SUCCESSFUL PATCH DESSERT");
    },
  });
};

export const useDeleteDessert = (dessert_id) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteDessert(dessert_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["desserts"]);
      console.log("SUCCESSFUL DELETE DESSERT");
    },
  });
};
