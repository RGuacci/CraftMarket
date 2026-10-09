import axios from "axios";
import type { FieldValues, UseFormSetError, Path } from "react-hook-form";

// errori su campi che il form non mostra
interface ServerValidationResult {
  isValidationError: boolean;
  hiddenMessages: string[]; 
}


export function handleServerValidation<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  visibleFields?: string[],
): ServerValidationResult {
  const result: ServerValidationResult = {
    isValidationError: false,
    hiddenMessages: [],
  };

  if (!axios.isAxiosError(error)) {
    return result;
  }

  const errors = error.response?.data?.errors;

  if (!errors || typeof errors !== "object") {
    return result;
  }

    result.isValidationError = true;

 
  Object.entries(errors as Record<string, string[]>).forEach(
    ([field, messages]) => {
      if (!Array.isArray(messages) || messages.length === 0) {
        return;
      }

      const baseField = field.split(".")[0];
      const isVisible = !visibleFields || visibleFields.includes(baseField);

      if (isVisible) {
        setError(baseField as Path<T>, { type: "server", message: messages[0] });
      } else {
        result.hiddenMessages.push(messages[0]);
      }
    },
  );

  return result;
}
