import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
  console.log("Token in middleware:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (e) {
    console.log("Token verification failed in middleware:", e);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],  // protect dashboard and subroutes
};
