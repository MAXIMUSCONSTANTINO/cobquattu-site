import { Phone, MapPin, Linkedin, Instagram, Facebook, Mail, Globe } from 'lucide-react';

/**
 * COBQUATTU Premium Footer
 * Design: Minimalismo Executivo
 * - Logotipo Oficial Integrado
 * - Informações de contato institucionais completas
 * - Links sociais discretos
 * - Marca institucional forte
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 md:py-20 border-t border-accent/10">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-background/20">
                <img 
                  src="/assets/logo-cobquattu.png" 
                  alt="COBQUATTU Logo" 
                  className="w-full h-full object-cover scale-150"
                />
              </div>
              <div>
                <h3 className="text-background font-bold text-lg tracking-widest leading-none">COBQUATTU</h3>
                <p className="text-accent text-xs font-medium uppercase mt-1">Inteligência Territorial</p>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed max-w-xs">
              Uma plataforma de inteligência territorial e desenvolvimento estratégico voltada à estruturação de oportunidades sustentáveis no Nordeste brasileiro.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-background font-bold text-sm uppercase tracking-wider">Navegação Estratégica</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <a href="/#sobre" className="text-background/70 hover:text-accent transition-colors text-sm">Quem Somos</a>
              <a href="/#oqueazemos" className="text-background/70 hover:text-accent transition-colors text-sm">O Que Fazemos</a>
              <a href="/#comofunciona" className="text-background/70 hover:text-accent transition-colors text-sm">Como Funciona</a>
              <a href="/manifesto" className="text-background/70 hover:text-accent transition-colors text-sm">Manifesto</a>
              <a href="/nordeste-estrategico" className="text-background/70 hover:text-accent transition-colors text-sm">Nordeste</a>
              <a href="/#contato" className="text-background/70 hover:text-accent transition-colors text-sm">Contato</a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-6">
            <h4 className="text-background font-bold text-sm uppercase tracking-wider">Conexão Institucional</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:constantino@cobquattu.com.br"
                className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform text-accent" />
                <span>constantino@cobquattu.com.br</span>
              </a>
              <a
                href="https://wa.me/5585997688325"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform text-accent" />
                <span>+55 85 99768-8325</span>
              </a>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Ceará, Nordeste Brasileiro</span>
              </div>
              <a
                href="https://cobquattu.com.br"
                className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm group"
              >
                <Globe className="w-4 h-4 group-hover:scale-110 transition-transform text-accent" />
                <span>www.cobquattu.com.br</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Info */}
          <div className="flex flex-col gap-1 items-center md:items-start">
            <p className="text-background/60 text-[10px] md:text-xs">
              © {currentYear} COBQUATTU. Uma plataforma de inteligência territorial e desenvolvimento estratégico.
            </p>
            <p className="text-background/40 text-[10px]">
              CNPJ: XX.XXX.XXX/XXXX-XX | Todos os direitos reservados.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/jose_constantinofilho"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/jose-constantino-filho"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com/cobquattu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
