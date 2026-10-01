import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/authService";

export const useLogout = () => {
    return useMutation({
        mutationFn: logout,
    });
};