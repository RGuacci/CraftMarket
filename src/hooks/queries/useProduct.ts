import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/productService";

export const useProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProduct(slug!),
     enabled: !!slug,
  });
};
