import type { Product } from "../../services/productService";
import { Link } from "react-router";

interface ProductsTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
  deletingSlug: string | null;
}

export default function ProductsTable({
  products,
  onDelete,
  deletingSlug,
}: ProductsTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Prodotto</th>
              <th>Prezzo</th>
              <th>Stock</th>
              <th>Categorie</th>
              <th>Azioni</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => {
              const isDeleting = deletingSlug === product.slug;

              return (
                <tr key={product.id}>
                  <th>{index + 1}</th>

                  <td>{product.name}</td>

                  <td>€ {product.price}</td>

                  <td>
                    <span
                      className={
                        product.stock > 0 ? "text-success" : "text-error"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-1">
                      {product.categories.map((category) => (
                        <span key={category.id} className="badge badge-accent">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>
                    <div className="flex gap-2">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
