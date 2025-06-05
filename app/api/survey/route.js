import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const surveyData = await request.json();

    // Validate required fields
    const requiredFields = [
      "donationFrequency",
      "donationAmount",
      "donationPreferences",
      "communicationPreferences",
      "taxReceipts",
    ];

    for (const field of requiredFields) {
      if (!surveyData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate array fields have minimum requirements
    if (surveyData.donationPreferences.length < 2) {
      return NextResponse.json(
        { error: "Please select at least 2 donation preferences" },
        { status: 400 }
      );
    }

    if (surveyData.communicationPreferences.length < 1) {
      return NextResponse.json(
        { error: "Please select at least 1 communication preference" },
        { status: 400 }
      );
    }

    // Insert survey response into database
    const insertQuery = `
      INSERT INTO survey_responses (
        donation_frequency,
        donation_amount,
        donation_preferences,         -- Removed ::jsonb cast
        communication_preferences,    -- Removed ::jsonb cast
        tax_receipts,
        how_heard,
        motivations,                  -- Removed ::jsonb cast
        additional_comments
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, created_at, updated_at
    `;

    const values = [
      surveyData.donationFrequency,
      surveyData.donationAmount,
      JSON.stringify(surveyData.donationPreferences),
      JSON.stringify(surveyData.communicationPreferences),
      surveyData.taxReceipts,
      surveyData.howHeard || null,
      JSON.stringify(surveyData.motivations || []),
      surveyData.additionalComments || null,
    ];

    const result = await query(insertQuery, values);
    const newSurvey = result.rows[0];

    return NextResponse.json(
      {
        message: "Survey submitted successfully!",
        survey: newSurvey,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting survey:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch survey data
export async function GET(request) {
  try {
    const result = await query(
      `SELECT
          id,
          donation_frequency AS "donationFrequency",
          donation_amount AS "donationAmount",
          donation_preferences AS "donationPreferences",
          communication_preferences AS "communicationPreferences",
          tax_receipts AS "taxReceipts",
          how_heard AS "howHeard",
          motivations,
          additional_comments AS "additionalComments",
          created_at AS "createdAt",
          updated_at AS "updatedAt"
        FROM survey_responses
        ORDER BY created_at DESC
        LIMIT 1`
    );

    if (result.rows.length > 0) {
      return NextResponse.json({ survey: result.rows[0] }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No survey data found." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching survey data:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

// PUT endpoint to update survey data
export async function PUT(request) {
  try {
    const { id, ...surveyData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Survey ID is required for update." },
        { status: 400 }
      );
    }

    // Validate required fields (similar to POST, but for update)
    const requiredFields = [
      "donationFrequency",
      "donationAmount",
      "donationPreferences",
      "communicationPreferences",
      "taxReceipts",
    ];

    for (const field of requiredFields) {
      if (!surveyData[field]) {
        return NextResponse.json(
          { error: `Missing required field for update: ${field}` },
          { status: 400 }
        );
      }
    }

    if (surveyData.donationPreferences.length < 2) {
      return NextResponse.json(
        { error: "Please select at least 2 donation preferences" },
        { status: 400 }
      );
    }

    if (surveyData.communicationPreferences.length < 1) {
      return NextResponse.json(
        { error: "Please select at least 1 communication preference" },
        { status: 400 }
      );
    }

    const updateQuery = `
      UPDATE survey_responses
      SET
        donation_frequency = $1,
        donation_amount = $2,
        donation_preferences = $3,         -- Removed ::jsonb cast
        communication_preferences = $4,    -- Removed ::jsonb cast
        tax_receipts = $5,
        how_heard = $6,
        motivations = $7,                  -- Removed ::jsonb cast
        additional_comments = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING id, updated_at
    `;

    const values = [
      surveyData.donationFrequency,
      surveyData.donationAmount,
      JSON.stringify(surveyData.donationPreferences),
      JSON.stringify(surveyData.communicationPreferences),
      surveyData.taxReceipts,
      surveyData.howHeard || null,
      JSON.stringify(surveyData.motivations || []),
      surveyData.additionalComments || null,
      id,
    ];

    const result = await query(updateQuery, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Survey not found or no changes made." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Survey updated successfully!",
        survey: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating survey:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
