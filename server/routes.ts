import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail, sendAutoReply } from "./emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Enviar email para o instituto
      const emailSent = await sendContactEmail(validatedData);
      
      // Enviar auto-resposta para o usuário
      const autoReplySent = await sendAutoReply(
        validatedData.email, 
        validatedData.nome, 
        validatedData.assunto
      );
      
      console.log("Novo contato recebido:", {
        contact: contact.id,
        emailSent,
        autoReplySent
      });
      
      res.json({ 
        success: true, 
        message: "Mensagem enviada com sucesso! Você receberá uma confirmação por email e nossa equipe entrará em contato em breve." 
      });
    } catch (error) {
      console.error("Erro no formulário de contato:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor. Tente novamente mais tarde ou entre em contato pelo email institutostellas@gmail.com" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar contatos" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
