import { useQuery } from "@tanstack/react-query";
import { getMySellerRequest } from "../../../services/sellerRequest";

export const useMySellerRequest = () => {
  return useQuery({
    queryKey: ["my-seller-request"],
    queryFn: getMySellerRequest,
  });
};
