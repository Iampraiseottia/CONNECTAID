import { query } from "@/lib/db";

export async function POST(request) {
  console.log("📝 Verification API called");

  try {
    // Parse request body
    const body = await request.json();
    console.log("📨 Request body:", body);

    const { email, code } = body;

    // Validate input
    if (!email || !code) {
      console.log("❌ Missing email or code");
      return new Response(
        JSON.stringify({
          error: "Email and verification code are required", 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get user and verification data from database
    const userQuery = `
      SELECT id, email, full_name, is_email_verified, 
             email_verification_code, email_verification_expires
      FROM users 
      WHERE email = $1
    `;
    const userResult = await query(userQuery, [email.toLowerCase()]);

    if (userResult.rows.length === 0) {
      console.log("❌ No user found for email:", email);
      return new Response(
        JSON.stringify({
          error: "No account found with this email address.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = userResult.rows[0];
    console.log("🔍 User data retrieved:", {
      email: user.email,
      isVerified: user.is_email_verified,
      hasCode: !!user.email_verification_code,
      codeExpires: user.email_verification_expires
    });

    // Check if already verified
    if (user.is_email_verified) {
      console.log("✅ Email already verified for:", email);
      return new Response(
        JSON.stringify({
          success: true,
          message: "Email is already verified",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if verification code exists
    if (!user.email_verification_code) {
      console.log("❌ No verification code found for email:", email);
      return new Response(
        JSON.stringify({
          error: "No verification code found for this email. Please request a new code.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if code has expired
    const now = new Date();
    const expiresAt = new Date(user.email_verification_expires);
    console.log(
      "⏰ Time check - Now:",
      now.toISOString(),
      "Expires:",
      expiresAt.toISOString(),
      "Expired:",
      now > expiresAt
    );

    if (now > expiresAt) {
      console.log("⏰ Code expired for:", email);
      
      // Clear expired code from database
      const clearExpiredQuery = `
        UPDATE users 
        SET email_verification_code = NULL,
            email_verification_expires = NULL,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
      `;
      await query(clearExpiredQuery, [user.id]);
      
      return new Response(
        JSON.stringify({
          error: "Verification code has expired. Please request a new code.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify the code
    const providedCode = code.toString().trim();
    const storedCode = user.email_verification_code.toString().trim();
    console.log(
      "🔑 Code comparison - Provided:",
      providedCode,
      "Stored:",
      storedCode,
      "Match:",
      providedCode === storedCode
    );

    if (storedCode !== providedCode) {
      console.log("❌ Invalid code for:", email);
      return new Response(
        JSON.stringify({
          error: "Invalid verification code. Please check and try again.",
          debug: process.env.NODE_ENV === "development" ? {
            providedCode,
            expectedLength: storedCode.length,
            providedLength: providedCode.length
          } : undefined
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Code is valid - Update user as verified
    try {
      const updateQuery = `
        UPDATE users 
        SET is_email_verified = TRUE,
            email_verification_code = NULL,
            email_verification_expires = NULL,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
      `;
      const result = await query(updateQuery, [user.id]);
      
      if (result.rowCount === 0) {
        console.log("❌ Failed to update user:", email);
        return new Response(
          JSON.stringify({
            error: "Failed to update verification status. Please try again.",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      
      console.log("✅ Database updated successfully for:", email);
    } catch (dbError) {
      console.error("💥 Database update error:", dbError);
      return new Response(
        JSON.stringify({
          error: "Failed to update verification status. Please try again.",
          details: process.env.NODE_ENV === "development" ? dbError.message : undefined,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("✅ Email verified successfully:", email);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email verified successfully! You can now access your account.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("💥 Error verifying code:", error);

    // Handle specific JSON parsing errors
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return new Response(
        JSON.stringify({
          error: "Invalid request format. Please send valid JSON.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Failed to verify code. Please try again.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return new Response(
    JSON.stringify({
      error: "Method not allowed. Use POST to verify codes.",
    }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function PUT() {
  return new Response(
    JSON.stringify({
      error: "Method not allowed. Use POST to verify codes.",
    }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function DELETE() {
  return new Response(
    JSON.stringify({
      error: "Method not allowed. Use POST to verify codes.",
    }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    }
  );
}