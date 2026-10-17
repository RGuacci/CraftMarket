import { useProducts } from "../../hooks/queries/productsQueries/useProducts";
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
  const lastPage = products?.meta.last_page ?? 0;

  const visiblePages = Array.from(
    { length: lastPage },
    (_, index) => index + 1,
  ).filter((p) => p === 1 || p === lastPage || Math.abs(p - page) <= 1);

  const paginationItems: (number | "...")[] = [];

  visiblePages.forEach((p, index) => {
    if (index > 0 && p - visiblePages[index - 1] > 1) {
      paginationItems.push("...");
    }

    paginationItems.push(p);
  });

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

        {lastPage > 1 && (
          <nav
            aria-label="Paginazione prodotti"
            className="flex flex-wrap items-center justify-center gap-2 my-8"
          >
            {/* Pagina precedente */}
            <button
              className="btn btn-sm"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              aria-label="Pagina precedente"
            >
              ←
            </button>

            {/* Numeri e puntini */}
            {paginationItems.map((item, index) =>
              item === "..." ? (
                <span key={`dots-${index}`} className="px-1" aria-hidden="true">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  className={`btn btn-sm ${page === item ? "btn-primary" : ""}`}
                  onClick={() => setPage(item)}
                  disabled={page === item}
                  aria-current={page === item ? "page" : undefined}
                >
                  {item}
                </button>
              ),
            )}

            {/* Pagina successiva */}
            <button
              className="btn btn-sm"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === lastPage}
              aria-label="Pagina successiva"
            >
              →
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
