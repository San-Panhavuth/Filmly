import Navbar from '@/widgets/Navbar';
import Footer from '@/widgets/Footer';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Features from './sections/Features';
import Pricing from './sections/Pricing';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <section id="hero" className="mb-16">
          <Hero />
        </section>

        <section id="how" className="mb-16">
          <HowItWorks />
        </section>

        <section id="features" className="mb-16">
          <Features />
        </section>

        <section id="pricing" className="mb-16">
          <Pricing />
        </section>

        <section id="festivals" className="mb-16">
          {/* TODO: add festivals content */}
        </section>
      </main>
      <Footer />
    </div>
  );
}