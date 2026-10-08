import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "Si è verificato un errore imprevisto.";
  }

  const status = error.response?.status;

  switch (status) {
    case 401:
      return "Devi effettuare l'accesso.";

    case 403:
      return "Non hai i permessi per eseguire questa operazione.";

    case 404:
      return "La risorsa richiesta non è stata trovata.";

    case 422:
      return "I dati inseriti non sono validi.";

    case 500:
      return "Si è verificato un errore del server.";

    default:
      if (!error.response) {
        return "Impossibile raggiungere il server.";
      }

      return "Si è verificato un errore durante la richiesta.";
  }
};