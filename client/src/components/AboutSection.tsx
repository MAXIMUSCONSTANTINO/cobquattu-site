/**
 * COBQUATTU About Section
 * Design: Minimalismo Executivo com tipografia forte
 * - Texto institucional poderoso
 * - Valores e visão estratégica
 * - Layout assimétrico elegante
 * - Links para fontes de dados e referências
 */

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Quem Somos
              </h2>
              <div className="w-16 h-1 bg-accent"></div>
            </div>

            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                A Cobquattu é uma plataforma de inteligência imobiliária e desenvolvimento territorial voltada à conexão entre imóveis, projetos e oportunidades estratégicas.
              </p>
              <p>
                Atuamos organizando ativos imobiliários e estruturando conexões entre proprietários, empresarios e parceiros especializados. Nosso foco é transformar imóveis isolados em oportunidades estruturadas de desenvolvimento territorial.
              </p>
              <p>
                Operamos no Nordeste brasileiro, conectando inteligência territorial com crescimento econômico regional sustentável.
              </p>
            </div>

            {/* Key Points */}
              <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Inteligência Territorial</h4>
                <p className="text-foreground/60 text-sm">Compreensão profunda do território</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Estruturação de Ativos</h4>
                <p className="text-foreground/60 text-sm">Organização de oportunidades</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Conexão Estratégica</h4>
                <p className="text-foreground/60 text-sm">Rede de parceiros especializados</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Desenvolvimento Regional</h4>
                <p className="text-foreground/60 text-sm">Crescimento econômico sustentável</p>
              </div>
            </div>

            {/* References and Data Sources */}
            <div className="space-y-3 pt-6 border-t border-border">
              <p className="text-sm text-foreground/60 font-medium">Fontes de dados e referências:</p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.ibge.gov.br/cidades/ce/fortaleza.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  → Dados Territoriais - IBGE
                </a>
                <a
                  href="https://www.seplan.ce.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  → Planejamento Regional - SEPLAN
                </a>
                <a
                  href="https://www.fiece.org.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  → Desenvolvimento Econômico - FIECE
                </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-business-abstract-JUsWLUkSypiCj2r8z3tiWa.webp"
              alt="COBQUATTU Inteligência Territorial"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
