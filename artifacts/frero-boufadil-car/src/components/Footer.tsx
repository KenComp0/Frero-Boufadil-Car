import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--c-bg-page)] border-t border-[var(--c-border-gold)] pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaCar className="text-[#C8A96E] w-6 h-6" />
              <span className="font-['Syne'] font-bold text-xl text-[#C8A96E]">Frero Boufadil Car</span>
            </div>
            <p className="text-[var(--c-text-muted)] text-sm leading-relaxed">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="font-['Syne'] font-bold text-[var(--c-text-primary)] mb-5 text-sm uppercase tracking-wider">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { key: "nav.home", id: "hero" },
                { key: "nav.cars", id: "cars" },
                { key: "nav.about", id: "how-it-works" },
                { key: "nav.contact", id: "contact" },
              ].map(({ key, id }) => (
                <li key={key}>
                  <motion.button
                    onClick={() => scrollTo(id)}
                    className="text-[var(--c-text-muted)] hover:text-[#C8A96E] text-sm transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {t(key)}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Syne'] font-bold text-[var(--c-text-primary)] mb-5 text-sm uppercase tracking-wider">
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[var(--c-text-muted)] text-sm">
                <FaMapMarkerAlt className="text-[#C8A96E] w-4 h-4 mt-0.5 shrink-0" />
                Aéroport Mohammed V, Casablanca
              </li>
              <li className="flex items-center gap-3 text-[var(--c-text-muted)] text-sm">
                <FaPhone className="text-[#C8A96E] w-4 h-4 shrink-0" />
                <a href="tel:+212616877717" className="hover:text-[#C8A96E] transition-colors">+212 616 877 717</a>
              </li>
              <li className="flex items-center gap-3 text-[var(--c-text-muted)] text-sm">
                <FaEnvelope className="text-[#C8A96E] w-4 h-4 shrink-0" />
                <a href="mailto:boufadilcar@gmail.com" className="hover:text-[#C8A96E] transition-colors">boufadilcar@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--c-border-gold)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--c-text-muted)] text-sm">
            © 2024 Frero Boufadil Car. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <button className="text-[var(--c-text-muted)] hover:text-[#C8A96E] text-sm transition-colors">{t("footer.privacy")}</button>
            <button className="text-[var(--c-text-muted)] hover:text-[#C8A96E] text-sm transition-colors">{t("footer.terms")}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
