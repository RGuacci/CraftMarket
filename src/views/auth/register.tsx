import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useRegister } from "../../hooks/mutations/useRegister";
import type { RegisterData } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const onSubmit = (data: RegisterData) => {
    mutate(data);
    navigate("/");
  };

  return (
    <main>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-10">Registrati</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                  {/* Nome */}
                  <input
                    type="text"
                    className="input mb-3 p-5"
                    placeholder="Nome"
                    {...register("name", { required: true })}
                  />

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
                  {/* Conferma Password */}
                  <input
                    type="password"
                    className="input mb-3 p-5"
                    placeholder="Conferma Password"
                    {...register("password_confirmation", { required: true })}
                  />

                  <div>
                    <Link to ="/login" className="link link-hover">Hai gia un account? Accedi</Link>
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
