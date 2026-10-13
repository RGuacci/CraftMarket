import { Link } from "react-router";
import { motion } from "motion/react";

export default function Hero() {
  const heroImage = "/images/hero.png";

  return (
    <section className="px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl lg:min-h-115 lg:flex lg:items-center">
        {/* Immagine per mobile e tablet */}
        <div
          className="h-56 bg-cover bg-center sm:h-72 lg:hidden"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />

        {/* Sfondo per desktop */}
        <div
          className="absolute inset-0 hidden bg-cover bg-center lg:block"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />

        {/* Card */}
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="relative z-10 -mt-8 mx-3 mb-4 rounded-2xl bg-base-100 p-5 shadow-xl sm:mx-6 sm:p-7 lg:my-12 lg:ml-12 lg:mr-0 lg:mt-0 lg:mb-0 lg:w-105 lg:shrink-0 lg:p-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm"
          >
            Benvenuto su Satisfy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl"
          >
            Trova qualcosa che ti soddisfa.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mt-3 text-sm leading-relaxed text-base-content/70 sm:mt-4 sm:text-base"
          >
            Scopri prodotti unici, trova ciò che cerchi o inizia a vendere alla
            nostra community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <Link
              to="/products"
              className="btn btn-primary mt-5 w-full sm:mt-6"
            >
              Esplora i prodotti
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            <Link
              to="/become-seller"
              className="mt-4 block text-center text-sm font-medium text-primary hover:underline"
            >
              Vuoi vendere? Scopri come fare
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
