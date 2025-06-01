import { Pool } from "pg";

const dbConfig = {
  user: process.env.POSTGRES_USER || "prinzo",
  host: process.env.POSTGRES_PASSWORD || "localhost",
  database: process.env.POSTGRES_HOST || "connectaid",
  password: process.env.POSTGRES_DATABASE || "Beteck10",
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
};

console.log("Database config:", {
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  hasPassword: !!dbConfig.password,
  port: dbConfig.port,
});

const pool = new Pool({
  ...dbConfig,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
}

export async function POST(request) {
  try {
    console.log("Using database configuration with fallback values");

    const { fullName, phone, email, message } = await request.json();

    if (!fullName || !phone || !email || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    const isConnected = await testConnection();
    if (!isConnected) {
      return Response.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const query = `
      INSERT INTO contact_submissions (full_name, phone, email, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

    const values = [fullName, phone, email, message];

    const result = await pool.query(query, values);

    return Response.json({
      success: true,
      message: "Contact form submitted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);

    if (error.message.includes("SASL")) {
      return Response.json(
        { error: "Database authentication failed" },
        { status: 500 }
      );
    }

    if (error.message.includes("ENOTFOUND")) {
      return Response.json(
        { error: "Database host not found" },
        { status: 500 }
      );
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
