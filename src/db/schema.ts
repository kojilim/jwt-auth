import { mysqlTable, serial, varchar, text } from "drizzle-orm/mysql-core";

// Define the "users" table schema for Drizzle ORM
export const users = mysqlTable("users", {
    // Auto-incrementing integer primary key for each user
    id: serial("id").primaryKey(),

    // Unique username for login (max 255 characters, required)
    username: varchar("username", { length: 255 }).notNull().unique(),

    // Hashed password (stored as text, required)
    passwordHash: text("passwordHash").notNull(),

    // Role of the user (e.g. "user", "admin"; default is "user")
    role: varchar("role", { length: 50 }).notNull().default("user"),
});
