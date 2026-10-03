import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/productService";
import { useNavigate } from "react-router";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/products", {
        state: {
          flash: "Prodotto creato con successo!"
        },
      });
    },
  });
};
