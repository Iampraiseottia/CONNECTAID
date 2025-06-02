import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { generateVerificationCode, generateCodeExpiry } from '@/lib/auth';

export async function POST(request) {
  console.log("🔄 Resend verification API called");

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email 
    const userQuery = `
      SELECT id, email, is_email_verified, full_name
      FROM users 
      WHERE email = $1
    `;
    const userResult = await query(userQuery, [email.toLowerCase()]);

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "No account found with this email address" },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    // Check if already verified
    if (user.is_email_verified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 200 }
      );
    }

    // Generate new 6-digit verification code
    const newVerificationCode = generateVerificationCode();
    const newCodeExpiry = generateCodeExpiry();

    // Update user with new verification code
    const updateQuery = `
      UPDATE users 
      SET email_verification_code = $1, 
          email_verification_expires = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
    `;
    await query(updateQuery, [newVerificationCode, newCodeExpiry, user.id]);

    console.log(`New verification code for ${email}: ${newVerificationCode}`);


    return NextResponse.json({
      message: "New verification code sent to your email"
    }, { status: 200 });

  } catch (error) {
    console.error('💥 Resend verification error:', error);
    return NextResponse.json(
      { error: "Failed to resend verification code. Please try again." },
      { status: 500 }
    );
  }
}
