import { ArrowRight, Calendar } from 'lucide-react';

/**
 * COBQUATTU Blog Section
 * Design: Revista premium de inteligência de mercado
 * - Cards de artigos sofisticados
 * - Categorias estratégicas
 * - Layout moderno e editorial
 * - Links reais para fontes de dados e artigos
 */

const blogPosts = [
  {
    id: 1,
    title: 'Mercado Imobiliário Cearense: Tendências 2024',
    category: 'Mercado Imobiliário',
    excerpt: 'Análise profunda das tendências de valorização, demanda e oportunidades no mercado imobiliário do Ceará.',
    date: '15 de Maio, 2024',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-investment-concept-cTQbfcGFATcMJoVtWZbs.webp',
    link: 'https://www.ibge.gov.br/cidades/ce/fortaleza.html',
    linkLabel: 'Dados IBGE - Fortaleza',
  },
  {
    id: 2,
    title: 'Turismo de Luxo no Litoral Cearense',
    category: 'Turismo',
    excerpt: 'Oportunidades de desenvolvimento em empreendimentos turísticos premium e sua rentabilidade estratégica.',
    date: '10 de Maio, 2024',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-hero-litoral-BXZQ4cVAh6zEMDoVzsCbvN.webp',
    link: 'https://www.ceara.gov.br/turismo',
    linkLabel: 'Portal Turismo Ceará',
  },
  {
    id: 3,
    title: 'Estruturação Patrimonial: Guia Estratégico',
    category: 'Investimentos',
    excerpt: 'Como estruturar patrimônio para maximizar rentabilidade e criar valor de longo prazo em investimentos imobiliários.',
    date: '05 de Maio, 2024',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-network-luxury-6yKBFpkWGpGwyq.webp',
    link: 'https://www.bcb.gov.br/estabilidadefinanceira',
    linkLabel: 'Banco Central - Investimentos',
  },
  {
    id: 4,
    title: 'Desenvolvimento Regional Sustentável',
    category: 'Desenvolvimento',
    excerpt: 'Projetos de impacto regional que geram valor econômico e social sustentável no Vale do Jaguaribe.',
    date: '28 de Abril, 2024',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-vale-jaguaribe-UhMLTQ5FiaTKH46QjHUjSC.webp',
    link: 'https://www.bndes.gov.br/wps/portal/site/home',
    linkLabel: 'BNDES - Desenvolvimento Regional',
  },
  {
    id: 5,
    title: 'Inteligência de Mercado: Dados que Importam',
    category: 'Inteligência',
    excerpt: 'Como utilizar dados estratégicos para identificar oportunidades de investimento de alto potencial.',
    date: '20 de Abril, 2024',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-business-abstract-JUsWLUkSypiCj2r8z3tiWa.webp',
    link: 'https://www.seplan.ce.gov.br/',
    linkLabel: 'SEPLAN Ceará - Dados Econômicos',
  },
  {
    id: 6,
    title: 'Networking de Alto Nível: Conexões que Geram Valor',
    category: 'Negócios',
    excerpt: 'A importância das conexões estratégicas e como a COBQUATTU facilita parcerias de impacto.',
    date: '15 de Abril, 2024',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663084595789/GUGZizB8crDVjS3xUgGzVp/cobquattu-investment-concept-cTQbfcGFATcMJoVtWZbs.webp',
    link: 'https://www.fiece.org.br/',
    linkLabel: 'FIECE - Câmara de Comércio',
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Inteligência de Mercado</h2>
          <div className="w-16 h-1 bg-accent mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Análises, tendências e insights sobre mercado imobiliário, investimentos e desenvolvimento regional.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                {/* Category */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-accent uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span className="text-xs text-foreground/40">•</span>
                  <span className="text-xs text-foreground/60 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="pt-4 mt-auto">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all group/link"
                  >
                    <span className="text-sm font-medium">{post.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
