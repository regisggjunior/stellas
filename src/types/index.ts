import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Tabela de contatos
export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone"),
  assunto: text("assunto").notNull(),
  mensagem: text("mensagem").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schemas de validação
export const insertContactSchema = createInsertSchema(contacts, {
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  assunto: z.enum(["busco-ajuda", "quero-apoiar", "parcerias", "informacoes"]),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
}).omit({ id: true, createdAt: true });

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;