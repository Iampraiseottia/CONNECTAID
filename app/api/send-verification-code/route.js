import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { generateVerificationCode, generateCodeExpiry } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/emailService';

export async function POST(request) {
  console.log("📧 Send verification code API called");

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const userQuery = `
      SELECT id, email, full_name, is_email_verified
      FROM users 
      WHERE email = $1
    `;
    const userResult = await query(userQuery, [email.toLowerCase()]);

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    // Check if already verified
    if (user.is_email_verified) {
      return NextResponse.json(
        { message: 'Email is already verified' },
        { status: 200 }
      );
    }

    // Generate new 6-digit verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = generateCodeExpiry();

    // Update user with new verification code in database
    const updateQuery = `
      UPDATE users 
      SET email_verification_code = $1, 
          email_verification_expires = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
    `;
    await query(updateQuery, [verificationCode, codeExpiry, user.id]);

    console.log(`📝 Verification code stored for ${email}: ${verificationCode}`);

    // Send email
    try {
      await sendVerificationEmail(email, verificationCode, user.full_name);
      
      return NextResponse.json({
        success: true,
        message: 'Verification code sent to your email successfully'
      }, { status: 200 });
      
    } catch (emailError) {
      console.error('📧 Email sending failed:', emailError);
      
      // Even if email fails, the code is stored in database
      return NextResponse.json({
        success: true,
        message: 'Verification code generated. Email sending failed - please check your email configuration.',
        debug: process.env.NODE_ENV === 'development' ? {
          code: verificationCode,
          error: emailError.message
        } : undefined
      }, { status: 200 });
    }

  } catch (error) {
    console.error('💥 Send verification code error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods 
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to send verification codes." },
    { status: 405 }
  );
}
