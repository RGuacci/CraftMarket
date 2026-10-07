import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../../services/productService";

export const useMyProducts = () => {
    return useQuery({
        queryKey: ["my-products"],
        queryFn: getMyProducts,
    });
};