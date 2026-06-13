import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, MapPin, TrendingUp, Zap, Building2, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * COBQUATTU - Nordeste Estratégico
 * Página que apresenta a análise macroeconômica e vetores de crescimento regional
 */

export default function NordesteEstrategico() {
  const strategicVectors = [
    {
      icon: TrendingUp,
      title: 'Crescimento Econômico',
      description: 'Taxa de crescimento regional superior à média nacional, impulsionada por infraestrutura, energia renovável e turismo.',
      details: ['PIB em expansão', 'Investimentos federais', 'Atração de capital privado']
    },
    {
      icon: Zap,
      title: 'Energia Renovável',
      description: 'O Nordeste é líder em energia solar e eólica, com potencial de 17 GW e crescimento contínuo.',
      details: ['17 GW de capacidade', 'Matriz energética limpa', 'Investimentos em infraestrutura']
    },
    {
      icon: Building2,
      title: 'Desenvolvimento Urbano',
      description: 'Expansão de centros urbanos, infraestrutura moderna e oportunidades imobiliárias estratégicas.',
      details: ['8 metrópoles em crescimento', 'Infraestrutura urbana', 'Valorização territorial']
    },
    {
      icon: Globe,
      title: 'Turismo e Hospitalidade',
      description: 'Litoral estratégico com 573 km de costa, desenvolvimento de turismo premium e infraestrutura hoteleira.',
      details: ['573 km de litoral', 'Turismo de luxo', 'Infraestrutura hoteleira']
    },
    {
      icon: Users,
      title: 'Capital Humano',
      description: 'População jovem, educação em expansão e força de trabalho qualificada atraindo investimentos.',
      details: ['População jovem', 'Educação em crescimento', 'Força de trabalho qualificada']
    },
    {
      icon: MapPin,
      title: 'Infraestrutura Logística',
      description: 'Portos, aeroportos e rodovias estratégicas posicionam o Nordeste como hub logístico regional.',
      details: ['Portos estratégicos', 'Aeroportos internacionais', 'Malha rodoviária']
    }
  ];

  const regionalFocus = [
    {
      region: 'Litoral Leste Cearense',
      cities: 'Fortim, Aracati, Jericoacoara',
      focus: 'Turismo Premium, Infraestrutura Hoteleira, Desenvolvimento Imobiliário Estratégico',
      potential: 'Alto'
    },
    {
      region: 'Vale do Jaguaribe',
      cities: 'Limoeiro do Norte, Russas',
      focus: 'Agricultura, Energia Renovável, Infraestrutura Regional',
      potential: 'Médio-Alto'
    },
    {
      region: 'Região Metropolitana de Fortaleza',
      cities: 'Fortaleza, Maracanaú, Caucaia',
      focus: 'Desenvolvimento Urbano, Infraestrutura, Negócios',
      potential: 'Alto'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center py-12 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
                Nordeste Estratégico
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">
                Uma análise profunda dos vetores de crescimento, oportunidades territoriais e transformação econômica do Nordeste brasileiro.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Strategic Vectors */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Vetores de Crescimento Regional
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                O Nordeste apresenta seis vetores principais de crescimento econômico e desenvolvimento territorial que criam oportunidades estratégicas para investimento, estruturação de ativos e expansão regional.
              </p>
            </div>

            {/* Vectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {strategicVectors.map((vector, index) => {
                const Icon = vector.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 border border-border rounded-lg hover:border-accent/50 transition-all duration-300 bg-background/50 hover:bg-background/80"
                  >
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{vector.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                      {vector.description}
                    </p>
                    <ul className="space-y-2">
                      {vector.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/60">
                          <span className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Regional Focus */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Regiões Estratégicas de Atuação
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                A COBQUATTU concentra sua análise e estruturação territorial em regiões-chave do Nordeste que apresentam maior potencial de desenvolvimento e oportunidades estratégicas.
              </p>
            </div>

            {/* Regional Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 font-bold text-foreground">Região</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Cidades Principais</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Foco Estratégico</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Potencial</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalFocus.map((item, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-foreground">{item.region}</td>
                      <td className="py-4 px-6 text-foreground/70 text-sm">{item.cities}</td>
                      <td className="py-4 px-6 text-foreground/70 text-sm">{item.focus}</td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                          {item.potential}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Conclusion */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Oportunidades Estruturadas
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                O Nordeste não é apenas um mercado em crescimento. É um território em transformação, com infraestrutura em expansão, capital em movimento e visão de futuro em construção.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                A COBQUATTU estrutura essas oportunidades através de inteligência territorial, articulação estratégica e desenvolvimento sustentável. Conectamos proprietários, empresários e parceiros em ecossistemas de valor real e transformador.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Essa é a visão do Nordeste Estratégico. Essa é a COBQUATTU.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Explore Oportunidades Territoriais
              </h2>
              <p className="text-lg text-foreground/70">
                Estruture seu potencial territorial com a COBQUATTU.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5585997688325?text=Olá%20COBQUATTU%2C%20gostaria%20de%20explorar%20oportunidades%20territoriais%20no%20Nordeste."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-accent text-foreground hover:bg-accent/90 group">
                    Conectar com Especialista
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="/">
                  <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground/10">
                    Voltar para Home
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
