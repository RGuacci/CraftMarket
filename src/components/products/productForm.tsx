import type {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";

import type { ProductFormData } from "../../services/productService";
import type { Category } from "../../services/productService"; 

import CategorySelector from "./categorySelector";
import ImageUploader from "./imageUploader";



interface ProductFormProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  clearErrors: UseFormClearErrors<ProductFormData>;

  categories: Category[];
  selectedCategories: number[];
  onCategoriesChange: (ids: number[]) => void;

  images: File[];
  onImagesChange: (files: File[]) => void;

  isPending?: boolean;
  submitLabel: string;
  children?: React.ReactNode;
}

export default function ProductForm({
  register,
  errors,
  clearErrors,
  categories,
  selectedCategories,
  onCategoriesChange,
  images,
  onImagesChange,
  isPending = false,
  submitLabel,
  children,
}: ProductFormProps) {
  return (
    <>
      <fieldset className="fieldset">
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
             onChange: () => clearErrors("description"),
          })}
        />

        {errors.price && (
          <span className="text-error text-sm">
            {errors.price.message}
          </span>
        )}
        <input
          type="number"
          className="input mb-5 validator"
          min="0"
          step="0.01"
          placeholder="$Prezzo"
          {...register("price", {
            valueAsNumber: true,
            required: "Il prezzo è richiesto.",
             onChange: () => clearErrors("price"),
            min: {
              value: 0,
              message: "Il prezzo non può essere inferiore a 0.",
            },
          })}
        />

        {errors.stock && (
          <span className="text-error text-sm">
            {errors.stock.message}
          </span>
        )}
        <input
          type="number"
          className="input validator mb-5"
          min="0"
          step="1"
          placeholder="Stock"
          {...register("stock", {
            valueAsNumber: true,
            required: "Il numero di stock è richiesto.",
             onChange: () => clearErrors("stock"),
            min: {
              value: 0,
              message: "Lo stock non può essere inferiore a 0.",
            },
          })}
        />
      </fieldset>

      <CategorySelector
        categories={categories}
        selectedCategories={selectedCategories}
        onChange={onCategoriesChange}
      />

      {children}

      <div className="mt-5 flex flex-col items-center gap-5">
        <ImageUploader
          images={images}
          onChange={onImagesChange}
        />

        <button
          type="submit"
          className="btn btn-primary my-5"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner" />
              Salvataggio...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </>
  );
}