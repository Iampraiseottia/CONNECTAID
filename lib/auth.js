import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate 6-digit verification code
export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateCodeExpiry() {
  return new Date(Date.now() + 15 * 60 * 1000); 
}

// Generate secure token for sessions
export function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}