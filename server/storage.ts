import { users, contacts, achievements, type User, type InsertUser, type Contact, type InsertContact, type Achievement, type InsertAchievement } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getAchievementsBySession(sessionId: string): Promise<Achievement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private achievements: Map<number, Achievement>;
  private currentUserId: number;
  private currentContactId: number;
  private currentAchievementId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.achievements = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentAchievementId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentAchievementId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id, 
      createdAt: new Date() 
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async getAchievementsBySession(sessionId: string): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(
      achievement => achievement.sessionId === sessionId
    );
  }
}

export const storage = new MemStorage();
