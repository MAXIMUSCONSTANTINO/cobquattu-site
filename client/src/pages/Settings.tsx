import { useState, useEffect } from 'react';
import { LogOut, ArrowLeft, User, Lock, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { api } from '@/lib/api';

/**
 * COBQUATTU - Página de Configurações
 * Gerenciamento de perfil, senha e conta
 */

export default function Settings() {
  const [, navigate] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'perfil' | 'seguranca' | 'conta'>('perfil');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Perfil
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
  });

  // Senha
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await axios.get('/api/profile');
      if (response.data.success) {
        setUser(response.data.user);
        setProfileData({
          firstName: response.data.user.firstName || '',
          lastName: response.data.user.lastName || '',
          email: response.data.user.email || '',
          phone: response.data.user.phone || '',
          profession: response.data.user.profession || '',
        });
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      toast.error('Erro ao carregar perfil');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put('/api/profile', profileData);
      toast.success('Perfil atualizado com sucesso');
      loadUserData();
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error(error.response?.data?.message || 'Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('A nova senha deve ter no mínimo 8 caracteres');
      return;
    }

    setSaving(true);

    try {
      await axios.post('/api/profile/change-password', passwordData);
      toast.success('Senha alterada com sucesso');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      toast.error(error.response?.data?.message || 'Erro ao alterar senha');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const password = prompt('Digite sua senha para confirmar a exclusão da conta:');
    if (!password) return;

    setDeleting(true);

    try {
      await axios.delete('/api/profile', {
        data: { password },
      });
      toast.success('Conta deletada com sucesso');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error: any) {
      console.error('Erro ao deletar conta:', error);
      toast.error(error.response?.data?.message || 'Erro ao deletar conta');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground/60">Carregando configurações...</p>
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
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-border rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5 text-foreground/60" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Configurações</h1>
              <p className="text-sm text-foreground/60">{user?.email}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'perfil'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Dados Pessoais
          </button>
          <button
            onClick={() => setActiveTab('seguranca')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'seguranca'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Segurança
          </button>
          <button
            onClick={() => setActiveTab('conta')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'conta'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            <Trash2 className="w-4 h-4 inline mr-2" />
            Conta
          </button>
        </div>

        {/* Dados Pessoais */}
        {activeTab === 'perfil' && (
          <div className="border border-border rounded-lg p-6 bg-background/50">
            <h2 className="text-lg font-bold text-foreground mb-6">Dados Pessoais</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Profissão
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={profileData.profession}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90"
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Segurança */}
        {activeTab === 'seguranca' && (
          <div className="border border-border rounded-lg p-6 bg-background/50">
            <h2 className="text-lg font-bold text-foreground mb-6">Alterar Senha</h2>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Senha Atual
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Digite sua senha atual"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Confirme sua nova senha"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90"
                  disabled={saving}
                >
                  {saving ? 'Alterando...' : 'Alterar Senha'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Conta */}
        {activeTab === 'conta' && (
          <div className="border border-border rounded-lg p-6 bg-background/50">
            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-400 mb-1">Zona de Perigo</h3>
                <p className="text-sm text-foreground/60">
                  A exclusão de conta é permanente e não pode ser desfeita. Todos os seus dados serão deletados.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Deletar Conta</h3>
                <p className="text-sm text-foreground/60 mb-4">
                  Uma vez deletada, sua conta e todos os dados associados serão removidos permanentemente.
                </p>
                <Button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {deleting ? 'Deletando...' : 'Deletar Minha Conta'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
