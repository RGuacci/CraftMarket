import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { useResetPassword } from "../../hooks/mutations/authMutations/useResetPassword";
import { useFlashMessage } from "../../contexts/flashMessageContext";
import { handleServerValidation } from "../..//utils/serverValidation";
import { getErrorMessage } from "../../utils/errorHandler";

interface ResetPasswordFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutate, isPending } = useResetPassword();
  const { showFlash } = useFlashMessage();
  const [resetCompleted, setResetCompleted] = useState(false);

  const emailFromUrl = searchParams.get("email") ?? "";

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: emailFromUrl,
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) {
      showFlash("Il link di recupero non è valido.", "error");
      return;
    }

    mutate(
      {
        token,
        ...data,
      },
      {
        onError: (error: unknown) => {
          const handled = handleServerValidation(error, setError);

          if (!handled) {
            showFlash(getErrorMessage(error), "error");
          }
        },
        onSuccess: () => {
          setResetCompleted(true);
          showFlash("Password aggiornata correttamente.", "success");
        },
      },
    );
  };

  if (resetCompleted) {
    return (
      <main className="hero min-h-screen">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl font-heading mb-6">Password aggiornata</h1>
            <p className="mb-6">Ora puoi accedere con la nuova password.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Torna al login
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-heading mb-8">Reimposta password</h1>
            <p className="mb-6 max-w-md">
              Inserisci la tua email e scegli una nuova password.
            </p>
          </div>

          <div className="card bg-base-200 w-full max-w-sm shadow-2xl">
            <div className="card-body">
              <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="label mb-2">Email</label>
                  <input
                    type="email"
                    className="input w-full mb-2"
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
                  {errors.email && (
                    <span className="text-error text-sm mb-3">
                      {errors.email.message}
                    </span>
                  )}

                  <label className="label mb-2">Nuova password</label>
                  <input
                    type="password"
                    className="input w-full mb-2"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "La password è obbligatoria",
                      minLength: {
                        value: 8,
                        message:
                          "La password deve contenere almeno 8 caratteri",
                      },
                      onChange: () => clearErrors("password"),
                    })}
                  />
                  {errors.password && (
                    <span className="text-error text-sm mb-3">
                      {errors.password.message}
                    </span>
                  )}

                  <label className="label mb-2">Conferma password</label>
                  <input
                    type="password"
                    className="input w-full mb-2"
                    autoComplete="new-password"
                    {...register("password_confirmation", {
                      required: "Conferma la password",
                      validate: (value, values) =>
                        value === values.password ||
                        "Le password non coincidono",
                      onChange: () => clearErrors("password_confirmation"),
                    })}
                  />
                  {errors.password_confirmation && (
                    <span className="text-error text-sm mb-3">
                      {errors.password_confirmation.message}
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-primary mt-4 w-full"
                  >
                    {isPending ? "Aggiornamento..." : "Reimposta password"}
                  </button>

                  <Link className="link link-hover mt-4" to="/login">
                    Torna al login
                  </Link>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
