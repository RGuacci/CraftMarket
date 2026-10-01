import { useLogout } from "../hooks/mutations/uselogout";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const { mutate, isPending } = useLogout();

  const navigate = useNavigate();
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Menu
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <Link to={"/register"}>
              <a>Registrati</a>
            </Link>
            <Link to={"/login"}>
              <a>Accedi</a>
            </Link>
            <button className="btn" disabled={isPending} onClick={handleLogout}>
              Logout
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}
