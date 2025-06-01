import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { comparePassword } from "@/lib/auth";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, userType } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const userQuery = `
      SELECT id, email, username, full_name, password_hash, user_type, is_email_verified
      FROM users 
      WHERE email = $1
    `;
    const userResult = await pool.query(userQuery, [email.toLowerCase()]);

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult.rows[0];

    // Check if email is verified
    if (!user.is_email_verified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update user type if provided and different
    if (userType && userType !== user.user_type) {
      const updateUserTypeQuery = `
        UPDATE users SET user_type = $1 WHERE id = $2
      `;
      await pool.query(updateUserTypeQuery, [userType, user.id]);
      user.user_type = userType;
    }

    // Generate JWT token (optional - for session management)
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Remove sensitive data
    const { password_hash, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
