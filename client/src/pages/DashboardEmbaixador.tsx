import { useState, useEffect } from 'react';
import { LogOut, Users, Home, Briefcase, Plus, TrendingUp, ArrowRight, Settings, Bell, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

/**
 * COBQUATTU - Dashboard do Embaixador
 * Design: Carteira de Captação e Gestão de Oportunidades
 * - Visão: Proprietários e Empresários captados
 * - Ações: Cadastrar novos clientes
 * - Métricas: Acompanhamento de oportunidades
 */

interface Cliente {
  id: string;
  tipo: 'proprietario' | 'empresario';
  nome: string;
  email: string;
  telefone: string;
  dataRegistro: string;
  status: 'ativo' | 'pendente' | 'concluido';
  detalhes: {
    matricula?: string;
    valorImovel?: string;
    nomeProjeto?: string;
    valorProjeto?: string;
  };
}

export default function DashboardEmbaixador() {
  const [, navigate] = useLocation();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showFormProprietario, setShowFormProprietario] = useState(false);
  const [showFormEmpresario, setShowFormEmpresario] = useState(false);
  const [embaixador, setEmbaixador] = useState<any>(null);

  useEffect(() => {
    // Carregar dados do embaixador
    const embaixadorData = localStorage.getItem('embaixador');
    if (embaixadorData) {
      setEmbaixador(JSON.parse(embaixadorData));
    }

    // Carregar clientes captados
    const clientesData = localStorage.getItem('clientesCaptados');
    if (clientesData) {
      setClientes(JSON.parse(clientesData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('embaixador');
    navigate('/');
  };

  const handleAddProprietario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const novoCliente: Cliente = {
      id: Date.now().toString(),
      tipo: 'proprietario',
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
      telefone: formData.get('telefone') as string,
      dataRegistro: new Date().toLocaleDateString('pt-BR'),
      status: 'ativo',
      detalhes: {
        matricula: formData.get('matricula') as string,
        valorImovel: formData.get('valorImovel') as string,
      },
    };

    const clientesAtualizados = [...clientes, novoCliente];
    setClientes(clientesAtualizados);
    localStorage.setItem('clientesCaptados', JSON.stringify(clientesAtualizados));
    
    toast.success(`Proprietário "${novoCliente.nome}" cadastrado com sucesso!`);
    setShowFormProprietario(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleAddEmpresario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const novoCliente: Cliente = {
      id: Date.now().toString(),
      tipo: 'empresario',
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
      telefone: formData.get('telefone') as string,
      dataRegistro: new Date().toLocaleDateString('pt-BR'),
      status: 'ativo',
      detalhes: {
        nomeProjeto: formData.get('nomeProjeto') as string,
        valorProjeto: formData.get('valorProjeto') as string,
      },
    };

    const clientesAtualizados = [...clientes, novoCliente];
    setClientes(clientesAtualizados);
    localStorage.setItem('clientesCaptados', JSON.stringify(clientesAtualizados));
    
    toast.success(`Empresário "${novoCliente.nome}" cadastrado com sucesso!`);
    setShowFormEmpresario(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleDeleteCliente = (id: string) => {
    const clientesAtualizados = clientes.filter(c => c.id !== id);
    setClientes(clientesAtualizados);
    localStorage.setItem('clientesCaptados', JSON.stringify(clientesAtualizados));
    toast.success('Cliente removido da carteira.');
  };

  const proprietarios = clientes.filter(c => c.tipo === 'proprietario');
  const empresarios = clientes.filter(c => c.tipo === 'empresario');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-accent/20">
              <img
                src="/assets/logo-cobquattu.png"
                alt="COBQUATTU"
                className="w-full h-full object-cover scale-150"
              />
            </div>
            <div>
              <h1 className="text-foreground font-bold text-sm md:text-base tracking-widest">EMBAIXADOR</h1>
              <p className="text-accent text-[10px] md:text-xs font-medium uppercase">Carteira de Captação</p>
            </div>
          </div>

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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bem-vindo, {embaixador?.nome}
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Sua carteira de captação de oportunidades territoriais. Registre proprietários e empresários que você conecta ao ecossistema Cobquattu.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-accent mb-2">{clientes.length}</div>
              <p className="text-sm text-foreground/70">Oportunidades Captadas</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-accent mb-2">{proprietarios.length}</div>
              <p className="text-sm text-foreground/70">Proprietários Registrados</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-accent mb-2">{empresarios.length}</div>
              <p className="text-sm text-foreground/70">Empresários Registrados</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setShowFormProprietario(!showFormProprietario)}
              className="p-6 border border-border rounded-lg hover:border-accent/50 transition-all bg-background/50 hover:bg-background/80 text-left group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Home className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Cadastrar Proprietário</h3>
              </div>
              <p className="text-sm text-foreground/70">Registre um novo proprietário de imóvel na sua carteira</p>
            </button>

            <button
              onClick={() => setShowFormEmpresario(!showFormEmpresario)}
              className="p-6 border border-border rounded-lg hover:border-accent/50 transition-all bg-background/50 hover:bg-background/80 text-left group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Cadastrar Empresário</h3>
              </div>
              <p className="text-sm text-foreground/70">Registre um novo empresário com projeto na sua carteira</p>
            </button>
          </div>
        </div>

        {/* Formulário Proprietário */}
        {showFormProprietario && (
          <div className="max-w-4xl mx-auto mb-16 p-8 border border-border rounded-lg bg-background/50">
            <h3 className="text-2xl font-bold text-foreground mb-6">Novo Proprietário</h3>
            <form onSubmit={handleAddProprietario} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="nome" placeholder="Nome completo" required className="p-2 border border-border rounded bg-background text-foreground" />
                <input type="email" name="email" placeholder="Email" className="p-2 border border-border rounded bg-background text-foreground" />
                <input type="tel" name="telefone" placeholder="Telefone" required className="p-2 border border-border rounded bg-background text-foreground" />
                <input type="text" name="matricula" placeholder="Matrícula do imóvel" required className="p-2 border border-border rounded bg-background text-foreground" />
                <input type="number" name="valorImovel" placeholder="Valor sugerido" required className="p-2 border border-border rounded bg-background text-foreground" />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="bg-accent text-foreground hover:bg-accent/90">
                  Cadastrar Proprietário
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowFormProprietario(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Formulário Empresário */}
        {showFormEmpresario && (
          <div className="max-w-4xl mx-auto mb-16 p-8 border border-border rounded-lg bg-background/50">
            <h3 className="text-2xl font-bold text-foreground mb-6">Novo Empresário</h3>
            <form onSubmit={handleAddEmpresario} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="nome" placeholder="Nome completo" required className="p-2 border border-border rounded bg-background text-foreground" />
                <input type="email" name="email" placeholder="Email" className="p-2 border border-border rounded bg-background text-foreground" />
                <input type="tel" name="telefone" placeholder="Telefone" required className="p-2 border border-border rounded bg-background text-foreground" />
                <input type="text" name="nomeProjeto" placeholder="Nome do projeto" required className="p-2 border border-border rounded bg-background text-foreground" />
                <input type="number" name="valorProjeto" placeholder="Valor necessário" required className="p-2 border border-border rounded bg-background text-foreground" />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="bg-accent text-foreground hover:bg-accent/90">
                  Cadastrar Empresário
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowFormEmpresario(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Carteira de Clientes */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8">Carteira de Oportunidades</h3>

          {clientes.length === 0 ? (
            <div className="p-12 border border-border rounded-lg text-center bg-background/50">
              <Users className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/60">Nenhuma oportunidade captada ainda. Comece cadastrando proprietários ou empresários!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clientes.map((cliente) => (
                <div key={cliente.id} className="p-6 border border-border rounded-lg bg-background/50 hover:border-accent/50 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          {cliente.tipo === 'proprietario' ? (
                            <Home className="w-5 h-5 text-accent" />
                          ) : (
                            <Briefcase className="w-5 h-5 text-accent" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{cliente.nome}</h4>
                          <p className="text-xs text-accent uppercase font-medium">
                            {cliente.tipo === 'proprietario' ? 'Proprietário' : 'Empresário'}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/70 mb-3">{cliente.email} • {cliente.telefone}</p>
                      <div className="text-sm text-foreground/60">
                        {cliente.tipo === 'proprietario' ? (
                          <>
                            <p>Matrícula: {cliente.detalhes.matricula}</p>
                            <p>Valor: R$ {cliente.detalhes.valorImovel}</p>
                          </>
                        ) : (
                          <>
                            <p>Projeto: {cliente.detalhes.nomeProjeto}</p>
                            <p>Valor Necessário: R$ {cliente.detalhes.valorProjeto}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-muted rounded transition-colors">
                        <Eye className="w-4 h-4 text-foreground/60" />
                      </button>
                      <button
                        onClick={() => handleDeleteCliente(cliente.id)}
                        className="p-2 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500/60" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
