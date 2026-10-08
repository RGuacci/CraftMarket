import { useState } from "react";
import type { CreateProductData } from "../../services/productService";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../../hooks/mutations/useCreateProduct";
import axios from "axios";
import CategorySelector from "../../components/products/categorySelector";
import { useCategories } from "../../hooks/queries/useCategories";
import  ImageUploader from "../../components/products/imageUploader";

export default function CreateProduct() {
  const { mutate } = useCreateProduct();
  const { data: categories = [], isLoading } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]);
  

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
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
      });
  };

  return (
    <>
    <h1 className="text-center my-5 text-5xl">Crea Articolo</h1>
    <section className="min-h-screen w-full flex justify-center items-center">
      <div className="hero bg-base-100 w-full max-w-4xl rounded-box">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-lg">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  {/* Nome */}
                  {errors.name && (
                    <span className="text-error text-sm">
                      {errors.name.message}
                    </span>
                  )}
                  <input
                    type="text"
                    className="input mb-5"
                    placeholder="Nome del Prodotto"
                    {...register("name", {
                      required: "Il nome è obbligatorio.",
                      onChange: () => clearErrors("name"),
                    })}
                  />

                  {/* Descrizione */}
                  {errors.description && (
                    <span className="text-error text-sm">
                      {errors.description.message}
                    </span>
                  )}
                  <textarea
                    className="textarea mb-5"
                    placeholder="Descrizione"
                    {...register("description", {
                      required: "La descrizione è richiesta.",
                    })}
                  ></textarea>

                  {/* Prezzo */}
                  {errors.price && (
                    <span className="text-error text-sm">
                      {errors.price.message}
                    </span>
                  )}
                  <input
                    type="number"
                    className="input mb-5 validator"
                    min="0"
                    placeholder="$Prezzo "
                    {...register("price", {
                      valueAsNumber: true,
                      required: "Il prezzo è richiesto.",
                      min: {
                        value: 0,
                        message: "Il prezzo non puo essere inferiore a 0.",
                      },
                    })}
                  />

                  {/* Stock */}
                  {errors.stock && (
                    <span className="text-error text-sm">
                      {errors.stock.message}
                    </span>
                  )}
                  <input
                    type="number"
                    className="input validator mb-5"
                    min="0"
                    placeholder="Stock"
                    {...register("stock", {
                      valueAsNumber: true,
                      required: "Il numero di stock è richiesto.",
                      min: {
                        value: 0,
                        message: "Lo stock non puo essere inferiore a 0",
                      },
                    })}
                  />
                </fieldset>

                <CategorySelector
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onChange={(ids) => {
                    setSelectedCategories(ids);
                    setValue("categories", ids);
                  }}
                />
                <div className="mt-10  flex flex-col justify-center items-center">
                  <ImageUploader
                    images={images}
                    onChange={(files) => {
                      setImages(files);
                      setValue("images", files);
                    }}
                  />
                  <button type="submit" className="btn btn-primary mt-8">
                    Crea Prodotto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
