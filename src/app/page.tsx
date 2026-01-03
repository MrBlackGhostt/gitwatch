import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProductVisual from "@/components/landing/ProductVisual";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import CircuitBackground from "@/components/landing/CircuitBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative text-white selection:bg-blue-500/30 overflow-x-hidden">
      <CircuitBackground />
      <Navbar />
      <div className="relative z-10 pb-0 flex flex-col items-center justify-center min-h-screen">
        <Hero />
        <ProductVisual />
      </div>
      <Features />
      <Footer />
    </main>
  );
}
