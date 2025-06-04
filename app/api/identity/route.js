import { NextRequest, NextResponse } from "next/server";
import {
  createIdentityVerification,
  getIdentityVerification,
  updateIdentityVerification,
  deleteIdentityVerification,
} from "../../../lib/identity.js";


const processFileForStorage = (file) => {
  if (!file) return null;
  
  // If it's a new file with originalFile, convert to base64 for storage
  if (file.originalFile) {
    return {
      ...file,
      // Remove the originalFile property as it can't be serialized
      originalFile: undefined,
      // Keep dataUrl for immediate use, but we'll also store base64
      base64Data: file.dataUrl, // This contains the base64 data
    };
  }
  
  return file;
};

const processFileForRetrieval = (file) => {
  if (!file) return null;
  
  // If file has base64Data, use it as dataUrl for preview
  if (file.base64Data && !file.dataUrl) {
    return {
      ...file,
      dataUrl: file.base64Data,
    };
  }
  
  return file;
};



export async function GET(request) {
  try {
    const result = await getIdentityVerification();
    
    if (result.success && result.data) {
      // Process files for retrieval to ensure dataUrl is available
      const processedData = {
        ...result.data,
        birth_certificate_file: processFileForRetrieval(result.data.birth_certificate_file),
        id_files: result.data.id_files ? result.data.id_files.map(processFileForRetrieval) : [],
        selfie_file: processFileForRetrieval(result.data.selfie_file),
      };
      
      return NextResponse.json({ ...result, data: processedData }, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET /api/identity:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch identity verification" },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const { verificationMethod, birthCertificateFile, idFiles, selfieFile } = body;

    // Basic validation
    if (!verificationMethod) {
      return NextResponse.json(
        { success: false, error: "Verification method is required" },
        { status: 400 }
      );
    }

    if (verificationMethod === "idVerification") {
      if (!birthCertificateFile || !idFiles || !selfieFile) {
        return NextResponse.json(
          { success: false, error: "Birth certificate, ID files, and selfie are required for ID verification" },
          { status: 400 }
        );
      }
    }

    // Process files for storage
    const processedData = {
      verificationMethod,
      birthCertificateFile: processFileForStorage(birthCertificateFile),
      idFiles: idFiles ? idFiles.map(processFileForStorage) : [],
      selfieFile: processFileForStorage(selfieFile),
    };

    const result = await createIdentityVerification(processedData);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error) {
    console.error("Error in POST /api/identity:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create identity verification" },
      { status: 500 }
    );
  }
}


export async function PUT(request) {
  try {
    const body = await request.json();
    const { verificationMethod, birthCertificateFile, idFiles, selfieFile } = body;

    // Basic validation
    if (!verificationMethod) {
      return NextResponse.json(
        { success: false, error: "Verification method is required" },
        { status: 400 }
      );
    }

    // Process files for storage
    const processedData = {
      verificationMethod,
      birthCertificateFile: processFileForStorage(birthCertificateFile),
      idFiles: idFiles ? idFiles.map(processFileForStorage) : [],
      selfieFile: processFileForStorage(selfieFile),
    };

    const result = await updateIdentityVerification(processedData);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error) {
    console.error("Error in PUT /api/identity:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update identity verification" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const result = await deleteIdentityVerification();

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error) {
    console.error("Error in DELETE /api/identity:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete identity verification",
      },
      { status: 500 }
    );
  }
}
