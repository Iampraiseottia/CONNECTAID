import { NextResponse } from "next/server";
import { query } from "@/lib/db";

import {
  hashPassword,
  generateVerificationToken,
  generateTokenExpiry,
} from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, userName, password } = body;

    // Validate required fields
    if (!fullName || !email || !userName || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUserQuery = `
      SELECT id FROM users 
      WHERE email = $1 OR username = $2
    `;
    const existingUser = await query(existingUserQuery, [email, userName]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "User with this email or username already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const tokenExpiry = generateTokenExpiry();

    // Insert new user
    const insertUserQuery = `
      INSERT INTO users (full_name, email, username, password_hash, email_verification_token, email_verification_expires)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, full_name, username, is_email_verified
    `;

    const newUser = await query(insertUserQuery, [
      fullName,
      email.toLowerCase(),
      userName,
      hashedPassword,
      verificationToken,
      tokenExpiry,
    ]);

    // TODO: Send verification email

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: newUser.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
