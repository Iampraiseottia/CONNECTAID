import { query } from "../db.js";

export class UserProfileService {
  static validateProfileData(profileData) {
    const requiredFields = [
      "fullName",
      "dateOfBirth",
      "gender",
      "phoneNumber",
      "address",
      "city",
      "state",
      "country",
      "bio",
    ];

    for (const field of requiredFields) {
      if (!profileData[field] || profileData[field].toString().trim() === "") {
        throw new Error(`${field} is required`);
      }
    }

    if (!profileData.interests || profileData.interests.length < 4) {
      throw new Error("At least 4 interests must be selected");
    }
  }

  static async getUserProfile(username) {
    try {
      const result = await query(
        "SELECT * FROM user_profiles WHERE username = $1",
        [username]
      );

      if (result.rows.length === 0) {
        return { exists: false, data: null };
      }

      const profile = result.rows[0];
      return {
        exists: true,
        data: {
          fullName: profile.full_name,
          dateOfBirth: profile.date_of_birth,
          gender: profile.gender,
          phoneNumber: profile.phone_number,
          address: profile.home_address,
          city: profile.city,
          state: profile.state_province_region,
          country: profile.country,
          bio: profile.bio,
          interests: profile.interests,
          selfieFile: profile.selfie_file,
        },
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  static async createUserProfile(username, profileData) {
    try {
      // Check if profile already exists for this username
      const existingProfile = await this.getUserProfile(username);
      if (existingProfile.exists) {
        throw new Error("Profile already exists for this username");
      }

      const result = await query(
        `
        INSERT INTO user_profiles (
          username, full_name, date_of_birth, gender, phone_number,
          home_address, city, state_province_region, country, bio,
          interests, selfie_file
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING id, username
      `,
        [
          username,
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
          profileData.selfieFile,
        ]
      );

      return {
        success: true,
        message: "Profile created successfully",
        username: result.rows[0].username,
        profileId: result.rows[0].id,
      };
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  static async updateUserProfile(username, profileData) {
    try {
      const result = await query(
        `
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
          selfie_file = $12,
          updated_at = CURRENT_TIMESTAMP
        WHERE username = $1
        RETURNING id
      `,
        [
          username,
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
          profileData.selfieFile,
        ]
      );

      if (result.rows.length === 0) {
        throw new Error("Profile not found");
      }

      return {
        success: true,
        message: "Profile updated successfully",
        username: username,
      };
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  static async deleteUserProfile(username) {
    try {
      const result = await query(
        "DELETE FROM user_profiles WHERE username = $1 RETURNING id",
        [username]
      );

      if (result.rows.length === 0) {
        throw new Error("Profile not found");
      }

      return {
        success: true,
        message: "Profile deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting user profile:", error);
      throw error;
    }
  }
}
