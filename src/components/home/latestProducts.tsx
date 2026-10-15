import { useLatestProducts } from "../../hooks/queries/product/useLatestProducts";
import ProductCard from "../products/productCard";
import { Link } from "react-router";

export default function LatestProducts() {
  const { data, isPending, isError } = useLatestProducts();

  if (isPending) return <p>Caricamento prodotti...</p>;

  if (isError) return <p>Errore nel caricamento dei prodotti.</p>;

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 border border-base-300 p-10 md:p-15">
        {/* Intestazione */}
        <div className="flex items-end justify-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-heading">
              Ultimi arrivi
            </h2>
          </div>
        </div>

        {/* Griglia prodotti */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="py-10 flex">
          <Link to="/products" className="btn btn-primary btn-sm sm:btn-md mx-auto">
            Vedi tutti
          </Link>
        </div>
      </div>
    </section>
  );
}
