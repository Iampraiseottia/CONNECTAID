import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const userSession = cookieStore.get("user_session");

    if (!userSession) {
      return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    const userId = userSession.value;

    // Get user data from database
    const userQuery = `
      SELECT id, email, username, full_name, is_email_verified, created_at
      FROM users 
      WHERE id = $1
    `;
    const userResult = await query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult.rows[0];

    // Get donations data for the user using username
    const donationsQuery = `
      SELECT 
        id,
        campaign_id,
        username,
        donor_name,
        phone_number,
        amount,
        payment_method,
        transaction_id,
        campaign_title,
        campaign_category,
        campaign_description,
        campaign_image,
        status,
        created_at,
        updated_at
      FROM donations
      WHERE username = $1
      ORDER BY created_at DESC
    `;

    const donationsResult = await query(donationsQuery, [user.username]);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          full_name: user.full_name,
          is_email_verified: user.is_email_verified,
          created_at: user.created_at,
        },
        donations: donationsResult.rows,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user donations error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
