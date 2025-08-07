import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

// Protects routes by checking for a valid JWT token in cookies
export async function middleware(request: NextRequest) {
  // Extract the JWT token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // Log the JWT_SECRET and token for debugging purposes (to be removed in production)
  console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
  console.log("Token in middleware:", token);

  // If no token is found, redirect to sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  try {
    // Verify the token using jose (async function)
    await verifyToken(token);
    // If token is valid, proceed to the requested page
    return NextResponse.next();
  } catch (e) {
    // If token verification fails, log the error and redirect to sign-in page
    console.log("Token verification failed in middleware:", e);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// Protect the dashboard and its subpages
export const config = {
  matcher: ["/dashboard/:path*"],
};
