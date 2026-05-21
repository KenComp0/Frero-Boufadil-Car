import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCar, FaWhatsapp, FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi2";
import { useTheme } from "@/context/ThemeContext";

const languages = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "AR", name: "العربية" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const close = () => setLangOpen(false);
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
    { key: "nav.about", id: "how-it-works" },
    { key: "nav.contact", id: "contact" },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];
  const isLight = theme === "light";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#C8A96E]/10"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          v => `rgba(var(--c-navbar-bg),${v})`
        ),
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
        <motion.button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaCar className="text-[#C8A96E] w-6 h-6" />
          <span className="font-['Syne'] font-bold text-lg text-[#C8A96E] leading-tight">
            Frero Boufadil Car
          </span>
        </motion.button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, id }) => (
            <motion.button
              key={key}
              onClick={() => scrollTo(id)}
              className="text-sm font-medium text-[var(--c-text-secondary)] hover:text-[#C8A96E] transition-colors"
              whileHover={{ y: -1 }}
            >
              {t(key)}
            </motion.button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            className="relative w-14 h-7 rounded-full border border-[#C8A96E]/30 bg-[var(--c-bg-card)] flex items-center px-1 transition-colors"
            whileTap={{ scale: 0.95 }}
            title={isLight ? "Switch to dark" : "Switch to light"}
            data-testid="theme-toggle"
          >
            <motion.div
              className="absolute w-5 h-5 rounded-full bg-[#C8A96E] flex items-center justify-center shadow"
              animate={{ x: isLight ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {isLight
                ? <HiSun className="w-3 h-3 text-white" />
                : <HiMoon className="w-3 h-3 text-white" />
              }
            </motion.div>
            <HiMoon className={`w-3 h-3 ml-0.5 transition-colors ${isLight ? "text-[var(--c-text-muted)]" : "text-transparent"}`} />
            <HiSun className={`w-3 h-3 ml-auto mr-0.5 transition-colors ${isLight ? "text-transparent" : "text-[var(--c-text-muted)]"}`} />
          </motion.button>

          {/* Language switcher */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <motion.button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C8A96E]/20 text-[var(--c-text-secondary)] hover:text-[#C8A96E] hover:border-[#C8A96E]/40 text-sm transition-colors"
              whileTap={{ scale: 0.97 }}
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
                  className="absolute right-0 top-10 bg-[var(--c-bg-card)] border border-[#C8A96E]/20 rounded-xl overflow-hidden shadow-2xl min-w-[140px]"
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#C8A96E]/10 transition-colors flex items-center gap-2 ${i18n.language === lang.code ? "text-[#C8A96E]" : "text-[var(--c-text-secondary)]"}`}
                    >
                      <span className="font-semibold">{lang.label}</span>
                      <span className="text-xs text-[var(--c-text-muted)]">{lang.name}</span>
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
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>WhatsApp</span>
          </motion.a>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            onClick={toggle}
            className="w-8 h-8 rounded-full border border-[#C8A96E]/30 bg-[var(--c-bg-card)] flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            {isLight ? <HiSun className="w-4 h-4 text-[#C8A96E]" /> : <HiMoon className="w-4 h-4 text-[#C8A96E]" />}
          </motion.button>
          <button
            className="text-[var(--c-text-primary)] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[var(--c-bg-page)]/95 backdrop-blur-xl border-t border-[#C8A96E]/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ key, id }) => (
                <motion.button
                  key={key}
                  onClick={() => scrollTo(id)}
                  className="text-left py-3 text-base font-medium text-[var(--c-text-secondary)] hover:text-[#C8A96E] border-b border-[var(--c-border-subtle)] last:border-0 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {t(key)}
                </motion.button>
              ))}
              <div className="flex items-center gap-3 pt-3">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setMobileOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${i18n.language === lang.code ? "border-[#C8A96E] text-[#C8A96E]" : "border-[var(--c-border-subtle)] text-[var(--c-text-muted)]"}`}
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
