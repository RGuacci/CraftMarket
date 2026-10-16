import { useLogout } from "../hooks/mutations/authMutations/uselogout";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { LuPackageCheck } from "react-icons/lu";
import { LuBadgeEuro } from "react-icons/lu";
import { CgLogOut } from "react-icons/cg";
import { GiSuitcase } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { useCart } from "../hooks/queries/cartQueries/useCart";
import ProfileIcon from "../components/navbar/profileIcon";

import SearchBar from "./navbar/searchBar";

export default function Navbar() {
  const { mutate, isPending } = useLogout();
  const { user, isAuthenticated } = useAuth();
  const { data: cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const cartCount =
    cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <header>
      {/* Navbar principale */}
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="container mx-auto flex justify-between md:justify-around items-center">
          {/* Logo */}
          <div className="text-4xl  font-heading text-primary">
            <Link to={"/"}>Satisfy</Link>
          </div>

          {/* Ricerca */}
          <div className="hidden md:block w-64 lg:w-80">
            <SearchBar />
          </div>

          {/* Azioni utente */}
          <div className="flex items-center gap-4">
            {/* Carrello */}
            {isAuthenticated && (
              <Link
                to="/cart"
                className="indicator btn btn-ghost btn-circle"
                aria-label={`Carrello, ${cartCount} articoli`}
              >
                <span className="indicator-item badge badge-primary badge-sm">
                  {cartCount}
                </span>
                <IoMdCart className="text-2xl" />
              </Link>
            )}

            {/* Profilo */}

            {isAuthenticated ? (
              <>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label="Apri menu profilo"
                    className="btn btn-ghost btn-circle p-0"
                  >
                    <ProfileIcon name={user?.name} size="sm" />
                  </div>

                  <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-56 p-2 shadow">
                    <li>
                      <Link to="/profile">
                        {" "}
                        <FaUser className="text-neutral" />
                        Il mio profilo
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile/orders">
                        <LuPackageCheck className="text-neutral" />I miei ordini
                      </Link>
                    </li>

                    <div className="divider my-1" />

                    {user?.role === "user" && (
                      <li>
                        <Link to="/become-seller">
                          <LuBadgeEuro className="text-green-800" />
                          Inizia a vendere
                        </Link>
                      </li>
                    )}

                    {user?.role != "user" && (
                      <li>
                        <Link to="/seller">
                          <FaShop className="text-neutral font-bold" />
                          Pagina venditore
                        </Link>
                      </li>
                    )}

                    {user?.role === "admin" && (
                      <li>
                        <Link to="/admin">
                          <GiSuitcase className="text-neutral" />
                          Gestione candidature
                        </Link>
                      </li>
                    )}

                    <div className="divider my-1" />

                    <li>
                      <button disabled={isPending} onClick={handleLogout}>
                        <CgLogOut className="text-primary" />
                        {isPending ? "Uscita in corso..." : "Esci"}
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link className="btn btn-primary" to={"/register"}>
                  <span className="mx-1">Iscriviti</span> |{" "}
                  <span className="mx-1">Accedi</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="border-t border-base-300">
        <div className="container mx-auto flex justify-center gap-6 py-3">
          <Link to={"/products"}>Tutti i prodotti</Link>

          <Link
            to="/#ultimi-arrivi"
            onClick={(event) => {
              if (window.location.pathname === "/") {
                event.preventDefault();

                document.getElementById("ultimi-arrivi")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            Novità
          </Link>
        </div>
      </div>
    </header>
  );
}
