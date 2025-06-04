import { query } from "./db.js";

// Helper function to safely parse JSON
const safeJSONParse = (value) => {
  if (!value) return null;
  if (typeof value === "object") return value;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error("JSON parse error:", error);
      return null;
    }
  }
  return value;
};

// Helper function to safely stringify JSON
const safeJSONStringify = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error("JSON stringify error:", error);
    return null;
  }
};

export async function createIdentityVerification(data) {
  try {
    const {
      verificationMethod = "idVerification",
      birthCertificateFile,
      idFiles,
      selfieFile,
    } = data;

    const result = await query(
      `INSERT INTO identity_verifications 
       (verification_method, birth_certificate_file, id_files, selfie_file) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [
        verificationMethod,
        safeJSONStringify(birthCertificateFile),
        safeJSONStringify(idFiles),
        safeJSONStringify(selfieFile),
      ]
    );

    const record = result.rows[0];

    // Parse JSON fields back to objects
    const parsedData = {
      ...record,
      birth_certificate_file: safeJSONParse(record.birth_certificate_file),
      id_files: safeJSONParse(record.id_files) || [],
      selfie_file: safeJSONParse(record.selfie_file),
    };

    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    console.error("Error creating identity verification:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getIdentityVerification() {
  try {
    // Get the most recent identity verification record
    const result = await query(
      `SELECT * FROM identity_verifications 
       ORDER BY created_at DESC 
       LIMIT 1`
    );

    if (result.rows.length === 0) {
      return {
        success: true,
        data: null,
      };
    }

    const record = result.rows[0];

    // Parse JSON fields back to objects
    const data = {
      ...record,
      birth_certificate_file: safeJSONParse(record.birth_certificate_file),
      id_files: safeJSONParse(record.id_files) || [],
      selfie_file: safeJSONParse(record.selfie_file),
    };

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching identity verification:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateIdentityVerification(data) {
  try {
    const {
      verificationMethod = "idVerification",
      birthCertificateFile,
      idFiles,
      selfieFile,
    } = data;

    // First, check if a record exists
    const existingRecord = await query(
      `SELECT id FROM identity_verifications 
       ORDER BY created_at DESC 
       LIMIT 1`
    );

    if (existingRecord.rows.length === 0) {
      // No existing record, create a new one
      return await createIdentityVerification(data);
    }

    const recordId = existingRecord.rows[0].id;

    const result = await query(
      `UPDATE identity_verifications 
       SET verification_method = $1, 
           birth_certificate_file = $2, 
           id_files = $3, 
           selfie_file = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 
       RETURNING *`,
      [
        verificationMethod,
        safeJSONStringify(birthCertificateFile),
        safeJSONStringify(idFiles),
        safeJSONStringify(selfieFile),
        recordId,
      ]
    );

    const record = result.rows[0];

    // Parse JSON fields back to objects
    const parsedData = {
      ...record,
      birth_certificate_file: safeJSONParse(record.birth_certificate_file),
      id_files: safeJSONParse(record.id_files) || [],
      selfie_file: safeJSONParse(record.selfie_file),
    };

    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    console.error("Error updating identity verification:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteIdentityVerification() {
  try {
    await query("DELETE FROM identity_verifications");

    return {
      success: true,
      message: "Identity verification deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting identity verification:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
