import type { Product } from "../../services/productService";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      <div className="flex flex-col gap-6 h-full items-center bg-base-200 p-5 shadow-lg">
        {/* Titolo */}
        <div>
          
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-base-content/60 mt-1">
            Venduto da {product.user.name}
          </p>
        </div>

        {/* Prezzo */}
        <p className="text-3xl font-bold">€ {product.price}</p>

        {/* Categorie */}
        <div className="flex flex-wrap gap-2">
          {product.categories.map((category) => (
            <span key={category.id} className="badge badge-accent">
              {category.name}
            </span>
          ))}
        </div>

        {/* Disponibilità */}
        <div>
          <span className="font-semibold">Disponibilità: </span>

          <span className={product.stock > 0 ? "text-success" : "text-error"}>
            {product.stock > 0 ? `${product.stock} disponibili` : "Esaurito"}
          </span>
        </div>

        {/* Descrizione */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Descrizione</h2>

          <p className="text-base-content/70 leading-relaxed">
            {product.description || "Nessuna descrizione disponibile."}
          </p>
        </div>

        {/* Azione */}
        <button
          className="btn btn-primary w-full lg:w-2/4 mt-auto mx-start"
          disabled={product.stock === 0}
        >
          Aggiungi al carrello
        </button>
      </div>
    </>
  );
}
