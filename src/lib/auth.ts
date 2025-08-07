import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// Load the JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Throw an error if no secret is defined (stops server from starting without one)
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

// Convert the secret string to Uint8Array (required by jose)
const encoder = new TextEncoder();
const secret = encoder.encode(JWT_SECRET);

/**
 * Signs a JWT with the given payload and expiration.
 * @param payload - The data to embed in the token (e.g. userId, role)
 * @param expiresIn - Expiry time as a string (e.g. "15m", "1h", "1d", or seconds)
 * @returns A Promise resolving to a JWT string
 */
export async function signToken(
    payload: JWTPayload,
    expiresIn: string = "15m"
): Promise<string> {
    // Get current time in seconds
    const now = Math.floor(Date.now() / 1000);

    // Calculate expiration time in seconds
    let exp: number;
    if (expiresIn.endsWith("m")) {
        exp = now + parseInt(expiresIn) * 60; // minutes
    } else if (expiresIn.endsWith("h")) {
        exp = now + parseInt(expiresIn) * 60 * 60; // hours
    } else if (expiresIn.endsWith("d")) {
        exp = now + parseInt(expiresIn) * 60 * 60 * 24; // days
    } else {
        exp = now + parseInt(expiresIn); // fallback: treat as seconds
    }

    // Create, sign, and return the JWT
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" }) // Set algorithm
        .setIssuedAt(now)                     // Set issue time
        .setExpirationTime(exp)               // Set expiration time
        .sign(secret);                        // Sign with secret
}

/**
 * Verifies a JWT and returns the decoded payload if valid.
 * @param token - The JWT string to verify
 * @returns A Promise resolving to the payload (if valid)
 * @throws If the token is expired or invalid
 */
export async function verifyToken(token: string): Promise<JWTPayload> {
    // jose throws if invalid; otherwise returns decoded payload
    const { payload } = await jwtVerify(token, secret);
    return payload;
}
