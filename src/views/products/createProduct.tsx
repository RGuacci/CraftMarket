import { useState } from "react";
import type {
  CreateProductData,
  ProductFormData,
} from "../../services/productService";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../../hooks/mutations/useCreateProduct";
import { useCategories } from "../../hooks/queries/useCategories";
import { useNavigate } from "react-router";
import { getErrorMessage } from "../../utils/errorHandler";
import { useFlashMessage } from "../../contexts/flashMessageContext";
import ProductForm from "../../components/products/productForm";
import { handleServerValidation } from "../../utils/serverValidation";

export default function CreateProduct() {
  const { mutate, isPending } = useCreateProduct();
  const { data: categories = [] } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();
  const { showFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit = (data: ProductFormData) => {
    const payload: CreateProductData = {
      ...data,
      categories: selectedCategories,
      images,
    };

    mutate(payload, {
      onSuccess: () => {
        showFlash("Articolo creato con successo!", "success");
        navigate(`/products`);
      },

      onError: (error: unknown) => {
        const { isValidationError, hiddenMessages } = handleServerValidation(
          error,
          setError,
          ["name", "description", "price", "stock"],
        );

        if (!isValidationError) {
          showFlash(getErrorMessage(error), "error");
        } else if (hiddenMessages.length > 0) {
          showFlash(hiddenMessages.join(" "), "error");
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
                  <ProductForm
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoriesChange={setSelectedCategories}
                    images={images}
                    onImagesChange={setImages}
                    isPending={isPending}
                    submitLabel="Crea Prodotto"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
