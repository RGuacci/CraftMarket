import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router";
import { useLogin } from "../../hooks/mutations/auth/useLogin";
import type { LoginData } from "../../services/authService";
import { useQueryClient } from "@tanstack/react-query";
import { handleServerValidation } from "../../utils/serverValidation";
import { useFlashMessage } from "../../contexts/flashMessageContext";
import { getErrorMessage } from "../../utils/errorHandler";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending } = useLogin();
  const queryClient = useQueryClient();
  const { showFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    mutate(data, {
      onError: (error: unknown) => {
        const handled = handleServerValidation(error, setError);

        if (!handled) {
          showFlash(getErrorMessage(error), "error");
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        const from = location.state?.from;
        navigate(from ? `${from.pathname}${from.search}${from.hash}` : "/");
      },
    });
  };

  return (
    <main>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-heading mb-10">Accedi</h1>
          </div>
          <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <form className="text-center text-lg" onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
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

                  {/* Password */}
                  <label className="label mb-2">Password</label>
                  <input
                    type="password"
                    className="input mb-3 p-5"
                    placeholder="La tua Password"
                    {...register("password", {
                      required: "La password è obbligatoria",
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
                  <div className="flex flex-col gap-3">
                    <Link className="link link-hover" to={"/register"}>
                      Non hai un account?{" "}
                      <span className="font-bold p-1">Registrati</span>
                    </Link>
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-primary mt-4"
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
