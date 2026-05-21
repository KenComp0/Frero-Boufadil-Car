import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "212616877717";
  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1ebd5a] transition-colors"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <FaWhatsapp className="w-8 h-8" />
    </motion.a>
  );
}
