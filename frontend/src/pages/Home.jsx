import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
import ProductsSection from "../components/ProductsSection";

export default function Home() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <HeroCarousel />
        <ProductsSection />
      </main>

      <Footer />
    </div>
  );
}