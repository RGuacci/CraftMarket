import type { Product } from "../../services/productService";

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
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
            {products.map((product, index) => (
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
                    <button className="btn btn-warning btn-sm">Modifica</button>

                    <button className="btn btn-error btn-sm">Elimina</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
