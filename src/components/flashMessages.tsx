import { useFlashMessage } from "../contexts/flashMessageContext";

export const FlashMessages = () => {
  const { flash } = useFlashMessage();

  if (!flash) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        role="alert"
        className={`alert ${
          flash.type === "success" ? "alert-success" : "alert-error"
        }`}
      >
        <span>{flash.message}</span>
      </div>
    </div>
  );
};