// api/auth/me/route.js 

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = await cookies(); 
    const userSession = cookieStore.get('user_session');

    if (!userSession) {
      return NextResponse.json(
        { error: 'No user session found' },
        { status: 401 }
      );
    }

    // Get user data from database using the session cookie (user ID)
    const getUserQuery = `
      SELECT id, email, full_name, username, is_email_verified
      FROM users 
      WHERE id = $1
    `;
    
    const userResult = await query(getUserQuery, [userSession.value]);

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    return NextResponse.json({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      username: user.username,
      is_email_verified: user.is_email_verified,
    });

  } catch (error) {
    console.error('Error in auth/me route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}