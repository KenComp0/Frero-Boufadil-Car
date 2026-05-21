import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cars } from "@/data/cars";
import CarCard, { Car } from "./CarCard";
import BookingModal from "./BookingModal";

type Filter = "all" | "Berline" | "SUV" | "automatic" | "manual";

export default function CarsSection() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("cars.filterAll") },
    { key: "Berline", label: t("cars.types.berline") },
    { key: "SUV", label: "SUV" },
    { key: "automatic", label: t("cars.types.automatic") },
    { key: "manual", label: t("cars.types.manual") },
  ];

  const filtered = cars.filter((c) => {
    if (filter === "all") return true;
    if (filter === "automatic") return c.transmission === "automatic";
    if (filter === "manual") return c.transmission === "manual";
    return c.type === filter;
  });

  return (
    <div className="py-24 bg-[var(--c-bg-page)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Syne'] font-extrabold text-4xl sm:text-5xl text-[var(--c-text-primary)] mb-4">
              {t("cars.title")}
            </h2>
            <p className="text-[var(--c-text-muted)] text-lg max-w-2xl mx-auto">{t("cars.subtitle")}</p>
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent mt-6 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {filters.map((f) => (
            <motion.button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                filter === f.key
                  ? "text-[#0A0A0A]"
                  : "text-[var(--c-text-muted)] hover:text-[var(--c-text-primary)] border border-[var(--c-border-subtle)]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-[#C8A96E] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} onReserve={setSelectedCar} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedCar && (
          <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
