import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { cookies } from "next/headers";

import {
  hashPassword,
  generateVerificationCode,
  generateCodeExpiry,
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUserQuery = `
      SELECT id, email, username FROM users
      WHERE email = $1 OR username = $2
    `;
    const existingUser = await query(existingUserQuery, [
      email.toLowerCase(),
      userName,
    ]);

    if (existingUser.rows.length > 0) {
      const existingRecord = existingUser.rows[0];
      if (existingRecord.email === email.toLowerCase()) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          { error: "Username is already taken" },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate 6-digit verification code and the code expires every after 15 minutes
    const verificationCode = generateVerificationCode();
    const codeExpiry = generateCodeExpiry();

    // Insert new user with is_email_verified set to false
    const insertUserQuery = `
      INSERT INTO users (
        full_name,
        email,
        username,
        password_hash,
        email_verification_code,
        email_verification_expires,
        is_email_verified,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, email, full_name, username, is_email_verified
    `;

    const newUser = await query(insertUserQuery, [
      fullName,
      email.toLowerCase(),
      userName,
      hashedPassword,
      verificationCode,
      codeExpiry,
    ]);

    console.log(`Verification code for ${email}: ${verificationCode}`);

    return NextResponse.json(
      {
        message:
          "Registration successful! Please check your email for a 6-digit verification code.",
        user: {
          id: newUser.rows[0].id,
          email: newUser.rows[0].email,
          full_name: newUser.rows[0].full_name,
          username: newUser.rows[0].username,
          is_email_verified: newUser.rows[0].is_email_verified,
        },
        requiresVerification: true,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": `user_session=${newUser.rows[0].id}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/`,
        },
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
