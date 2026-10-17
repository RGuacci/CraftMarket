import type { ImageUploaderProps } from "../../services/productService";
import { useState, useEffect } from "react";
import { MAX_PRODUCT_IMAGES } from "../../utils/maxImages";

const ImageUploader = ({
  images,
  onChange,
  maxImages = MAX_PRODUCT_IMAGES,
}: ImageUploaderProps) => {
  const remaining = maxImages - images.length;
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
    "image/bmp",
  ];

  useEffect(() => {
    const urls = images.map((image) => URL.createObjectURL(image));
    setPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  return (
    <>
      {error && <p className="text-error text-sm mt-2">{error}</p>}
      <input
        type="file"
        className="file-input file-input-neutral"
        multiple
        disabled={remaining <= 0}
        accept="image/*"
        onChange={(e) => {
          // Controllo numero di immagini
          const files = Array.from(e.target.files ?? []);
          if (files.length > remaining) {
            setError(
              remaining <= 0
                ? `Hai già raggiunto il limite di ${MAX_PRODUCT_IMAGES} immagini.`
                : `Puoi aggiungere ancora ${remaining} ${remaining === 1 ? "immagine" : "immagini"} (massimo ${MAX_PRODUCT_IMAGES} per prodotto).`,
            );
            e.target.value = "";
            return;
          }

          // Controllo peso delle immagini
          const hasOversizedFiles = files.some(
            (file) => file.size > 5 * 1024 * 1024,
          );
          if (hasOversizedFiles) {
            setError("Una singola immagine deve pesare massimo 5MB.");
            e.target.value = "";
            return;
          }

          // Controllo formato delle immagini
          const hasInvalidFormat = files.some(
            (file) => !allowedTypes.includes(file.type),
          );
          if (hasInvalidFormat) {
            setError(
              "I formati supportati sono : JPG, JPEG, PNG, WEBP, GIF, AVIF o BMP.",
            );
            e.target.value = "";
            return;
          }

          setError(null);
          onChange([...images, ...files]);
          e.target.value = "";
        }}
      />
      {previewUrls.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="text-center">
              <img
                src={url}
                alt={`Anteprima ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                className="btn btn-error mt-4 text-white"
                onClick={() => onChange(images.filter((_, i) => i !== index))}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ImageUploader;
