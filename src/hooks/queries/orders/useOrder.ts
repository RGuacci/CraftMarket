import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../../services/orderService";

export const useOrder = (orderId: number) => {
  return useQuery({
    queryFn: () => getOrder(orderId),
    queryKey: ["orders", orderId],
    enabled: Number.isInteger(orderId) && orderId > 0,
  });
};