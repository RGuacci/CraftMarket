import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../services/productService';

export const useLatestProducts = () => {
    return useQuery({
        queryKey: ['latest-products'],
        queryFn: () => getProducts(1, 3),
    });
};