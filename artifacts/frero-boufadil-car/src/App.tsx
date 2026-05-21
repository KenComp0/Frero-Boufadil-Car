import "./i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarsSection from "@/components/CarsSection";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="cars"><CarsSection /></section>
        <section id="how-it-works"><HowItWorks /></section>
        <section id="why-us"><WhyUs /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
