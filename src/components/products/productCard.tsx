import { Link } from "react-router";
import type { Product } from "../../services/productService";
import { getImageUrl } from "../../utils/images";
import { motion } from "motion/react";

interface CardProps {
  product: Product;
  index: number;
}

export default function Card({ product, index }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: Math.min(index * 0.07, 0.35),
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="card w-full max-w-sm border border-transparent bg-base-200 shadow-md hover"
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

        <div className="card-actions justify-between mt-2">
          <p className="font-bold text-lg text-green-600">
            €{product.price}
          </p>
          <Link to={`/products/${product.slug}`} className="btn btn-primary">
            Info
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
