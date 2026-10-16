import { useOrders } from "../../hooks/queries/orderQueries/useOrders";
import { Link } from "react-router";
import OrderCard from "../../components/orders/orderCard";

export default function Orders() {
  const { data: orders, isPending, isError, error } = useOrders();

  if (isPending) {
    return <p className="p-6">Caricamento ordini...</p>;
  }

  if (isError) {
    return (
      <p role="alert" className="p-6 text-error">
        Errore nel recupero degli ordini: {error.message}
      </p>
    );
  }

  if (!orders?.length) {
    return (
      <section className="mx-auto max-w-5xl p-6">
        <h1 className="mb-6 text-3xl font-bold">I miei ordini</h1>
        <div className="rounded-xl border border-base-300 bg-base-100 p-8 text-center">
          <p>Non hai ancora effettuato ordini.</p>
          <Link to="/" className="btn btn-primary mt-4">
            Esplora il catalogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="mb-6 text-3xl font-bold">I miei ordini</h1>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
