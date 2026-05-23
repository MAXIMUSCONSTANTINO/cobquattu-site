/**
 * COBQUATTU What We Do Section
 * Design: Institucional e estratégico
 * - Foco em estruturação de ativos
 * - Linguagem territorial
 * - Cards minimalistas
 */

export default function WhatWeDoSection() {
  const activities = [
    {
      title: "Estruturação de Ativos",
      description: "Organizamos imóveis estratégicos em oportunidades estruturadas de desenvolvimento territorial.",
    },
    {
      title: "Conexão de Oportunidades",
      description: "Conectamos proprietários, empresários e parceiros especializados em um ecossistema integrado.",
    },
    {
      title: "Desenvolvimento Territorial",
      description: "Promovemos crescimento econômico regional sustentável através de inteligência territorial.",
    },
    {
      title: "Articulação Regional",
      description: "Atuamos como infraestrutura de inteligência para expansão e desenvolvimento no Nordeste.",
    },
  ];

  return (
    <section id="oqueazemos" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              O Que Fazemos
            </h2>
            <p className="text-lg text-foreground/70">
              Estruturamos e organizamos imóveis estratégicos, conectando esses ativos a projetos de expansão, desenvolvimento e oportunidades econômicas no território.
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="p-8 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {activity.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
