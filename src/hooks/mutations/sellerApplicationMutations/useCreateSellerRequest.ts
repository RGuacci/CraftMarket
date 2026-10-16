import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSellerRequest,
  type CreateSellerRequestData,
} from "../../../services/sellerRequest";

export const useCreateSellerRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSellerRequestData) => createSellerRequest(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-seller-request"],
      });
    },
  });
};
