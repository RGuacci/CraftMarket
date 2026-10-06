import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/productService';

export const useProducts = () => {
   return useQuery({
     queryKey: ["products"],
     queryFn: getProducts,
   })
}