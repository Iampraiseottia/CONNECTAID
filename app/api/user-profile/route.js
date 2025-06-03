import { UserProfileService } from '../../../lib/database/userProfileService.js';

// GET - Fetch user profile
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get("profileId");

    if (!profileId) {
      return Response.json({ error: "Profile ID is required" }, { status: 400 });
    }

    const profile = await UserProfileService.getUserProfile(profileId);
    return Response.json(profile);

  } catch (error) {
    console.error("Error fetching user profile:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Create new user profile
export async function POST(request) {
  try {
    const body = await request.json();
    const { profileData } = body;

    if (!profileData) {
      return Response.json(
        { error: "Profile data is required" },
        { status: 400 }
      );
    }

    // Validate profile data
    UserProfileService.validateProfileData(profileData);

    const result = await UserProfileService.createUserProfile(profileData);
    return Response.json(result, { status: 201 });

  } catch (error) {
    console.error("Error creating user profile:", error);

    if (error.message.includes('is required') || error.message.includes('interests')) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT - Update existing user profile
export async function PUT(request) {
  try {
    const body = await request.json();
    const { profileId, profileData } = body;

    if (!profileId || !profileData) {
      return Response.json(
        { error: "Profile ID and profile data are required" },
        { status: 400 }
      );
    }

    // Validate profile data
    UserProfileService.validateProfileData(profileData);

    const result = await UserProfileService.updateUserProfile(profileId, profileData);
    return Response.json(result);

  } catch (error) {
    console.error("Error updating user profile:", error);

    if (error.message === 'Profile not found') {
      return Response.json({ error: error.message }, { status: 404 });
    }

    if (error.message.includes('is required') || error.message.includes('interests')) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Delete user profile 
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get("profileId");

    if (!profileId) {
      return Response.json({ error: "Profile ID is required" }, { status: 400 });
    }

    const result = await UserProfileService.deleteUserProfile(profileId);
    return Response.json(result);

  } catch (error) {
    console.error("Error deleting user profile:", error);

    if (error.message === 'Profile not found') {
      return Response.json({ error: error.message }, { status: 404 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}