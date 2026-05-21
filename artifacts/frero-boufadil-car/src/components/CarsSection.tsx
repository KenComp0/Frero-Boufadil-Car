import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCars } from "@/hooks/useCars";
import CarCard from "./CarCard";
import { SiVolkswagen, SiHyundai, SiRenault, SiOpel, SiLandrover, SiDacia } from "react-icons/si";
import { FaCar } from "react-icons/fa";

// Premium Mercedes-Benz SVG Star Logo
function MercedesLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.69 0 8.5 3.81 8.5 8.5 0 1.25-.27 2.44-.76 3.51L12.5 12.3V4.54c-.16-.03-.33-.04-.5-.04s-.34.01-.5.04v7.76l-7.24 3.17c-.49-1.07-.76-2.26-.76-3.51 0-4.69 3.81-8.5 8.5-8.5zm-6.9 14.1l6.9-3.02v6.86c-2.73-.24-5.07-1.57-6.9-3.84zm13.8 0c-1.83 2.27-4.17 3.6-6.9 3.84v-6.86l6.9 3.02z" />
    </svg>
  );
}

// Brand mapping to their premium icons
const BRAND_LOGOS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Mercedes": MercedesLogo,
  "Volkswagen": SiVolkswagen,
  "Hyundai": SiHyundai,
  "Renault": SiRenault,
  "Opel": SiOpel,
  "Range Rover": SiLandrover,
  "Dacia": SiDacia,
};

export default function CarsSection() {
  const { t } = useTranslation();
  const { cars, loading } = useCars();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Extract unique brands present in the cars list
  const availableBrands = Array.from(new Set(cars.map((car) => car.brand))).filter(Boolean);

  // Predefined premium brand ordering
  const knownBrandsOrder = ["Mercedes", "Volkswagen", "Hyundai", "Renault", "Range Rover", "Opel", "Dacia"];
  const brands = [
    ...knownBrandsOrder.filter(b => availableBrands.includes(b)),
    ...availableBrands.filter(b => !knownBrandsOrder.includes(b))
  ];

  // Filter cars based on selection
  const filteredCars = selectedBrand
    ? cars.filter((car) => car.brand.toLowerCase() === selectedBrand.toLowerCase())
    : cars;

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
          <>
            {/* Premium Brand Logo Selector Row */}
            {brands.length > 0 && (
              <div className="mb-14 relative px-1">
                {/* Scroll container */}
                <div 
                  className="
                    flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-3 md:gap-4 
                    overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory
                  "
                >
                  {/* All Brands button */}
                  <motion.button
                    key="all"
                    onClick={() => setSelectedBrand(null)}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      snap-start flex flex-col items-center justify-center min-w-[95px] h-[95px] p-3 rounded-2xl cursor-pointer border transition-all duration-300
                      ${selectedBrand === null
                        ? "bg-[#C8A96E]/10 border-[#C8A96E] text-[#C8A96E] shadow-[0_0_20px_rgba(200,169,110,0.15)]"
                        : "bg-[var(--c-bg-card)] border-[var(--c-border-gold)] text-[var(--c-text-secondary)] hover:border-[#C8A96E]/40 hover:text-[var(--c-text-primary)] hover:bg-[var(--c-bg-card)]/80"
                      }
                    `}
                  >
                    <div className={`mb-2 transition-colors duration-300 ${selectedBrand === null ? "text-[#C8A96E]" : "text-[var(--c-text-muted)]"}`}>
                      <FaCar className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider font-['Inter'] uppercase select-none">
                      {t("cars.filterAll")}
                    </span>
                  </motion.button>

                  {/* Individual Brand Buttons */}
                  {brands.map((brandName) => {
                    const isSelected = selectedBrand === brandName;
                    const IconComponent = BRAND_LOGOS[brandName] || FaCar;

                    return (
                      <motion.button
                        key={brandName}
                        onClick={() => setSelectedBrand(isSelected ? null : brandName)}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          snap-start flex flex-col items-center justify-center min-w-[95px] h-[95px] p-3 rounded-2xl cursor-pointer border transition-all duration-300
                          ${isSelected
                            ? "bg-[#C8A96E]/10 border-[#C8A96E] text-[#C8A96E] shadow-[0_0_20px_rgba(200,169,110,0.15)]"
                            : "bg-[var(--c-bg-card)] border-[var(--c-border-gold)] text-[var(--c-text-secondary)] hover:border-[#C8A96E]/40 hover:text-[var(--c-text-primary)] hover:bg-[var(--c-bg-card)]/80"
                          }
                        `}
                      >
                        <div className={`mb-2 transition-colors duration-300 ${isSelected ? "text-[#C8A96E]" : "text-[var(--c-text-muted)]"}`}>
                          <IconComponent className="w-7 h-7 object-contain" />
                        </div>
                        <span className="text-[10px] font-bold tracking-wider font-['Inter'] uppercase select-none">
                          {brandName}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dynamic Animated Car Grid */}
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredCars.map((car, i) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92, y: 15, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <CarCard car={car} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredCars.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[var(--c-text-muted)] text-lg">Aucun véhicule trouvé pour cette marque.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
