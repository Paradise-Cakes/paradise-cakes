import { useQuery, useMutation } from "react-query";
import {
  getDesserts,
  getDessertById,
  postDessertImage,
  postDessert,
  patchDessert,
  deleteDessert,
} from "../../api/ParadiseCakesApi";
import { useQueryClient } from "react-query";

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

export const usePostDessertImage = () => {
  return useMutation(
    ({ dessertImageData, dessert_id }) =>
      postDessertImage(dessert_id, dessertImageData),
    {
      onSuccess: () => console.log("SUCCESS"),
    }
  );
};

export const usePostDessert = () => {
  return useMutation(({ dessert }) => postDessert(dessert), {
    onSuccess: () => console.log("SUCCESS"),
  });
};

export const usePatchDessert = (dessert_id) => {
  const queryClient = useQueryClient();
  return useMutation(({ dessert }) => patchDessert(dessert_id, dessert), {
    onSuccess: () => {
      queryClient.invalidateQueries(["dessert", dessert_id]);
      console.log("SUCCESS");
    },
  });
};

export const useDeleteDessert = (dessert_id) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteDessert(dessert_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["dessert", dessert_id]);
      console.log("SUCCESS");
    },
  });
};
