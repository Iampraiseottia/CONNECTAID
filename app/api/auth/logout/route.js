
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    return NextResponse.json(
      { message: "Logout successful" },
      { 
        status: 200,
        headers: {
          'Set-Cookie': 'user_session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
        }
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}