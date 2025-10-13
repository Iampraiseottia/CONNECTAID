import bcrypt from "bcryptjs";
import crypto from "crypto";
import { betterAuth } from "better-auth";
import { Pool } from "@neondatabase/serverless";

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
  return crypto.randomBytes(32).toString("hex");
}

// Better-AUth

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: {
    provider: "postgres",
    pool: pool,
    type: "neon",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      full_name: {
        type: "string",
        required: false,
      },
      username: {
        type: "string",
        required: false,
      },
      avatar_url: {
        type: "string",
        required: false,
      },
      google_id: {
        type: "string",
        required: false,
      },
      provider: {
        type: "string",
        required: false,
      },
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookiePrefix: "better_auth",
  },
});
