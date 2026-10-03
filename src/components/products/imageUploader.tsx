import type { ImageUploaderProps } from "../../services/productService";
import { useState, useEffect } from "react";

export const ImageUploader = ({ images, onChange }: ImageUploaderProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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
      <input
        type="file"
        className="file-input file-input-ghost"
        multiple
        accept="image/*"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
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
