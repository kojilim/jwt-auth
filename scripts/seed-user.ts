// scripts/seed-user.ts

import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import mysql from "mysql2/promise";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/bcrypt";
import * as dotenv from "dotenv";

// Load environment variables from .env for database credentials
dotenv.config();

async function main() {
  // Connect to the MySQL database using credentials from .env
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
  });

  // Set up Drizzle ORM with the database connection
  const db = drizzle(connection);

  // Check if the "admin" user already exists (prevent duplicate seeding)
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.username, "admin"))
    .limit(1);

  if (existing.length > 0) {
    // Admin already exists, so we skip creating it again
    console.log("User 'admin' already exists. No changes made.");
    await connection.end();
    return;
  }

  // Hash the password "securepassword" for the admin user
  const hashed = await hashPassword("securepassword");

  // Insert the new admin user into the users table
  await db.insert(users).values({
    username: "admin",
    passwordHash: hashed,
    role: "admin",
  });

  // Success message
  console.log("Seeded user 'admin' with password 'securepassword'");

  // Always close the database connection at the end
  await connection.end();
}

// Run the main function and handle any errors
main().catch((err) => {
  console.error("Failed to seed user:", err);
});
