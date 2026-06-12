import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

/**
 * COBQUATTU Premium Navbar
 * Design: Minimalismo Executivo Cinematográfico
 * - Logotipo Oficial Integrado
 * - Navegação limpa e espaçada
 * - Mobile-first responsivo
 * - Scroll cinematográfico com shadow sutil
 * - Links para páginas institucionais
 */

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();

  const navItems = [
    { label: 'Quem Somos', href: '#sobre', isHash: true },
    { label: 'O Que Fazemos', href: '#oqueazemos', isHash: true },
    { label: 'Como Funciona', href: '#comofunciona', isHash: true },
    { label: 'Manifesto', href: '/manifesto', isHash: false },
    { label: 'Nordeste', href: '/nordeste-estrategico', isHash: false },
    { label: 'Contato', href: '#contato', isHash: true },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash: boolean) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (isHash) {
      // Para links de hash, fazer scroll suave
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Para rotas, navegar normalmente
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo Oficial */}
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-accent/20">
            <img 
              src="/assets/logo-cobquattu.png" 
              alt="COBQUATTU Logo" 
              className="w-full h-full object-cover scale-150"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-bold text-xs md:text-sm tracking-widest">COBQUATTU</span>
            <span className="text-accent text-[10px] md:text-xs font-medium uppercase tracking-tighter">Inteligência Territorial</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavigation(e, item.href, item.isHash)}
              className="text-foreground/80 hover:text-accent transition-colors duration-200 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <a href="/auth/login">
            <Button
              className="bg-accent text-foreground hover:bg-accent/90 transition-all duration-200 font-semibold"
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
                onClick={(e) => handleNavigation(e, item.href, item.isHash)}
                className="text-foreground/80 hover:text-accent transition-colors py-2 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <a href="/auth/login" className="block">
                <Button className="w-full bg-accent text-foreground hover:bg-accent/90">
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
