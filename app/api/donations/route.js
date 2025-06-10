import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

// GET method - Fetch user donations
export async function GET() {
  try {
    const cookieStore = await cookies();
    const userSession = cookieStore.get('user_session');

    if (!userSession) {
      return NextResponse.json({ error: 'No active session' }, { status: 401 });
    }

    const userId = userSession.value;

    // Get user data to get username 
    const userQuery = 'SELECT username FROM users WHERE id = $1';
    const userResult = await query(userQuery, [userId]);
    
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const username = userResult.rows[0].username;

    // Fetch user's donations
    const donationsQuery = `
      SELECT 
        id,
        campaign_id,
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

    const donationsResult = await query(donationsQuery, [username]);

    return NextResponse.json({
      success: true,
      donations: donationsResult.rows
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching donations:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch donations. Please try again.'
      },
      { status: 500 }
    );
  }
}

// POST method - Create new donation
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const userSession = cookieStore.get('user_session');

    if (!userSession) {
      return NextResponse.json({ error: 'No active session' }, { status: 401 });
    }

    const userId = userSession.value;
    const body = await request.json();
    
    const {
      campaignId,
      donorName,
      phoneNumber,
      amount,
      paymentMethod,
      transactionId
    } = body;

    // Validate required fields
    if (!campaignId || !donorName || !phoneNumber || !amount || !paymentMethod || !transactionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user data to get username
    const userQuery = 'SELECT username FROM users WHERE id = $1';
    const userResult = await query(userQuery, [userId]);
    
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const username = userResult.rows[0].username;

    // Get campaign data to verify and get complete information
    const campaignQuery = 'SELECT * FROM donation_campaigns WHERE id = $1';
    const campaignResult = await query(campaignQuery, [campaignId]);
    
    if (campaignResult.rows.length === 0) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const campaign = campaignResult.rows[0];

    // Insert donation record
    const insertDonationQuery = `
      INSERT INTO donations (
        campaign_id, username, donor_name, phone_number, amount, 
        payment_method, transaction_id, campaign_title, campaign_category, 
        campaign_description, campaign_image, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const donationResult = await query(insertDonationQuery, [
      campaignId,
      username,
      donorName,
      phoneNumber,
      parseInt(amount),
      paymentMethod,
      transactionId,
      campaign.title,
      campaign.category,
      campaign.description,
      campaign.image,
      'completed' 
    ]);

    // Update campaign raised amount and donor count
    const updateCampaignQuery = `
      UPDATE donation_campaigns 
      SET raisedamount = raisedamount + $1, totaldonors = totaldonors + 1
      WHERE id = $2
    `;
    
    await query(updateCampaignQuery, [parseInt(amount), campaignId]);

    return NextResponse.json({
      success: true,
      donation: donationResult.rows[0],
      message: 'Donation processed successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Donation processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process donation. Please try again.',
        status: 'recurring'
      },
      { status: 500 }
    );
  }
}