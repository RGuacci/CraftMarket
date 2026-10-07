import { useParams } from "react-router";
import { useProduct } from "../../hooks/queries/useProduct";
import type { Product } from "../../services/productService";
import ProductGallery from "../../components/products/productGallery";
import ProductInfo from "../../components/products/productInfo";

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
    <>
      <div className="lg:min-h-screen lg:flex lg:items-center">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-5 p-5 h-full">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </section>
      </div>
    </>
  );
}
