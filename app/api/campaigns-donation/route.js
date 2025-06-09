import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    let queryString = "SELECT * FROM donation_campaigns ORDER BY date DESC";

    if (limit) {
      queryString += ` LIMIT ${parseInt(limit)}`;
    }

    const result = await query(queryString);

    return NextResponse.json(
      {
        activeCampaigns: result.rows,
        campaigns: result.rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching donation campaigns:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
