import { useProducts } from "../../hooks/queries/useProducts";
import Card from "../../components/products/card";

export default function Products() {
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) {
    return <span className="loading loading-spinned" />;
  }

  if (isError) {
    return <p>Errore nel caricamento dei prodotti</p>;
  }

  if (products.length === 0) {
    return <p>Non ci sono ancora prodotti disponbili</p>;
  }

  return (
    <section className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-15">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
