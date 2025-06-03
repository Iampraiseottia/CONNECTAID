import { query } from '../db.js';

export class UserProfileService {
  // Get user profile by profile ID
  static async getUserProfile(profileId) {
    const text = `
      SELECT 
        id,
        full_name,
        date_of_birth,
        gender,
        phone_number,
        home_address,
        city,
        state_province_region,
        country,
        bio,
        interests,
        created_at,
        updated_at
      FROM user_profiles 
      WHERE id = $1
    `;
    
    const result = await query(text, [profileId]);
    
    if (result.rows.length === 0) {
      return { exists: false, data: null };
    }

    const profile = result.rows[0];

    // Transform database format to frontend format
    const formattedProfile = {
      fullName: profile.full_name,
      dateOfBirth: profile.date_of_birth,
      gender: profile.gender,
      phoneNumber: profile.phone_number,
      address: profile.home_address,
      city: profile.city,
      state: profile.state_province_region,
      country: profile.country,
      bio: profile.bio,
      interests: profile.interests || [],
    };

    return {
      exists: true,
      data: formattedProfile,
      profileId: profile.id,
      timestamps: {
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      },
    };
  }

  // Create new user profile
  static async createUserProfile(profileData) {
    const text = `
      INSERT INTO user_profiles (
        full_name, date_of_birth, gender, phone_number,
        home_address, city, state_province_region, country, bio, interests
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, created_at
    `;

    const values = [
      profileData.fullName,
      profileData.dateOfBirth,
      profileData.gender,
      profileData.phoneNumber,
      profileData.address,
      profileData.city,
      profileData.state,
      profileData.country,
      profileData.bio,
      profileData.interests,
    ];

    const result = await query(text, values);
    
    return {
      success: true,
      message: 'Profile created successfully',
      profileId: result.rows[0].id,
      createdAt: result.rows[0].created_at,
    };
  }

  // Update existing user profile
  static async updateUserProfile(profileId, profileData) {
    const text = `
      UPDATE user_profiles SET
        full_name = $2,
        date_of_birth = $3,
        gender = $4,
        phone_number = $5,
        home_address = $6,
        city = $7,
        state_province_region = $8,
        country = $9,
        bio = $10,
        interests = $11,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, updated_at
    `;

    const values = [
      profileId,
      profileData.fullName,
      profileData.dateOfBirth,
      profileData.gender,
      profileData.phoneNumber,
      profileData.address,
      profileData.city,
      profileData.state,
      profileData.country,
      profileData.bio,
      profileData.interests,
    ];

    const result = await query(text, values);

    if (result.rows.length === 0) {
      throw new Error('Profile not found');
    }

    return {
      success: true,
      message: 'Profile updated successfully',
      updatedAt: result.rows[0].updated_at,
    };
  }

  // Delete user profile
  static async deleteUserProfile(profileId) {
    const text = 'DELETE FROM user_profiles WHERE id = $1 RETURNING id';
    const result = await query(text, [profileId]);

    if (result.rows.length === 0) {
      throw new Error('Profile not found');
    }

    return {
      success: true,
      message: 'Profile deleted successfully',
    };
  }

  // Validate profile data
  static validateProfileData(profileData) {
    const requiredFields = [
      'fullName',
      'dateOfBirth',
      'gender',
      'phoneNumber',
      'address',
      'city',
      'state',
      'country',
      'bio',
      'interests',
    ];

    for (const field of requiredFields) {
      if (
        !profileData[field] ||
        (Array.isArray(profileData[field]) && profileData[field].length === 0)
      ) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate interests array length
    if (profileData.interests.length < 4) {
      throw new Error('At least 4 interests must be selected');
    }

    return true;
  }
}