/**
 * Tipos compartilhados entre cliente e servidor
 */

export type UserType = "parceiro" | "proprietario" | "empresario" | "admin";

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName?: string;
  profession?: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export interface LoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName?: string;
  profession?: string;
  userType: UserType;
  // Campos específicos por tipo
  matricula?: string; // proprietario
  valorSugerido?: number; // proprietario
  nomeProjeto?: string; // empresario
  caracteristicas?: string; // empresario
  valorNecessario?: number; // empresario
}

export interface ProprietarioData {
  userId: string;
  matricula: string;
  valorSugerido?: number;
  descricaoImovel?: string;
}

export interface EmpresarioData {
  userId: string;
  nomeProjeto: string;
  caracteristicas?: string;
  valorNecessario?: number;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface Property {
  id: string;
  userId: string;
  title: string;
  matricula: string;
  city: string;
  state: string;
  area?: number;
  value?: number;
  description?: string;
  status: "disponivel" | "negociacao" | "comercializado";
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  segment?: string;
  requiredValue?: number;
  capturedValue: number;
  deadline?: string;
  description?: string;
  status: "planejamento" | "captacao" | "execucao" | "concluido";
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  userId: string;
  name: string;
  type: "proprietario" | "empresario";
  phone?: string;
  email?: string;
  city?: string;
  observations?: string;
  status: "novo" | "andamento" | "convertido" | "arquivado";
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profession?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
