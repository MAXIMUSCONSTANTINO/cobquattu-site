import dotenv from "dotenv";dotenv.config();
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq, or } from "drizzle-orm";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;

/**
 * Inicializa conexão com o banco
 */
export async function initializeDatabase() {
  if (db) return db;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "cobquattu_db",
  });

  db = drizzle(connection, { schema, mode: "default" });

  console.log("✅ Database connected successfully");

  return db;
}

/**
 * Obtém instância do banco
 */
export function getDatabase() {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return db;
}

/**
 * CREATE USER
 */
export async function createUser(data: {
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName?: string;
  profession?: string;
  userType: "parceiro" | "proprietario" | "empresario";
}) {
  const database = getDatabase();
  return database.insert(schema.users).values(data);
}

/**
 * GET USER BY EMAIL
 */
export async function getUserByEmail(email: string) {
  const database = getDatabase();

  return database.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
}

/**
 * GET USER BY PHONE
 */
export async function getUserByPhone(phone: string) {
  const database = getDatabase();

  return database.query.users.findFirst({
    where: (users, { eq }) => eq(users.phone, phone),
  });
}

/**
 * GET USER BY EMAIL OR PHONE
 */
export async function getUserByEmailOrPhone(identifier: string) {
  const database = getDatabase();

  return database.query.users.findFirst({
    where: (users, { eq, or }) => or(eq(users.email, identifier), eq(users.phone, identifier)),
  });
}

/**
 * GET USER BY ID
 */
export async function getUserById(id: string) {
  const database = getDatabase();

  return database.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
}

/**
 * PROPRIETARIO
 */
export async function createProprietario(data: {
  userId: string;
  matricula: string;
  valorSugerido?: number;
  descricaoImovel?: string;
}) {
  const database = getDatabase();
  return database.insert(schema.proprietarios).values(data);
}

/**
 * EMPRESARIO
 */
export async function createEmpresario(data: {
  userId: string;
  nomeProjeto: string;
  caracteristicas?: string;
  valorNecessario?: number;
}) {
  const database = getDatabase();
  return database.insert(schema.empresarios).values(data);
}

/**
 * PARCEIRO
 */
export async function createParceiro(data: {
  userId: string;
}) {
  const database = getDatabase();
  return database.insert(schema.parceiros).values(data);
}

/**
 * SESSION
 */
export async function createSession(data: {
  userId: string;
  token: string;
  expiresAt: Date;
}) {
  const database = getDatabase();
  return database.insert(schema.sessions).values(data);
}

/**
 * GET SESSION
 */
export async function getSessionByToken(token: string) {
  const database = getDatabase();

  return database.query.sessions.findFirst({
    where: (sessions, { eq }) => eq(sessions.token, token),
  });
}

/**
 * DELETE SESSION
 */
export async function deleteSession(id: string) {
  const database = getDatabase();

  return database.delete(schema.sessions).where(eq(schema.sessions.id, id));
}

// ============================================================================
// PROPERTIES (IMÓVEIS)
// ============================================================================

export async function createProperty(data: {
  userId: string;
  title: string;
  matricula: string;
  city: string;
  state: string;
  area?: number;
  value?: number;
  description?: string;
  status?: "disponivel" | "negociacao" | "comercializado";
}) {
  const database = getDatabase();
  return database.insert(schema.properties).values(data);
}

export async function getPropertiesByUserId(userId: string) {
  const database = getDatabase();
  return database.query.properties.findMany({
    where: (properties, { eq }) => eq(properties.userId, userId),
  });
}

export async function getPropertyById(id: string) {
  const database = getDatabase();
  return database.query.properties.findFirst({
    where: (properties, { eq }) => eq(properties.id, id),
  });
}

export async function updateProperty(id: string, data: any) {
  const database = getDatabase();
  return database.update(schema.properties).set(data).where(eq(schema.properties.id, id));
}

export async function deleteProperty(id: string) {
  const database = getDatabase();
  return database.delete(schema.properties).where(eq(schema.properties.id, id));
}

export async function getAllProperties() {
  const database = getDatabase();
  return database.query.properties.findMany();
}

// ============================================================================
// PROJECTS (PROJETOS)
// ============================================================================

export async function createProject(data: {
  userId: string;
  name: string;
  segment?: string;
  requiredValue?: number;
  capturedValue?: number;
  deadline?: string;
  description?: string;
  status?: "planejamento" | "captacao" | "execucao" | "concluido";
}) {
  const database = getDatabase();
  return database.insert(schema.projects).values(data);
}

export async function getProjectsByUserId(userId: string) {
  const database = getDatabase();
  return database.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.userId, userId),
  });
}

export async function getProjectById(id: string) {
  const database = getDatabase();
  return database.query.projects.findFirst({
    where: (projects, { eq }) => eq(projects.id, id),
  });
}

export async function updateProject(id: string, data: any) {
  const database = getDatabase();
  return database.update(schema.projects).set(data).where(eq(schema.projects.id, id));
}

export async function deleteProject(id: string) {
  const database = getDatabase();
  return database.delete(schema.projects).where(eq(schema.projects.id, id));
}

export async function getAllProjects() {
  const database = getDatabase();
  return database.query.projects.findMany();
}

// ============================================================================
// LEADS (CLIENTES)
// ============================================================================

export async function createLead(data: {
  userId: string;
  name: string;
  type: "proprietario" | "empresario";
  phone?: string;
  email?: string;
  city?: string;
  observations?: string;
  status?: "novo" | "andamento" | "convertido" | "arquivado";
}) {
  const database = getDatabase();
  return database.insert(schema.leads).values(data);
}

export async function getLeadsByUserId(userId: string) {
  const database = getDatabase();
  return database.query.leads.findMany({
    where: (leads, { eq }) => eq(leads.userId, userId),
  });
}

export async function getLeadById(id: string) {
  const database = getDatabase();
  return database.query.leads.findFirst({
    where: (leads, { eq }) => eq(leads.id, id),
  });
}

export async function updateLead(id: string, data: any) {
  const database = getDatabase();
  return database.update(schema.leads).set(data).where(eq(schema.leads.id, id));
}

export async function deleteLead(id: string) {
  const database = getDatabase();
  return database.delete(schema.leads).where(eq(schema.leads.id, id));
}

export async function getAllLeads() {
  const database = getDatabase();
  return database.query.leads.findMany();
}

// ============================================================================
// NOTIFICATIONS (NOTIFICAÇÕES)
// ============================================================================

export async function createNotification(data: {
  userId: string;
  title: string;
  message?: string;
  type?: string;
}) {
  const database = getDatabase();
  return database.insert(schema.notifications).values(data);
}

export async function getNotificationsByUserId(userId: string) {
  const database = getDatabase();
  return database.query.notifications.findMany({
    where: (notifications, { eq }) => eq(notifications.userId, userId),
  });
}

export async function markNotificationAsRead(id: string) {
  const database = getDatabase();
  return database.update(schema.notifications).set({ read: 1 }).where(eq(schema.notifications.id, id));
}

// ============================================================================
// PLATFORM LOGS
// ============================================================================

export async function createPlatformLog(data: {
  userId?: string;
  action: string;
  details?: string;
}) {
  const database = getDatabase();
  return database.insert(schema.platformLogs).values(data);
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

export async function getAllUsers() {
  const database = getDatabase();
  return database.query.users.findMany();
}

export async function getUsersByType(userType: string) {
  const database = getDatabase();
  return database.query.users.findMany({
    where: (users, { eq }) => eq(users.userType, userType),
  });
}

export async function blockUser(userId: string) {
  const database = getDatabase();
  // Implementar bloqueio de usuário (pode ser um campo adicional no schema)
  // Por enquanto, apenas registramos a ação
  return createPlatformLog({
    action: "user_blocked",
    details: `User ${userId} blocked`,
  });
}

export async function deleteUser(userId: string) {
  const database = getDatabase();
  // Deletar todas as sessões do usuário
  await database.delete(schema.sessions).where(eq(schema.sessions.userId, userId));
  // Deletar o usuário
  return database.delete(schema.users).where(eq(schema.users.id, userId));
}

export async function updateUser(userId: string, data: any) {
  const database = getDatabase();
  return database.update(schema.users).set(data).where(eq(schema.users.id, userId));
}
