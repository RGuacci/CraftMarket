import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import type { CreateSellerRequestData } from "../../services/sellerRequest";
import { useMySellerRequest } from "../../hooks/queries/sellerApplicationQueries/useMySellerRequest";
import { useCreateSellerRequest } from "../../hooks/mutations/sellerApplicationMutations/useCreateSellerRequest";

const categories = [
  "Abbigliamento",
  "Elettronica",
  "Casa e arredamento",
  "Artigianato",
  "Collezionismo",
  "Altro",
];

const statusLabels = {
  pending: "In attesa di revisione",
  approved: "Candidatura approvata",
  rejected: "Candidatura rifiutata",
};

export default function BecomeSeller() {
  const [showForm, setShowForm] = useState(false);

  const {
    data: sellerRequest,
    isPending: isLoadingRequest,
    isError: isRequestError,
  } = useMySellerRequest();

  const createMutation = useCreateSellerRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSellerRequestData>();

  const onSubmit = (data: CreateSellerRequestData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setShowForm(false);
      },
    });
  };

  if (isLoadingRequest) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isRequestError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div role="alert" className="alert alert-error">
          Non è stato possibile recuperare la tua candidatura. Riprova più
          tardi.
        </div>
      </div>
    );
  }

  const status = sellerRequest?.status;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl text-primary font-heading">
          Diventa un venditore
        </h1>

        <h2 className="mt-4 text-base-content/70 text-lg">
          Prima di poter iniziare a vendere parlaci di te
        </h2>
      </div>

      {sellerRequest && !showForm ? (
        <section className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold">Stato della candidatura</h2>

          <p className="mt-4 font-medium">
            {statusLabels[sellerRequest.status]}
          </p>

          {status === "pending" && (
            <p className="mt-2 text-base-content/70">
              La tua richiesta è stata ricevuta. Ti aggiorneremo quando sarà
              stata esaminata.
            </p>
          )}

          {status === "approved" && (
            <p className="mt-2 text-base-content/70">
              La tua candidatura è stata approvata. Ora puoi accedere alle
              funzionalità dedicate ai venditori!
            </p>
          )}

          {status === "rejected" && (
            <>
              <p className="mt-2 text-base-content/70">
                La tua candidatura non è stata approvata. Puoi inviarne una
                nuova con informazioni aggiornate.
              </p>

              <button
                type="button"
                className="btn btn-primary mt-6"
                onClick={() => {
                  createMutation.reset();
                  setShowForm(true);
                }}
              >
                Invia una nuova candidatura
              </button>
            </>
          )}
        </section>
      ) : (
        <section className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm md:p-8">
          <form
            className="mt-6 space-y-5 text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <label className="label mb-5" htmlFor="description">
                <span className="label-text font-medium">
                  Cosa vorresti vendere?
                </span>
              </label>

              <textarea
                id="description"
                className="textarea textarea-bordered min-h-32 w-full"
                placeholder="Descrivi i prodotti che vorresti proporre..."
                {...register("description", {
                  required: "Inserisci una descrizione.",
                  maxLength: {
                    value: 2000,
                    message: "Massimo 2000 caratteri.",
                  },
                })}
              />

              {errors.description && (
                <p className="mt-1 text-sm text-error">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-5" htmlFor="motivation">
                <span className="label-text font-medium">
                  Perché vuoi diventare un venditore?
                </span>
              </label>

              <textarea
                id="motivation"
                className="textarea textarea-bordered min-h-32 w-full"
                placeholder="Parlaci della tua motivazione..."
                {...register("motivation", {
                  required: "Inserisci la tua motivazione.",
                  maxLength: {
                    value: 2000,
                    message: "Massimo 2000 caratteri.",
                  },
                })}
              />

              {errors.motivation && (
                <p className="mt-1 text-sm text-error">
                  {errors.motivation.message}
                </p>
              )}
            </div>

            {createMutation.isError && (
              <div role="alert" className="alert alert-error">
                {(createMutation.error as AxiosError<{ message?: string }>)
                  .response?.data?.message ??
                  "Si è verificato un errore durante l'invio della candidatura."}
              </div>
            )}

            <div className="form-control">
              <label className="label mb-5" htmlFor="category">
                <span className="label-text font-medium">
                  Categoria dei prodotti
                </span>
              </label>

              <select
                id="category"
                className="select select-bordered w-full"
                defaultValue=""
                {...register("category", {
                  required: "Seleziona una categoria.",
                })}
              >
                <option value="" disabled>
                  Seleziona una categoria
                </option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className="mt-1 text-sm text-error">
                  {errors.category.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Invio in corso...
                </>
              ) : (
                "Invia candidatura"
              )}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
