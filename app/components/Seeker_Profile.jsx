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

const Seeker_Profile = ({ setActiveComponent }) => {
  const [userData, setUserData] = useState({
    name: "Ottia Praise",
    email: "ottia@gmail.com",
    phone: "+237 673 684 853",
    address: "123 Malingo, Buea, Cameroon",
    dob: "1991-06-15",
    joinDate: "2023-09-01",
    bio: "I'm going through difficult times and seeking support from the community. I value transparency and am committed to using any help received for genuine needs.",
    preferredCategories: ["Medical Bills", "Housing", "Education"],
    profileImage: "/icon/cute.jpg",
    verificationStatus: "verified",
    helpHistory: {
      totalReceived: 445000,
      campaignsCreated: 3,
      lastHelp: "2025-05-18",
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
      label: "Total Received",
      value: `${userData.helpHistory.totalReceived.toLocaleString()} Francs`,
    },
    {
      label: "Campaigns Created",
      value: userData.helpHistory.campaignsCreated,
    },
    {
      label: "Last Help Received",
      value: new Date(userData.helpHistory.lastHelp).toLocaleDateString(),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-20"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-slate-600 dark:text-gray-300">
          Manage your personal information and preferences
        </p>
      </div>

      {saveMessage && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            saveMessage.type === "success"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Profile picture and stats */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1 flex items-center">
                {userData.name}
                {userData.verificationStatus === "verified" && (
                  <span className="ml-2 text-teal-500" title="Verified Seeker">
                    <BadgeCheck />
                  </span>
                )}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Verified Seeker
              </p>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
                Member since{" "}
                {new Date(userData.joinDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="border-t dark:border-gray-700 pt-4">
              <h3 className="font-semibold text-slate-700 dark:text-gray-300 mb-3">
                Support Summary
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      {stat.label}:
                    </span>
                    <span className="font-medium text-slate-800 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-slate-700 dark:text-gray-300 mb-4">
              Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Email Notifications
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Monthly Newsletter
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={newsletter}
                    onChange={() => setNewsletter(!newsletter)}
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Profile details */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
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
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                ) : (
                  <p className="text-slate-800 dark:text-white">
                    {userData.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <Mail
                      size={16}
                      className="text-gray-400 dark:text-gray-500 mr-2"
                    />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    ) : (
                      <p className="text-slate-800 dark:text-white">
                        {userData.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <Phone
                      size={16}
                      className="text-gray-400 dark:text-gray-500 mr-2"
                    />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    ) : (
                      <p className="text-slate-800 dark:text-white">
                        {userData.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <div className="flex items-center">
                  <MapPin
                    size={16}
                    className="text-gray-400 dark:text-gray-500 mr-2"
                  />
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editedData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  ) : (
                    <p className="text-slate-800 dark:text-white">
                      {userData.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth
                </label>
                <div className="flex items-center">
                  <Calendar
                    size={16}
                    className="text-gray-400 dark:text-gray-500 mr-2"
                  />
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={editedData.dob}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  ) : (
                    <p className="text-slate-800 dark:text-white">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                  ></textarea>
                ) : (
                  <p className="text-slate-600 dark:text-gray-300">
                    {userData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
              Verification Status
            </h3>
            <div className="flex items-center p-4 rounded-lg bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800">
              {userData.verificationStatus === "verified" ? (
                <>
                  <CheckSquare size={24} className="text-teal-500 mr-3" />
                  <div>
                    <h4 className="font-medium text-teal-700 dark:text-teal-300">
                      Your account is verified
                    </h4>
                    <p className="text-sm text-teal-600 dark:text-teal-400">
                      Your identity has been verified and donors can trust that
                      your needs are legitimate.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={24} className="text-amber-500 mr-3" />
                  <div>
                    <h4 className="font-medium text-amber-700 dark:text-amber-300">
                      Verification pending
                    </h4>
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      Please complete the identity verification process to
                      create campaigns and receive support.
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

          {/* Need Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
              Need Categories
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select categories where you need support. This helps donors find
              and support your specific needs.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Medical Bills",
                "Housing",
                "Education",
                "Food Security",
                "Utilities",
                "Childcare",
                "Transportation",
                "Emergency Relief",
                "Debt Relief",
              ].map((category) => (
                <label
                  key={category}
                  className={`inline-flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
                    userData.preferredCategories.includes(category)
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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

export default Seeker_Profile; 
