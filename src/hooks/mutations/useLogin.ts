import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authService";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
};