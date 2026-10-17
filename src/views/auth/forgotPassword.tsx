import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../hooks/mutations/authMutations/useForgotPassword";
import { useFlashMessage } from "../../contexts/flashMessageContext";
import { handleServerValidation } from "../../utils/serverValidation";
import { getErrorMessage } from "../../utils/errorHandler";

interface ForgotPasswordData {
  email: string;
}

export default function ForgotPassword() {
  const { mutate, isPending } = useForgotPassword();
  const { showFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ForgotPasswordData>();

  const onSubmit = (data: ForgotPasswordData) => {
    mutate(data, {
      onError: (error: unknown) => {
        const handled = handleServerValidation(error, setError);

        if (!handled) {
          showFlash(getErrorMessage(error), "error");
        }
      },
      onSuccess: () => {
        showFlash(
          "Se l'indirizzo è valido, riceverai le istruzioni per recuperare la password.",
          "success",
        );
      },
    });
  };

  return (
    <main>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-heading mb-10 text-primary">Recupera password</h1>
            <p className="mb-6 max-w-md">
              Inserisci l'indirizzo email associato al tuo account. Ti invieremo
              le istruzioni per reimpostare la password.
            </p>
          </div>

          <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form
                className="text-center text-lg"
                onSubmit={handleSubmit(onSubmit)}
              >
                <fieldset className="fieldset">
                  <label className="label mb-2">Email</label>

                  <input
                    type="email"
                    className="input mb-3 p-5"
                    placeholder="mario@rossi.com"
                    {...register("email", {
                      required: "L'email è obbligatoria",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Inserisci un'email valida",
                      },
                      onChange: () => clearErrors("email"),
                    })}
                  />

                  <div className="text-center min-h-5 mb-2">
                    {errors.email && (
                      <span className="text-error text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-primary mt-4 w-full"
                  >
                    {isPending ? "Invio in corso..." : "Invia istruzioni"}
                  </button>

                  <div className="mt-4">
                    <Link className="link link-hover" to="/login">
                      Torna al login
                    </Link>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
