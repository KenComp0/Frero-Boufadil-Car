import "./i18n";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarsSection from "@/components/CarsSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

function AppInner() {
  return (
    <div className="min-h-screen bg-[var(--c-bg-page)] text-[var(--c-text-primary)] overflow-x-hidden transition-colors duration-300">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="cars"><CarsSection /></section>
        <section id="how-it-works"><HowItWorks /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
