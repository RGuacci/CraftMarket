import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/mutations/useLogin";
import type { LoginData } from "../../services/authService";

export default function login() {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    mutate(data);
    navigate("/");
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
                    {...register("email", { required: true })}
                  />

                  {/* Password */}
                  <input
                    type="password"
                    className="input mb-3 p-5"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <div>
                    <a className="link link-hover">Password dimenticata?</a>
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-neutral mt-4"
                  >
                    {isPending ? "Registrazione..." : "Registrati"}
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
