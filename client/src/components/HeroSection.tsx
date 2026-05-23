import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * COBQUATTU Hero Section
 * Design: Cinematográfico com imagem de fundo premium
 * - Headline poderosa e clara
 * - Subheadline descritiva
 * - CTAs estratégicos
 * - Parallax cinematográfico em scroll
 */

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-hero-litoral-BXZQ4cVAh6zEMDoVzsCbvN.webp)',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-start justify-center h-full gap-6 md:gap-12 py-12 md:py-0">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Headline */}
          <h1 className="headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-background leading-tight">
            Inteligência Territorial para Desenvolvimento Regional.
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-background/90 leading-relaxed max-w-xl">
            Conectando imóveis, projetos e oportunidades de forma estruturada e estratégica no Nordeste brasileiro.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="https://wa.me/5585997688325?text=Olá%20COBQUATTU%2C%20gostaria%20de%20conectar%20com%20um%20especialista%20em%20inteligência%20territorial."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-accent text-foreground hover:bg-accent/90 group">
                Conectar com Especialista
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#sobre">
              <Button variant="outline" className="border-background text-background hover:bg-background/10">
                Conheça Nossa Plataforma
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-background/60 text-xs font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-background/40 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-background/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
