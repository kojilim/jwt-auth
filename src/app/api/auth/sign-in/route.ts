import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signToken } from "@/lib/auth";
import { comparePassword } from "@/lib/bcrypt";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Handles POST requests for user sign-in
export async function POST(req: Request) {
    let connection;
    try {
        // Parse the request body for username and password
        const { username, password } = await req.json();

        // Connect to the MySQL database
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST!,
            port: Number(process.env.DATABASE_PORT!),
            user: process.env.DATABASE_USER!,
            password: process.env.DATABASE_PASSWORD!,
            database: process.env.DATABASE_NAME!,
        });

        // Initialize Drizzle ORM with the MySQL connection
        const db = drizzle(connection);

        // Check if the user exists in the database
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

        // If user is not found, return an error response
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await comparePassword(password, user.passwordHash);

        // If the password does not match, return an error response
        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }

        // If login is successful, sign a JWT token with the user's ID and role
        const token = await signToken({ userId: user.id, role: user.role });

        // Set the JWT token in an httpOnly cookie
        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 15, // Cookie expires in 15 minutes
        });

        // Return a success response with the token
        return NextResponse.json({ success: true, message: "Login successful" });
    } catch (error) {
        // Error logs for debugging
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    } finally {
        // Always close the database connection if it was opened
        if (connection) await connection.end();
    }
}
