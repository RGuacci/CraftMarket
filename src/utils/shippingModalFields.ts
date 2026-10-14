import type { ShippingAddress } from "../components/cart/shippingModal";

export const fields: {
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
