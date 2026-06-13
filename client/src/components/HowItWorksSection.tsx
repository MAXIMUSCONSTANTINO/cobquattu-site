/**
 * COBQUATTU How It Works Section
 * Design: Processo institucional e linear
 * - Passos claros e estruturados
 * - Foco em metodologia
 */

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Identificação",
      description: "Mapeamos ativos imobiliários estratégicos e oportunidades territoriais no Nordeste.",
    },
    {
      number: "02",
      title: "Análise",
      description: "Analisamos potencial de desenvolvimento e viabilidade territorial de cada oportunidade.",
    },
    {
      number: "03",
      title: "Estruturação",
      description: "Estruturamos conexões entre proprietários, empresários e parceiros especializados.",
    },
    {
      number: "04",
      title: "Desenvolvimento",
      description: "Acompanhamos o desenvolvimento territorial e crescimento econômico da oportunidade.",
    },
  ];

  return (
    <section id="comofunciona" className="py-20 md:py-32 bg-card">
      <div className="container">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Como Funciona
            </h2>
            <p className="text-lg text-foreground/70">
              Nossa metodologia estruturada garante que cada oportunidade seja desenvolvida de forma inteligente e sustentável.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="space-y-4">
                <div className="text-5xl font-bold text-accent/30">{step.number}</div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
