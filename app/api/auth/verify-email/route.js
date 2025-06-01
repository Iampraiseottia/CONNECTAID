import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find user with the verification token
    const userQuery = `
      SELECT id, email, email_verification_expires, is_email_verified
      FROM users 
      WHERE email_verification_token = $1
    `;
    const userResult = await pool.query(userQuery, [token]);

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    const user = userResult.rows[0];

    // Check if already verified
    if (user.is_email_verified) {
      return NextResponse.json(
        { message: 'Email already verified' },
        { status: 200 }
      );
    }

    // Check if token has expired
    if (new Date() > new Date(user.email_verification_expires)) {
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      );
    }

    // Update user as verified
    const updateQuery = `
      UPDATE users 
      SET is_email_verified = TRUE, 
          email_verification_token = NULL, 
          email_verification_expires = NULL,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    await pool.query(updateQuery, [user.id]);

    return NextResponse.json({
      message: 'Email verified successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}