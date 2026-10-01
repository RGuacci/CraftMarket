import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/mutations/useLogin";
import type { LoginData } from "../../services/authService";
import axios from "axios";

export default function login() {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    mutate(data, {
      onError: (error) => {
        // Verifico che l'errore provenga da Axios
        if (axios.isAxiosError(error)) {
          // Recupero gli errori di Laravel
          const errors = error.response?.data.errors;

          if (errors) {
            // Trasformo l'oggetto in coppie campo, messaggi
            Object.entries(errors as Record<string, string[]>).forEach(
              ([field, messages]) => {
                // Associo infine l'errore al campo corrispondente nel react hook form
                setError(field as keyof LoginData, {
                  type: "server",
                  message: messages[0],
                });
              },
            );
          }
        }
      },
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <main>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-10">Accedi</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <input
                    type="email"
                    className="input mb-3 p-5"
                    placeholder="Email"
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

                  {/* Password */}
                  <input
                    type="password"
                    className="input mb-3 p-5"
                    placeholder="Password"
                    {...register("password", {
                      required: "La password è obbligatoria",
                      minLength: {
                        value: 8,
                        message:
                          "La password deve essere lunga almeno 8 caratteri",
                      },
                      onChange: () => clearErrors("password"),
                    })}
                  />
                  <div className="text-center min-h-5 mb-2">
                    {errors.password && (
                      <span className="text-error text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <a className="link link-hover">Password dimenticata?</a>
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-neutral mt-4"
                  >
                    {isPending ? "Accesso..." : "Accedi"}
                  </button>
                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
