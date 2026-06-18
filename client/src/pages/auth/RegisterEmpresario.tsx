import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, Lock, Mail, Phone, User, Briefcase, FileText, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { api } from '@/lib/api';
/**
 * COBQUATTU - Inscrição de Empresários
 * Design: Formulário para empresários com projetos
 * - Campos: Email, Telefone, Senha + Nome do Projeto, Características, Valor Necessário
 */

export default function RegisterEmpresario() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    nomeProjeto: '',
    caracteristicas: '',
    valorNecessario: '',
    senha: '',
    confirmaSenha: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.telefone || !formData.nomeProjeto || !formData.caracteristicas || !formData.valorNecessario || !formData.senha) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.senha !== formData.confirmaSenha) {
      toast.error('As senhas não correspondem.');
      return;
    }

    if (formData.senha.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        password: formData.senha,
        firstName: formData.nome,
        phone: formData.telefone,
        userType: 'empresario',
        nomeProjeto: formData.nomeProjeto,
        caracteristicas: formData.caracteristicas,
        valorNecessario: parseInt(formData.valorNecessario),
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Inscrição realizada! Bem-vindo ao ecossistema Cobquattu.');
        navigate('/dashboard/empresario');
      } else {
        toast.error(response.data.message || 'Erro ao realizar cadastro.');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.';
      toast.error(errorMessage);
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <a href="/auth/login" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Login
          </a>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-accent">
              <img
                src="/assets/logo-cobquattu.png"
                alt="COBQUATTU"
                className="w-full h-full object-cover scale-150"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Inscrição de Empresários</h1>
              <p className="text-accent text-sm uppercase tracking-widest font-medium">Estruture Seu Projeto</p>
            </div>
          </div>
          <p className="text-foreground/70 max-w-lg">
            Registre seu projeto e conecte-se com recursos e parceiros especializados para sua expansão territorial.
          </p>
        </div>

        {/* Registration Form */}
        <div className="border border-border rounded-lg p-8 bg-background/50 backdrop-blur-sm">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome Completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                <Input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className="bg-background border-border text-foreground pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="bg-background border-border text-foreground pl-10"
                />
              </div>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Telefone/WhatsApp *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                <Input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(85) 99768-8325"
                  className="bg-background border-border text-foreground pl-10"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Informações do Projeto</h3>
            </div>

            {/* Nome do Projeto */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome do Projeto *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                <Input
                  type="text"
                  name="nomeProjeto"
                  value={formData.nomeProjeto}
                  onChange={handleInputChange}
                  placeholder="Ex: Resort Turístico Litoral Leste"
                  className="bg-background border-border text-foreground pl-10"
                />
              </div>
            </div>

            {/* Características e Resumo */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Características e Resumo do Projeto *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                <Textarea
                  name="caracteristicas"
                  value={formData.caracteristicas}
                  onChange={handleInputChange}
                  placeholder="Descreva brevemente seu projeto: localização, tipo de empreendimento, público-alvo, diferencial..."
                  className="bg-background border-border text-foreground pl-10 min-h-32"
                />
              </div>
            </div>

            {/* Valor Necessário */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Valor Necessário para Conclusão *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                <Input
                  type="number"
                  name="valorNecessario"
                  value={formData.valorNecessario}
                  onChange={handleInputChange}
                  placeholder="R$ 0,00"
                  className="bg-background border-border text-foreground pl-10"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Segurança da Conta</h3>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Senha *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                <Input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Mínimo 8 caracteres"
                  className="bg-background border-border text-foreground pl-10"
                />
              </div>
            </div>

            {/* Confirmação de Senha */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirmar Senha *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                <Input
                  type="password"
                  name="confirmaSenha"
                  value={formData.confirmaSenha}
                  onChange={handleInputChange}
                  placeholder="Confirme sua senha"
                  className="bg-background border-border text-foreground pl-10"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label htmlFor="terms" className="text-sm text-foreground/70">
                Concordo com os <a href="#" className="text-accent hover:text-accent/80">Termos de Serviço</a> e a <a href="#" className="text-accent hover:text-accent/80">Política de Privacidade</a> da Cobquattu.
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-foreground hover:bg-accent/90 font-bold py-3 group"
            >
              {isLoading ? 'Criando Conta...' : 'Criar Conta de Empresário'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-foreground/60">
                Já tem uma conta?{' '}
                <a href="/auth/login" className="text-accent hover:text-accent/80 font-medium">
                  Fazer login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
