import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, text, int, timestamp, unique, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const empresarios = mysqlTable("empresarios", {
	id: varchar("id", { length: 36 }).default(sql`uuid()`).notNull(),
	userId: varchar("user_id", { length: 36 }).notNull(),
	nomeProjeto: varchar("nome_projeto", { length: 255 }).notNull(),
	caracteristicas: text("caracteristicas"),
	valorNecessario: int("valor_necessario"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		empresariosId: primaryKey({ columns: [table.id], name: "empresarios_id"}),
	}
});

export const parceiros = mysqlTable("parceiros", {
	id: varchar("id", { length: 36 }).default(sql`uuid()`).notNull(),
	userId: varchar("user_id", { length: 36 }).notNull(),
	carteiraProjetos: int("carteira_projetos").default(0),
	clientesCaptados: int("clientes_captados").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		parceirosId: primaryKey({ columns: [table.id], name: "parceiros_id"}),
	}
});

export const proprietarios = mysqlTable("proprietarios", {
	id: varchar("id", { length: 36 }).default(sql`uuid()`).notNull(),
	userId: varchar("user_id", { length: 36 }).notNull(),
	matricula: varchar("matricula", { length: 50 }).notNull(),
	valorSugerido: int("valor_sugerido"),
	descricaoImovel: text("descricao_imovel"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		proprietariosId: primaryKey({ columns: [table.id], name: "proprietarios_id"}),
		proprietariosMatriculaUnique: unique("proprietarios_matricula_unique").on(table.matricula),
	}
});

export const sessions = mysqlTable("sessions", {
	id: varchar("id", { length: 36 }).default(sql`uuid()`).notNull(),
	userId: varchar("user_id", { length: 36 }).notNull(),
	token: text("token").notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		sessionsId: primaryKey({ columns: [table.id], name: "sessions_id"}),
	}
});

export const users = mysqlTable("users", {
	id: varchar("id", { length: 36 }).default(sql`uuid()`).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	phone: varchar("phone", { length: 20 }),
	password: varchar("password", { length: 255 }).notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }),
	profession: varchar("profession", { length: 100 }),
	userType: mysqlEnum("user_type", ['parceiro','proprietario','empresario']).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		usersId: primaryKey({ columns: [table.id], name: "users_id"}),
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});