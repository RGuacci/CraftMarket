import { useOrders } from "../../hooks/queries/orders/useOrders";
import { Link } from "react-router";

export default function Orders() {
  const { data: orders, isPending, isError, error } = useOrders();

  if (isPending) {
    return <p>Caricamento ordini...</p>;
  }

  if (isError) {
    return (
      <p role="alert">Errore nel recupero degli ordini: {error.message}</p>
    );
  }

  if (!orders?.length) {
    return <p>Non hai ancora effettuato ordini.</p>;
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">I miei ordini</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="card border border-base-300 bg-base-100 p-5"
          >
            <h2 className="text-xl font-semibold">Ordine #{order.id}</h2>
            
            <p>Stato: {order.status}</p>
            <Link className="btn btn-primary" to={`/profile/orders/${order.id}`}>Dettagli</Link>
            <p>Totale: € {Number(order.total).toFixed(2)}</p>
            <p>
              Data: {new Date(order.created_at).toLocaleDateString("it-IT")}
            </p>

            <p>Articoli: {order.order_items?.length ?? 0}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
