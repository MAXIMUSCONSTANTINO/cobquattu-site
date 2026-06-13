/**
 * COBQUATTU Ecosystem Section
 * Design: Rede integrada e conectiva
 * - Mostra conexões entre atores
 * - Foco em articulação
 */

export default function EcosystemSection() {
  const actors = [
    {
      title: "Proprietários",
      description: "Detentores de ativos imobiliários estratégicos no território.",
    },
    {
      title: "Empresários",
      description: "Empreendedores buscando oportunidades de expansão territorial.",
    },
    {
      title: "Parceiros Especializados",
      description: "Profissionais e instituições que estruturam desenvolvimento regional.",
    },
    {
      title: "Cobquattu",
      description: "Articuladora e inteligência territorial que conecta todos os atores.",
    },
  ];

  return (
    <section id="ecossistema" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ecossistema
            </h2>
            <p className="text-lg text-foreground/70">
              A Cobquattu funciona como infraestrutura de inteligência territorial, conectando proprietários, empresários e parceiros especializados em um ecossistema integrado.
            </p>
          </div>

          {/* Ecosystem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {actors.map((actor, index) => (
              <div
                key={index}
                className="p-8 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {actor.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {actor.description}
                </p>
              </div>
            ))}
          </div>

          {/* Central Message */}
          <div className="mt-12 p-8 rounded-lg bg-accent/10 border border-accent/30">
            <p className="text-center text-lg text-foreground">
              <span className="font-bold">Cobquattu organiza oportunidades territoriais</span> de forma inteligente, estruturada e sustentável.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
