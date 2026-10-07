import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProducts } from '../../services/productService';


export const useProducts = (page: number) => {
   return useQuery({
     queryKey: ["products", page],
     queryFn: () => getProducts(page),
     placeholderData: keepPreviousData,
   });
};