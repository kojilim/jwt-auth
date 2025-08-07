// scripts/seed-user.ts
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import mysql from "mysql2/promise";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/bcrypt";
import * as dotenv from "dotenv";

// Load env vars from .env
dotenv.config();

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
  });

  const db = drizzle(connection);

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.username, "admin"))
    .limit(1);

  if (existing.length > 0) {
    console.log("⚠️  User 'admin' already exists. No changes made.");
    await connection.end();
    return;
  }

  const hashed = await hashPassword("securepassword");

  await db.insert(users).values({
    username: "admin",
    passwordHash: hashed,
    role: "admin",
  });

  console.log("✅ Seeded user 'admin' with password 'securepassword'");
  await connection.end();
}

main().catch((err) => {
  console.error("❌ Failed to seed user:", err);
});
