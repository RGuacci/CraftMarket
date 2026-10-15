import type { Category } from "../../services/productService";

type ProductFiltersProps = {
  category: string;
  sort: "latest" | "price_asc" | "price_desc";
  categories: Category[];
  onCategoryChange: (value: string) => void;
  onSortChange: (value: "latest" | "price_asc" | "price_desc") => void;
  onReset: () => void;
};

export default function ProductFilters({
  category,
  sort,
  categories,
  onCategoryChange,
  onSortChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mb-8">
      <select
        className="select select-bordered w-full"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">Tutte le categorie</option>

        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered w-full"
        value={sort}
        onChange={(event) =>
          onSortChange(event.target.value as ProductFiltersProps["sort"])
        }
      >
        <option value="latest">Più recenti</option>
        <option value="price_asc">Prezzo crescente</option>
        <option value="price_desc">Prezzo decrescente</option>
      </select>
      {(category !== "" || sort !== "latest") && (
        <div className="flex justify-center mt-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onReset}
          >
            Ripristina filtri
          </button>
        </div>
      )}
    </div>
  );
}
