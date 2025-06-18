import { query } from '@/lib/db';
import { NextResponse } from 'next/server'; 

export async function POST(request) {
  try {
    const {
      full_name,
      email,
      phone_number,
      donation_amount,
      category,
      payment_method,
      transaction_id
    } = await request.json();

    // Basic validation: Check if all required fields are present 
    if (!full_name || !email || !phone_number || !donation_amount || !category || !payment_method || !transaction_id) {
      return NextResponse.json({ message: 'All required fields must be provided.' }, { status: 400 });
    }

    // Ensure donation_amount is a number and positive
    if (typeof donation_amount !== 'number' || donation_amount <= 0) {
      return NextResponse.json({ message: 'Donation amount must be a positive number.' }, { status: 400 });
    }

    // SQL query to insert a new donation
    const insertQuery = `
      INSERT INTO guest_donations (
        full_name,
        email,
        phone_number,
        donation_amount,
        category,
        payment_method,
        transaction_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const params = [
      full_name,
      email,
      phone_number,
      donation_amount,
      category,
      payment_method,
      transaction_id
    ];

    const result = await query(insertQuery, params);

    // Return the newly created donation record
    return NextResponse.json({
      message: 'Donation successfully recorded.',
      donation: result.rows[0]
    }, { status: 201 });

  } catch (error) {
    console.error('Error recording donation:', error);
    // Check for specific error types, e.g., duplicate transaction_id
    if (error.code === '23505' && error.constraint === 'guest_donations_transaction_id_key') {
      return NextResponse.json({ message: 'Transaction ID already exists. Please use a unique ID.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Internal server error.', error: error.message }, { status: 500 });
  }
}

/**
 * Handles GET requests to retrieve guest donations.
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} The response object.
 */
export async function GET(request) {
  try {
    // You can add query parameters for filtering, pagination, etc. here
    // For now, let's fetch all donations
    const selectQuery = `
      SELECT
        id,
        full_name,
        email,
        phone_number,
        donation_amount,
        category,
        payment_method,
        transaction_id,
        status,
        created_at,
        updated_at
      FROM guest_donations
      ORDER BY created_at DESC;
    `;

    const result = await query(selectQuery);

    // Return the fetched donations
    return NextResponse.json({
      message: 'Donations retrieved successfully.',
      donations: result.rows
    }, { status: 200 });

  } catch (error) {
    console.error('Error retrieving donations:', error);
    return NextResponse.json({ message: 'Internal server error.', error: error.message }, { status: 500 });
  }
}
