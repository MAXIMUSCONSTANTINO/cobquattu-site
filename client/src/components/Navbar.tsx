import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * COBQUATTU Premium Navbar
 * Design: Minimalismo Executivo Cinematográfico
 * - Logo/Brand em preto fosco
 * - Navegação limpa e espaçada
 * - Mobile-first responsivo
 * - Scroll cinematográfico com shadow sutil
 */

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Quem Somos', href: '#sobre' },
    { label: 'O Que Fazemos', href: '#oqueazemos' },
    { label: 'Como Funciona', href: '#comofunciona' },
    { label: 'Ecossistema', href: '#ecossistema' },
    { label: 'Território', href: '#territorio' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-foreground rounded-sm flex items-center justify-center">
            <span className="text-background font-bold text-sm md:text-lg">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-bold text-xs md:text-sm leading-tight">COBQUATTU</span>
            <span className="text-muted-foreground text-xs hidden md:block">Inteligência Territorial</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-foreground hover:text-accent transition-colors duration-200 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/5585997688325?text=Olá%20COBQUATTU%2C%20gostaria%20de%20conectar%20com%20um%20especialista%20em%20inteligência%20territorial."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-foreground text-background hover:bg-accent hover:text-foreground transition-all duration-200"
            >
              Conectar
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-foreground hover:text-accent transition-colors py-2 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <a
                href="https://wa.me/5585997688325?text=Olá%20COBQUATTU%2C%20gostaria%20de%20conectar%20com%20um%20especialista%20em%20inteligência%20territorial."
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-foreground text-background hover:bg-accent">
                  Conectar
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
