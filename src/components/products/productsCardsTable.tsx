import type { Product } from "../../services/productService";
import { Link } from "react-router";

interface ProductsCardsTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
  deletingSlug: string | null;
}

export default function ProductsCardsTable({
  products,
  onDelete,
  deletingSlug,
}: ProductsCardsTableProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => {
          const isDeleting = deletingSlug === product.slug;

          return (
            <div key={product.id} className="card bg-base-200 shadow-md m-5">
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>

                <div className="flex justify-between">
                  <span>Prezzo</span>
                  <span>€ {product.price}</span>
                </div>

                <div className="flex justify-between">
                  <span>Stock</span>
                  <span
                    className={
                      product.stock > 0 ? "text-success" : "text-error"
                    }
                  >
                    {product.stock}
                  </span>
                </div>

                <div>
                  <p className="mb-2">Categorie</p>

                  <div className="flex flex-wrap gap-1">
                    {product.categories.map((category) => (
                      <span key={category.id} className="badge badge-accent">
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-actions justify-end mt-5">
                  <Link
                    to={`/products/${product.slug}/edit`}
                    className="btn btn-warning btn-sm"
                  >
                    Modifica
                  </Link>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => onDelete(product)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <span className="loading loading-spinner" />
                        Eliminazione...
                      </>
                    ) : (
                      "Elimina"
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
