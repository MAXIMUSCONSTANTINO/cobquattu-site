import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * COBQUATTU - Manifesto Institucional
 * Página que apresenta a visão visionária, sofisticada e territorial da marca
 */

export default function Manifesto() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center py-12 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
                Manifesto da Inteligência Territorial
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">
                A COBQUATTU não é apenas uma empresa. Somos uma plataforma de pensamento territorial, uma estruturadora de oportunidades e uma voz estratégica para o desenvolvimento sustentável do Nordeste brasileiro.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Main Content */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
              
              {/* Section 1 */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  O Que Acreditamos
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Acreditamos que o território é um ativo vivo. Não é apenas terra, imóveis ou propriedades. É um ecossistema complexo de oportunidades, infraestrutura, pessoas, capital e visão de futuro.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  O Nordeste brasileiro possui um potencial territorial extraordinário. Seu litoral estratégico, sua infraestrutura em expansão, sua matriz energética renovável e seu crescimento urbano criam um momento único de transformação econômica.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Acreditamos que estruturar esse potencial através de inteligência territorial, articulação estratégica e desenvolvimento sustentável é o caminho para criar valor real, duradouro e transformador.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Por Que Fazemos Isso
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Porque o Nordeste merece mais do que especulação. Merece inteligência. Merece planejamento. Merece visão de longo prazo.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  A COBQUATTU existe para transformar imóveis isolados em oportunidades estruturadas. Para conectar proprietários, empresários e parceiros em um ecossistema de desenvolvimento territorial. Para posicionar o Nordeste como referência em inteligência territorial e expansão econômica sustentável.
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Como Operamos
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Operamos através de inteligência territorial. Analisamos o território, identificamos oportunidades estratégicas, estruturamos ativos e conectamos stakeholders em ecossistemas de valor.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Não somos uma imobiliária tradicional. Não somos uma corretora financeira. Somos uma plataforma de articulação estratégica, uma infraestrutura de inteligência territorial, uma voz institucional para o desenvolvimento regional.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  O Futuro Que Vemos
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Vemos um Nordeste estruturado. Vemos infraestrutura territorial inteligente. Vemos desenvolvimento econômico sustentável. Vemos oportunidades conectadas em ecossistemas de valor real.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Vemos a COBQUATTU como referência em inteligência territorial, como articuladora regional, como plataforma de pensamento estratégico para o desenvolvimento do Nordeste brasileiro.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Esse é nosso manifesto. Essa é nossa visão. Essa é a COBQUATTU.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Conecte-se com a Inteligência Territorial
              </h2>
              <p className="text-lg text-foreground/70">
                Faça parte do ecossistema de desenvolvimento territorial do Nordeste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5585997688325?text=Olá%20COBQUATTU%2C%20gostaria%20de%20conectar%20com%20um%20especialista%20em%20inteligência%20territorial."
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
