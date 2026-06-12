import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRY = "7d";

/**
 * Hash de senha com bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

/**
 * Verifica se a senha está correta
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

/**
 * Gera um token JWT
 */
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

/**
 * Verifica e decodifica um token JWT
 */
export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida telefone (formato brasileiro)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Valida senha (mínimo 8 caracteres)
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}
