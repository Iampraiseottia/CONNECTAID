import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Get donation frequency distribution
    const frequencyQuery = `
      SELECT donation_frequency, COUNT(*) as count
      FROM survey_responses
      GROUP BY donation_frequency
      ORDER BY count DESC
    `;

    // Get donation amount distribution
    const amountQuery = `
      SELECT donation_amount, COUNT(*) as count
      FROM survey_responses
      GROUP BY donation_amount
      ORDER BY count DESC
    `;

    // Get most popular donation preferences (using jsonb_array_elements_text for JSONB arrays)
    const preferencesQuery = `
      SELECT jsonb_array_elements_text(donation_preferences) as preference, COUNT(*) as count
      FROM survey_responses
      GROUP BY preference
      ORDER BY count DESC
    `;

    // Get communication preferences distribution (using jsonb_array_elements_text for JSONB arrays)
    const communicationQuery = `
      SELECT jsonb_array_elements_text(communication_preferences) as preference, COUNT(*) as count
      FROM survey_responses
      GROUP BY preference
      ORDER BY count DESC
    `;

    // Get motivation distribution (using jsonb_array_elements_text for JSONB arrays and jsonb_array_length for WHERE clause)
    const motivationsQuery = `
      SELECT jsonb_array_elements_text(motivations) as motivation, COUNT(*) as count
      FROM survey_responses
      WHERE motivations IS NOT NULL AND jsonb_array_length(motivations) > 0
      GROUP BY motivation
      ORDER BY count DESC
    `;

    // Get how people heard about ConnectAID
    const howHeardQuery = `
      SELECT how_heard, COUNT(*) as count
      FROM survey_responses
      WHERE how_heard IS NOT NULL AND how_heard != ''
      GROUP BY how_heard
      ORDER BY count DESC
    `;

    // Get total responses and recent responses
    const totalResponsesQuery = `
      SELECT 
        COUNT(*) as total_responses,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as recent_responses,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as weekly_responses
      FROM survey_responses
    `;

    const [
      frequencyResults,
      amountResults,
      preferencesResults,
      communicationResults,
      motivationsResults,
      howHeardResults,
      totalResults,
    ] = await Promise.all([
      query(frequencyQuery),
      query(amountQuery),
      query(preferencesQuery),
      query(communicationQuery),
      query(motivationsQuery),
      query(howHeardQuery),
      query(totalResponsesQuery),
    ]);

    const analytics = {
      overview: {
        totalResponses: parseInt(totalResults.rows[0].total_responses),
        recentResponses: parseInt(totalResults.rows[0].recent_responses),
        weeklyResponses: parseInt(totalResults.rows[0].weekly_responses),
      },
      donationFrequency: frequencyResults.rows.map((row) => ({
        frequency: row.donation_frequency,
        count: parseInt(row.count),
      })),
      donationAmounts: amountResults.rows.map((row) => ({
        amount: row.donation_amount,
        count: parseInt(row.count),
      })),
      donationPreferences: preferencesResults.rows.map((row) => ({
        preference: row.preference,
        count: parseInt(row.count),
      })),
      communicationPreferences: communicationResults.rows.map((row) => ({
        preference: row.preference,
        count: parseInt(row.count),
      })),
      motivations: motivationsResults.rows.map((row) => ({
        motivation: row.motivation,
        count: parseInt(row.count),
      })),
      howHeard: howHeardResults.rows.map((row) => ({
        source: row.how_heard,
        count: parseInt(row.count),
      })),
    };

    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Error fetching survey analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch survey analytics" },
      { status: 500 }
    );
  }
}
