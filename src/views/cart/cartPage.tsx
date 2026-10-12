import { Link } from "react-router";
import { BsCartCheck } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../../hooks/queries/useCart";
import { getImageUrl } from "../../utils/images";

export default function CartPage() {
  const { data: cart, isPending, isError } = useCart();

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error mx-auto mt-8 max-w-2xl">
        Errore nel caricamento del carrello.
      </div>
    );
  }

  if (!cart?.items.length) {
    return (
      <div className="mx-auto flex min-h-96 max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
        <BsCartCheck className="text-6xl text-base-content/30" />

        <h1 className="text-3xl font-bold">Il tuo carrello è vuoto</h1>

        <p className="text-base-content/60">
          Scopri i prodotti di Satisfy e trova qualcosa che fa per te.
        </p>

        <Link to="/products" className="btn btn-primary mt-2">
          Scopri i prodotti
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) =>
      sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Il tuo carrello
        </h1>

        <p className="mt-2 text-base-content/60">
          {cart.items.length}{" "}
          {cart.items.length === 1 ? "prodotto" : "prodotti"} nel carrello
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
        {/* Lista prodotti */}
        <section className="flex flex-col gap-4">
          {cart.items.map((item) => {
            const product = item.product;
            const image = product.images[0];

            return (
              <article
                key={product.id}
                className="card border border-base-300 bg-base-200 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="card-body flex-row items-center gap-4 p-4 sm:gap-6 sm:p-6">
                  <Link
                    to={`/products/${product.slug}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-base-300 sm:h-32 sm:w-32"
                  >
                    {image ? (
                      <img
                        src={getImageUrl(image.path)}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-center text-xs text-base-content/50">
                        Nessuna immagine
                      </div>
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <Link
                      to={`/products/${product.slug}`}
                      className="text-lg font-semibold transition-colors hover:text-primary sm:text-xl"
                    >
                      {product.name}
                    </Link>

                    <p className="text-sm text-base-content/60">
                      Venduto da {product.user.name}
                    </p>

                    <p className="font-medium">
                      € {Number(product.price).toFixed(2)}
                    </p>

                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-sm text-base-content/60">
                        Quantità: {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-square text-error"
                        aria-label={`Rimuovi ${product.name}`}
                        disabled
                        title="Rimozione non ancora disponibile"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-sm text-base-content/60">
                      Subtotale
                    </p>

                    <p className="text-lg font-bold">
                      €{" "}
                      {(Number(product.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Riepilogo */}
        <aside className="card border border-base-300 bg-base-200 shadow-sm lg:sticky lg:top-6">
          <div className="card-body gap-4">
            <h2 className="text-xl font-bold">Riepilogo ordine</h2>

            <div className="flex justify-between gap-4 text-base-content/70">
              <span>Prodotti</span>
              <span>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>

            <div className="divider my-0" />

            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">Totale prodotti</span>
              <span className="text-2xl font-bold text-primary">
                € {total.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-base-content/60">
              Spedizione ed eventuali costi aggiuntivi saranno calcolati
              durante il checkout.
            </p>

            <button
              type="button"
              className="btn btn-primary mt-2 w-full"
              disabled
            >
              Procedi all'acquisto
            </button>

            <Link
              to="/products"
              className="btn btn-outline btn-primary w-full"
            >
              Continua gli acquisti
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}