import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaStar, FaUser, FaCog, FaGasPump, FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface Car {
  id: string;
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
  images: string[];
  createdAt?: number;
}

interface CarCardProps {
  car: Car;
  index: number;
}

const badgeColors: Record<string, string> = {
  Populaire: "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  Économique: "bg-green-500/20 text-green-400 border border-green-500/30",
  Nouveau: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
};

export default function CarCard({ car, index }: CarCardProps) {
  const { t } = useTranslation();
  const [imgIndex, setImgIndex] = useState(0);
  const maxVisible = 3;
  const visibleFeatures = car.features.slice(0, maxVisible);
  const extraCount = car.features.length - maxVisible;

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "212616877717";

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Bonjour, je suis intéressé par ${car.brand} ${car.model} ${car.year} (${car.type}, ${car.transmission}, ${car.pricePerDay} MAD/jour). Pouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i === 0 ? car.images.length - 1 : i - 1));
  };
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i === car.images.length - 1 ? 0 : i + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="bg-[var(--c-bg-card)] border border-[var(--c-border-gold)] rounded-2xl overflow-hidden group cursor-default transition-colors duration-300"
    >
      <div className="relative overflow-hidden h-48">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={car.images[imgIndex] || car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
          />
        </AnimatePresence>

        {car.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <FaChevronRight className="w-3 h-3" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1">
              {car.images.map((_, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === imgIndex ? "bg-[#C8A96E]" : "bg-white/50"}`} />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {car.badge && (
          <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[car.badge] || "bg-white/10 text-white"}`}>
            {car.badge}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-['Syne'] font-bold text-lg text-[var(--c-text-primary)] leading-tight">
              {car.brand} {car.model}
            </h3>
            <p className="text-[var(--c-text-muted)] text-sm">{car.year} · {car.type}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <FaStar className="text-[#C8A96E] w-3.5 h-3.5" />
            <span className="text-[var(--c-text-primary)] text-sm font-semibold">{car.rating}</span>
            <span className="text-[var(--c-text-muted)] text-xs">({car.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-[var(--c-text-muted)] text-xs">
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

        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleFeatures.map((f) => (
            <span key={f} className="text-xs px-2.5 py-1 bg-[var(--c-bg-input)] text-[var(--c-text-muted)] rounded-full border border-[var(--c-border-subtle)]">
              {f}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-xs px-2.5 py-1 bg-[#C8A96E]/10 text-[#C8A96E] rounded-full border border-[#C8A96E]/20">
              +{extraCount} {t("cars.more")}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--c-border-subtle)]">
          <div>
            <span className="font-['Syne'] font-extrabold text-2xl text-[#C8A96E]">{car.pricePerDay}</span>
            <span className="text-[var(--c-text-muted)] text-sm ml-1">{t("cars.perDay")}</span>
          </div>
          <motion.button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl font-bold text-sm transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaWhatsapp className="w-4 h-4" />
            {t("cars.reserve")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
