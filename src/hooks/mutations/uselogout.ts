import { useMutation,useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/authService";

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
           queryClient.setQueryData(["user"], null);
        },
    });
};