
import { NextResponse } from 'next/server';

import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM donation_campaigns ORDER BY date DESC');
    return NextResponse.json({ activeCampaigns: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}