import { Link, useParams } from "react-router";
import { useOrder } from "../../hooks/queries/orderQueries/useOrder";

export default function Order() {
  const { orderId } = useParams();
  const parsedOrderId = Number(orderId);

  const { data: order, isPending, isError } = useOrder(parsedOrderId);
  console.log("orderId:", orderId);
  console.log("parsedOrderId:", parsedOrderId);

  if (isPending) {
    return <p className="p-6">Caricamento ordine...</p>;
  }

  if (isError || !order) {
    return (
      <section className="mx-auto max-w-4xl p-6">
        <p role="alert" className="text-error">
          Impossibile recuperare questo ordine.
        </p>

        <Link to="/orders" className="btn btn-ghost mt-4">
          Torna ai miei ordini
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <Link to="/orders" className="link link-hover">
        ← Torna ai miei ordini
      </Link>

      <header className="my-6">
        <h1 className="text-3xl font-bold">Ordine #{order.id}</h1>

        <p className="mt-2 text-base-content/70">
          Effettuato il {new Date(order.created_at).toLocaleDateString("it-IT")}
        </p>
      </header>

      <section className="card mb-6 border border-base-300 bg-base-100 p-5">
        <h2 className="mb-3 text-xl font-semibold">Riepilogo ordine</h2>

        <p>
          Stato: <span className="badge badge-outline">{order.status}</span>
        </p>

        <p className="mt-2 text-lg font-semibold">
          Totale: € {Number(order.total).toFixed(2)}
        </p>
      </section>

      <section className="card mb-6 border border-base-300 bg-base-100 p-5">
        <h2 className="mb-3 text-xl font-semibold">Indirizzo di spedizione</h2>

        <p>{order.shipping_name}</p>
        <p>{order.shipping_address}</p>
        <p>
          {order.shipping_postal_code} {order.shipping_city}
        </p>
        <p>{order.shipping_country}</p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Prodotti acquistati</h2>

        <div className="flex flex-col gap-4">
          {order.orderItems.map((item) => (
            <article
              key={item.id}
              className="card border border-base-300 bg-base-100 p-5"
            >
              <h3 className="font-semibold">
                {item.product?.name ?? `Prodotto #${item.product_id}`}
              </h3>

              <p className="mt-2">Quantità: {item.quantity}</p>

              <p>Prezzo unitario: € {Number(item.price).toFixed(2)}</p>

              <p className="mt-1 font-semibold">
                Subtotale: € {(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
