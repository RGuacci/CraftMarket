import { useParams } from "react-router";
import { useProduct } from "../../hooks/queries/useProduct";
import { useState } from "react";
import { getImageUrl } from "../../utils/images";
import type { Product } from "../../services/productService";

export default function Product() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug);
  const [modalImage, setModalImage] = useState<number | null>(null);

  if (isLoading) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  if (isError || !product) {
    return <p className="text-red-500">Prodotto non trovato.</p>;
  }

  const secondaryImages = product.images.slice(1);

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-15 mx-5">
        {/* Gallery */}
        {/* Se c'è solo una immagine abbiamo 1 colonna , altrimenti 2 */}
        <div
          className={`grid  h-125 gap-1 ${
            secondaryImages.length > 0 ? "grid-cols-2" : "grid-cols-1"
          } `}
        >
          {/* Immagine principale */}
          <button
            type="button"
            onClick={() => setModalImage(0)}
            className="w-full h-full"
          >
            <img
              src={getImageUrl(product.images[0].path)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </button>

          {/* Secondarie */}
          {secondaryImages.length > 0 && (
            <div
              className={
                secondaryImages.length === 3
                  ? "grid grid-cols-1 grid-rows-3 gap-1 min-h-0"
                  : secondaryImages.length === 2
                    ? "grid grid-cols-1 grid-rows-2 gap-1 min-h-0"
                    : secondaryImages.length === 1
                      ? "grid grid-cols-1 grid-rows-1 gap-1 min-h-0"
                      : "grid grid-cols-2 grid-rows-2 gap-1 min-h-0"
              }
            >
              {product.images.slice(1).map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setModalImage(index + 1)}
                  className="min-h-0 w-full h-full"
                >
                  <img
                    src={getImageUrl(image.path)}
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Prodotto */}
        <div>{/* ... */}</div>
      </section>
      {modalImage !== null && (
        <div
          className="fixed inset-0 z-3 flex items-center justify-center bg-black/70"
          onClick={() => setModalImage(null)}
        >
          <img
            src={getImageUrl(product.images[modalImage].path)}
            alt={`${product.name} ${modalImage + 1}`}
            className="max-w-4xl max-h-[50vh] md:max-h-[80vh] object-contain"
          />
        </div>
      )}
    </>
  );
}
