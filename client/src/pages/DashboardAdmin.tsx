import { useState, useEffect } from 'react';
import { LogOut, Users, Home, Briefcase, TrendingUp, Settings, Edit2, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import NotificationCenter from '@/components/NotificationCenter';

/**
 * COBQUATTU - Dashboard Administrativo
 * Gerenciamento global da plataforma
 */

interface AdminStats {
  users: {
    total: number;
    proprietarios: number;
    empresarios: number;
    parceiros: number;
  };
  properties: {
    total: number;
    totalValue: number;
  };
  projects: {
    total: number;
    requiredValue: number;
    capturedValue: number;
  };
  leads: {
    total: number;
    converted: number;
  };
}

export default function DashboardAdmin() {
  const [, navigate] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'usuarios' | 'imoveis' | 'projetos' | 'leads'>('dashboard');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
        
        // Verifica se é admin
        if (response.data.user.userType !== 'admin') {
          navigate('/');
          return;
        }

        // Carrega estatísticas
        const statsResponse = await axios.get('/api/admin/dashboard');
        if (statsResponse.data.success) {
          setStats(statsResponse.data.stats);
        }

        // Carrega usuários
        const usersResponse = await axios.get('/api/admin/users');
        if (usersResponse.data.success) {
          setUsers(usersResponse.data.users);
        }
      } else {
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      navigate('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.success('Desconectado com sucesso');
      navigate('/');
    } catch (error) {
      console.error('Erro ao desconectar:', error);
      toast.error('Erro ao desconectar');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      toast.success('Usuário deletado com sucesso');
    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error);
      toast.error(error.response?.data?.message || 'Erro ao deletar usuário');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground/60">Carregando dashboard administrativo...</p>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60">Acesso negado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Settings className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Dashboard Administrativo</h1>
              <p className="text-sm text-foreground/60">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter />
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('usuarios')}
            className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'usuarios'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            Usuários
          </button>
          <button
            onClick={() => setActiveTab('imoveis')}
            className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'imoveis'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            Imóveis
          </button>
          <button
            onClick={() => setActiveTab('projetos')}
            className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'projetos'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            Projetos
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'leads'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            Leads
          </button>
        </div>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            {/* Usuários */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Usuários</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Total</p>
                  <p className="text-2xl font-bold text-foreground">{stats.users.total}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Proprietários</p>
                  <p className="text-2xl font-bold text-foreground">{stats.users.proprietarios}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Empresários</p>
                  <p className="text-2xl font-bold text-foreground">{stats.users.empresarios}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Parceiros</p>
                  <p className="text-2xl font-bold text-foreground">{stats.users.parceiros}</p>
                </div>
              </div>
            </div>

            {/* Imóveis */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Imóveis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Total de Imóveis</p>
                  <p className="text-2xl font-bold text-foreground">{stats.properties.total}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Valor Total</p>
                  <p className="text-2xl font-bold text-foreground">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                    }).format(stats.properties.totalValue)}
                  </p>
                </div>
              </div>
            </div>

            {/* Projetos */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Projetos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Total de Projetos</p>
                  <p className="text-2xl font-bold text-foreground">{stats.projects.total}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Valor Necessário</p>
                  <p className="text-2xl font-bold text-foreground">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                    }).format(stats.projects.requiredValue)}
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Valor Captado</p>
                  <p className="text-2xl font-bold text-foreground">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                    }).format(stats.projects.capturedValue)}
                  </p>
                </div>
              </div>
            </div>

            {/* Leads */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Leads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Total de Leads</p>
                  <p className="text-2xl font-bold text-foreground">{stats.leads.total}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <p className="text-foreground/60 text-sm mb-1">Convertidos</p>
                  <p className="text-2xl font-bold text-foreground">{stats.leads.converted}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usuários */}
        {activeTab === 'usuarios' && (
          <div className="border border-border rounded-lg bg-background/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Gerenciamento de Usuários</h2>
            </div>

            {users.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Users className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60">Nenhum usuário encontrado</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nome</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tipo</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Data de Cadastro</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-border hover:bg-background/80 transition">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{u.firstName} {u.lastName}</td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{u.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-accent/20 text-accent">
                            {u.userType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/60">
                          {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-border rounded transition">
                              <Eye className="w-4 h-4 text-foreground/60" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1 hover:bg-red-500/20 rounded transition"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Placeholders para outras abas */}
        {(activeTab === 'imoveis' || activeTab === 'projetos' || activeTab === 'leads') && (
          <div className="border border-border rounded-lg p-12 bg-background/50 text-center">
            <p className="text-foreground/60">Funcionalidade em desenvolvimento</p>
          </div>
        )}
      </main>
    </div>
  );
}
