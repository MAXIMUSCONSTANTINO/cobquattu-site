/**
 * COBQUATTU Vision Section
 * Design: Visão de longo prazo e institucional
 * - Posicionamento estratégico
 * - Expansão regional
 */

export default function VisionSection() {
  const pillars = [
    {
      title: "Inteligência Territorial",
      description: "Compreensão profunda dos dinâmicas territoriais do Nordeste.",
    },
    {
      title: "Estruturação Estratégica",
      description: "Organização de ativos e oportunidades de forma sofisticada.",
    },
    {
      title: "Articulação Regional",
      description: "Conexão entre atores para desenvolvimento sustentável.",
    },
    {
      title: "Crescimento Escalável",
      description: "Preparação para expansão de escala no Nordeste brasileiro.",
    },
  ];

  return (
    <section id="visao" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Visão de Longo Prazo
            </h2>
            <p className="text-lg text-foreground/70">
              A Cobquattu se posiciona como infraestrutura territorial estratégica do Nordeste brasileiro, preparada para expansão de escala e desenvolvimento regional sustentável.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="p-8 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Vision Statement */}
          <div className="mt-12 p-12 rounded-lg bg-accent/10 border border-accent/30">
            <div className="space-y-4">
              <p className="text-center text-xl font-bold text-foreground">
                Transformar imóveis isolados em oportunidades estruturadas de desenvolvimento territorial.
              </p>
              <p className="text-center text-foreground/70">
                Essa é a missão central que guia todas as operações e decisões estratégicas da Cobquattu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
