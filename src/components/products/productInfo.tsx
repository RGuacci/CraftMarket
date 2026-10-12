import type { Product } from "../../services/productService";
import { BsCartCheck } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { useAddToCart } from "../../hooks/mutations/useAddToCart";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const addToCart = useAddToCart();

  return (
    <>
      <div className="flex h-full flex-col gap-6 p-6 lg:p-8 shadow-lg bg-base-200">
        {/* Titolo e venditore */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <p className="text-sm text-base-content/60">
            Venduto da {product.user.name}
          </p>
        </div>

        {/* Prezzo */}
        <p className="text-3xl font-bold text-primary">€ {product.price}</p>

        {/* Categorie */}
        <div className="flex flex-wrap gap-2">
          {product.categories.map((category) => (
            <span key={category.id} className="badge badge-accent">
              {category.name}
            </span>
          ))}
        </div>

        <div className="divider my-0" />

        {/* Disponibilità */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium">Disponibilità</span>

          <span
            className={
              product.stock > 0
                ? "text-success font-medium"
                : "text-error font-medium"
            }
          >
            {product.stock > 0 ? `${product.stock} disponibili` : "Esaurito"}
          </span>
        </div>

        {/* Descrizione */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Descrizione</h2>

          <p className="text-base-content/70 leading-relaxed">
            {product.description || "Nessuna descrizione disponibile."}
          </p>
        </div>

        {/* Azioni */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4 sm:gap-3">
          <button
            className="btn btn-outline btn-primary min-w-0 gap-1 px-1 sm:gap-2 sm:px-3"
            disabled={product.stock === 0 || addToCart.isPending}
            onClick={() =>
              addToCart.mutate({
                product_id: product.id,
                quantity: 1,
              })
            }
          >
            <BsCartCheck className="text-base shrink-0 sm:text-xl" />

            <span className="text-xs leading-tight sm:text-sm">
              {addToCart.isPending
                ? "Aggiunta in corso..."
                : "Aggiungi al carrello"}
            </span>
          </button>

          <button
            className="btn btn-primary min-w-0 gap-1 px-1 sm:gap-2 sm:px-3"
            disabled={product.stock === 0}
          >
            <FaShoppingBag className="text-base shrink-0 sm:text-lg" />

            <span className="text-xs leading-tight sm:text-sm">Compra ora</span>
          </button>
        </div>
      </div>
    </>
  );
}
