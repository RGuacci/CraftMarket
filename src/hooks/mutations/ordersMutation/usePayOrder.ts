import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payOrder } from "../../../services/orderService";
import type { PaymentMethod } from "../../../services/orderService";


export function usePayOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      method,
    }: {
      orderId: number;
      method: PaymentMethod;
    }) => payOrder(orderId, method),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}