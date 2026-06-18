import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { X } from 'lucide-react';

interface ProjectFormProps {
  onClose: () => void;
  onSuccess: () => void;
  project?: any;
}

export default function ProjectForm({ onClose, onSuccess, project }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: project?.name || '',
    segment: project?.segment || '',
    requiredValue: project?.requiredValue || '',
    capturedValue: project?.capturedValue || '',
    deadline: project?.deadline || '',
    description: project?.description || '',
    status: project?.status || 'planejamento',
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
      if (project?.id) {
        // Atualizar
        await axios.put(`/api/projects/${project.id}`, formData);
        toast.success('Projeto atualizado com sucesso');
      } else {
        // Criar
        await axios.post('/api/projects', formData);
        toast.success('Projeto criado com sucesso');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar projeto:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar projeto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {project?.id ? 'Editar Projeto' : 'Novo Projeto'}
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
                Nome do Projeto *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Expansão Recife"
              />
            </div>

            {/* Segmento */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Segmento
              </label>
              <input
                type="text"
                name="segment"
                value={formData.segment}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Comércio"
              />
            </div>

            {/* Valor Necessário */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Valor Necessário (R$)
              </label>
              <input
                type="number"
                name="requiredValue"
                value={formData.requiredValue}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: 1000000"
              />
            </div>

            {/* Valor Captado */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Valor Captado (R$)
              </label>
              <input
                type="number"
                name="capturedValue"
                value={formData.capturedValue}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: 500000"
              />
            </div>

            {/* Prazo */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Prazo
              </label>
              <input
                type="text"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: 12 meses"
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
                <option value="planejamento">Planejamento</option>
                <option value="captacao">Captação</option>
                <option value="execucao">Em Execução</option>
                <option value="concluido">Concluído</option>
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
              placeholder="Descreva o projeto..."
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
              {loading ? 'Salvando...' : project?.id ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
