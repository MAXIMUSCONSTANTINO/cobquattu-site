import { TrendingUp, MapPin, Zap, Building2 } from 'lucide-react';

/**
 * COBQUATTU - A Tese do Nordeste
 * Design: Institucional com dados visuais e narrativa estratégica
 * - Apresentação do potencial territorial do Nordeste
 * - Indicadores estratégicos de crescimento
 * - Visão macroeconômica regional
 * - Elementos visuais minimalistas
 */

export default function NordesteThesisSection() {
  const strategicIndicators = [
    {
      icon: TrendingUp,
      title: 'Crescimento Regional',
      description: 'O Nordeste apresenta taxas de crescimento acelerado em infraestrutura, turismo e energia renovável.',
      metric: '+12% a.a.'
    },
    {
      icon: MapPin,
      title: 'Litoral Estratégico',
      description: 'O litoral leste cearense concentra oportunidades em turismo premium, portos e desenvolvimento imobiliário estratégico.',
      metric: '573 km'
    },
    {
      icon: Zap,
      title: 'Infraestrutura Energética',
      description: 'Investimentos em energia solar e eólica posicionam o Nordeste como polo de energia renovável no Brasil.',
      metric: '17 GW'
    },
    {
      icon: Building2,
      title: 'Desenvolvimento Urbano',
      description: 'Expansão de centros urbanos e infraestrutura criam oportunidades de estruturação territorial e valorização imobiliária.',
      metric: '8 metrópoles'
    }
  ];

  return (
    <section id="tese-nordeste" className="relative w-full py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            A Tese do Nordeste
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            O Nordeste brasileiro está em um momento de transformação econômica. Crescimento em infraestrutura, energia renovável, turismo e desenvolvimento urbano criam um ecossistema único de oportunidades estratégicas. A COBQUATTU estrutura essas oportunidades através de inteligência territorial e articulação de ativos.
          </p>
        </div>

        {/* Strategic Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {strategicIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="group relative p-8 md:p-10 border border-border rounded-lg hover:border-accent/50 transition-all duration-300 bg-background/50 hover:bg-background/80"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">{indicator.title}</h3>
                  <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                    {indicator.description}
                  </p>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-2xl font-bold text-accent">{indicator.metric}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-16 md:my-24 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Regional Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Ceará: Epicentro da Transformação Regional
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              O Ceará, especialmente o litoral leste e o Vale do Jaguaribe, representa o epicentro da transformação econômica do Nordeste. Fortim, Aracati e região circundante emergem como polos de desenvolvimento estratégico com oportunidades em turismo, infraestrutura e expansão urbana.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1 bg-accent rounded-full"></div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Turismo Premium</h4>
                  <p className="text-sm text-foreground/60">Desenvolvimento de infraestrutura hoteleira e experiências de luxo.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-accent rounded-full"></div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Infraestrutura Portuária</h4>
                  <p className="text-sm text-foreground/60">Expansão de portos e logística regional.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-accent rounded-full"></div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Energia Renovável</h4>
                  <p className="text-sm text-foreground/60">Investimentos em solar e eólica transformam a matriz energética.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5 border border-border flex items-center justify-center">
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 100 L300 100 L300 300 L100 300 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <p className="text-foreground/40 text-sm font-medium mb-2">Região Estratégica</p>
              <p className="text-4xl font-bold text-accent">Nordeste</p>
              <p className="text-foreground/40 text-sm font-medium mt-2">Inteligência Territorial</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
