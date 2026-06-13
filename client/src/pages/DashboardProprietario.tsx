import { useState, useEffect } from 'react';
import { LogOut, Home, MapPin, DollarSign, Settings, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import axios from 'axios';
import PropertyForm from '@/components/PropertyForm';
import NotificationCenter from '@/components/NotificationCenter';

/**
 * COBQUATTU - Dashboard do Proprietário
 * Design: Gestão de Imóveis e Oportunidades
 * - Visão: Imóveis cadastrados e em negociação
 * - Ações: Adicionar/editar imóveis
 * - Métricas: Valor total, imóveis ativos
 */

interface Property {
  id: string;
  title: string;
  matricula: string;
  city: string;
  state: string;
  area?: number;
  value?: number;
  description?: string;
  status: 'disponivel' | 'negociacao' | 'comercializado';
  createdAt: string;
  updatedAt: string;
}

export default function DashboardProprietario() {
  const [, navigate] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
        loadProperties();
      } else {
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setUser(JSON.parse(userStr));
        loadProperties();
      } else {
        navigate('/auth/login');
      }
    }
  };

  const loadProperties = async () => {
    try {
      const response = await axios.get('/api/properties');
      if (response.data.success) {
        setProperties(response.data.properties);
      }
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
      toast.error('Erro ao carregar imóveis');
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

  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este imóvel?')) return;

    setDeleting(id);
    try {
      await axios.delete(`/api/properties/${id}`);
      setProperties(properties.filter(p => p.id !== id));
      toast.success('Imóvel deletado com sucesso');
    } catch (error: any) {
      console.error('Erro ao deletar imóvel:', error);
      toast.error(error.response?.data?.message || 'Erro ao deletar imóvel');
    } finally {
      setDeleting(null);
    }
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleFormSuccess = () => {
    loadProperties();
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

  const propertiesAvailable = properties.filter(p => p.status === 'disponivel').length;
  const propertiesNegotiating = properties.filter(p => p.status === 'negociacao').length;
  const totalValue = properties.reduce((acc, p) => acc + (p.value || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Home className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Dashboard Proprietário</h1>
              <p className="text-sm text-foreground/60">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter />
            <button
              onClick={() => navigate('/settings/proprietario')}
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
                <p className="text-foreground/60 text-sm mb-1">Total de Imóveis</p>
                <p className="text-3xl font-bold text-foreground">{properties.length}</p>
              </div>
              <Home className="w-12 h-12 text-accent/20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Disponíveis</p>
                <p className="text-3xl font-bold text-foreground">{propertiesAvailable}</p>
              </div>
              <MapPin className="w-12 h-12 text-accent/20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Valor Total</p>
                <p className="text-3xl font-bold text-foreground">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                  }).format(totalValue)}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-accent/20" />
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="border border-border rounded-lg bg-background/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground">Meus Imóveis</h2>
            <Button
              onClick={() => {
                setEditingProperty(null);
                setShowForm(true);
              }}
              size="sm"
              className="bg-accent hover:bg-accent/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Imóvel
            </Button>
          </div>

          {properties.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Home className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/60">Nenhum imóvel cadastrado ainda</p>
              <p className="text-sm text-foreground/40 mt-2">Comece adicionando seus imóveis</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Título</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Matrícula</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Cidade</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Valor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id} className="border-b border-border hover:bg-background/80 transition">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{property.title}</td>
                      <td className="px-6 py-4 text-sm text-foreground/60">{property.matricula}</td>
                      <td className="px-6 py-4 text-sm text-foreground/60">{property.city}/{property.state}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 0,
                        }).format(property.value || 0)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.status === 'disponivel'
                            ? 'bg-green-500/20 text-green-400'
                            : property.status === 'negociacao'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {property.status === 'disponivel' ? 'Disponível' : property.status === 'negociacao' ? 'Negociando' : 'Comercializado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProperty(property)}
                            className="p-1 hover:bg-border rounded transition"
                          >
                            <Edit2 className="w-4 h-4 text-foreground/60" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            disabled={deleting === property.id}
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

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
          property={editingProperty}
        />
      )}
    </div>
  );
}
