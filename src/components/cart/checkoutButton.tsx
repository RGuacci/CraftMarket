import { useState } from "react";
import { useCheckout } from "../../hooks/mutations/ordersMutation/useCheckout";
import { usePayOrder } from "../../hooks/mutations/ordersMutation/usePayOrder";
import type { PaymentMethod } from "../../services/orderService";
import ShippingAddressModal, { type ShippingAddress } from "./shippingModal";

interface CheckoutButtonProps {
  onPaymentSuccess: (orderId: number, total: number) => void;
  total: number;
}

export default function CheckoutButton({
  onPaymentSuccess,
  total,
}: CheckoutButtonProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);

  const checkoutMutation = useCheckout();
  const payMutation = usePayOrder();

  const handleCheckout = () => {
    setCheckoutError("");
    setIsShippingModalOpen(true);
  };

  const handleShippingSubmit = async (shippingAddress: ShippingAddress) => {
    setCheckoutError("");

    try {
      const order = await checkoutMutation.mutateAsync(shippingAddress);

      setOrderId(order.id);
      setIsShippingModalOpen(false);
    } catch {
      setCheckoutError(
        "Impossibile creare l'ordine. Controlla i dati e riprova.",
      );
    }
  };

  const handlePayment = async () => {
    if (orderId === null) return;

    setCheckoutError("");

    try {
      const order = await payMutation.mutateAsync({
        orderId,
        method: paymentMethod,
      });

      if (order.status === "paid") {
        onPaymentSuccess(order.id, total);
      } else {
        setCheckoutError("Pagamento non completato. Riprova.");
      }
    } catch {
      setCheckoutError("Pagamento non completato. Riprova.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {orderId === null ? (
          <button
            type="button"
            className="btn btn-primary mt-2 w-full"
            onClick={handleCheckout}
            disabled={checkoutMutation.isPending}
          >
            {checkoutMutation.isPending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Procedi all'acquisto"
            )}
          </button>
        ) : (
          <>
            <h3 className="font-semibold">Metodo di pagamento</h3>

            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="radio"
                name="payment"
                className="radio radio-primary"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Carta
            </label>

            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="radio"
                name="payment"
                className="radio radio-primary"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              PayPal
            </label>

            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handlePayment}
              disabled={payMutation.isPending}
            >
              {payMutation.isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Conferma pagamento"
              )}
            </button>
          </>
        )}

        {checkoutError && (
          <p role="alert" className="text-sm text-error">
            {checkoutError}
          </p>
        )}
      </div>

      {isShippingModalOpen && (
        <ShippingAddressModal
          onSubmit={handleShippingSubmit}
          onClose={() => setIsShippingModalOpen(false)}
          isSubmitting={checkoutMutation.isPending}
        />
      )}
    </>
  );
}
