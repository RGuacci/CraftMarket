import { useProducts } from "../../hooks/queries/useProducts";
import ProductCard from "../../components/products/productCard";
import { useState } from "react";

export default function Products() {
  const [page, setPage] = useState(1);
  const { data: products, isLoading, isError } = useProducts(page);

  if (isLoading) {
    return <span className="loading loading-spinner" />;
  }

  if (isError) {
    return <p>Errore nel caricamento dei prodotti</p>;
  }

  if (!products || products.data.length === 0) {
    return <p>Non ci sono ancora prodotti disponbili</p>;
  }

  // Generazione dei numeri per la paginazione
  const pages = Array.from(
    { length: products.last_page },
    (_, index) => index + 1,
  );

  return (
    <section className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-15">
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center my-8">
          <div className="join">
            <button
              className="join-item btn bg-primary text-primary-content"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              «
            </button>

            {pages.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`join-item btn  ${
                  pageNumber === page ? "btn-active" : ""
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className="join-item btn bg-primary text-primary-content"
              onClick={() => setPage(page + 1)}
              disabled={page === products.last_page}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
