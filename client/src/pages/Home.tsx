import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import EcosystemSection from '@/components/EcosystemSection';
import TerritorySection from '@/components/TerritorySection';
import NordesteThesisSection from '@/components/NordesteThesisSection';
import VisionSection from '@/components/VisionSection';
import InsightsSection from '@/components/InsightsSection';
import StrategicForm from '@/components/StrategicForm';
import Footer from '@/components/Footer';

/**
 * COBQUATTU Home Page
 * Design: Minimalismo Executivo Cinematográfico
 * - Navegação fixa premium
 * - Hero cinematográfico
 * - Seções institucionais sofisticadas
 * - Formulário estratégico
 * - Footer elegante
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* What We Do Section */}
        <WhatWeDoSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Ecosystem Section */}
        <EcosystemSection />

        {/* Territory Section */}
        <TerritorySection />

        {/* Nordeste Thesis Section */}
        <NordesteThesisSection />

        {/* Vision Section */}
        <VisionSection />

        {/* Insights Section - Centro de Inteligência Territorial */}
        <InsightsSection />

        {/* Strategic Form - Institutional Contact */}
        <StrategicForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

