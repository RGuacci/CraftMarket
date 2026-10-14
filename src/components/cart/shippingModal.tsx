import { useState, type FormEvent } from "react";

export interface ShippingAddress {
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
}

interface ShippingAddressModalProps {
  onSubmit: (address: ShippingAddress) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function ShippingAddressModal({
  onSubmit,
  onClose,
  isSubmitting = false,
}: ShippingAddressModalProps) {
  const [formData, setFormData] = useState<ShippingAddress>({
    shipping_name: "",
    shipping_address: "",
    shipping_city: "",
    shipping_postal_code: "",
    shipping_country: "Italia",
  });

  const handleChange = (
    field: keyof ShippingAddress,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      shipping_name: formData.shipping_name.trim(),
      shipping_address: formData.shipping_address.trim(),
      shipping_city: formData.shipping_city.trim(),
      shipping_postal_code: formData.shipping_postal_code.trim(),
      shipping_country: formData.shipping_country.trim(),
    });
  };

  const fields: {
    name: keyof ShippingAddress;
    label: string;
    placeholder: string;
    maxLength: number;
  }[] = [
    {
      name: "shipping_name",
      label: "Nome del destinatario",
      placeholder: "Nome e cognome",
      maxLength: 255,
    },
    {
      name: "shipping_address",
      label: "Indirizzo",
      placeholder: "Via e numero civico",
      maxLength: 255,
    },
    {
      name: "shipping_city",
      label: "Città",
      placeholder: "Es. Potenza",
      maxLength: 100,
    },
    {
      name: "shipping_postal_code",
      label: "CAP",
      placeholder: "Es. 85100",
      maxLength: 20,
    },
    {
      name: "shipping_country",
      label: "Paese",
      placeholder: "Es. Italia",
      maxLength: 100,
    },
  ];

  return (
    <dialog
      open
      className="modal modal-bottom sm:modal-middle"
      aria-labelledby="shipping-modal-title"
    >
      <div className="modal-box max-h-[90vh] max-w-lg overflow-y-auto">
        <h2
          id="shipping-modal-title"
          className="text-2xl font-bold"
        >
          Indirizzo di spedizione
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Inserisci i dati necessari per la consegna del tuo ordine.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {fields.map((field) => (
            <label key={field.name} className="form-control w-full">
              <span className="label-text mb-2 font-medium">
                {field.label}
              </span>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder={field.placeholder}
                value={formData[field.name]}
                maxLength={field.maxLength}
                required
                disabled={isSubmitting}
                autoComplete={
                  field.name === "shipping_name"
                    ? "name"
                    : field.name === "shipping_address"
                      ? "street-address"
                      : field.name === "shipping_city"
                        ? "address-level2"
                        : field.name === "shipping_postal_code"
                          ? "postal-code"
                          : "country-name"
                }
                onChange={(event) =>
                  handleChange(field.name, event.target.value)
                }
              />
            </label>
          ))}

          <div className="modal-action mt-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annulla
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Continua al pagamento"
              )}
            </button>
          </div>
        </form>
      </div>

      <button
        type="button"
        className="modal-backdrop"
        aria-label="Chiudi la modale"
        onClick={onClose}
        disabled={isSubmitting}
      >
        Chiudi
      </button>
    </dialog>
  );
}