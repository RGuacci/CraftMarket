import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/authService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
