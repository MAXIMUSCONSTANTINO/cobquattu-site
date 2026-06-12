import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

/**
 * COBQUATTU Strategic Form
 * Design: Formulário de interesse que leva ao ecossistema
 * - Campos estratégicos
 * - Validação elegante
 * - Integração com fluxo de autenticação
 */

const interestOptions = [
  'Proprietário de Ativos',
  'Empresario em Expansão',
  'Parceiro Especializado',
  'Desenvolvimento Territorial',
  'Inteligência Territorial',
  'Conexão Estratégica',
];

export default function StrategicForm() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interests: [] as string[],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error('Por favor, preencha nome e telefone.');
      return;
    }

    if (formData.interests.length === 0) {
      toast.error('Por favor, selecione pelo menos um interesse.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envio de dados (em produção, seria uma chamada à API)
      // Armazenar interesse do usuário para pré-preenchimento no cadastro
      localStorage.setItem('userInterest', JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        interests: formData.interests,
        message: formData.message,
      }));

      toast.success('Interesse registrado! Redirecionando para o ecossistema...');
      
      // Redirecionar para login após 1 segundo
      setTimeout(() => {
        navigate('/auth/login');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      toast.error('Erro ao processar formulário. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 md:py-32 bg-foreground text-background">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Conectar ao Ecossistema</h2>
            <div className="w-16 h-1 bg-accent"></div>
            <p className="text-lg text-background/80">
              Registre seu interesse e acesse a plataforma de inteligência territorial da Cobquattu.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-background/10 p-8 rounded-lg border border-background/20">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-background mb-2">Nome Completo *</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Seu nome"
                className="bg-background text-foreground border-border"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-background mb-2">Telefone/WhatsApp *</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(85) 99768-8325"
                className="bg-background text-foreground border-border"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-background mb-2">Email (opcional)</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="bg-background text-foreground border-border"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-background mb-4">Qual é seu interesse? *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interestOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInterestToggle(option)}
                    className={`p-3 rounded-lg border-2 transition-all text-sm font-medium text-left ${
                      formData.interests.includes(option)
                        ? 'border-accent bg-accent/10 text-background'
                        : 'border-background/20 bg-background/5 text-background/70 hover:border-background/40'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-background mb-2">Mensagem (opcional)</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Conte-nos sobre sua oportunidade ou interesse estratégico..."
                className="bg-background text-foreground border-border min-h-32"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-foreground hover:bg-accent/90 font-bold py-3 group"
            >
              {isSubmitting ? 'Processando...' : 'Acessar Ecossistema'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-xs text-background/60 text-center">
              Você será redirecionado para fazer login ou criar sua conta no ecossistema Cobquattu.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
