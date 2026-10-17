import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from "react-router";
import { useAuth } from "../contexts/authContext";

export default function Footer() {
  const { user, isAuthenticated } = useAuth();

  return (
    <footer className="footer sm:footer-horizontal border-t vorder-base-300 text-base-content p-10">
      <nav>
        <h6 className="footer-title text-primary text-lg">Servizi</h6>
        <a className="link link-hover">Vendi</a>
        <a className="link link-hover">Sfoglia il nostro catalogo</a>
        <a className="link link-hover">Ordina quando vuoi</a>
        <a className="link link-hover">Rimborso garantito</a>
      </nav>
      <nav>
        <h6 className="footer-title text-primary text-lg">Satisfy</h6>
        <a className="link link-hover">Chi siamo</a>
        <a href="mailto:contatti@satisfy.example" className="link link-hover">
          Contattaci
        </a>
        <Link
          className="link link-hover"
          to={
            !isAuthenticated
              ? "/login"
              : user?.role === "user"
                ? "/become-seller"
                : "/products/create"
          }
        >
          Lavora con noi
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title text-primary text-lg">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <FaInstagramSquare className="text-2xl cursor-pointer" />

          <FaXTwitter className="text-2xl cursor-pointer" />

          <FaFacebook className="text-2xl cursor-pointer" />

          <AiFillTikTok className="text-2xl cursor-pointer" />
        </div>
      </nav>
    </footer>
  );
}
