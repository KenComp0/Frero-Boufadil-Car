import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import SearchWidget from "./SearchWidget";

const STATS = [
  { value: 50, suffix: "+", key: "hero.stats.cars", label: "Voitures" },
  { value: 5000, suffix: "+", key: "hero.stats.clients", label: "Clients" },
  { value: 24, suffix: "/7", key: "hero.stats.support", label: "Support" },
  { value: 10, suffix: "+", key: "hero.stats.years", label: "Ans" },
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

const words = ["Location", "de", "Voitures", "Premium"];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Dark background with gradient */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A96E]/8 via-transparent to-[#C8A96E]/4" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A96E]/30 to-transparent" />
        {/* Diagonal gold accent line */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-[#C8A96E]/5" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-[#C8A96E]/5" />
        </div>
        {/* Noise texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Animated headline */}
        <motion.div
          className="mb-6"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className={`font-['Syne'] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none ${i === words.length - 1 || i === 2 ? "text-[#C8A96E]" : "text-white"}`}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="mt-2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
          >
            <span className="font-['Syne'] font-bold text-3xl sm:text-4xl md:text-5xl text-white/90">
              {t("hero.titleBold")}
            </span>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {STATS.map((stat) => (
            <div key={stat.key} className="text-center" data-testid={`stat-${stat.key}`}>
              <div className="font-['Syne'] font-extrabold text-3xl sm:text-4xl text-[#C8A96E]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-sm mt-1">{t(stat.key)}</div>
            </div>
          ))}
        </motion.div>

        {/* Search widget */}
        <SearchWidget />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-[#C8A96E]/30 flex items-start justify-center pt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <motion.div
            className="w-1.5 h-2.5 rounded-full bg-[#C8A96E]"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
