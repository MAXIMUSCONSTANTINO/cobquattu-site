import { Building2, TrendingUp, MapPin, Leaf, Palmtree, Hotel, Briefcase, Zap, Users } from 'lucide-react';

/**
 * COBQUATTU Areas Section
 * Design: Cards sofisticados com ícones minimalistas
 * - Grid responsivo
 * - Hover effects elegantes
 * - Ícones em dourado discreto
 */

const areas = [
  {
    icon: Building2,
    title: 'Negócios Imobiliários',
    description: 'Análise estratégica, estruturação e intermediação de operações imobiliárias de alto valor.',
  },
  {
    icon: TrendingUp,
    title: 'Investimentos Estratégicos',
    description: 'Identificação e estruturação de oportunidades de investimento com potencial de crescimento.',
  },
  {
    icon: MapPin,
    title: 'Áreas Urbanas',
    description: 'Desenvolvimento e revitalização de áreas urbanas com visão estratégica e sustentável.',
  },
  {
    icon: Leaf,
    title: 'Áreas Rurais',
    description: 'Estruturação de propriedades rurais para produção, turismo e desenvolvimento regional.',
  },
  {
    icon: Palmtree,
    title: 'Empreendimentos Turísticos',
    description: 'Desenvolvimento de projetos turísticos premium com foco em experiência e rentabilidade.',
  },
  {
    icon: Hotel,
    title: 'Hotéis e Pousadas',
    description: 'Consultoria para operação, expansão e otimização de empreendimentos hoteleiros.',
  },
  {
    icon: Briefcase,
    title: 'Estruturação Patrimonial',
    description: 'Planejamento estratégico de patrimônio e estruturação de investimentos de longo prazo.',
  },
  {
    icon: Zap,
    title: 'Desenvolvimento Regional',
    description: 'Projetos de impacto regional que geram valor econômico e social sustentável.',
  },
  {
    icon: Users,
    title: 'Parcerias Empresariais',
    description: 'Conexão entre players estratégicos para oportunidades de negócio colaborativo.',
  },
];

export default function AreasSection() {
  return (
    <section id="areas" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Áreas de Atuação</h2>
          <div className="w-16 h-1 bg-accent mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Atuamos em múltiplos segmentos, oferecendo expertise estratégica em cada um deles.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg p-8 hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="mb-6 inline-block p-3 bg-foreground/5 rounded-lg group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {area.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="mt-6 h-0.5 w-0 bg-accent group-hover:w-8 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

