/**
 * COBQUATTU Regional Development Section
 * Design: Cinematográfico com imagem premium
 * - Foco em oportunidade estratégica
 * - Potencial de crescimento e valorização
 * - Layout assimétrico elegante
 * - Links para fontes de dados sobre a região
 */

export default function RegionalSection() {
  return (
    <section id="regional" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-2xl order-2 lg:order-1">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-vale-jaguaribe-UhMLTQ5FiaTKH46QjHUjSC.webp"
              alt="Vale do Jaguaribe - Desenvolvimento Regional"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Fortim e Vale do Jaguaribe
              </h2>
              <div className="w-16 h-1 bg-accent"></div>
            </div>

            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                O litoral de Fortim e o Vale do Jaguaribe representam uma das maiores oportunidades estratégicas de desenvolvimento no Ceará. Com potencial turístico incomparável, infraestrutura em expansão e crescimento econômico acelerado, a região atrai investidores de todo o Brasil.
              </p>
              <p>
                Combinando beleza natural, localização estratégica e desenvolvimento sustentável, a região oferece oportunidades em turismo de luxo, empreendimentos residenciais premium, agricultura de valor agregado e infraestrutura de impacto regional.
              </p>
              <p>
                A COBQUATTU está na vanguarda da identificação e estruturação dessas oportunidades, conectando visão estratégica com execução inteligente para gerar valor duradouro.
              </p>
            </div>

            {/* Key Opportunities */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-foreground text-lg">Oportunidades Estratégicas</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/70">Empreendimentos turísticos e hoteleiros de alto padrão</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/70">Residências premium com vista para o litoral</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/70">Desenvolvimento agrícola sustentável e de valor agregado</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/70">Infraestrutura de impacto regional e sustentável</p>
                </div>
              </div>
            </div>

            {/* Learn More Links */}
            <div className="space-y-3 pt-6 border-t border-border">
              <p className="text-sm text-foreground/60 font-medium">Saiba mais sobre a região:</p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.ibge.gov.br/cidades/ce/fortim.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  → Dados IBGE - Fortim
                </a>
                <a
                  href="https://www.ceara.gov.br/turismo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  → Portal Turismo Ceará
                </a>
                <a
                  href="https://www.seplan.ce.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  → SEPLAN - Dados Econômicos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
