"use client";

import React, { useState, useEffect } from "react";

import globalStyle from "../globals.css";

import { motion } from "motion/react";

import {
  Camera,
  Edit,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckSquare,
  XCircle,
  BadgeCheck,
} from "lucide-react";

const User_Profile = ({ setActiveComponent }) => {
  const [userData, setUserData] = useState({
    name: "Ottia Praise",
    email: "ottia@gmail.com.com",
    phone: "+237 673 684 853",
    address: "123 Malingo, Buea, Cameroon",
    dob: "1991-06-15",
    joinDate: "2023-09-01",
    bio: "I'm passionate about making a difference in the world through strategic giving and supporting causes that create lasting impact.",
    preferredCategories: ["Education", "Healthcare", "Extreme Cases"],
    profileImage: "/icon/cute.jpg",
    verificationStatus: "verified",
    donationHistory: {
      totalDonated: 445000,
      campaignsSupported: 23,
      lastDonation: "2025-05-18",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUserData(editedData);
      setIsEditing(false);
      setLoading(false);
      setSaveMessage({
        type: "success",
        text: "Profile updated successfully!",
      });

      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setEditedData({ ...userData });
    setIsEditing(false);
  };

  // Stats data
  const stats = [
    {
      label: "Total Donated",
      value: `${userData.donationHistory.totalDonated.toLocaleString()} Francs`,
    },
    {
      label: "Campaigns Supported",
      value: userData.donationHistory.campaignsSupported,
    },
    {
      label: "Last Donation",
      value: new Date(
        userData.donationHistory.lastDonation
      ).toLocaleDateString(),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      className="p-6 bg-gray-50 min-h-screen pt-12 "
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">My Profile</h1>
        <p className="text-slate-600">
          Manage your personal information and preferences
        </p>
      </div>

      {saveMessage && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            saveMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Profile picture and stats */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500">
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition-colors">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1 flex items-center">
                {userData.name}
                {userData.verificationStatus === "verified" && (
                  <span className="ml-2 text-teal-500" title="Verified Donor">
                    <BadgeCheck />
                  </span>
                )}
              </h2>
              <p className="text-gray-500 mb-4">Verified Donor</p>
              <p className="text-sm text-center text-gray-600 mb-4">
                Member since{" "}
                {new Date(userData.joinDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-slate-700 mb-3">
                Donation Summary
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600">{stat.label}:</span>
                    <span className="font-medium text-slate-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-slate-700 mb-4">Preferences</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly Newsletter</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={newsletter}
                    onChange={() => setNewsletter(!newsletter)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Profile details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Personal Information
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-teal-500 hover:text-teal-600"
                >
                  <Edit size={18} className="mr-1" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center text-gray-500 hover:text-gray-600"
                  >
                    <X size={18} className="mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center text-teal-500 hover:text-teal-600"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-teal-500 mr-1"></div>
                    ) : (
                      <Save size={18} className="mr-1" />
                    )}
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white dark:text-black"
                  />
                ) : (
                  <p className="text-slate-800">{userData.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white dark:text-black"
                      />
                    ) : (
                      <p className="text-slate-800">{userData.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1"> 
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white dark:text-black"
                      />
                    ) : (
                      <p className="text-slate-800">{userData.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editedData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white dark:text-black"
                    />
                  ) : (
                    <p className="text-slate-800">{userData.address}</p>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={editedData.dob}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white dark:text-black"
                    />
                  ) : (
                    <p className="text-slate-800">
                      {new Date(userData.dob).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white dark:text-black"
                  ></textarea>
                ) : (
                  <p className="text-slate-600">{userData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Verification Status
            </h3>
            <div className="flex items-center p-4 rounded-lg bg-teal-50 border border-teal-200">
              {userData.verificationStatus === "verified" ? (
                <>
                  <CheckSquare size={24} className="text-teal-500 mr-3" />
                  <div>
                    <h4 className="font-medium text-teal-700">
                      Your account is verified
                    </h4>
                    <p className="text-sm text-teal-600">
                      Your identity has been verified and you have full access
                      to all features.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={24} className="text-amber-500 mr-3" />
                  <div>
                    <h4 className="font-medium text-amber-700">
                      Verification pending
                    </h4>
                    <p className="text-sm text-amber-600">
                      Please complete the identity verification process to
                      access all features.
                    </p>
                    <button
                      className="mt-2 text-sm bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
                      onClick={() => setActiveComponent("identity")}
                    >
                      Complete Verification
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preferred Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Preferred Categories
            </h3>
            <p className="text-gray-600 mb-4">
              Select categories you're interested in supporting. We'll highlight
              relevant campaigns for you.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Education",
                "Healthcare",
                "Basic Needs",
                "Environment",
                "Animal Welfare",
                "Housing",
                "Food Security",
                "Emergency Relief",
                "Arts & Culture",
              ].map((category) => (
                <label
                  key={category}
                  className={`inline-flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
                    userData.preferredCategories.includes(category)
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={userData.preferredCategories.includes(category)}
                    readOnly
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default User_Profile;
