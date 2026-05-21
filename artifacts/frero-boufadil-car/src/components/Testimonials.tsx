import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const reviews = t("testimonials.reviews", { returnObjects: true }) as Array<{
    name: string;
    city: string;
    text: string;
  }>;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="py-24 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="font-['Syne'] font-extrabold text-4xl sm:text-5xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t("testimonials.title")}
          </motion.h2>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "160px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Carousel */}
        <div className="relative min-h-[240px] flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[#141414] border border-[#C8A96E]/15 rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto w-full"
            >
              <FaQuoteLeft className="text-[#C8A96E]/30 w-10 h-10 mx-auto mb-5" />
              <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                "{reviews[current]?.text}"
              </p>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#C8A96E] w-4 h-4" />
                ))}
              </div>
              <p className="font-['Syne'] font-bold text-white">{reviews[current]?.name}</p>
              <p className="text-gray-500 text-sm">{reviews[current]?.city}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-16">
          {reviews.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-[#C8A96E]" : "w-2 h-2 bg-white/20"}`}
              whileHover={{ scale: 1.2 }}
              data-testid={`testimonial-dot-${i}`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { stat: t("testimonials.stats.rating"), icon: "★" },
            { stat: t("testimonials.stats.clients"), icon: "♥" },
            { stat: t("testimonials.stats.satisfaction"), icon: "✓" },
          ].map((item, i) => (
            <div key={i} className="text-center p-5 bg-[#141414]/60 rounded-xl border border-[#C8A96E]/8">
              <div className="text-[#C8A96E] text-xl mb-1">{item.icon}</div>
              <div className="font-['Syne'] font-bold text-white text-lg sm:text-xl">{item.stat}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
