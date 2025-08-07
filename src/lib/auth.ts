import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

// Helper to convert the secret to Uint8Array for jose
const encoder = new TextEncoder();
const secret = encoder.encode(JWT_SECRET);

/**
 * Sign a JWT with the given payload and expiration (default 15m)
 */
export async function signToken(
    payload: JWTPayload,
    expiresIn: string = "15m"
): Promise<string> {
    // Calculate expiration in seconds
    const now = Math.floor(Date.now() / 1000);
    let exp: number;
    if (expiresIn.endsWith("m")) {
        exp = now + parseInt(expiresIn) * 60;
    } else if (expiresIn.endsWith("h")) {
        exp = now + parseInt(expiresIn) * 60 * 60;
    } else if (expiresIn.endsWith("d")) {
        exp = now + parseInt(expiresIn) * 60 * 60 * 24;
    } else {
        // fallback: treat as seconds
        exp = now + parseInt(expiresIn);
    }

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(now)
        .setExpirationTime(exp)
        .sign(secret);
}

/**
 * Verify a JWT and return the payload if valid
 */
export async function verifyToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, secret);
    return payload;
}
