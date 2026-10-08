import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../services/productService";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (slug: string) => deleteProduct(slug),

        onSuccess: () => {
           queryClient.invalidateQueries({
            queryKey: ["my-products"],
           });

           queryClient.invalidateQueries({
            queryKey: ["products"],
           });
        },
    });
};