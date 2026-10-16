import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveSellerRequest,
  rejectSellerRequest,
} from "../../../services/sellerRequest";

export const useSellerRequestActions = () => {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: approveSellerRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["seller-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-seller-request"],
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectSellerRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["seller-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-seller-request"],
      });
    },
  });

  return {
    approveMutation,
    rejectMutation,
  };
};
