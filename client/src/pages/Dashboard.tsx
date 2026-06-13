import { LogOut, Users, Home, Briefcase, MapPin, TrendingUp, ArrowRight, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

/**
 * COBQUATTU - Dashboard de Introdução
 * Design: Bem-vindo ao ecossistema territorial
 * - Identidade visual premium
 * - Apresentação do ecossistema
 * - Navegação para áreas específicas
 */

export default function Dashboard() {
  const [, navigate] = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const ecosystemAreas = [
    {
      icon: Users,
      title: 'Rede de Parceiros',
      description: 'Conecte-se com especialistas, corretores, consultores e profissionais especializados em desenvolvimento territorial.',
      color: 'accent',
      link: '#parceiros',
    },
    {
      icon: Home,
      title: 'Meus Imóveis',
      description: 'Gerencie seus ativos imobiliários, atualize informações e explore oportunidades de estruturação.',
      color: 'accent',
      link: '#imoveis',
    },
    {
      icon: Briefcase,
      title: 'Meus Projetos',
      description: 'Apresente seus projetos, conecte-se com recursos e parceiros para acelerar sua expansão territorial.',
      color: 'accent',
      link: '#projetos',
    },
    {
      icon: MapPin,
      title: 'Inteligência Territorial',
      description: 'Acesse análises, dados e insights sobre oportunidades de desenvolvimento no Nordeste.',
      color: 'accent',
      link: '#inteligencia',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-accent/20">
              <img
                src="/assets/logo-cobquattu.png"
                alt="COBQUATTU"
                className="w-full h-full object-cover scale-150"
              />
            </div>
            <div>
              <h1 className="text-foreground font-bold text-sm md:text-base tracking-widest">COBQUATTU</h1>
              <p className="text-accent text-[10px] md:text-xs font-medium uppercase">Ecossistema</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-foreground/60" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-foreground/60" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 md:py-20">
        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                Bem-vindo ao Ecossistema Cobquattu
              </h2>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
                Você agora faz parte de uma rede estratégica de inteligência territorial. Explore oportunidades, conecte-se com parceiros e estruture seu potencial no Nordeste brasileiro.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="p-6 border border-border rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-accent mb-2">573 km</div>
                <p className="text-sm text-foreground/70">Litoral Estratégico</p>
              </div>
              <div className="p-6 border border-border rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-accent mb-2">17 GW</div>
                <p className="text-sm text-foreground/70">Capacidade Energética</p>
              </div>
              <div className="p-6 border border-border rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-accent mb-2">∞</div>
                <p className="text-sm text-foreground/70">Oportunidades Territoriais</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Areas */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-12">Áreas do Ecossistema</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecosystemAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <a
                  key={index}
                  href={area.link}
                  className="group p-8 border border-border rounded-lg hover:border-accent/50 transition-all duration-300 bg-background/50 hover:bg-background/80 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {area.title}
                      </h4>
                      <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                        {area.description}
                      </p>
                      <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                        Explorar
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-20 p-12 border border-accent/20 rounded-lg bg-accent/5">
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Pronto para Estruturar Seu Potencial?</h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Conecte-se com especialistas, explore oportunidades territoriais e faça parte da transformação econômica do Nordeste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5585997688325?text=Olá%20COBQUATTU%2C%20estou%20no%20ecossistema%20e%20gostaria%20de%20explorar%20oportunidades." target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent text-foreground hover:bg-accent/90 group">
                  Conectar com Especialista
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                Explorar Inteligência Territorial
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-foreground text-background mt-20">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">COBQUATTU</h4>
              <p className="text-background/70 text-sm">Inteligência Territorial para o Novo Nordeste</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <p className="text-background/70 text-sm">
                <a href="mailto:constantino@cobquattu.com.br" className="hover:text-background">
                  constantino@cobquattu.com.br
                </a>
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <p className="text-background/70 text-sm">
                <a href="https://wa.me/5585997688325" className="hover:text-background">
                  WhatsApp: +55 85 99768-8325
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-background/10 pt-8 text-center text-xs text-background/60">
            <p>© 2026 COBQUATTU. Inteligência Territorial e Desenvolvimento Estratégico.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
