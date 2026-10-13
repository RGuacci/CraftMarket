import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="footer border-t base-300 content p-10 flex flex-col items-center">
      <aside className="flex gap-5 text-center">
        <div className="p-5">
          <h2 className="text-xl mb-2">Satisfy</h2>
          <p className="text-base-content/70 mb-1">Chi siamo</p>
          <p className="text-base-content/70">Lavora con noi</p>
        </div>

        <div className="p-5">
          <h2 className="text-xl mb-2">Scopri</h2>
          <p className="text-base-content/70 mb-1">Come funziona</p>
          <p className="text-base-content/70 mb-1">Verfica dell 'articolo</p>
          <p className="text-base-content/70">Per l'ambiente</p>
        </div>

        <div className="p-5">
          <h2 className="text-xl mb-2">Assistenza</h2>
          <p className="text-base-content/70 mb-1">Domande frequenti</p>
          <p className="text-base-content/70">Contattaci</p>
        </div>
      </aside>

      <nav className="border-t border-base-300 w-screen flex flex-col items-center">
        <h5 className="footer-title font-heading text-xl mt-5">Social</h5>

        <div className="flex gap-4 text-lg md:text-2xl text-neutral">
          <FaFacebook />
          <FaXTwitter />
          <FaInstagramSquare />
          <AiFillTikTok />
        </div>
      </nav>
    </footer>
  );
}
