import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCars } from "@/hooks/useCars";
import CarCard from "./CarCard";

export default function CarsSection() {
  const { t } = useTranslation();
  const { cars, loading } = useCars();

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

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#C8A96E]/30 border-t-[#C8A96E] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
