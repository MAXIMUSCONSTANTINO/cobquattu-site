import { mysqlTable, varchar, text, timestamp, mysqlEnum, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

/**
 * Tabela de Usuários - Armazena informações de todos os tipos de usuários
 * Tipos: parceiro, proprietario, empresario
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }),
  profession: varchar("profession", { length: 100 }),
  userType: mysqlEnum("user_type", ["parceiro", "proprietario", "empresario"]).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Tabela de Proprietários - Informações específicas de proprietários de imóveis
 */
export const proprietarios = mysqlTable("proprietarios", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }).notNull(),
  matricula: varchar("matricula", { length: 50 }).notNull().unique(),
  valorSugerido: int("valor_sugerido"),
  descricaoImovel: text("descricao_imovel"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Tabela de Empresários - Informações específicas de empresários/projetos
 */
export const empresarios = mysqlTable("empresarios", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }).notNull(),
  nomeProjeto: varchar("nome_projeto", { length: 255 }).notNull(),
  caracteristicas: text("caracteristicas"),
  valorNecessario: int("valor_necessario"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Tabela de Parceiros - Informações específicas de parceiros/articuladores
 */
export const parceiros = mysqlTable("parceiros", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }).notNull(),
  carteiraProjetos: int("carteira_projetos").default(0),
  clientesCaptados: int("clientes_captados").default(0),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Tabela de Sessões - Armazena sessões de usuários autenticados
 */
export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }).notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Tabela de Imóveis - Armazena imóveis cadastrados pelos proprietários
 */
export const properties = mysqlTable("properties", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  matricula: varchar("matricula", { length: 50 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  area: int("area"),
  value: int("value"),
  description: text("description"),
  status: mysqlEnum("status", ["disponivel", "negociacao", "comercializado"]).default("disponivel"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Tabela de Projetos - Armazena projetos cadastrados pelos empresários
 */
export const projects = mysqlTable("projects", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  segment: varchar("segment", { length: 100 }),
  requiredValue: int("required_value"),
  capturedValue: int("captured_value").default(0),
  deadline: varchar("deadline", { length: 100 }),
  description: text("description"),
  status: mysqlEnum("status", ["planejamento", "captacao", "execucao", "concluido"]).default("planejamento"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Tabela de Leads - Armazena clientes/leads cadastrados pelos parceiros
 */
export const leads = mysqlTable("leads", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["proprietario", "empresario"]).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  city: varchar("city", { length: 100 }),
  observations: text("observations"),
  status: mysqlEnum("status", ["novo", "andamento", "convertido", "arquivado"]).default("novo"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Tabela de Notificações - Estrutura para notificações da plataforma
 */
export const notifications = mysqlTable("notifications", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  type: varchar("type", { length: 50 }),
  read: int("read").default(0),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Tabela de Logs de Plataforma - Rastreamento de atividades
 */
export const platformLogs = mysqlTable("platform_logs", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 36 }),
  action: varchar("action", { length: 100 }).notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
