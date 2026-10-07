import type { Product } from "../../services/productService";
import { useState } from "react";
import { getImageUrl } from "../../utils/images";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [modalImage, setModalImage] = useState<number | null>(null);
  const secondaryImages = product.images.slice(1);

  return (
    <>
      <div
        className={`grid h-125 gap-1 ${
          secondaryImages.length > 0 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {product.images.length > 0 ? (
          <>
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

            {/* Immagini secondarie */}
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
                {secondaryImages.map((image, index) => (
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
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-base-200">
            <span className="text-base-content/50">
              Nessuna immagine disponibile
            </span>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalImage !== null && product.images[modalImage] && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/70"
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
