import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCar, FaHandshake, FaShieldAlt, FaHeadset, FaTruck, FaTag } from "react-icons/fa";

const features = [
  { icon: FaCar, titleKey: "whyUs.features.fleet", descKey: "whyUs.features.fleetDesc" },
  { icon: FaHandshake, titleKey: "whyUs.features.booking", descKey: "whyUs.features.bookingDesc" },
  { icon: FaShieldAlt, titleKey: "whyUs.features.insurance", descKey: "whyUs.features.insuranceDesc" },
  { icon: FaHeadset, titleKey: "whyUs.features.support", descKey: "whyUs.features.supportDesc" },
  { icon: FaTruck, titleKey: "whyUs.features.delivery", descKey: "whyUs.features.deliveryDesc" },
  { icon: FaTag, titleKey: "whyUs.features.price", descKey: "whyUs.features.priceDesc" },
];

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <div className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="font-['Syne'] font-extrabold text-4xl sm:text-5xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t("whyUs.title")}
          </motion.h2>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "160px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                className="bg-[#141414]/80 backdrop-blur-sm border border-[#C8A96E]/8 rounded-2xl p-7 group hover:border-[#C8A96E]/25 transition-colors"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                data-testid={`why-us-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20 flex items-center justify-center mb-5 group-hover:bg-[#C8A96E]/15 transition-colors">
                  <Icon className="w-6 h-6 text-[#C8A96E]" />
                </div>
                <h3 className="font-['Syne'] font-bold text-lg text-white mb-2">
                  {t(f.titleKey)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t(f.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
