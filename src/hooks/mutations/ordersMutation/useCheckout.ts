import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../../../services/orderService";
import type { ShippingAddress } from "../../../components/cart/shippingModal";

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shippingAddress: ShippingAddress) => checkout(shippingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
