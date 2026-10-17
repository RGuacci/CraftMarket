import { useMutation } from "@tanstack/react-query";
import {
  resetPassword,
  type ResetPasswordData,
} from "../../../services/authService";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => resetPassword(data),
  });
};