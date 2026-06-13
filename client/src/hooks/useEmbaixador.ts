import { useState, useEffect } from 'react';

export interface Cliente {
  id: string;
  tipo: 'proprietario' | 'empresario';
  nome: string;
  email: string;
  telefone: string;
  dataRegistro: string;
  status: 'ativo' | 'pendente' | 'concluido';
  detalhes: {
    matricula?: string;
    valorImovel?: string;
    nomeProjeto?: string;
    valorProjeto?: string;
  };
}

export interface Embaixador {
  nome: string;
  email: string;
  telefone: string;
  profissao: string;
  tipo: 'embaixador';
}

/**
 * Hook para gerenciar dados persistentes do Embaixador
 * - Carrega/salva dados no localStorage
 * - Gerencia carteira de clientes
 * - Fornece métodos para CRUD de clientes
 */
export function useEmbaixador() {
  const [embaixador, setEmbaixador] = useState<Embaixador | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados ao montar
  useEffect(() => {
    const embaixadorData = localStorage.getItem('embaixador');
    const clientesData = localStorage.getItem('clientesCaptados');

    if (embaixadorData) {
      setEmbaixador(JSON.parse(embaixadorData));
    }

    if (clientesData) {
      setClientes(JSON.parse(clientesData));
    }

    setIsLoading(false);
  }, []);

  // Salvar embaixador
  const saveEmbaixador = (data: Embaixador) => {
    localStorage.setItem('embaixador', JSON.stringify(data));
    setEmbaixador(data);
  };

  // Adicionar cliente
  const addCliente = (cliente: Omit<Cliente, 'id' | 'dataRegistro'>) => {
    const novoCliente: Cliente = {
      ...cliente,
      id: Date.now().toString(),
      dataRegistro: new Date().toLocaleDateString('pt-BR'),
    };

    const clientesAtualizados = [...clientes, novoCliente];
    localStorage.setItem('clientesCaptados', JSON.stringify(clientesAtualizados));
    setClientes(clientesAtualizados);

    return novoCliente;
  };

  // Remover cliente
  const removeCliente = (id: string) => {
    const clientesAtualizados = clientes.filter(c => c.id !== id);
    localStorage.setItem('clientesCaptados', JSON.stringify(clientesAtualizados));
    setClientes(clientesAtualizados);
  };

  // Atualizar cliente
  const updateCliente = (id: string, updates: Partial<Cliente>) => {
    const clientesAtualizados = clientes.map(c =>
      c.id === id ? { ...c, ...updates } : c
    );
    localStorage.setItem('clientesCaptados', JSON.stringify(clientesAtualizados));
    setClientes(clientesAtualizados);
  };

  // Obter estatísticas
  const getStats = () => {
    return {
      totalClientes: clientes.length,
      proprietarios: clientes.filter(c => c.tipo === 'proprietario').length,
      empresarios: clientes.filter(c => c.tipo === 'empresario').length,
      ativos: clientes.filter(c => c.status === 'ativo').length,
    };
  };

  // Limpar dados
  const clearData = () => {
    localStorage.removeItem('embaixador');
    localStorage.removeItem('clientesCaptados');
    setEmbaixador(null);
    setClientes([]);
  };

  return {
    embaixador,
    clientes,
    isLoading,
    saveEmbaixador,
    addCliente,
    removeCliente,
    updateCliente,
    getStats,
    clearData,
  };
}
