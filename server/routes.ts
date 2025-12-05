import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertBookingSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactMessageSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid form data",
          details: parsed.error.flatten()
        });
      }

      const message = await storage.createContactMessage(parsed.data);
      
      res.status(201).json({ 
        success: true, 
        message: "Message received successfully",
        id: message.id 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Failed to get messages:", error);
      res.status(500).json({ error: "Failed to retrieve messages" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const parsed = insertBookingSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid booking data",
          details: parsed.error.flatten()
        });
      }

      const booking = await storage.createBooking(parsed.data);
      
      res.status(201).json({ 
        success: true, 
        message: "Consultation booked successfully",
        id: booking.id 
      });
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({ error: "Failed to book consultation" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Failed to get bookings:", error);
      res.status(500).json({ error: "Failed to retrieve bookings" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const parsed = insertChatMessageSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid message",
          details: parsed.error.flatten()
        });
      }

      const message = await storage.createChatMessage(parsed.data);
      
      res.status(201).json({ 
        success: true, 
        message: message
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/chat/:visitorId", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.visitorId);
      res.json(messages);
    } catch (error) {
      console.error("Failed to get chat messages:", error);
      res.status(500).json({ error: "Failed to retrieve messages" });
    }
  });

  return httpServer;
}
