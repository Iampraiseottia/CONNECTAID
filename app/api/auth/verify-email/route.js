import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  console.log("📝 Email verification API called");

  try {
    const body = await request.json();
    console.log("📨 Request body:", body);

    const { email, code } = body;

    // Validate input
    if (!email || !code) {
      console.log("❌ Missing email or code");
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 }
      );
    }

    // Validate code format (6 digits)
    const codeString = code.toString().trim();
    if (!/^\d{6}$/.test(codeString)) {
      console.log("❌ Invalid code format");
      return NextResponse.json(
        { error: "Verification code must be 6 digits" },
        { status: 400 }
      );
    }

    // Find user with verification code
    const userQuery = `
      SELECT id, email, email_verification_code, email_verification_expires, is_email_verified
      FROM users 
      WHERE email = $1 AND email_verification_code = $2
    `;
    const userResult = await query(userQuery, [email.toLowerCase(), codeString]);

    if (userResult.rows.length === 0) {
      console.log("❌ No matching user found for email and code");
      return NextResponse.json(
        { error: "Invalid verification code or email" },
        { status: 400 }
      );
    }

    const user = userResult.rows[0];

    // Check if already verified
    if (user.is_email_verified) {
      console.log("✅ Email already verified");
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 200 }
      );
    }

    // Check if code has expired
    const now = new Date();
    const expiresAt = new Date(user.email_verification_expires);
    console.log(
      "⏰ Time check - Now:",
      now.toISOString(),
      "Expires:",
      expiresAt.toISOString(),
      "Expired:",
      now > expiresAt
    );

    if (now > expiresAt) {
      console.log("⏰ Code expired for:", email);
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    const updateQuery = `
      UPDATE users 
      SET is_email_verified = TRUE, 
          email_verification_code = NULL, 
          email_verification_expires = NULL,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    const updateResult = await query(updateQuery, [user.id]);

    if (updateResult.rowCount === 0) {
      console.log("❌ Failed to update user verification status");
      return NextResponse.json(
        { error: "Failed to verify email. Please try again." },
        { status: 500 }
      );
    }

    console.log("✅ Email verified successfully:", email);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully"
    }, { status: 200 });

  } catch (error) {
    console.error('💥 Email verification error:', error);

    // Handle specific JSON parsing errors
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return NextResponse.json(
        { error: "Invalid request format. Please send valid JSON." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: "Failed to verify email. Please try again.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to verify email." },
    { status: 405 }
  );
}