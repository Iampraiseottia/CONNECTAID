"use client";

import React, { useRef, useState } from "react";
import { Save, ArrowLeft, CheckCircle } from "lucide-react";

const About_User = ({ setActiveComponent }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    bio: "",
    interests: [],
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const interestOptions = [
    "Education",
    "Healthcare",
    "Food ",
    "Disaster Relief",
    "Children & Youth",
    "Environment",
    "Housing",
    "Community Development",
    "Arts & Culture",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number to ensure it follows the format
    if (name === "phoneNumber") {
      // If the first character isn't +, add it automatically
      let newValue = value;
      if (value && !value.startsWith("+")) {
        newValue = "+" + value;
      }

      // Only allow + and numbers in the phone field
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
    let isValid = true;

    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 7) {
      newErrors.fullName = "Full Name must be at least 7 characters";
      isValid = false;
    } else if (formData.fullName.trim().length > 38) {
      newErrors.fullName = "Full Name must not exceed 37 characters";
      isValid = false;
    }

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else {
      const phoneRegex = /^\+237[0-9]{9}$/;
      if (!phoneRegex.test(formData.phoneNumber.trim())) {
        newErrors.phoneNumber =
          "Phone Number must be in format +237 followed by 9 digits";
        isValid = false;
      }
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 7) {
      newErrors.address = "Home Address must be at least 7 characters";
      isValid = false;
    } else if (formData.address.trim().length > 38) {
      newErrors.address = "Home Address must not exceed 37 characters";
      isValid = false;
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    else if (formData.city.trim().length < 4) {
      newErrors.city = "City must be at least 4 characters";
      isValid = false;
    } else if (formData.city.trim().length > 20) {
      newErrors.city = "City must not exceed 20 characters";
      isValid = false;
    }

    if (!formData.state.trim())
      newErrors.state = "State/Province/Region is required";
    else if (formData.state.trim().length < 4) {
      newErrors.state = "State/Province/Region must be at least 4 characters";
      isValid = false;
    } else if (formData.state.trim().length > 20) {
      newErrors.state = "State/Province/Region must not exceed 20 characters";
      isValid = false;
    }

    if (!formData.zipCode.trim())
      newErrors.zipCode = "ZIP/Postal code is required";
    else if (formData.zipCode.trim().length < 4) {
      newErrors.zipCode = "Zip Code must be at least 4 characters";
      isValid = false;
    } else if (formData.zipCode.trim().length > 6) {
      newErrors.zipCode = "Zip Code must not exceed 6 characters";
      isValid = false;
    }

    if (!formData.country.trim()) newErrors.country = "Country is required";
    else if (formData.country.trim().length < 4) {
      newErrors.country = "Country must be at least 4 characters";
      isValid = false;
    } else if (formData.country.trim().length > 40) {
      newErrors.country = "Country must not exceed 40 characters";
      isValid = false;
    }

    if (!formData.bio.trim()) newErrors.bio = "About Yourself is required";
    else if (formData.bio.trim().length < 21) {
      newErrors.bio = "bio must be at least 20 characters";
      isValid = false;
    } else if (formData.bio.trim().length > 60) {
      newErrors.bio = "bio must not exceed 60 characters";
      isValid = false;
    }

    if (formData.interests.length < 6) {
      newErrors.interests = "Please select at least 6 areas of interest";
      isValid = false;
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate saving data
    setSaved(true);
    setTimeout(() => {
      setSaved(false);

      setActiveComponent("identity");
    }, 2000);
  };

  // Ref Auto

  const fullNameRef = useRef();

  const onMouseEnterFullName = () => {
    fullNameRef.current.focus();
  };

  const dateOfBirthRef = useRef();

  const onMouseEnterDateOfBirth = () => {
    dateOfBirthRef.current.focus();
  };

  const genderRef = useRef();

  const onMouseEnterGender = () => {
    genderRef.current.focus();
  };

  const phoneNumberRef = useRef();

  const onMouseEnterPhoneNumber = () => {
    phoneNumberRef.current.focus();
  };

  const homeAddressRef = useRef();

  const onMouseEnterHomeAddress = () => {
    homeAddressRef.current.focus();
  };

  const cityRef = useRef();

  const onMouseEnterCity = () => {
    cityRef.current.focus();
  };

  const regionRef = useRef();

  const onMouseEnterRegion = () => {
    regionRef.current.focus();
  };

  const zipCodeRef = useRef();

  const onMouseEnterZipCode = () => {
    zipCodeRef.current.focus();
  };

  const countryRef = useRef();

  const onMouseEnterCountry = () => {
    countryRef.current.focus();
  };

  const bioRef = useRef();

  const onMouseEnterBio = () => {
    bioRef.current.focus();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setActiveComponent("dashboardMain")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">About You </h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <p className="text-gray-600 mb-6">
            Please provide your personal information to help us better
            understand who you are. This information will help us match you with
            campaigns that align with your interests so you can impact those in
            needs life 🙏.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-3 ">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className={`w-full border ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 ease-in-out
                  ${
                    formData.fullName && formData.fullName.trim().length >= 7
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  } 
                  `}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className={`w-full border ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-500"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 ease-in-out
                  ${
                    formData.dateOfBirth &&
                    formData.dateOfBirth.trim().length >= 8
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  } 
                  `}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  ref={genderRef}
                  onMouseEnter={onMouseEnterGender}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500  ease-in-out`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className={`w-full border outline-none ease-in-out
                  ${
                    formData.phoneNumber &&
                    /^\+237[0-9]{9}$/.test(formData.phoneNumber.trim())
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  } 
                  
                  ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 ease-in-out
                  `}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Format: +237 followed by 9 digits (e.g., +237672528362)
                </p>
              </div>
            </div>

            {/* Address Section */}
            <h2 className="text-lg font-medium text-slate-800 mb-4">
              Address Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Home Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className={`w-full border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 ease-in-out
                  ${
                    formData.address && formData.address.trim().length >= 7
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  } `}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className={`w-full border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 ease-in-out
                  ${
                    formData.city && formData.city.trim().length >= 4
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                )}
              </div>

              {/* State/Province/Region */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  placeholder="Your State/Province/Region e.g South-West "
                  className={`w-full border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 ease-in-out
                  ${
                    formData.state && formData.state.trim().length >= 4
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  }`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                )}
              </div>

              {/* ZIP/Postal Code */}
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  ref={zipCodeRef}
                  onMouseEnter={onMouseEnterZipCode}
                  value={formData.zipCode}
                  placeholder="Zip Code"
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 ease-in-out
                  ${
                    formData.zipCode && formData.zipCode.trim().length >= 4
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  }`}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className={`w-full border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 ease-in-out
                  ${
                    formData.country && formData.country.trim().length >= 4
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  }`}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                About Yourself
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
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500
                  ${
                    errors.bio ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 ease-in-out 
                  ${
                    formData.bio && formData.bio.trim().length >= 20
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-500 focus:ring-gray-500 focus:outline-none"
                  }`}
              ></textarea>
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">{errors.bio}</p>
              )}
            </div>

            {/* Interests */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas of Interest *
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Select causes you're interested in supporting (select at least
                6):
              </p>
              <div
                className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${
                  errors.interests ? "border border-red-500 rounded-md p-2" : ""
                }`}
              >
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`interest-${interest}`}
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`interest-${interest}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
              {errors.interests && (
                <p className="mt-1 text-sm text-red-500">{errors.interests}</p>
              )}
              <div className="mt-2 flex items-center">
                <span
                  className={`text-sm ${
                    formData.interests.length >= 6
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.interests.length}/6 areas selected
                </span>
                {formData.interests.length >= 6 && (
                  <CheckCircle size={16} className="ml-2 text-green-500" />
                )}
              </div>
            </div>

            <div className="flex justify-center mt-2 mb-4 ">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md flex items-center"
                disabled={saved}
              >
                {saved ? (
                  <>
                    <CheckCircle size={18} className="mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save & Continue
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About_User;
