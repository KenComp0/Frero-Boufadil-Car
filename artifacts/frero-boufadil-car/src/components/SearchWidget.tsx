import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";

export default function SearchWidget() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearch = () => {
    const cars = document.getElementById("cars");
    if (cars) cars.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, type: "spring", stiffness: 100, damping: 20 }}
      className="max-w-4xl mx-auto w-full"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-[#C8A96E]/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#C8A96E] uppercase tracking-wider flex items-center gap-1.5">
              <FaMapMarkerAlt className="w-3 h-3" />
              {t("search.location")}
            </label>
            <div className="bg-[#141414] border border-[#C8A96E]/15 rounded-xl px-4 py-3 text-sm text-gray-300 select-none">
              Aéroport Mohammed V
            </div>
          </div>

          {/* Pickup date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#C8A96E] uppercase tracking-wider flex items-center gap-1.5">
              <FaCalendarAlt className="w-3 h-3" />
              {t("search.pickup")}
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate ?? undefined}
              endDate={endDate ?? undefined}
              minDate={new Date()}
              placeholderText="jj/mm/aaaa"
              className="w-full bg-[#141414] border border-[#C8A96E]/15 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#C8A96E]/40 cursor-pointer"
              data-testid="pickup-date"
            />
          </div>

          {/* Return date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#C8A96E] uppercase tracking-wider flex items-center gap-1.5">
              <FaCalendarAlt className="w-3 h-3" />
              {t("search.return")}
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate ?? undefined}
              endDate={endDate ?? undefined}
              minDate={startDate ?? new Date()}
              placeholderText="jj/mm/aaaa"
              className="w-full bg-[#141414] border border-[#C8A96E]/15 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#C8A96E]/40 cursor-pointer"
              data-testid="return-date"
            />
          </div>
        </div>

        <motion.button
          onClick={handleSearch}
          className="mt-5 w-full bg-[#C8A96E] hover:bg-[#d4b87c] text-[#0A0A0A] font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 text-base transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          data-testid="search-button"
        >
          <FaSearch className="w-4 h-4" />
          {t("search.button")}
        </motion.button>
      </div>
    </motion.div>
  );
}
