import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionValues from "@/components/MissionValues";
import AreasOfAction from "@/components/AreasOfAction";
import ImpactSection from "@/components/ImpactSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <MissionValues />
      <AreasOfAction />
      <ImpactSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
