import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCar, FaWhatsapp, FaBars, FaTimes, FaGlobe } from "react-icons/fa";

const languages = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "AR", name: "العربية" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const py = useTransform(scrollY, [0, 80], [20, 12]);

  useEffect(() => {
    const close = () => { setLangOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { key: "nav.home", id: "hero" },
    { key: "nav.cars", id: "cars" },
    { key: "nav.about", id: "why-us" },
    { key: "nav.contact", id: "contact" },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#C8A96E]/10"
      style={{ backgroundColor: `rgba(10,10,10,${bgOpacity.get()})` }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between"
        style={{ paddingTop: py, paddingBottom: py }}
      >
        <motion.button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 text-white"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid="nav-logo"
        >
          <FaCar className="text-[#C8A96E] w-6 h-6" />
          <span className="font-['Syne'] font-bold text-lg text-[#C8A96E] leading-tight">
            Frero Boufadil Car
          </span>
        </motion.button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, id }) => (
            <motion.button
              key={key}
              onClick={() => scrollTo(id)}
              className="text-sm font-medium text-gray-300 hover:text-[#C8A96E] transition-colors"
              whileHover={{ y: -1 }}
              data-testid={`nav-${id}`}
            >
              {t(key)}
            </motion.button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative" onClick={e => e.stopPropagation()}>
            <motion.button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C8A96E]/20 text-gray-300 hover:text-[#C8A96E] hover:border-[#C8A96E]/40 text-sm transition-colors"
              whileTap={{ scale: 0.97 }}
              data-testid="lang-switcher"
            >
              <FaGlobe className="w-3.5 h-3.5" />
              <span>{currentLang.label}</span>
            </motion.button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 top-10 bg-[#141414] border border-[#C8A96E]/20 rounded-xl overflow-hidden shadow-2xl min-w-[140px]"
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#C8A96E]/10 transition-colors flex items-center gap-2 ${i18n.language === lang.code ? "text-[#C8A96E]" : "text-gray-300"}`}
                      data-testid={`lang-${lang.code}`}
                    >
                      <span className="font-semibold">{lang.label}</span>
                      <span className="text-xs text-gray-500">{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.a
            href="https://wa.me/212616877717"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-full text-sm font-semibold hover:bg-[#1ebd5a] transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-testid="nav-whatsapp"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>WhatsApp</span>
          </motion.a>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="mobile-menu-toggle"
        >
          {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#C8A96E]/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ key, id }) => (
                <motion.button
                  key={key}
                  onClick={() => scrollTo(id)}
                  className="text-left py-3 text-base font-medium text-gray-300 hover:text-[#C8A96E] border-b border-white/5 last:border-0 transition-colors"
                  whileHover={{ x: 4 }}
                  data-testid={`mobile-nav-${id}`}
                >
                  {t(key)}
                </motion.button>
              ))}
              <div className="flex items-center gap-3 pt-3">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setMobileOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${i18n.language === lang.code ? "border-[#C8A96E] text-[#C8A96E]" : "border-white/10 text-gray-400"}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              <motion.a
                href="https://wa.me/212616877717"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-semibold"
                whileTap={{ scale: 0.97 }}
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
