import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import SearchWidget from "./SearchWidget";

const STATS = [
  { value: 50, suffix: "+", key: "hero.stats.cars" },
  { value: 5000, suffix: "+", key: "hero.stats.clients" },
  { value: 24, suffix: "/7", key: "hero.stats.support" },
  { value: 10, suffix: "+", key: "hero.stats.years" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const { t } = useTranslation();

  const titleComponent = (
    <div className="flex flex-col items-center gap-6 pt-24 md:pt-0">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A96E]/30 bg-[#C8A96E]/10 text-[#C8A96E] text-sm font-semibold"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
        Casablanca · Aéroport Mohammed V
      </motion.div>

      {/* Headline */}
      <motion.div
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {["Location de", "Voitures", "Premium"].map((word, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <span
              className={`block font-['Syne'] font-extrabold leading-none ${
                i === 2
                  ? "text-5xl sm:text-6xl md:text-7xl text-[#C8A96E]"
                  : "text-5xl sm:text-6xl md:text-7xl text-white"
              }`}
            >
              {word}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        {t("hero.subtitle")}
      </motion.p>

      {/* Stats */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 sm:gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        {STATS.map((stat) => (
          <div key={stat.key} className="text-center">
            <div className="font-['Syne'] font-extrabold text-2xl sm:text-3xl text-[#C8A96E]">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-gray-500 text-xs mt-0.5">{t(stat.key)}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="relative bg-[#0A0A0A] overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A96E]/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#C8A96E]/4 blur-[120px]" />
      </div>

      <ContainerScroll titleComponent={titleComponent}>
        {/* Card content: car hero image + search widget */}
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80"
            alt="Premium car fleet"
            className="w-full h-full object-cover object-center"
            draggable={false}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80";
            }}
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Search widget pinned at bottom of card */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <SearchWidget compact />
          </div>

          {/* Gold label top-left */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#C8A96E]/30">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-[#C8A96E] font-semibold">Flotte disponible maintenant</span>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
