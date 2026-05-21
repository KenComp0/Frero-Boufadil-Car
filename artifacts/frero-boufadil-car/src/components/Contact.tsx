import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle } from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const inputCls = "w-full bg-[var(--c-bg-input)] border border-[var(--c-border-gold)] rounded-xl px-4 py-3 text-sm text-[var(--c-text-primary)] placeholder-[var(--c-text-muted)] focus:outline-none focus:border-[#C8A96E]/50 transition-colors";

  return (
    <div className="py-24 bg-[var(--c-bg-page)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="font-['Syne'] font-extrabold text-4xl sm:text-5xl text-[var(--c-text-primary)] mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t("contact.title")}
          </motion.h2>
          <p className="text-[var(--c-text-muted)] text-lg">{t("contact.subtitle")}</p>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: "160px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5">Nom</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={t("contact.namePlaceholder")} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5">Téléphone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder={t("contact.phonePlaceholder")} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder={t("contact.emailPlaceholder")} className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5">Message</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} placeholder={t("contact.messagePlaceholder")} className={`${inputCls} resize-none`} />
              </div>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm"
                >
                  <FaCheckCircle className="w-4 h-4" />
                  Message envoyé avec succès !
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="w-full bg-[#C8A96E] hover:bg-[#d4b87c] text-[#0A0A0A] font-bold py-4 rounded-xl text-base transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("contact.submit")}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { icon: FaMapMarkerAlt, content: <p className="text-[var(--c-text-primary)] font-medium text-sm">{t("contact.address")}</p> },
              { icon: FaPhone, content: <a href="tel:+212616877717" className="text-[var(--c-text-primary)] font-medium text-sm hover:text-[#C8A96E] transition-colors">+212 616 877 717</a> },
              { icon: FaEnvelope, content: <a href="mailto:boufadilcar@gmail.com" className="text-[var(--c-text-primary)] font-medium text-sm hover:text-[#C8A96E] transition-colors">boufadilcar@gmail.com</a> },
              { icon: FaClock, content: <p className="text-[var(--c-text-primary)] font-medium text-sm">{t("contact.hours")}</p> },
            ].map(({ icon: Icon, content }, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-[var(--c-bg-card)] rounded-xl border border-[var(--c-border-gold)] transition-colors duration-300">
                <Icon className="text-[#C8A96E] w-5 h-5 mt-0.5 shrink-0" />
                {content}
              </div>
            ))}

            <div className="rounded-2xl overflow-hidden border border-[var(--c-border-gold)] h-[220px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.091882895623!2d-7.580436023901809!3d33.36866715351481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda63b0013ceb059%3A0x9bce92a9867c08b1!2sFrero%20Boufadil%20car%20rental!5e0!3m2!1sen!2sma!4v1779321347747!5m2!1sen!2sma"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Frero Boufadil Car Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
