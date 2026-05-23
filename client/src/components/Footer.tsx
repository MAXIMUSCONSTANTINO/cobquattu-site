import { Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

/**
 * COBQUATTU Premium Footer
 * Design: Minimalismo Executivo
 * - Background preto fosco
 * - Informações de contato diretas
 * - Links sociais discretos
 * - Marca institucional forte
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-background rounded-sm flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">C</span>
              </div>
              <div>
                <h3 className="text-background font-bold text-base">COBQUATTU</h3>
                <p className="text-background/70 text-xs">Inteligência Territorial</p>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Plataforma de inteligência territorial e desenvolvimento econômico regional no Nordeste brasileiro.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-background font-bold text-sm">Navegação</h4>
            <div className="flex flex-col gap-2">
              <a href="#sobre" className="text-background/70 hover:text-accent transition-colors text-sm">
                Quem Somos
              </a>
              <a href="#oqueazemos" className="text-background/70 hover:text-accent transition-colors text-sm">
                O Que Fazemos
              </a>
              <a href="#comofunciona" className="text-background/70 hover:text-accent transition-colors text-sm">
                Como Funciona
              </a>
              <a href="#ecossistema" className="text-background/70 hover:text-accent transition-colors text-sm">
                Ecossistema
              </a>
              <a href="#territorio" className="text-background/70 hover:text-accent transition-colors text-sm">
                Território
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-background font-bold text-sm">Contato</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5585997688325"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>+55 85 99768-8325</span>
              </a>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Ceará, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-background/60 text-xs">
            © {currentYear} COBQUATTU. Inteligência Territorial. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/jose_constantinofilho?igsh=eDNsMmNmZWN0N3J6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-background/30 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/jose_constantinofilho?igsh=eDNsMmNmZWN0N3J6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-background/30 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-background/30 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-200"
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
