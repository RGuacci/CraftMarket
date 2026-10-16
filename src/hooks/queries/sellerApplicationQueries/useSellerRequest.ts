import { useQuery } from "@tanstack/react-query";
import { getSellerRequests } from "../../../services/sellerRequest";

export const useSellerRequests = (page = 1) => {
  return useQuery({
    queryKey: ["seller-requests", page],
    queryFn: () => getSellerRequests(page),
    placeholderData: (previousData) => previousData,
  });
};
