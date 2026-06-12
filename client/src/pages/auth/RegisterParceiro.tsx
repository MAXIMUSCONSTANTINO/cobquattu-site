import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, Lock, Mail, Phone, User, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';

/**
 * COBQUATTU - Inscrição de Embaixadores (Parceiros)
 * Design: Formulário para especialistas que articulam oportunidades
 * - Conceito: Embaixador da Inteligência Territorial
 * - Função: Captar e cadastrar Proprietários e Empresários
 * - Campos: Nome, Email, Telefone, Profissão, Senha
 */

const profissoes = [
  'Corretor Imobiliário',
  'Advogado',
  'Contador',
  'Engenheiro',
  'Arquiteto',
  'Consultor de Negócios',
  'Gestor de Projetos',
  'Especialista em Turismo',
  'Desenvolvedor Imobiliário',
  'Gestor de Ativos',
  'Outro',
];

export default function RegisterParceiro() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    profissao: '',
    senha: '',
    confirmaSenha: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.telefone || !formData.profissao || !formData.senha) {
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
      const response = await axios.post('/api/auth/register', {
        email: formData.email,
        password: formData.senha,
        firstName: formData.nome,
        lastName: formData.sobrenome,
        phone: formData.telefone,
        profession: formData.profissao,
        userType: 'parceiro',
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Bem-vindo ao ecossistema como Embaixador!');
        navigate('/dashboard/parceiro');
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
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">Embaixador Cobquattu</h1>
                <Star className="w-6 h-6 text-accent fill-accent" />
              </div>
              <p className="text-accent text-sm uppercase tracking-widest font-medium">Articulador de Oportunidades Territoriais</p>
            </div>
          </div>
          <p className="text-foreground/70 max-w-lg">
            Junte-se à rede de embaixadores que conectam proprietários, empresários e especialistas. Capture oportunidades e estruture o desenvolvimento territorial do Nordeste.
          </p>
        </div>

        {/* Registration Form */}
        <div className="border border-border rounded-lg p-8 bg-background/50 backdrop-blur-sm">
          {/* Info Box */}
          <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-sm text-foreground/80">
              <strong>Como Embaixador:</strong> Você terá acesso a uma carteira de captação onde poderá registrar Proprietários e Empresários que você trouxer para o ecossistema. Cada oportunidade cadastrada fortalece sua rede e a inteligência territorial da Cobquattu.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                  <Input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    className="bg-background border-border text-foreground pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  Sobrenome (opcional)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-accent/50" />
                  <Input
                    type="text"
                    name="sobrenome"
                    value={formData.sobrenome}
                    onChange={handleInputChange}
                    placeholder="Seu sobrenome"
                    className="bg-background border-border text-foreground pl-10"
                  />
                </div>
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

            {/* Profissão */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Profissão/Especialidade *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-accent/50 pointer-events-none" />
                <select
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-border rounded-md px-10 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Selecione sua profissão</option>
                  {profissoes.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof}
                    </option>
                  ))}
                </select>
              </div>
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
              {isLoading ? 'Criando Conta...' : 'Tornar-se Embaixador'}
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
