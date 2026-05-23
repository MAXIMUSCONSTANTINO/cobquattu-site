import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AreasSection from '@/components/AreasSection';
import FinancialSection from '@/components/FinancialSection';
import RegionalSection from '@/components/RegionalSection';
import BlogSection from '@/components/BlogSection';
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

        {/* Areas Section */}
        <AreasSection />

        {/* Financial Structuring Section */}
        <FinancialSection />

        {/* Regional Development Section */}
        <RegionalSection />

        {/* Blog / Market Intelligence Section */}
        <BlogSection />

        {/* Strategic Form */}
        <StrategicForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

