import { useLogout } from "../hooks/mutations/uselogout";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";
import { CgProfile } from "react-icons/cg";
import { BsCart4 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const { mutate, isPending } = useLogout();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <header>
      {/* Barra superiore */}
      {/* <div className="bg-base-200">
        <div className="container mx-auto flex justify-around py-2">
          <span>Aiuto e contatti</span>
          <span>Spedizione gratuita oltre 49 €</span>
          <span>Reso entro 30 giorni</span>
          <span>Buoni regalo</span>
        </div>
      </div> */}

      {/* Navbar principale */}
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="container mx-auto flex justify-between md:justify-around items-center">
          {/* Logo */}
          <div className="text-xl font-bold">
           <Link to={"/"}>Satisfy</Link> 
            </div>

          {/* Ricerca */}
          <div className="w-30 md:w-64">
            <label className="input w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Cerca" />
            </label>
          </div>

          {/* Azioni utente */}
          <div className="flex items-center gap-4">
            <BsCart4 className="text-2xl" />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost p-0">
                <CgProfile className="text-2xl p-0" />
              </div>

              <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
                {!isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/login">Accedi</Link>
                    </li>
                    <li>
                      <Link to="/register">Registrati</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/profile">Il mio profilo</Link>
                    </li>
                    <li>
                      <Link to="/products/create">Crea un articolo</Link>
                    </li>
                    <li>
                      <button disabled={isPending} onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigazione categorie */}
      <div className="border-t border-base-300">
        <div className="container mx-auto flex justify-center gap-6 py-3">
          <Link to={"/products"}>Tutti i prodotti</Link>
          <span>Categorie</span>
          <span>Novità</span>
          <span>Offerte</span>
        </div>
      </div>
    </header>
  );
}
