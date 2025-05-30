import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertAchievementSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, id: contact.id });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Achievement tracking
  app.post("/api/achievements", async (req, res) => {
    try {
      const validatedData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(validatedData);
      res.status(201).json({ success: true, achievement });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to track achievement" });
    }
  });

  // Get achievements for session
  app.get("/api/achievements/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const achievements = await storage.getAchievementsBySession(sessionId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // GitHub API proxy to avoid CORS issues
  app.get("/api/github/user/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub user data" });
    }
  });

  app.get("/api/github/repos/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub repositories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
