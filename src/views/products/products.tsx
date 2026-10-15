import { useProducts } from "../../hooks/queries/product/useProducts";
import { useCategories } from "../../hooks/queries/useCategories";
import { useSearchParams } from "react-router";
import ProductCard from "../../components/products/productCard";
import { useState, useEffect } from "react";
import Filters from "../../components/products/filters";

export default function Products() {
  // Filtri
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<"latest" | "price_asc" | "price_desc">(
    "latest",
  );

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setPage(1);
  }, [searchParams]);

  const filters = {
    search,
    category,
    sort,
  };

  const { data: products, isLoading, isError } = useProducts(page, filters);

  const { data: categories } = useCategories();

  // Azzero i filtri
  const handleResetFilters = () => {
    setSearchParams({});
    setSearch("");
    setCategory("");
    setSort("latest");
    setPage(1);
  };

  if (isLoading) {
    return <span className="loading loading-spinner" />;
  }

  if (isError) {
    return <p>Errore nel caricamento dei prodotti</p>;
  }

  // Generazione dei numeri per la paginazione
  const pages = Array.from(
    { length: products?.meta.last_page ?? 0 },
    (_, index) => index + 1,
  );

  return (
    <section className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl">
        <Filters
          category={category}
          sort={sort}
          categories={categories ?? []}
          onCategoryChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          onSortChange={(value) => {
            setSort(value);
            setPage(1);
          }}
          onReset={handleResetFilters}
        />

        {products && products.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-15">
            {products.data.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-base-content/70 mb-4">
              Nessun prodotto trovato con questi criteri.
            </p>
          </div>
        )}

        {products && products.data.length > 0 && (
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
                  className={`join-item btn  ${pageNumber === page ? "btn" : ""}`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                className="join-item btn bg-primary text-primary-content"
                onClick={() => setPage(page + 1)}
                disabled={page === products.meta.last_page}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
