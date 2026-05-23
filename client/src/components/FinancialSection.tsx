/**
 * COBQUATTU Financial Structuring Section
 * Design: Institucional elegante, sem apelo comercial
 * - Linguagem sofisticada e estratégica
 * - Foco em estruturação, não em crédito
 * - Layout minimalista com tipografia forte
 */

export default function FinancialSection() {
  return (
    <section id="estruturacao" className="py-20 md:py-32 bg-foreground text-background">
      <div className="container">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Estruturação Financeira Estratégica
            </h2>
            <div className="w-16 h-1 bg-accent"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 text-background/90 leading-relaxed">
            <p className="text-lg">
              A estruturação estratégica de oportunidades patrimoniais e financeiras é o coração de nossa operação. Trabalhamos com projetos de médio e grande porte, conectando visão estratégica com execução inteligente.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-background mb-3">Análise Profunda</h3>
                <p>
                  Realizamos análise completa de viabilidade econômica, potencial de mercado e estrutura de investimento para cada oportunidade, garantindo decisões baseadas em inteligência de mercado.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-background mb-3">Estruturação Customizada</h3>
                <p>
                  Cada projeto recebe estruturação única, adaptada aos objetivos dos investidores, características do mercado e dinâmica regional. Focamos em rentabilidade sustentável e criação de valor de longo prazo.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-background mb-3">Rede Estratégica</h3>
                <p>
                  Conectamos investidores, proprietários, empreendedores e especialistas em uma rede de inteligência colaborativa, facilitando oportunidades que geram valor para todos os envolvidos.
                </p>
              </div>
            </div>

            <p className="text-lg pt-4">
              Nossa abordagem combina rigor analítico com visão estratégica, transformando oportunidades em negócios estruturados e rentáveis.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <a
              href="https://wa.me/5585997688325?text=Olá%20COBQUATTU%2C%20gostaria%20de%20discutir%20uma%20oportunidade%20de%20estruturação%20estratégica."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-accent text-foreground font-bold rounded-lg hover:bg-accent/90 transition-all duration-200"
            >
              Discutir Oportunidade
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
