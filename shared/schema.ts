import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone"),
  assunto: text("assunto").notNull(),
  mensagem: text("mensagem").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  nome: true,
  email: true,
  telefone: true,
  assunto: true,
  mensagem: true,
}).extend({
  email: z.string().email("Email inválido"),
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  assunto: z.enum(["busco-ajuda", "quero-apoiar", "parcerias", "informacoes"], {
    errorMap: () => ({ message: "Selecione um assunto válido" })
  }),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
