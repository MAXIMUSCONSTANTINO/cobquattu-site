import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { X } from 'lucide-react';

interface LeadFormProps {
  onClose: () => void;
  onSuccess: () => void;
  lead?: any;
}

export default function LeadForm({ onClose, onSuccess, lead }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: lead?.name || '',
    type: lead?.type || 'proprietario',
    phone: lead?.phone || '',
    email: lead?.email || '',
    city: lead?.city || '',
    observations: lead?.observations || '',
    status: lead?.status || 'novo',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (lead?.id) {
        // Atualizar
        await api.put(`/leads/${lead.id}`, formData);
        toast.success('Lead atualizado com sucesso');
      } else {
        // Criar
        await api.post('/leads', formData);
        toast.success('Lead criado com sucesso');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar lead:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {lead?.id ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-border rounded transition"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Nome *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: João Silva"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Tipo *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="proprietario">Proprietário</option>
                <option value="empresario">Empresário</option>
              </select>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: (81) 99999-9999"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: joao@email.com"
              />
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Cidade
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Recife"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="novo">Novo</option>
                <option value="andamento">Em Andamento</option>
                <option value="convertido">Convertido</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Observações
            </label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Adicione observações sobre o cliente..."
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? 'Salvando...' : lead?.id ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
