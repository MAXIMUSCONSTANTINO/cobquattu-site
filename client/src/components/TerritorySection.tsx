/**
 * COBQUATTU Territory Section
 * Design: Foco no papel central do território
 * - Posicionamento territorial
 * - Visão de longo prazo
 */

export default function TerritorySection() {
  return (
    <section id="territorio" className="py-20 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                O Papel do Território
              </h2>
              <div className="w-16 h-1 bg-accent"></div>
            </div>

            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                O território é o núcleo central da Cobquattu. Não tratamos imóveis apenas como ativos individuais, mas como parte de um sistema integrado de desenvolvimento econômico e regional.
              </p>
              <p>
                Atuamos no Nordeste brasileiro, conectando imóveis e oportunidades em regiões litorâneas, urbanas e de interiorização econômica, promovendo crescimento estruturado e sustentável.
              </p>
              <p>
                Cada oportunidade é analisada não apenas pelo seu potencial imobiliário, mas pelo seu impacto no desenvolvimento territorial e na geração de valor econômico regional.
              </p>
            </div>

            {/* Regional Focus */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-bold text-foreground">Regiões de Atuação</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Litoral</p>
                  <p className="text-foreground/60 text-sm">Oportunidades em regiões costeiras</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Urbano</p>
                  <p className="text-foreground/60 text-sm">Desenvolvimento em centros urbanos</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Interior</p>
                  <p className="text-foreground/60 text-sm">Interiorização econômica</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Regional</p>
                  <p className="text-foreground/60 text-sm">Crescimento do Nordeste</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-hero-litoral-BXZQ4cVAh6zEMDoVzsCbvN.webp"
              alt="Território do Nordeste Brasileiro"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
