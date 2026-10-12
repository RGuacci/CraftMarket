import { Link } from "react-router";
import type { Product } from "../../services/productService";
import { getImageUrl } from "../../utils/images";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <div
      className="
       card bg-base-200 w-full max-w-sm
        border border-transparent
        shadow-md
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-xl
       "
    >
      <figure className="h-40">
        {product.images.length > 0 ? (
          <img 
          src={getImageUrl(product.images[0].path)} 
          alt={product.name} 
          className="h-full w-full object-cover"
          />
        ) : (
          <div>nessuna immagine</div>
        )}
      </figure>

      <div className="card-body bg-base-200">
        <h2 className="card-title">{product.name}</h2>

        <div className="card-actions justify-end">
          <Link to={`/products/${product.slug}`} className="btn btn-primary">
            Info
          </Link>
        </div>
      </div>
    </div>
  );
}
