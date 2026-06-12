import { useState, useEffect } from 'react';
import { LogOut, Briefcase, TrendingUp, DollarSign, Settings, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import axios from 'axios';
import ProjectForm from '@/components/ProjectForm';
import NotificationCenter from '@/components/NotificationCenter';

/**
 * COBQUATTU - Dashboard do Empresário
 * Design: Gestão de Projetos e Captação
 * - Visão: Projetos em andamento e captação
 * - Ações: Criar/editar projetos
 * - Métricas: Valor necessário, valor captado
 */

interface Project {
  id: string;
  name: string;
  segment?: string;
  requiredValue?: number;
  capturedValue: number;
  deadline?: string;
  description?: string;
  status: 'planejamento' | 'captacao' | 'execucao' | 'concluido';
  createdAt: string;
  updatedAt: string;
}

export default function DashboardEmpresario() {
  const [, navigate] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
        loadProjects();
      } else {
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setUser(JSON.parse(userStr));
        loadProjects();
      } else {
        navigate('/auth/login');
      }
    }
  };

  const loadProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      toast.error('Erro ao carregar projetos');
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

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return;

    setDeleting(id);
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter(p => p.id !== id));
      toast.success('Projeto deletado com sucesso');
    } catch (error: any) {
      console.error('Erro ao deletar projeto:', error);
      toast.error(error.response?.data?.message || 'Erro ao deletar projeto');
    } finally {
      setDeleting(null);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    loadProjects();
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

  const activeProjects = projects.filter(p => p.status !== 'concluido').length;
  const totalRequired = projects.reduce((acc, p) => acc + (p.requiredValue || 0), 0);
  const totalCaptured = projects.reduce((acc, p) => acc + (p.capturedValue || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Dashboard Empresário</h1>
              <p className="text-sm text-foreground/60">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter />
            <button
              onClick={() => navigate('/settings/empresario')}
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
                <p className="text-foreground/60 text-sm mb-1">Projetos Ativos</p>
                <p className="text-3xl font-bold text-foreground">{activeProjects}</p>
              </div>
              <Briefcase className="w-12 h-12 text-accent/20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Valor Necessário</p>
                <p className="text-3xl font-bold text-foreground">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                  }).format(totalRequired)}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-accent/20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Valor Captado</p>
                <p className="text-3xl font-bold text-foreground">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                  }).format(totalCaptured)}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-accent/20" />
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="border border-border rounded-lg bg-background/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground">Meus Projetos</h2>
            <Button
              onClick={() => {
                setEditingProject(null);
                setShowForm(true);
              }}
              size="sm"
              className="bg-accent hover:bg-accent/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Briefcase className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/60">Nenhum projeto cadastrado ainda</p>
              <p className="text-sm text-foreground/40 mt-2">Comece adicionando seus projetos</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Segmento</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Valor Necessário</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Captado</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-border hover:bg-background/80 transition">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{project.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground/60">{project.segment || '-'}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 0,
                        }).format(project.requiredValue || 0)}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 0,
                        }).format(project.capturedValue || 0)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'planejamento'
                            ? 'bg-blue-500/20 text-blue-400'
                            : project.status === 'captacao'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : project.status === 'execucao'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {project.status === 'planejamento' ? 'Planejamento' : project.status === 'captacao' ? 'Captação' : project.status === 'execucao' ? 'Em Execução' : 'Concluído'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-1 hover:bg-border rounded transition"
                          >
                            <Edit2 className="w-4 h-4 text-foreground/60" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={deleting === project.id}
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

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
          project={editingProject}
        />
      )}
    </div>
  );
}
