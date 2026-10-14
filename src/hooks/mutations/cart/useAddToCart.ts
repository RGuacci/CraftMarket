import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../../services/cartServices";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};