import { useParams } from "react-router";
import { useProduct } from "../../hooks/queries/useProduct";
import type { Product } from "../../services/productService";
import ProductGallery from "../../components/products/productGallery";
import ProductInfo from "../../components/products/productInfo";
import { motion } from "motion/react";

export default function Product() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  if (isError || !product) {
    return <p className="text-red-500">Prodotto non trovato.</p>;
  }

  return (
    <div className="lg:min-h-screen lg:flex lg:items-center justify-center">
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch gap-6 m-5 p-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <ProductGallery product={product} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
        >
          <ProductInfo product={product} />
        </motion.div>
      </section>
    </div>
  );
}
