
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { comparePassword } from "@/lib/auth";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const userQuery = `
      SELECT id, email, username, full_name, password_hash, is_email_verified
      FROM users 
      WHERE email = $1
    `;
    const userResult = await query(userQuery, [email.toLowerCase()]);

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = userResult.rows[0];

    // Verify password first
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.is_email_verified) {
      return NextResponse.json(
        {
          error: "Please verify your email address with the 6-digit code before logging in",
          requiresVerification: true,
          email: user.email,
        },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Update last login timestamp
    const updateLoginQuery = `
      UPDATE users 
      SET updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1
    `;
    await query(updateLoginQuery, [user.id]);

    // Remove sensitive data for response
    const { password_hash, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          ...userWithoutPassword,
        },
        token,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}