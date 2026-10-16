import { useState } from "react";
import { useSellerRequests } from "../../hooks/queries/sellerApplicationQueries/useSellerRequest";
import { useSellerRequestActions } from "../../hooks/mutations/sellerApplicationMutations/useSellerRequestActions";
import type {
  SellerRequest,
  SellerRequestStatus,
} from "../../services/sellerRequest";

const statusLabels: Record<SellerRequestStatus, string> = {
  pending: "In attesa",
  approved: "Approvata",
  rejected: "Rifiutata",
};

export default function Admin() {
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data, isPending, isError, error } = useSellerRequests(page);

  const { approveMutation, rejectMutation } = useSellerRequestActions();

  const activeMutationId =
    approveMutation.variables ?? rejectMutation.variables;

  const isMutating = approveMutation.isPending || rejectMutation.isPending;

  const handleActionError = approveMutation.error ?? rejectMutation.error;

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div role="alert" className="alert alert-error">
          Non è stato possibile recuperare le candidature.
        </div>
      </main>
    );
  }

  const requests: SellerRequest[] = data?.data ?? [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Candidature</h1>
        <p className="mt-2 text-base-content/70">
          Consulta e gestisci le richieste per diventare venditore.
        </p>
      </header>

      {handleActionError && (
        <div role="alert" className="alert alert-error mb-6">
          L'operazione non è riuscita. Riprova.
        </div>
      )}

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-base-300 p-8 text-center">
          <h2 className="text-xl font-semibold">Nessuna candidatura</h2>
          <p className="mt-2 text-base-content/70">
            Non ci sono richieste da visualizzare in questa pagina.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>Utente</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => {
                const isExpanded = expandedId === request.id;
                const isThisMutating =
                  isMutating && activeMutationId === request.id;

                return (
                  <>
                    <tr key={request.id}>
                      <td>
                        <div className="font-medium">
                          {request.user?.name ?? "Utente"}
                        </div>
                        <div className="text-sm text-base-content/60">
                          {request.user?.email}
                        </div>
                      </td>

                      <td>{request.category}</td>

                      <td>
                        {new Date(request.created_at).toLocaleDateString(
                          "it-IT",
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            request.status === "pending"
                              ? "badge-warning"
                              : request.status === "approved"
                                ? "badge-success"
                                : "badge-error"
                          }`}
                        >
                          {statusLabels[request.status]}
                        </span>
                      </td>

                      <td>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline"
                            onClick={() =>
                              setExpandedId(isExpanded ? null : request.id)
                            }
                          >
                            {isExpanded ? "Chiudi" : "Dettagli"}
                          </button>

                          {request.status === "pending" && (
                            <>
                              <button
                                type="button"
                                className="btn btn-sm btn-success"
                                disabled={isMutating}
                                onClick={() =>
                                  approveMutation.mutate(request.id)
                                }
                              >
                                {isThisMutating && approveMutation.isPending
                                  ? "Approvo..."
                                  : "Approva"}
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-error btn-outline"
                                disabled={isMutating}
                                onClick={() =>
                                  rejectMutation.mutate(request.id)
                                }
                              >
                                {isThisMutating && rejectMutation.isPending
                                  ? "Rifiuto..."
                                  : "Rifiuta"}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr key={`${request.id}-details`}>
                        <td colSpan={5}>
                          <div className="space-y-4 py-2">
                            <div>
                              <h3 className="font-semibold">
                                Descrizione dei prodotti
                              </h3>
                              <p className="mt-1 whitespace-pre-wrap text-base-content/80">
                                {request.description}
                              </p>
                            </div>

                            <div>
                              <h3 className="font-semibold">Motivazione</h3>
                              <p className="mt-1 whitespace-pre-wrap text-base-content/80">
                                {request.motivation}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {data && data.last_page > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className="btn btn-outline"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Precedente
          </button>

          <span className="text-sm">
            Pagina {data.current_page} di {data.last_page}
          </span>

          <button
            type="button"
            className="btn btn-outline"
            disabled={page >= data.last_page}
            onClick={() => setPage((current) => current + 1)}
          >
            Successiva
          </button>
        </div>
      )}
    </main>
  );
}
