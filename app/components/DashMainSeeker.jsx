"use client";

import React, { useState, useEffect } from "react";

import {
  Bell,
  Activity,
  AlertCircle,
  DollarSign,
  Users,
  X,
} from "lucide-react";

import {
  faHandHoldingHeart,
  faUserShield,
  faChartLine,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion } from "motion/react";

const DashMainSeeker = ({ setActiveComponent }) => {
  const [stats, setStats] = useState({
    totalDonationsReceived: 3500,
    pendingVerifications: 1,
    activeCampaigns: 2,
    recentDonations: [],
  });

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: "donation",
          message: "John D. donated $500 to your 'Medical Help' campaign",
          time: "2 hours ago",
          read: false,
        },
        {
          id: 2,
          type: "verification",
          message: "Your identity verification is pending review",
          time: "1 day ago",
          read: true,
        },
        {
          id: 3,
          type: "system",
          message: "Complete your profile to increase chances of receiving aid",
          time: "3 days ago",
          read: true,
        },
        {
          id: 4,
          type: "donation",
          message: "Anonymous donated $100 to your 'Education Fund' campaign",
          time: "5 days ago",
          read: true,
        },
      ]);

      setStats({
        totalDonationsReceived: 3500,
        activeCampaigns: 2,
        recentDonations: [
          {
            id: 1,
            donor: "John D.",
            amount: 500,
            campaign: "Medical Help",
            date: "May 27, 2024",
          },
          {
            id: 2,
            donor: "Anonymous",
            amount: 100,
            campaign: "Education Fund",
            date: "July 15, 2025",
          },
          {
            id: 3,
            donor: "Sarah M.",
            amount: 250,
            campaign: "Water AID",
            date: "September 02, 2025",
          },
          {
            id: 4,
            donor: "Michael T.",
            amount: 150,
            campaign: "Extreme Cases",
            date: "November 16, 2025",
          },
        ],
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-500 dark:bg-green-600";
      case "pending":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "incomplete":
        return "bg-red-500 dark:bg-red-600";
      default:
        return "bg-gray-500 dark:bg-gray-600";
    }
  };

  // Calculate profile completion percentage
  const profileSections = [
    { name: "About You", status: "complete" },
    { name: "Identity", status: "pending" },
    { name: "Survey", status: "incomplete" },
  ];

  const completionPercentage =
    (profileSections.filter((section) => section.status === "complete").length /
      profileSections.length) *
    100;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 pt-14 ">
        Welcome to ConnectAID
      </h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6    border-l-4 border-teal-500 hover:shadow-lg hover:cursor-pointer ease-in-out transition-all"
          title="Total Aid Received"
          onClick={() => setActiveComponent("MyAID")}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Aid Received
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.totalDonationsReceived} Francs
              </p>
            </div>
            <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-teal-500 dark:text-teal-400" />
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6   border-l-4 border-purple-500 hover:shadow-lg hover:cursor-pointer ease-in-out transition-all "
          title="Active Campaigns"
          onClick={() => setActiveComponent("Campaigns_Seeker")}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Campaigns
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.activeCampaigns}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-500 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6   border-l-4 border-blue-500 hover:shadow-lg hover:cursor-pointer ease-in-out transition-all"
          title="Profile Completion"
          onClick={() => setActiveComponent("profile")}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Profile Completion
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {completionPercentage}%
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Activity className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns on Desktop, One Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Completion Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ease-in-out transition-all   hover:shadow-lg ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Complete Your Profile
              </h2>
              <button
                onClick={() => setActiveComponent("about-you")}
                className="text-sm text-teal-500 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {completionPercentage}% Complete - Complete all sections to
                increase chances of receiving aid
              </p>
            </div>

            <div className="space-y-3">
              {profileSections.map((section, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`h-4 w-4 rounded-full mr-3 ${getStatusColor(
                        section.status
                      )}`}
                    ></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {section.name}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setActiveComponent(
                        section.name === "About You"
                          ? "about-you"
                          : section.name.toLowerCase()
                      )
                    }
                    className="px-3 py-1 text-sm text-white bg-teal-500 rounded-md hover:bg-teal-600 transition-all"
                  >
                    {section.status === "complete" ? "Edit" : "Complete"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Donations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ease-in-out transition-all hover:shadow-lg ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Recent Donations
              </h2>
              <button
                onClick={() => setActiveComponent("MyAID")}
                className="text-sm text-teal-500 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Donor
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentDonations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                        {donation.donor}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                        {donation.amount} Francs
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                        {donation.campaign}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                        {donation.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ease-in-out transition-all hover:shadow-lg ">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveComponent("Campaigns_Seeker")}
                className="flex flex-col items-center justify-center p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-all"
              >
                <FontAwesomeIcon
                  icon={faHandHoldingHeart}
                  className="h-6 w-6 text-teal-500 mb-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Start Campaign
                </span>
              </button>

              <button
                onClick={() => setActiveComponent("identity")}
                className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all"
              >
                <FontAwesomeIcon
                  icon={faUserShield}
                  className="h-6 w-6 text-purple-500 mb-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Verify Identity
                </span>
              </button>

              <button
                onClick={() => setActiveComponent("MyAID")}
                className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
              >
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="h-6 w-6 text-blue-500 mb-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Aid History
                </span>
              </button>

              <button
                onClick={() => setActiveComponent("survey")}
                className="flex flex-col items-center justify-center p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-all"
              >
                <FontAwesomeIcon
                  icon={faHandHoldingDollar}
                  className="h-6 w-6 text-orange-500 mb-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Update Needs
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ease-in-out transition-all hover:shadow-lg ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Notifications
              </h2>
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-teal-500 hover:underline"
              >
                Mark all as read
              </button>
            </div>

            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      notification.read
                        ? "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50"
                        : "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3">
                          {notification.type === "donation" && (
                            <DollarSign className="h-5 w-5 text-teal-500" />
                          )}
                          {notification.type === "verification" && (
                            <AlertCircle className="h-5 w-5 text-orange-500" />
                          )}
                          {notification.type === "system" && (
                            <Bell className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No notifications
              </p>
            )}
          </div>

          {/* Tips & Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ease-in-out transition-all hover:shadow-lg ">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Tips & Resources
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium text-blue-700 dark:text-blue-400">
                  Complete Your Profile
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Fully verified profiles receive 3x more donations on average.
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-medium text-green-700 dark:text-green-400">
                  Share Your Story
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Campaigns with personal stories receive 70% more support.
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-medium text-purple-700 dark:text-purple-400">
                  Stay Active
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Update your campaigns regularly to show progress and needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashMainSeeker;
