import type { Product } from "../../services/productService";

interface DeleteProductModalProps {
  product: Product | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProductModal({
  product,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <>
      <dialog open className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Eliminazione prodotto</h3>

          <p className="py-4">
            Sei sicuro di voler eliminare {""} <strong>{product.name}</strong>
          </p>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Annulla
            </button>

            <button
              type="button"
              className="btn btn-error text-white"
              onClick={onConfirm}
            >
              Elimina
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
