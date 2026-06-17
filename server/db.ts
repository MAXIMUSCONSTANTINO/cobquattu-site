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

  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("❌ Missing DATABASE_URL");
  }

  const connection = await mysql.createConnection(url);

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

// ============================================================================
// USERS
// ============================================================================

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

export async function getUserByEmail(email: string) {
  const database = getDatabase();

  return database.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
}

export async function getUserByPhone(phone: string) {
  const database = getDatabase();

  return database.query.users.findFirst({
    where: (users, { eq }) => eq(users.phone, phone),
  });
}

export async function getUserByEmailOrPhone(identifier: string) {
  const database = getDatabase();

  return database.query.users.findFirst({
    where: (users, { eq, or }) =>
      or(eq(users.email, identifier), eq(users.phone, identifier)),
  });
}

export async function getUserById(id: string) {
  const database = getDatabase();

  return database.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
}

// ============================================================================
// PROPRIETARIO / EMPRESARIO / PARCEIRO
// ============================================================================

export async function createProprietario(data: {
  userId: string;
  matricula: string;
  valorSugerido?: number;
  descricaoImovel?: string;
}) {
  const database = getDatabase();
  return database.insert(schema.proprietarios).values(data);
}

export async function createEmpresario(data: {
  userId: string;
  nomeProjeto: string;
  caracteristicas?: string;
  valorNecessario?: number;
}) {
  const database = getDatabase();
  return database.insert(schema.empresarios).values(data);
}

export async function createParceiro(data: { userId: string }) {
  const database = getDatabase();
  return database.insert(schema.parceiros).values(data);
}

// ============================================================================
// SESSIONS
// ============================================================================

export async function createSession(data: {
  userId: string;
  token: string;
  expiresAt: Date;
}) {
  const database = getDatabase();
  return database.insert(schema.sessions).values(data);
}

export async function getSessionByToken(token: string) {
  const database = getDatabase();

  return database.query.sessions.findFirst({
    where: (sessions, { eq }) => eq(sessions.token, token),
  });
}

export async function deleteSession(id: string) {
  const database = getDatabase();

  return database
    .delete(schema.sessions)
    .where(eq(schema.sessions.id, id));
}

// ============================================================================
// PROPERTIES
// ============================================================================

export async function createProperty(data: any) {
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
  return database
    .update(schema.properties)
    .set(data)
    .where(eq(schema.properties.id, id));
}

export async function deleteProperty(id: string) {
  const database = getDatabase();
  return database
    .delete(schema.properties)
    .where(eq(schema.properties.id, id));
}

export async function getAllProperties() {
  const database = getDatabase();
  return database.query.properties.findMany();
}

// ============================================================================
// PROJECTS
// ============================================================================

export async function createProject(data: any) {
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
  return database
    .update(schema.projects)
    .set(data)
    .where(eq(schema.projects.id, id));
}

export async function deleteProject(id: string) {
  const database = getDatabase();
  return database
    .delete(schema.projects)
    .where(eq(schema.projects.id, id));
}

export async function getAllProjects() {
  const database = getDatabase();
  return database.query.projects.findMany();
}

// ============================================================================
// LEADS
// ============================================================================

export async function createLead(data: any) {
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
  return database
    .update(schema.leads)
    .set(data)
    .where(eq(schema.leads.id, id));
}

export async function deleteLead(id: string) {
  const database = getDatabase();
  return database
    .delete(schema.leads)
    .where(eq(schema.leads.id, id));
}

export async function getAllLeads() {
  const database = getDatabase();
  return database.query.leads.findMany();
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export async function createNotification(data: any) {
  const database = getDatabase();
  return database.insert(schema.notifications).values(data);
}

export async function getNotificationsByUserId(userId: string) {
  const database = getDatabase();
  return database.query.notifications.findMany({
    where: (n, { eq }) => eq(n.userId, userId),
  });
}

export async function markNotificationAsRead(id: string) {
  const database = getDatabase();
  return database
    .update(schema.notifications)
    .set({ read: 1 })
    .where(eq(schema.notifications.id, id));
}

// ============================================================================
// PLATFORM LOGS
// ============================================================================

export async function createPlatformLog(data: any) {
  const database = getDatabase();
  return database.insert(schema.platformLogs).values(data);
}

// ============================================================================
// ADMIN
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

export async function deleteUser(userId: string) {
  const database = getDatabase();

  await database
    .delete(schema.sessions)
    .where(eq(schema.sessions.userId, userId));

  return database
    .delete(schema.users)
    .where(eq(schema.users.id, userId));
}

export async function updateUser(userId: string, data: any) {
  const database = getDatabase();
  return database
    .update(schema.users)
    .set(data)
    .where(eq(schema.users.id, userId));
}
