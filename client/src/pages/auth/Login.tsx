import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, Mail, Phone, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { api } from '@/lib/api';

/**
 * COBQUATTU - Página de Login
 * Design: Acesso unificado para o ecossistema
 * - Identidade visual premium
 * - Fluxo de autenticação com API real
 * - Integração com logotipo oficial
 */

export default function Login() {
  const [, navigate] = useLocation();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.emailOrPhone || !formData.password) {
      toast.error('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
      });

      if (response.data.success) {
        // Armazena token no localStorage (será migrado para sessão segura)
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success(response.data.message || 'Bem-vindo ao ecossistema Cobquattu!');
        
        // Redireciona para dashboard apropriado baseado no tipo de usuário
        const userType = response.data.user.userType;
        if (userType === 'parceiro') {
          navigate('/dashboard/parceiro');
        } else if (userType === 'proprietario') {
          navigate('/dashboard/proprietario');
        } else if (userType === 'empresario') {
          navigate('/dashboard/empresario');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(response.data.message || 'Erro ao fazer login');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      toast.error(errorMessage);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-accent">
              <img
                src="/assets/logo-cobquattu.png"
                alt="COBQUATTU"
                className="w-full h-full object-cover scale-150"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">COBQUATTU</h1>
          <p className="text-accent text-sm uppercase tracking-widest font-medium">Inteligência Territorial</p>
        </div>

        {/* Login Card */}
        <div className="border border-border rounded-lg p-8 bg-background/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground mb-2">Acessar Ecossistema</h2>
          <p className="text-foreground/60 text-sm mb-8">
            Conecte-se como Parceiro ou Cliente para explorar oportunidades.
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Login Method Selector */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                  loginMethod === 'email'
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-foreground/60 hover:border-accent/50'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                  loginMethod === 'phone'
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-foreground/60 hover:border-accent/50'
                }`}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Telefone
              </button>
            </div>

            {/* Email/Phone Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {loginMethod === 'email' ? 'Email' : 'Telefone'}
              </label>
              <Input
                type={loginMethod === 'email' ? 'email' : 'tel'}
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                placeholder={loginMethod === 'email' ? 'seu@email.com' : '(85) 99768-8325'}
                className="bg-background border-border text-foreground"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Senha</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Sua senha segura"
                className="bg-background border-border text-foreground"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-accent hover:text-accent/80 text-sm font-medium transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-foreground hover:bg-accent/90 font-bold py-3 group"
            >
              {isLoading ? 'Autenticando...' : 'Acessar'}
              <LogIn className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-foreground/40 text-xs">OU</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Register Options */}
          <div className="space-y-3">
            <p className="text-sm text-foreground/60 text-center mb-4">Novo no ecossistema?</p>
            <a href="/auth/register/parceiro">
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                Inscrever como Parceiro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="/auth/register/proprietario">
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                Inscrever como Proprietário
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="/auth/register/empresario">
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                Inscrever como Empresário
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-foreground/40">
          <p>
            Dúvidas? Entre em contato:{' '}
            <a href="mailto:constantino@cobquattu.com.br" className="text-accent hover:text-accent/80">
              constantino@cobquattu.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
