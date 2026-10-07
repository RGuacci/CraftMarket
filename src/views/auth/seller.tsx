import type { Product } from "../../services/productService";
import { useUser } from "../../hooks/queries/useUser";
import { useMyProducts } from "../../hooks/queries/useMyProducts";
import ProductsTable from "../../components/products/productsTable";
import ProductsCardsTable from "../../components/products/productsCardsTable";

export default function Seller() {
  const { data: user } = useUser();
  const { data: products, isLoading, isError } = useMyProducts();

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  if (isError) {
    return <p>Errore nel caricamento dei prodotti.</p>;
  }

  if (!products) {
    return null;
  }

  return (
    <section className="flex flex-col mx-auto">
      <div className="mx-auto my-15 text-center">
        <h1 className="text-5xl mb-5">Dashboard Venditore</h1>
        {user && (
          <p className="text-3xl">
            Benvenuto <span className="font-bold">{user.name}</span>
          </p>
        )}
      </div>

      <div className="hidden md:block md:w-3/4 mx-auto">
        <ProductsTable products={products} />
      </div>

      <div className="md:hidden">
        <ProductsCardsTable products={products} />
      </div>
    </section>
  );
}
