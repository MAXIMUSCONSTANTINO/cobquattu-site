import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { X } from 'lucide-react';

interface PropertyFormProps {
  onClose: () => void;
  onSuccess: () => void;
  property?: any;
}

export default function PropertyForm({ onClose, onSuccess, property }: PropertyFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: property?.title || '',
    matricula: property?.matricula || '',
    city: property?.city || '',
    state: property?.state || '',
    area: property?.area || '',
    value: property?.value || '',
    description: property?.description || '',
    status: property?.status || 'disponivel',
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
      if (property?.id) {
        // Atualizar
        await axios.put(`/api/properties/${property.id}`, formData);
        toast.success('Imóvel atualizado com sucesso');
      } else {
        // Criar
        await axios.post('/api/properties', formData);
        toast.success('Imóvel criado com sucesso');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar imóvel:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar imóvel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {property?.id ? 'Editar Imóvel' : 'Novo Imóvel'}
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
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Apartamento no Centro"
              />
            </div>

            {/* Matrícula */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Matrícula *
              </label>
              <input
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: 12345-67"
              />
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Cidade *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Recife"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Estado *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                maxLength={2}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent uppercase"
                placeholder="Ex: PE"
              />
            </div>

            {/* Área */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Área (m²)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: 150"
              />
            </div>

            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Valor (R$)
              </label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: 500000"
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
                <option value="disponivel">Disponível</option>
                <option value="negociacao">Em Negociação</option>
                <option value="comercializado">Comercializado</option>
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Descreva o imóvel..."
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
              {loading ? 'Salvando...' : property?.id ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
