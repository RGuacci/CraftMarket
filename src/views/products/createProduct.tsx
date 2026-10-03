import { useState } from "react";
import type { CreateProductData } from "../../services/productService";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreateProduct } from "../../hooks/mutations/useCreateProduct";
import axios from "axios";
import CategorySelector from "../../components/products/categorySelector";
import { useCategories } from "../../hooks/queries/useCategories";

export default function CreateProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError, error } = useCreateProduct();
  const { data: categories = [], isLoading } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<CreateProductData>();

  const onSubmit = (data: CreateProductData) => {
    (mutate(data),
      {
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            const errors = error.response?.data.errors;

            if (errors) {
              Object.entries(errors as Record<string, string[]>).forEach(
                ([field, messages]) => {
                  setError(field as keyof CreateProductData, {
                    type: "server",
                    message: messages[0],
                  });
                },
              );
            }
          }
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["products"],
          });
          navigate("/products");
        },
      });
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <section>
        <form>
          <div className="hero bg-base-200 w-3/4 md:w-4xl rounded-box">
            <div className="hero-content flex-col lg:flex-row-reverse w-3xl">
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                  <fieldset className="fieldset">
                    {/* Nome */}
                    <input
                      type="text"
                      className="input"
                      placeholder="Nome del Prodotto"
                    />

                    {/* Descrizione */}
                    <textarea
                      className="textarea"
                      placeholder="Descrizione"
                    ></textarea>

                    {/* Prezzo */}
                    <input
                      type="number"
                      className="input validator"
                      min="0"
                      placeholder="$Prezzo "
                    />

                    {/* Stock */}
                    <input
                      type="number"
                      className="input validator"
                      min="0"
                      placeholder="Stock"
                    />
                  </fieldset>

                  <CategorySelector
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={setSelectedCategories}
                  />

                  <button className="btn btn-neutral mt-4">
                    Crea Prodotto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
