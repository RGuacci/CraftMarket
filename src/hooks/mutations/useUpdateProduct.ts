import { updateProduct } from '../../services/productService';
import type {  UpdatedProductData } from '../../services/productService';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProduct = () => {

    const queryClient = useQueryClient();
   
   return useMutation({ 
        mutationFn: ({
            slug,
            productData,
        } : {
            slug: string,
            productData: UpdatedProductData,
        }) => updateProduct(slug, productData),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["my-products"]
            });
           
        },
    });
};