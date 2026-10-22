import { Link } from "react-router";
import type { Order } from "../../services/orderService";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const statusLabel = {
    paid: "Pagato",
    pending: "In attesa",
    failed: "Pagamento fallito",
  } as const;

  const statusClass = {
    paid: "badge-success",
    pending: "badge-warning",
    failed: "badge-error",
  } as const;

  return (
    <article className="overflow-hidden rounded-xl border border-base-300 bg-base-100">
      <header className="grid grid-cols-2 gap-4 bg-base-200 p-4 sm:grid-cols-4">
        <div>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Ordine effettuato il
          </p>
          <p className="mt-1">
            {new Date(order.created_at).toLocaleDateString("it-IT")}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Totale
          </p>
          <p className="mt-1 font-semibold">
            € {Number(order.total).toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Stato
          </p>
          <span className={`badge mt-1 ${statusClass[order.status]}`}>
            {statusLabel[order.status]}
          </span>
        </div>

        <div className="sm:text-right">
          <p className="text-xs font-medium uppercase text-base-content/60">
            Numero ordine
          </p>
          <p className="mt-1 font-semibold">#{order.id}</p>
        </div>
      </header>

      <div className="flex flex-col gap-5 p-4 sm:p-5">
        {order.orderItems?.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-base-200 p-2 sm:h-28 sm:w-28">
                  {item.product?.images?.[0]?.url ? (
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-base-content/50">
                      Immagine non disponibile
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="font-semibold">
                    {item.product?.name ?? `Prodotto #${item.product_id}`}
                  </h2>
                  <p className="mt-2 text-sm text-base-content/70">
                    Quantità: {item.quantity}
                  </p>
                  <p className="mt-1 font-medium">
                    € {Number(item.price).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="sm:w-48 sm:shrink-0">
                <Link
                  to={`/profile/orders/${order.id}`}
                  className="btn btn-primary w-full"
                >
                  Dettagli ordine
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
