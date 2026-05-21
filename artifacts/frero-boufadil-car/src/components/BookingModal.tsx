import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes, FaWhatsapp, FaCalendarAlt } from "react-icons/fa";
import { Car } from "./CarCard";

interface BookingModalProps {
  car: Car;
  onClose: () => void;
}

export default function BookingModal({ car, onClose }: BookingModalProps) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const total = days * car.pricePerDay;

  const formatDate = (d: Date | null) =>
    d ? d.toLocaleDateString("fr-MA", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Je voudrais réserver ${car.brand} ${car.model} ${car.year} du ${formatDate(startDate)} au ${formatDate(endDate)} — Nom: ${form.name} — Tél: ${form.phone}${form.notes ? ` — Notes: ${form.notes}` : ""} — Total: ${total} MAD`
    );
    window.open(`https://wa.me/212616877717?text=${msg}`, "_blank");
  };

  const inputCls = "w-full bg-[var(--c-bg-input)] border border-[var(--c-border-gold)] rounded-xl px-4 py-3 text-sm text-[var(--c-text-primary)] placeholder-[var(--c-text-muted)] focus:outline-none focus:border-[#C8A96E]/50 transition-colors";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-[var(--c-overlay)] backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 bg-[var(--c-bg-card)] border border-[var(--c-border-gold)] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--c-border-gold)]">
          <h3 className="font-['Syne'] font-bold text-xl text-[var(--c-text-primary)]">
            {t("modal.title")} — {car.brand} {car.model}
          </h3>
          <motion.button onClick={onClose} className="text-[var(--c-text-muted)] hover:text-[var(--c-text-primary)] p-1.5 rounded-lg hover:bg-[var(--c-bg-input)] transition-colors" whileTap={{ scale: 0.9 }}>
            <FaTimes className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center gap-4 p-5 border-b border-[var(--c-border-gold)]">
          <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-24 h-16 object-cover rounded-xl" />
          <div>
            <p className="font-['Syne'] font-bold text-[var(--c-text-primary)]">{car.brand} {car.model} {car.year}</p>
            <p className="text-[#C8A96E] font-bold">
              {car.pricePerDay} <span className="text-[var(--c-text-muted)] text-sm font-normal">{t("modal.perDay")}</span>
            </p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5">{t("modal.fullName")}</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls} placeholder="Mohammed Alami" />
            </div>
            <div>
              <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5">{t("modal.phone")}</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls} placeholder="+212 6XX XXX XXX" />
            </div>
          </div>

          <div>
            <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5">{t("modal.email")}</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} placeholder="vous@email.com" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <FaCalendarAlt className="w-3 h-3" />{t("modal.startDate")}
              </label>
              <DatePicker selected={startDate} onChange={d => setStartDate(d)} selectsStart startDate={startDate ?? undefined} endDate={endDate ?? undefined} minDate={new Date()} placeholderText="jj/mm/aaaa" className={inputCls} />
            </div>
            <div>
              <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <FaCalendarAlt className="w-3 h-3" />{t("modal.endDate")}
              </label>
              <DatePicker selected={endDate} onChange={d => setEndDate(d)} selectsEnd startDate={startDate ?? undefined} endDate={endDate ?? undefined} minDate={startDate ?? new Date()} placeholderText="jj/mm/aaaa" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1.5">{t("modal.notes")}</label>
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} className={`${inputCls} resize-none`} placeholder="Informations supplémentaires..." />
          </div>

          {days > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#C8A96E]/10 border border-[#C8A96E]/20 rounded-xl px-5 py-4 flex justify-between items-center"
            >
              <span className="text-[var(--c-text-muted)] text-sm">{t("modal.total")} ({days} {t("modal.days")})</span>
              <span className="font-['Syne'] font-extrabold text-2xl text-[#C8A96E]">{total} MAD</span>
            </motion.div>
          )}

          <motion.button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl font-bold text-base transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp className="w-5 h-5" />
            {t("modal.confirm")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
