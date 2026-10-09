import { useUpdateProduct } from "../../hooks/mutations/useUpdateProduct";
import { useProduct } from "../../hooks/queries/useProduct";
import { useCategories } from "../../hooks/queries/useCategories";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import type {
  UpdatedProductData,
  ProductFormData,
} from "../../services/productService";
import ExistingImages from "../../components/products/existingImages";
import { useNavigate } from "react-router";
import { getErrorMessage } from "../../utils/errorHandler";
import { useFlashMessage } from "../../contexts/flashMessageContext";
import ProductForm from "../../components/products/productForm";
import { handleServerValidation } from "../../utils/serverValidation";

export default function EditProduct() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug!);
  const { mutate, isPending } = useUpdateProduct();
  const { data: categories = [] } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [removeImages, setRemoveImages] = useState<number[]>([]);
  const navigate = useNavigate();
  const { showFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

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

  const onSubmit = (data: ProductFormData) => {
    if (!slug) return;

    const payload: UpdatedProductData = {
      ...data,
      categories: selectedCategories,
      images,
      remove_images: removeImages,
    };

    mutate(
      { slug, productData: payload },
      {
        onSuccess: (updatedProduct) => {
          showFlash("Articolo aggiornato con successo!", "success");
          navigate(`/products/${updatedProduct.slug}`);
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
                    submitLabel="Salva Modifiche"
                  >
                    <ExistingImages
                      images={product.images}
                      removeImages={removeImages}
                      onRemove={(id) => {
                        setRemoveImages((prev) => [...prev, id]);
                      }}
                    />
                  </ProductForm>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
