import { useState, useEffect } from 'react';
import { LogOut, Users, Plus, Settings, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import axios from 'axios';
import LeadForm from '@/components/LeadForm';
import NotificationCenter from '@/components/NotificationCenter';

/**
 * COBQUATTU - Dashboard do Parceiro
 * Design: Gestão de Carteira e Oportunidades
 * - Visão: Proprietários e Empresários captados
 * - Ações: Cadastrar novos clientes
 * - Métricas: Acompanhamento de oportunidades
 */

interface Lead {
  id: string;
  name: string;
  type: 'proprietario' | 'empresario';
  phone?: string;
  email?: string;
  city?: string;
  observations?: string;
  status: 'novo' | 'andamento' | 'convertido' | 'arquivado';
  createdAt: string;
  updatedAt: string;
}

export default function DashboardParceiro() {
  const [, navigate] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
        loadLeads();
      } else {
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setUser(JSON.parse(userStr));
        loadLeads();
      } else {
        navigate('/auth/login');
      }
    }
  };

  const loadLeads = async () => {
    try {
      const response = await axios.get('/api/leads');
      if (response.data.success) {
        setLeads(response.data.leads);
      }
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      toast.error('Erro ao carregar leads');
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

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este cliente?')) return;

    setDeleting(id);
    try {
      await axios.delete(`/api/leads/${id}`);
      setLeads(leads.filter(l => l.id !== id));
      toast.success('Cliente deletado com sucesso');
    } catch (error: any) {
      console.error('Erro ao deletar cliente:', error);
      toast.error(error.response?.data?.message || 'Erro ao deletar cliente');
    } finally {
      setDeleting(null);
    }
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingLead(null);
  };

  const handleFormSuccess = () => {
    loadLeads();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground/60">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  const proprietarios = leads.filter(l => l.type === 'proprietario').length;
  const empresarios = leads.filter(l => l.type === 'empresario').length;
  const convertidos = leads.filter(l => l.status === 'convertido').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Dashboard Parceiro</h1>
              <p className="text-sm text-foreground/60">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter />
            <button
              onClick={() => navigate('/settings/parceiro')}
              className="p-2 hover:bg-border rounded-lg transition"
            >
              <Settings className="w-5 h-5 text-foreground/60" />
            </button>
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
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border border-border rounded-lg p-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Total de Clientes</p>
                <p className="text-3xl font-bold text-foreground">{leads.length}</p>
              </div>
              <Users className="w-12 h-12 text-accent/20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Proprietários</p>
                <p className="text-3xl font-bold text-foreground">{proprietarios}</p>
              </div>
              <Users className="w-12 h-12 text-accent/20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Empresários</p>
                <p className="text-3xl font-bold text-foreground">{empresarios}</p>
              </div>
              <Users className="w-12 h-12 text-accent/20" />
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="border border-border rounded-lg bg-background/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground">Clientes Captados</h2>
            <Button
              onClick={() => {
                setEditingLead(null);
                setShowForm(true);
              }}
              size="sm"
              className="bg-accent hover:bg-accent/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </div>

          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Users className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/60">Nenhum cliente cadastrado ainda</p>
              <p className="text-sm text-foreground/40 mt-2">Comece adicionando seus clientes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tipo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Cidade</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Telefone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Data</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border hover:bg-background/80 transition">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground/60">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          lead.type === 'proprietario'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {lead.type === 'proprietario' ? 'Proprietário' : 'Empresário'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">{lead.city || '-'}</td>
                      <td className="px-6 py-4 text-sm text-foreground/60">{lead.phone || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lead.status === 'novo'
                            ? 'bg-blue-500/20 text-blue-400'
                            : lead.status === 'andamento'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : lead.status === 'convertido'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {lead.status === 'novo' ? 'Novo' : lead.status === 'andamento' ? 'Em Andamento' : lead.status === 'convertido' ? 'Convertido' : 'Arquivado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">
                        {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditLead(lead)}
                            className="p-1 hover:bg-border rounded transition"
                          >
                            <Edit2 className="w-4 h-4 text-foreground/60" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            disabled={deleting === lead.id}
                            className="p-1 hover:bg-red-500/20 rounded transition disabled:opacity-50"
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
      </main>

      {/* Lead Form Modal */}
      {showForm && (
        <LeadForm
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
          lead={editingLead}
        />
      )}
    </div>
  );
}
