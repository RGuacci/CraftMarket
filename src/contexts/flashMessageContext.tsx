import { FlashMessages } from "../components/flashMessages";
import { useEffect } from "react";

type FlashType = "success" | "error";

interface FlashMessage {
  message: string;
  type: FlashType;
}

import { createContext, useContext, useState } from "react";

interface FlashMessageContextType {
  flash: FlashMessage | null;
  showFlash: (message: string, type: FlashType) => void;
}

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(
  undefined,
);

export const FlashMessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flash, setFlash] = useState<FlashMessage | null>(null);

  const showFlash = (message: string, type: FlashType) => {
    setFlash({ message, type });
  };

  useEffect(() => {
    if (!flash) return;

    const timer = setTimeout(() => {
      setFlash(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [flash]);

  return (
    <FlashMessageContext.Provider value={{ flash, showFlash }}>
      {children}
      <FlashMessages />
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);

  if (!context) {
    throw new Error(
      "useFlashMessage deve essere utilizzato all'interno di FlashMessageProvider",
    );
  }

  return context;
};
