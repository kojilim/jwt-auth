import { mysqlTable, serial, varchar, text } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    passwordHash: text("passwordHash").notNull(),
    role: varchar("role", { length: 50 }).notNull().default("user"),
});
