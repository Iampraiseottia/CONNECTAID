import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { authenticated: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Querying database for admin credentials
    const result = await sql`
      SELECT username, password_hash 
      FROM public.admin_credentials 
      WHERE username = ${username}
      LIMIT 1
    `;

    // Check if user exists
    if (result.length === 0) {
      return NextResponse.json(
        { authenticated: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const adminUser = result[0];

    // Compare password with stored password_hash
    if (password === adminUser.password_hash) {
      return NextResponse.json(
        { authenticated: true, message: "Authentication successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { authenticated: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { authenticated: false, message: "Server error during authentication" },
      { status: 500 }
    );
  }
}
