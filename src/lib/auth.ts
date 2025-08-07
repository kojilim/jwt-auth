import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export function signToken(payload: JwtPayload, expiresIn: SignOptions["expiresIn"] = "15m"): string {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, JWT_SECRET as string, options);
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
}
