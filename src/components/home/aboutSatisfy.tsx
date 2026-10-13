import { motion } from "motion/react";
import { BsCart4 } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const features = [
  {
    number: "01",
    title: "Scopri",
    description:
      "Esplora il marketplace e lasciati sorprendere da prodotti interessanti e nuove opportunità.",
    symbol: <IoSearch />,
  },
  {
    number: "02",
    title: "Acquista",
    description:
      "Trova ciò che cerchi, aggiungi i prodotti al carrello e prepara il tuo prossimo acquisto.",
    symbol: <BsCart4 />,
  },
  {
    number: "03",
    title: "Vendi",
    description:
      "Metti in vendita i tuoi prodotti e raggiungi persone interessate a ciò che offri.",
    symbol: <MdOutlineSell />,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function AboutSatisfy() {
  return (
    <section className=" px-4 py-16 sm:px-6 sm:py-20 lg:px-8 my-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Benvenuto su Satisfy
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Un marketplace, tante possibilità.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-base-content/70 sm:text-lg">
            Che tu stia cercando qualcosa di speciale o voglia dare visibilità
            ai tuoi prodotti, Satisfy è il posto da cui partire.
          </p>
        </div>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.number}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="card border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="card-body p-6 sm:p-8">
                <div className="flex items-center">

                  <span
                    aria-hidden="true"
                    className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary"
                  >
                    {feature.symbol}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>

                <p className="mt-2 leading-relaxed text-base-content/70">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
