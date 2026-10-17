import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  type ForgotPasswordData,
} from "../../../services/authService";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => forgotPassword(data),
  });
};
