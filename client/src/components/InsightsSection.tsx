import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * COBQUATTU Insights Section
 * Design: Centro de Inteligência Territorial
 * - Artigos institucionais de análise territorial
 * - Posicionamento como think tank regional
 * - Conteúdo editorial premium
 * - Foco em desenvolvimento regional e inteligência territorial
 */

const insightsPosts = [
  {
    id: 1,
    title: 'O Novo Eixo Econômico do Litoral Leste Cearense',
    category: 'Inteligência Territorial',
    excerpt: 'Análise profunda da transformação econômica do litoral leste cearense, com foco em turismo premium, infraestrutura e desenvolvimento territorial estratégico.',
    date: '15 de Maio, 2026',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-hero-litoral-BXZQ4cVAh6zEMDoVzsCbvN.webp',
    link: 'https://www.ceara.gov.br/turismo',
    linkLabel: 'Leia a Análise Completa',
  },
  {
    id: 2,
    title: 'Fortim e o Futuro da Valorização Territorial',
    category: 'Desenvolvimento Regional',
    excerpt: 'Fortim emerge como epicentro de desenvolvimento territorial no Nordeste, com oportunidades em turismo, infraestrutura e expansão urbana estratégica.',
    date: '10 de Maio, 2026',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-vale-jaguaribe-UhMLTQ5FiaTKH46QjHUjSC.webp',
    link: 'https://www.ibge.gov.br/cidades/ce/fortim.html',
    linkLabel: 'Dados Territoriais - IBGE',
  },
  {
    id: 3,
    title: 'O Crescimento Estratégico do Vale do Jaguaribe',
    category: 'Infraestrutura Regional',
    excerpt: 'O Vale do Jaguaribe consolida-se como polo de desenvolvimento regional com investimentos em energia renovável, agricultura e infraestrutura logística.',
    date: '05 de Maio, 2026',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-business-abstract-JUsWLUkSypiCj2r8z3tiWa.webp',
    link: 'https://www.seplan.ce.gov.br/',
    linkLabel: 'SEPLAN Ceará - Dados Econômicos',
  },
  {
    id: 4,
    title: 'Turismo Premium e Transformação Regional',
    category: 'Desenvolvimento Territorial',
    excerpt: 'A expansão do turismo premium no litoral cearense cria oportunidades de estruturação territorial, infraestrutura hoteleira e desenvolvimento econômico sustentável.',
    date: '28 de Abril, 2026',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-network-luxury-6yKBFpkWGpGwyq.webp',
    link: 'https://www.bndes.gov.br/wps/portal/site/home',
    linkLabel: 'BNDES - Desenvolvimento Regional',
  },
  {
    id: 5,
    title: 'Infraestrutura e Expansão Econômica no Nordeste',
    category: 'Inteligência Territorial',
    excerpt: 'Investimentos em infraestrutura (portos, aeroportos, energia renovável) posicionam o Nordeste como polo de crescimento econômico sustentável.',
    date: '20 de Abril, 2026',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-investment-concept-cTQbfcGFATcMJoVtWZbs.webp',
    link: 'https://www.fiece.org.br/',
    linkLabel: 'FIECE - Câmara de Comércio',
  },
  {
    id: 6,
    title: 'Ecossistemas de Articulação Territorial',
    category: 'Desenvolvimento Estratégico',
    excerpt: 'Como conectar proprietários, empresários e parceiros em ecossistemas de valor territorial, criando oportunidades estruturadas de desenvolvimento.',
    date: '15 de Abril, 2026',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-network-luxury-6yKBFpkWGpGwyq.webp',
    link: 'https://www.ibge.gov.br/',
    linkLabel: 'IBGE - Dados Territoriais',
  },
];

export default function InsightsSection() {
  return (
    <section id="insights" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Centro de Inteligência Territorial
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            Análises profundas, insights estratégicos e pensamento territorial sobre o desenvolvimento regional do Nordeste brasileiro.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insightsPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col h-full border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 bg-background/50 hover:bg-background/80"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6 md:p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-foreground/70 text-sm leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-xs text-foreground/50">{post.date}</span>
                </div>

                {/* CTA */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium group/link"
                >
                  {post.linkLabel}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-foreground/70 mb-6">
            Acompanhe nossos insights e análises sobre inteligência territorial e desenvolvimento regional.
          </p>
          <a
            href="https://wa.me/5585997688325?text=Olá%20COBQUATTU%2C%20gostaria%20de%20receber%20insights%20sobre%20inteligência%20territorial."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-accent text-foreground hover:bg-accent/90 group">
              Receber Insights
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
