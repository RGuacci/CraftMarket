import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem } from "../../../services/cartServices";

interface UpdateCartItemVariables {
  productId: number;
  quantity: number;
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: UpdateCartItemVariables) =>
      updateCartItem(productId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};