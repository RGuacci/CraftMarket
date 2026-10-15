import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../../../services/productService";

export type ProductFilters = {
  search: string;
  category: string;
  sort: "latest" | "price_asc" | "price_desc";
};

export const useProducts = (page: number, filters: ProductFilters) => {
  return useQuery({
    queryKey: ["products", page, filters],
    queryFn: () =>
      getProducts(page, 12, {
        search: filters.search,
        category: filters.category ? Number(filters.category) : undefined,
        sort: filters.sort,
      }),
    placeholderData: keepPreviousData,
  });
};
