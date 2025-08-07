import bcrypt from "bcrypt";

/**
 * Hashes a plaintext password using bcrypt.
 * @param password - The plaintext password to hash
 * @returns A Promise resolving to the hashed password string
 */
export async function hashPassword(password: string) {
    // 10 salt rounds is a good default for bcrypt security & speed
    return bcrypt.hash(password, 10);
}

/**
 * Compares a plaintext password to a bcrypt hash.
 * @param plainPassword - The user's input (plaintext)
 * @param hashedPassword - The stored bcrypt hash
 * @returns A Promise resolving to true if match, false otherwise
 */
export async function comparePassword(
    plainPassword: string,
    hashedPassword: string
) {
    // Returns true if passwords match, false otherwise
    return bcrypt.compare(plainPassword, hashedPassword);
}
