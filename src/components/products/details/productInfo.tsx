import type { Product } from "../../../services/productService";
import ProductActions from "./productActions";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      <div className="flex h-full flex-col gap-6 p-6 lg:p-8 shadow-lg bg-base-200">
        {/* Titolo e venditore */}
        <div className="space-y-1">
          <h1 className="text-3xl font-heading tracking-tight">
            {product.name}
          </h1>

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
        <ProductActions product={product} />
      </div>
    </>
  );
}
