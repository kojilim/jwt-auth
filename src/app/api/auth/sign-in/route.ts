import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signToken } from "@/lib/auth";
import { comparePassword } from "@/lib/bcrypt";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    let connection;
    try {
        const { username, password } = await req.json();

        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST!,
            port: Number(process.env.DATABASE_PORT!),
            user: process.env.DATABASE_USER!,
            password: process.env.DATABASE_PASSWORD!,
            database: process.env.DATABASE_NAME!,
        });

        const db = drizzle(connection);

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }

        const passwordMatch = await comparePassword(password, user.passwordHash);

        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }

        const token = signToken({ userId: user.id, role: user.role });

        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 15, // 15 minutes
        });

        return NextResponse.json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    } finally {
        if (connection) await connection.end();
    }
}
