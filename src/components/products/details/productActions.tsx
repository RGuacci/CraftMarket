import { BsCartCheck } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../../../contexts/authContext";
import { useAddToCart } from "../../../hooks/mutations/cartMutations/useAddToCart";
import type { Product } from "../../../services/productService";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const addToCart = useAddToCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/accedi", {
        state: { from: location },
      });
      return;
    }

    addToCart.mutate({
      product_id: product.id,
      quantity: 1,
    });
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/accedi", {
        state: { from: location },
      });
      return;
    }

    try {
      await addToCart.mutateAsync({
        product_id: product.id,
        quantity: 1,
      });

      navigate("/cart");
    } catch {
      // La mutation gestisce già l'errore secondo la sua configurazione.
    }
  };

  return (
    <div className="mt-auto grid grid-cols-2 gap-2 pt-4 sm:gap-3">
      <button
        type="button"
        className="btn btn-outline btn-primary min-w-0 gap-1 px-1 sm:gap-2 sm:px-3"
        disabled={product.stock === 0 || addToCart.isPending}
        onClick={handleAddToCart}
      >
        <BsCartCheck className="shrink-0 text-base sm:text-xl" />

        <span className="text-xs leading-tight sm:text-sm">
          {addToCart.isPending
            ? "Aggiunta in corso..."
            : "Aggiungi al carrello"}
        </span>
      </button>

      <button
        type="button"
        className="btn btn-primary min-w-0 gap-1 px-1 sm:gap-2 sm:px-3"
        disabled={product.stock === 0 || addToCart.isPending}
        onClick={handleBuyNow}
      >
        <FaShoppingBag className="shrink-0 text-base sm:text-lg" />

        <span className="text-xs leading-tight sm:text-sm">
          {addToCart.isPending ? "Attendi..." : "Acquista ora"}
        </span>
      </button>
    </div>
  );
}