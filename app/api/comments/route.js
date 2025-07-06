import { Pool } from "pg";
import { NextRequest, NextResponse } from "next/server";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export async function POST(request) {
  try {
    const { fullName, email, comment, avatarUrl, blogPostId } =
      await request.json();

    // Validate required fields
    if (!fullName || !email || !comment) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Truncate fields to fit database constraints
    const truncatedAvatarUrl = avatarUrl ? avatarUrl.substring(0, 9500000) : null;
    const truncatedFullName = fullName.substring(0, 255); 
    const truncatedEmail = email.substring(0, 255);

    const result = await pool.query(
      "INSERT INTO comments (full_name, email, comment, avatar_url, blog_post_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        truncatedFullName,
        truncatedEmail,
        comment,
        truncatedAvatarUrl,
        blogPostId,
      ]
    );

    return NextResponse.json(
      { success: true, comment: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save comment" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogPostId = searchParams.get("blogPostId");

    const result = await pool.query(
      "SELECT * FROM comments WHERE blog_post_id = $1 ORDER BY created_at DESC",
      [blogPostId]
    );

    return NextResponse.json({ success: true, comments: result.rows });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
