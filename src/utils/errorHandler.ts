import axios from "axios";

// Legge "message" dalla risposta solo se è una stringa non vuota
const getServerMessage = (data: unknown): string | null => {
  if (typeof data === "object" && data !== null && "message" in data) {
    const { message } = data as { message: unknown };

    if (typeof message === "string" && message.trim() !== "") {
      return message;
    }
  }

  return null;
};

export const getErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "Si è verificato un errore imprevisto.";
  }

  if (!error.response) {
    return "Impossibile raggiungere il server.";
  }

  const { status, data } = error.response;

  switch (status) {
    case 401:
      return "Devi effettuare l'accesso.";

    case 403:
      return "Non hai i permessi per eseguire questa operazione.";

    case 404:
      return "La risorsa richiesta non è stata trovata.";

    case 413:
      return "I file caricati sono troppo grandi.";

    case 419:
      return "La sessione è scaduta. Ricarica la pagina e riprova.";

    case 422: {
      // Con "errors" la risposta è una validazione di Laravel (già gestita dal form,
      // e con messaggi in inglese). Senza "errors" è un messaggio scritto da te.
      const hasFieldErrors =
        typeof data === "object" && data !== null && "errors" in data;

      if (!hasFieldErrors) {
        const serverMessage = getServerMessage(data);

        if (serverMessage) {
          return serverMessage;
        }
      }

      return "I dati inseriti non sono validi.";
    }

    case 429:
      return "Troppe richieste. Riprova tra qualche istante.";

    case 500:
      return "Si è verificato un errore del server.";

    default:
      return "Si è verificato un errore durante la richiesta.";
  }
};