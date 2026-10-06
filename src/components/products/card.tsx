import type { CardProps } from "../../services/productService";
import { getImageUrl } from "../../utils/images";
import { Link } from "react-router";

export default function Card({ product }: CardProps) {
  return (
    <>
      <div className="card bg-base-100 w-full max-w-sm shadow-xl">
        <figure className="h-40">
          {product.images.length > 0 ? (
            <img src={getImageUrl(product.images[0].path)} alt={product.name} />
          ) : (
            <div>nessuna immagine</div>
          )}
        </figure>
        <div className="card-body bg-base-200">
          <h2 className="card-title">{product.name}</h2>
          <div className="card-actions justify-end">
            <Link to={`/products/${product.slug}`} className="btn btn-primary">
              Buy now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
