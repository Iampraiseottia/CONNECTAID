import { verificationCodes } from "../../../lib/verificationStorage.js";

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

    // Clean up expired codes before checking
    verificationCodes.cleanup();

    // Get stored verification data
    const storedData = verificationCodes.get(email);
    console.log("🔍 Stored data for", email, ":", storedData);

    // Debug: Check all stored codes (remove in production)
    console.log("🗂️ All stored verification codes:", Array.from(verificationCodes.memoryStorage.keys()));

    if (!storedData) {
      console.log("❌ No verification code found for email:", email);
      return new Response(
        JSON.stringify({
          error: "No verification code found for this email. Please request a new code.",
          debug: process.env.NODE_ENV === "development" ? {
            storedEmails: Array.from(verificationCodes.memoryStorage.keys()),
            requestedEmail: email
          } : undefined
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if code has expired (additional safety check)
    const now = Date.now();
    const expiresAt = storedData.expiresAt;
    console.log(
      "⏰ Time check - Now:",
      new Date(now).toISOString(),
      "Expires:",
      new Date(expiresAt).toISOString(),
      "Expired:",
      now > expiresAt
    );

    if (now > expiresAt) {
      verificationCodes.delete(email);
      console.log("⏰ Code expired for:", email);
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
    const storedCode = storedData.code.toString().trim();
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

    // Code is valid - remove from storage
    verificationCodes.delete(email);
    console.log("✅ Email verified successfully:", email);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email verified successfully",
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