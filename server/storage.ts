import { type User } from "@shared/schema";
import { randomUUID } from "crypto";

type CreateUser = Pick<User, "email" | "passwordHash" | "displayName">;

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: CreateUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(newUser: CreateUser): Promise<User> {
    const _id = randomUUID();
    const user: User = {
      ...newUser,
      _id,
      createdAt: new Date(),
    };
    this.users.set(_id, user);
    return user;
  }
}

export const storage = new MemStorage();
