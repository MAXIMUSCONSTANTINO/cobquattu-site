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
                Sobre a COBQUATTU
              </h2>
              <div className="w-16 h-1 bg-accent"></div>
            </div>

            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                A COBQUATTU Negócios Imobiliários é uma plataforma especializada em inteligência imobiliária, investimentos estratégicos e estruturação de oportunidades patrimoniais. Atuamos no Ceará e em todo o Brasil, conectando visão estratégica com desenvolvimento regional.
              </p>
              <p>
                Nossa missão é identificar e estruturar oportunidades de alto potencial, conectando investidores, empreendedores e proprietários em uma rede de inteligência estratégica. Focamos em desenvolvimento sustentável, crescimento regional e geração de valor para nossos parceiros.
              </p>
              <p>
                Com expertise em negócios imobiliários, turismo, desenvolvimento rural e estruturação patrimonial, transformamos oportunidades em realidades estratégicas.
              </p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Visão Estratégica</h4>
                <p className="text-foreground/60 text-sm">Desenvolvimento inteligente e sustentável</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Rede de Negócios</h4>
                <p className="text-foreground/60 text-sm">Conexões de alto nível e networking</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Expertise Regional</h4>
                <p className="text-foreground/60 text-sm">Profundo conhecimento do Ceará</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Estruturação Patrimonial</h4>
                <p className="text-foreground/60 text-sm">Otimização de investimentos</p>
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
                  → IBGE - Dados Ceará
                </a>
                <a
                  href="https://www.seplan.ce.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  → SEPLAN - Planejamento Estratégico
                </a>
                <a
                  href="https://www.fiece.org.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  → FIECE - Câmara de Comércio
                </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-business-abstract-JUsWLUkSypiCj2r8z3tiWa.webp"
              alt="COBQUATTU Inteligência Estratégica"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
