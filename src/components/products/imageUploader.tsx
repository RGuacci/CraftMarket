import type { ImageUploaderProps } from "../../services/productService";
import { useState, useEffect } from "react";

export const ImageUploader = ({ images, onChange }: ImageUploaderProps) => {
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
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls(urls);
    };
  }, [images]);

  return (
    <>
      {error && <p className="text-error text-sm mt-2">{error}</p>}
      <input
        type="file"
        className="file-input file-input-ghost"
        multiple
        accept="image/*"
        onChange={(e) => {
          // Controllo numero di immagini
          const files = Array.from(e.target.files ?? []);
          if (images.length + files.length > 5) {
            setError("Puoi caricare massimo 5 immagini.");
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
          const hasInvalidFormat = files.some((file) => !allowedTypes.includes(file.type));
          if(hasInvalidFormat){
            setError("I formati supportati sono : JPG, JPEG, PNG, WEBP, GIF, AVIF o BMP.");
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
