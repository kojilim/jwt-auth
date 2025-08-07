// src/app/api/auth/logout/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Handles POST requests to log the user out
export async function POST() {
    // Get the cookies interface (no need for await here, it's synchronous)
    const cookieStore = await cookies();

    /* Overwrite the 'auth_token' cookie with an empty value and an expiration 
    date in the past effectively removing the cookie immediately */
    cookieStore.set("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only secure in production
        sameSite: "strict",
        expires: new Date(0), // Expire instantly
    });

    // Report successful logout
    return NextResponse.json({ message: "Logged out" });
}
