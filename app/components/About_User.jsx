"use client";

import React, { useRef, useState, useEffect } from "react";
import { Save, ArrowLeft, CheckCircle, Edit, X, Loader2 } from "lucide-react";
import { motion } from "motion/react";

const About_User = ({ setActiveComponent }) => {
  const [profileId, setProfileId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    bio: "",
    interests: [],
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [dataExists, setDataExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user profile data on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      // First try to load from localStorage
      const localData = loadFromLocalStorage();

      if (localData && localData.profileId) {
        setProfileId(localData.profileId);

        try {
          // Try to fetch latest data from database
          const response = await fetch(
            `/api/user-profile?profileId=${localData.profileId}`
          );
          const result = await response.json();

          if (response.ok && result.exists) {
            setFormData(result.data);
            setDataExists(true);
            setIsEditMode(false);
            // Update localStorage with fresh data
            saveToLocalStorage(result.data, localData.profileId);
          } else {
            // Database data not found, use localStorage data
            setFormData(localData.data);
            setDataExists(true);
            setIsEditMode(false);
          }
        } catch (error) {
          console.error("Error loading user profile from server:", error);
          // Use localStorage data as fallback
          setFormData(localData.data);
          setDataExists(true);
          setIsEditMode(false);
        }
      } else {
        // No local data, start with new profile creation
        setDataExists(false);
        setIsEditMode(true);
      }

      setLoading(false);
    };

    loadUserProfile();
  }, []);

  const interestOptions = [
    "Education",
    "Healthcare",
    "Food ",
    "Disaster Relief",
    "Children & Youth",
    "Environment",
    "Housing",
    "Community Development",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      let newValue = value;
      if (value && !value.startsWith("+")) {
        newValue = "+" + value;
      }
      newValue = newValue.replace(/[^\+0-9]/g, "");

      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleInterestChange = (interest) => {
    if (!isEditMode) return;

    setFormData((prevData) => {
      if (prevData.interests.includes(interest)) {
        return {
          ...prevData,
          interests: prevData.interests.filter((item) => item !== interest),
        };
      } else {
        return {
          ...prevData,
          interests: [...prevData.interests, interest],
        };
      }
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 7) {
      newErrors.fullName = "Full Name must be at least 7 characters";
    } else if (formData.fullName.trim().length > 38) {
      newErrors.fullName = "Full Name must not exceed 37 characters";
    }

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      const phoneRegex = /^\+237[0-9]{9}$/;
      if (!phoneRegex.test(formData.phoneNumber.trim())) {
        newErrors.phoneNumber =
          "Phone Number must be in format +237 followed by 9 digits";
      }
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 7) {
      newErrors.address = "Home Address must be at least 7 characters";
    } else if (formData.address.trim().length > 38) {
      newErrors.address = "Home Address must not exceed 37 characters";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    else if (formData.city.trim().length < 4) {
      newErrors.city = "City must be at least 4 characters";
    } else if (formData.city.trim().length > 20) {
      newErrors.city = "City must not exceed 20 characters";
    }

    if (!formData.state.trim())
      newErrors.state = "State/Province/Region is required";
    else if (formData.state.trim().length < 4) {
      newErrors.state = "State/Province/Region must be at least 4 characters";
    } else if (formData.state.trim().length > 20) {
      newErrors.state = "State/Province/Region must not exceed 20 characters";
    }

    if (!formData.country.trim()) newErrors.country = "Country is required";
    else if (formData.country.trim().length < 4) {
      newErrors.country = "Country must be at least 4 characters";
    } else if (formData.country.trim().length > 40) {
      newErrors.country = "Country must not exceed 40 characters";
    }

    if (!formData.bio.trim()) newErrors.bio = "About Yourself is required";
    else if (formData.bio.trim().length < 21) {
      newErrors.bio = "bio must be at least 20 characters";
    } else if (formData.bio.trim().length > 2060) {
      newErrors.bio = "bio must not exceed 2060 characters";
    }

    if (formData.interests.length < 4) {
      newErrors.interests = "Please select at least 4 areas of interest";
    }

    return newErrors;
  };

  const saveToLocalStorage = (data, profileId) => {
    const profileInfo = {
      data: data,
      profileId: profileId,
      timestamp: Date.now(),
    };
    localStorage.setItem("userProfile", JSON.stringify(profileInfo));
  };

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem("userProfile");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    try {
      const endpoint = "/api/user-profile";
      const method = dataExists && profileId ? "PUT" : "POST";

      const requestBody = profileId
        ? { profileId: profileId, profileData: formData }
        : { profileData: formData };

      console.log("Sending data:", requestBody);

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        setSaved(true);
        setDataExists(true);

        // Update profileId if this was a new profile
        if (!profileId && result.profileId) {
          setProfileId(result.profileId);
        }

        // Save to localStorage
        saveToLocalStorage(formData, result.profileId || profileId);

        setTimeout(() => {
          setSaved(false);
          setIsEditMode(false);
        }, 2000);

        console.log(
          dataExists
            ? "Profile updated successfully"
            : "Profile created successfully"
        );
      } else {
        if (result.error) {
          console.error("API Error:", result.error);
          setErrors({ general: result.error });
        }
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      // Save to localStorage even if server request fails
      saveToLocalStorage(formData, profileId);
      // Still show error for server communication
      setErrors({ general: "Network error. Data saved locally." });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = async () => {
    if (dataExists && profileId) {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/user-profile?profileId=${profileId}`
        );
        const result = await response.json();

        if (response.ok && result.exists) {
          setFormData(result.data);
          setErrors({});
        } else {
          // Fallback to localStorage
          const localData = loadFromLocalStorage();
          if (localData) {
            setFormData(localData.data);
          }
        }
      } catch (error) {
        console.error("Error reloading profile:", error);
        // Fallback to localStorage
        const localData = loadFromLocalStorage();
        if (localData) {
          setFormData(localData.data);
        }
      } finally {
        setLoading(false);
      }
    }
    setIsEditMode(false);
  };

  // Refs for form inputs
  const fullNameRef = useRef();
  const dateOfBirthRef = useRef();
  const genderRef = useRef();
  const phoneNumberRef = useRef();
  const homeAddressRef = useRef();
  const cityRef = useRef();
  const regionRef = useRef();
  const countryRef = useRef();
  const bioRef = useRef();

  // Mouse enter handlers
  const onMouseEnterFullName = () => isEditMode && fullNameRef.current?.focus();
  const onMouseEnterDateOfBirth = () =>
    isEditMode && dateOfBirthRef.current?.focus();
  const onMouseEnterGender = () => isEditMode && genderRef.current?.focus();
  const onMouseEnterPhoneNumber = () =>
    isEditMode && phoneNumberRef.current?.focus();
  const onMouseEnterHomeAddress = () =>
    isEditMode && homeAddressRef.current?.focus();
  const onMouseEnterCity = () => isEditMode && cityRef.current?.focus();
  const onMouseEnterRegion = () => isEditMode && regionRef.current?.focus();
  const onMouseEnterCountry = () => isEditMode && countryRef.current?.focus();
  const onMouseEnterBio = () => isEditMode && bioRef.current?.focus();

  // Common class for inputs
  const getInputClass = (fieldName, minLength = null) => {
    const baseClass = `w-full rounded-md px-3 py-2 ${
      isEditMode
        ? "border focus:outline-none focus:ring-2 dark:bg-gray-700"
        : "border-none bg-transparent dark:bg-transparent"
    } dark:text-white dark:placeholder-gray-400`;

    if (!isEditMode) return baseClass;

    const hasError = errors[fieldName];
    const value = formData[fieldName];
    const isValid =
      value &&
      (minLength ? value.trim().length >= minLength : true) &&
      !hasError;

    if (hasError) return `${baseClass} border-red-500`;
    if (isValid) return `${baseClass} border-green-500 focus:ring-green-500`;
    return `${baseClass} border-gray-500 dark:border-gray-600 focus:ring-gray-500`;
  };

  // Show loading state 
  if (loading) {
    return (
       <div className="flex items-center justify-center h-screen w-full bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div> Loading profile...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => setActiveComponent("dashboardMain")}
              className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              About You
            </h1>
          </div>

          {dataExists && (
            <div>
              {isEditMode ? (
                <button
                  onClick={handleCancel}
                  className="mr-4 p-2 rounded-full text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-gray-300"
                  disabled={saving}
                >
                  <X size={20} />
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-medium py-2 px-4 rounded-md flex items-center transition-colors"
                >
                  <Edit size={18} className="mr-2" />
                  Edit
                </button>
              )}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please provide your personal information to help us better
            understand who you are. This information will help us match you with
            campaigns that align with your interests so you can impact those in
            needs life 🙏.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-3">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  onMouseEnter={onMouseEnterFullName}
                  value={formData.fullName}
                  ref={fullNameRef}
                  placeholder="Your Full Name"
                  onChange={handleChange}
                  className={getInputClass("fullName", 7)}
                  readOnly={!isEditMode}
                />
                {errors.fullName && isEditMode && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  ref={dateOfBirthRef}
                  onMouseEnter={onMouseEnterDateOfBirth}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={getInputClass("dateOfBirth", 8)}
                  readOnly={!isEditMode}
                />
                {errors.dateOfBirth && isEditMode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Gender
                </label>
                {isEditMode ? (
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    ref={genderRef}
                    onMouseEnter={onMouseEnterGender}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.gender
                        ? "border-red-500"
                        : "border-gray-400 dark:border-gray-600"
                    } rounded-md px-3 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500 ease-in-out 
                    dark:bg-gray-700 dark:text-white`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 dark:text-white">
                    {formData.gender
                      ? formData.gender.charAt(0).toUpperCase() +
                        formData.gender.slice(1)
                      : ""}
                  </div>
                )}
                {errors.gender && isEditMode && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onMouseEnter={onMouseEnterPhoneNumber}
                  placeholder="+237XXXXXXXXX"
                  ref={phoneNumberRef}
                  onChange={handleChange}
                  className={getInputClass("phoneNumber")}
                  readOnly={!isEditMode}
                />
                {errors.phoneNumber && isEditMode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
                {isEditMode && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Format: +237 followed by 9 digits (e.g., +237672528362)
                  </p>
                )}
              </div>
            </div>

            {/* Address Section */}
            <h2 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
              Address Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Home Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Home Address *
                </label>
                <input
                  type="text"
                  id="address"
                  ref={homeAddressRef}
                  onMouseEnter={onMouseEnterHomeAddress}
                  name="address"
                  value={formData.address}
                  placeholder="Your House Address"
                  onChange={handleChange}
                  className={getInputClass("address", 7)}
                  readOnly={!isEditMode}
                />
                {errors.address && isEditMode && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  ref={cityRef}
                  onMouseEnter={onMouseEnterCity}
                  value={formData.city}
                  placeholder="Your City e.g Buea"
                  onChange={handleChange}
                  className={getInputClass("city", 4)}
                  readOnly={!isEditMode}
                />
                {errors.city && isEditMode && (
                  <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                )}
              </div>

              {/* State/Province/Region */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  State/Province/Region *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  ref={regionRef}
                  onMouseEnter={onMouseEnterRegion}
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Your State/Province/Region e.g South-West"
                  className={getInputClass("state", 4)}
                  readOnly={!isEditMode}
                />
                {errors.state && isEditMode && (
                  <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Your Country"
                  ref={countryRef}
                  onMouseEnter={onMouseEnterCountry}
                  className={getInputClass("country", 4)}
                  readOnly={!isEditMode}
                />
                {errors.country && isEditMode && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                About Yourself *
              </label>
              <textarea
                id="bio"
                ref={bioRef}
                name="bio"
                onMouseEnter={onMouseEnterBio}
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us a bit about yourself and why you're interested in donating..."
                className={getInputClass("bio", 20)}
                readOnly={!isEditMode}
              ></textarea>
              {errors.bio && isEditMode && (
                <p className="mt-1 text-sm text-red-500">{errors.bio}</p>
              )}
            </div>

            {/* Interests */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Areas of Interest *
              </label>
              {isEditMode && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Select causes you're interested in supporting (select at least
                  4):
                </p>
              )}
              <div
                className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${
                  errors.interests && isEditMode
                    ? "border border-red-500 rounded-md p-2"
                    : ""
                }`}
              >
                {interestOptions.map((interest) => (
                  <div
                    key={interest}
                    className={`flex items-center ${
                      !isEditMode && formData.interests.includes(interest)
                        ? "text-teal-600 dark:text-teal-400"
                        : ""
                    }`}
                  >
                    {isEditMode ? (
                      <input
                        type="checkbox"
                        id={`interest-${interest}`}
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    ) : (
                      formData.interests.includes(interest) && (
                        <CheckCircle
                          size={16}
                          className="text-teal-600 dark:text-teal-400"
                        />
                      )
                    )}
                    <label
                      htmlFor={`interest-${interest}`}
                      className={`ml-2 text-sm ${
                        !isEditMode && formData.interests.includes(interest)
                          ? "text-teal-600 dark:text-teal-400 font-medium"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
              {errors.interests && isEditMode && (
                <p className="mt-1 text-sm text-red-500">{errors.interests}</p>
              )}
              {isEditMode && (
                <div className="mt-2 flex items-center">
                  <span
                    className={`text-sm ${
                      formData.interests.length >= 6
                        ? "text-green-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {formData.interests.length}/8 areas selected
                  </span>
                  {formData.interests.length >= 6 && (
                    <CheckCircle size={16} className="ml-2 text-green-500" />
                  )}
                </div>
              )}
            </div>

            {isEditMode && (
              <div className="flex justify-center mt-2 mb-4">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={saving || saved}
                >
                  {saving ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      {dataExists ? "Updating..." : "Saving..."}
                    </>
                  ) : saved ? (
                    <>
                      <CheckCircle size={18} className="mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      {dataExists ? "Update Information" : "Save & Continue"}
                    </>
                  )}
                </button>
              </div>
            )}

            {!isEditMode && dataExists && (
              <div className="flex justify-center mt-2 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveComponent("identity")}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  Continue
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default About_User;
