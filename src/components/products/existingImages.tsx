import type { ExistingImagesProps } from "../../services/productService";
import { getImageUrl } from "../../utils/images";

export default function ExistingImages({
  images,
  removeImages,
  onRemove,
}: ExistingImagesProps) {
  return (
    <>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {images
            .filter((image) => !removeImages.includes(image.id))
            .map((image) => (
              <div key={image.id} className="text-center">
                <img
                  src={getImageUrl(image.path)}
                  alt={`Immagine ${image.id}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <button
                  type="button"
                  className="btn btn-error mt-4 text-white"
                  onClick={() => onRemove(image.id)}
                >
                  X
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
