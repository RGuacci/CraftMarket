import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../../../services/orderService";

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}