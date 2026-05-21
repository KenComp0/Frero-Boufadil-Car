import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaCar, FaCalendarAlt, FaSmile } from "react-icons/fa";

const steps = [
  { icon: FaCar, titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc", num: "01" },
  { icon: FaCalendarAlt, titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc", num: "02" },
  { icon: FaSmile, titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc", num: "03" },
];

export default function HowItWorks() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <div className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="font-['Syne'] font-extrabold text-4xl sm:text-5xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t("howItWorks.title")}
          </motion.h2>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "160px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px z-0">
            <motion.div
              className="h-full"
              style={{ backgroundImage: "repeating-linear-gradient(90deg, #C8A96E40 0, #C8A96E40 8px, transparent 8px, transparent 16px)", transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                className="relative z-10 flex flex-col items-center text-center px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#141414] border-2 border-[#C8A96E]/30 flex items-center justify-center shadow-lg shadow-[#C8A96E]/5">
                    <Icon className="w-9 h-9 text-[#C8A96E]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#C8A96E] flex items-center justify-center">
                    <span className="text-[#0A0A0A] text-xs font-black">{i + 1}</span>
                  </div>
                </div>
                <h3 className="font-['Syne'] font-bold text-xl text-white mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t(step.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
