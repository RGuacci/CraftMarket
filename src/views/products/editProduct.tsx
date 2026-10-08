import { useUpdateProduct } from "../../hooks/mutations/useUpdateProduct";
import { useProduct } from "../../hooks/queries/useProduct";
import { useCategories } from "../../hooks/queries/useCategories";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router";
import type { UpdatedProductData } from "../../services/productService";
import CategorySelector from "../../components/products/categorySelector";
import ExistingImages from "../../components/products/existingImages";
import ImageUploader from "../../components/products/imageUploader";
import { useNavigate } from "react-router";

export default function EditProduct() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug!);
  const { mutate, isPending } = useUpdateProduct();
  const { data: categories = [] } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [removeImages, setRemoveImages] = useState<number[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<UpdatedProductData>();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        stock: product.stock,
      });
      setSelectedCategories(product.categories.map((category) => category.id));
    }
  }, [product, reset]);

  const onSubmit = (data: UpdatedProductData) => {
    if (!slug) {
      return;
    }

    const productData: UpdatedProductData = {
      ...data,
      categories: selectedCategories,
      images,
      remove_images: removeImages,
    };

    mutate(
      { slug, productData },
      {
        onSuccess: (updatedProduct) => {
          navigate(`/products/${updatedProduct.slug}`);
        },

        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            const errors = error.response?.data.errors;

            if (errors) {
              Object.entries(errors as Record<string, string[]>).forEach(
                ([field, messages]) => {
                  setError(field as keyof UpdatedProductData, {
                    type: "server",
                    message: messages[0],
                  });
                },
              );
            }
          }
        },
      },
    );
  };

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  if (isError || !product) {
    return <p className="text-red-500">Errore nel caricamento del prodotto</p>;
  }

  return (
    <>
      <h1 className="text-center my-5 text-5xl">Modifica Articolo</h1>
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

                  {/* Categorie */}
                  <CategorySelector
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={setSelectedCategories}
                  />
                  <div className="flex flex-col gap-5 mt-5">
                    {/* Immagini gia presenti */}
                    <ExistingImages
                      images={product.images}
                      removeImages={removeImages}
                      onRemove={(id) => {
                        setRemoveImages((prev) => [...prev, id]);
                      }}
                    />

                    {/* Nuove Immagini */}
                    <ImageUploader images={images} onChange={setImages} />
                    <button
                      type="submit"
                      className="btn btn-primary my-5 mx-auto"
                      disabled={isPending}
                    >
                    {isPending ? (
                      <>
                      <span className="loading loading-spinner" />
                      Salvataggio...
                      </>
                    ) : (
                      "Salva Modifiche"
                    )}
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
