import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaStar, FaUser, FaCog, FaGasPump } from "react-icons/fa";

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  type: string;
  transmission: string;
  fuel: string;
  seats: number;
  pricePerDay: number;
  rating: number;
  reviews: number;
  features: string[];
  available: boolean;
  badge: string | null;
  image: string;
}

interface CarCardProps {
  car: Car;
  onReserve: (car: Car) => void;
  index: number;
}

const badgeColors: Record<string, string> = {
  Populaire: "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  Économique: "bg-green-500/20 text-green-400 border border-green-500/30",
  Nouveau: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
};

export default function CarCard({ car, onReserve, index }: CarCardProps) {
  const { t } = useTranslation();
  const maxVisible = 3;
  const visibleFeatures = car.features.slice(0, maxVisible);
  const extraCount = car.features.length - maxVisible;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="bg-[#141414] border border-[#C8A96E]/10 rounded-2xl overflow-hidden group cursor-default"
      data-testid={`car-card-${car.id}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <motion.img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-transparent" />

        {/* Availability badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span className="text-xs text-green-400 font-medium">{t("cars.available")}</span>
        </div>

        {/* Type badge */}
        {car.badge && (
          <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[car.badge] || "bg-white/10 text-white"}`}>
            {car.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & rating */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-['Syne'] font-bold text-lg text-white leading-tight">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-500 text-sm">{car.year} · {car.type}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <FaStar className="text-[#C8A96E] w-3.5 h-3.5" />
            <span className="text-white text-sm font-semibold">{car.rating}</span>
            <span className="text-gray-500 text-xs">({car.reviews})</span>
          </div>
        </div>

        {/* Icons row */}
        <div className="flex items-center gap-4 mb-4 text-gray-400 text-xs">
          <span className="flex items-center gap-1.5">
            <FaUser className="w-3 h-3 text-[#C8A96E]" />
            {car.seats} {t("cars.seats")}
          </span>
          <span className="flex items-center gap-1.5">
            <FaCog className="w-3 h-3 text-[#C8A96E]" />
            {car.transmission === "automatic" ? t("cars.types.automatic") : t("cars.types.manual")}
          </span>
          <span className="flex items-center gap-1.5">
            <FaGasPump className="w-3 h-3 text-[#C8A96E]" />
            {car.fuel}
          </span>
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleFeatures.map((f) => (
            <span key={f} className="text-xs px-2.5 py-1 bg-[#1E1E1E] text-gray-400 rounded-full border border-white/5">
              {f}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-xs px-2.5 py-1 bg-[#C8A96E]/10 text-[#C8A96E] rounded-full border border-[#C8A96E]/20">
              +{extraCount} {t("cars.more")}
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <span className="font-['Syne'] font-extrabold text-2xl text-[#C8A96E]">{car.pricePerDay}</span>
            <span className="text-gray-500 text-sm ml-1">{t("cars.perDay")}</span>
          </div>
          <motion.button
            onClick={() => onReserve(car)}
            className="px-5 py-2.5 bg-[#C8A96E] hover:bg-[#d4b87c] text-[#0A0A0A] rounded-xl font-bold text-sm transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-testid={`reserve-car-${car.id}`}
          >
            {t("cars.reserve")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
