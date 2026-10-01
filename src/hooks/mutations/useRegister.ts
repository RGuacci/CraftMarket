import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../../services/authService";

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};