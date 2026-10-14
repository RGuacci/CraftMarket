import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../../services/cartServices";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};