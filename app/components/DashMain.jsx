"use client";

import React, { useState, useEffect, useRef } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Heart,
  DollarSign,
  Gift,
  AlertCircle,
  Search,
  Menu,
} from "lucide-react";

import NotificationsComponent from "./NotificationsComponent";

import { motion } from "motion/react";

const DashMain = ({ setActiveComponent }) => {
  const [userStats, setUserStats] = useState({
    totalDonated: "0",
    campaignsSupported: 0,
    peopleImpacted: 0,
    recentCampaigns: [],
    donationCampaigns: [],
  });

  const [donationData, setDonationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isSurveyComplete, setIsSurveyComplete] = useState(false);

  const [userData, setUserData] = useState({
    username: "User",
    email: "",
    fullName: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    campaigns: [],
    events: [],
    donationCampaigns: [],
  });

  // Effect to fetch user data and profile/survey completion status
  useEffect(() => {
    const fetchUserDataAndCompletionStatus = async () => {
      let currentUsername = userData.username; // Use state's current username for initial fetch

      try {
        // Attempt to get user data from localStorage first for faster UI updates
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData({
            username: user.username || "User",
            email: user.email || "",
            fullName: user.full_name || "",
          });
          currentUsername = user.username; // Update username from stored data
        }

        // Fetch fresh user data from the authentication API
        const userResponse = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
        });

        if (userResponse.ok) {
          const data = await userResponse.json();
          const user = data.user;

          setUserData({
            username: user.username || "User",
            email: user.email || "",
            fullName: user.full_name || "",
          });
          currentUsername = user.username; 

          localStorage.setItem("user", JSON.stringify(user));
        } else {
          console.error("Failed to fetch user data:", userResponse.status);
          if (!storedUser) {
            console.warn("No stored user data, user might need to login.");
          }
        }

        // Fetch user profile and survey data only if a valid username is available
        if (currentUsername && currentUsername !== "User") {
          const profileResponse = await fetch(
            `/api/user-profile?username=${currentUsername}`
          );
          if (profileResponse.ok) {
            const profile = await profileResponse.json();
            const profileIsComplete =
              profile &&
              profile.full_name && String(profile.full_name).trim() !== '' &&
              profile.date_of_birth && 
              profile.gender && String(profile.gender).trim() !== '' &&
              profile.phone_number && String(profile.phone_number).trim() !== '' &&
              profile.home_address && String(profile.home_address).trim() !== '' &&
              profile.city && String(profile.city).trim() !== '' &&
              profile.state_province_region && String(profile.state_province_region).trim() !== '' &&
              profile.country && String(profile.country).trim() !== '' &&
              profile.bio && String(profile.bio).trim() !== '' &&
              profile.interests && Array.isArray(profile.interests) && profile.interests.length > 0 &&
              profile.selfie_file && String(profile.selfie_file).trim() !== '';

            setIsProfileComplete(profileIsComplete);
          } else if (profileResponse.status === 404) {
            setIsProfileComplete(false); 
          } else {
            console.error("Failed to fetch user profile:", profileResponse.status);
            setIsProfileComplete(false); 
          }

          // Fetch User Survey Data
          const surveyResponse = await fetch(`/api/survey`);
          if (surveyResponse.ok) {
            const surveyData = await surveyResponse.json();
            setIsSurveyComplete(!!surveyData.survey);
          } else if (surveyResponse.status === 404) {
            setIsSurveyComplete(false); 
          } else {
            console.error("Failed to fetch survey data:", surveyResponse.status);
            setIsSurveyComplete(false); 
          }
        } else {
          setIsProfileComplete(false);
          setIsSurveyComplete(false);
        }
      } catch (error) {
        console.error("Error fetching user data or completion status:", error);
        setIsProfileComplete(false);
        setIsSurveyComplete(false);
      }
    };

    fetchUserDataAndCompletionStatus();
  }, [userData.username]); 

  // Fetching user donations and general campaigns
  useEffect(() => {
    const fetchData = async () => {
      let fetchedRecentDonations = [];
      let totalDonatedAmount = 0;
      let campaignsSupportedCount = 0;
      let completedDonationsCount = 0;
      const donationHistoryChartData = [];

      // Fetch user's personal donations
      try {
        const response = await fetch("/api/my-donation", { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          fetchedRecentDonations = data.donations || [];

          // Calculate statistics from fetched donations
          totalDonatedAmount = fetchedRecentDonations.reduce(
            (sum, donation) => sum + donation.amount,
            0
          );

          const uniqueCampaignIds = new Set(
            fetchedRecentDonations.map((donation) => donation.campaign_id)
          );
          campaignsSupportedCount = uniqueCampaignIds.size;

          completedDonationsCount = fetchedRecentDonations.filter(
            (donation) => donation.status === "completed"
          ).length;

          // Prepare data for the donation history chart
          const monthlyDonations = fetchedRecentDonations.reduce(
            (acc, donation) => {
              const date = new Date(donation.created_at);
              const month = date.toLocaleString("en-US", { month: "short" });
              acc[month] = (acc[month] || 0) + donation.amount;
              return acc;
            },
            {}
          );

          const allMonths = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
          ];
          allMonths.forEach((month) => {
            donationHistoryChartData.push({
              month: month,
              amount: monthlyDonations[month] || 0,
            });
          });
        } else {
          console.error("Failed to fetch user donations:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user donations:", error);
      }

      // Fetching other active donation campaigns from the main campaigns API
      let fetchedDonationCampaigns = [];
      try {
        const response = await fetch("/api/campaigns-donation?limit=4");
        if (response.ok) {
          const data = await response.json();
          fetchedDonationCampaigns = data.activeCampaigns || [];
        } else {
          console.error("Failed to fetch general donation campaigns:", response.status);
        }
      } catch (error) {
        console.error("Error fetching general donation campaigns:", error);
      }

      // Update userStats state with all fetched data
      setUserStats((prev) => ({
        ...prev,
        totalDonated: totalDonatedAmount.toLocaleString(), 
        campaignsSupported: campaignsSupportedCount,
        peopleImpacted: completedDonationsCount,
        recentCampaigns: fetchedRecentDonations.map((d) => ({
          id: d.id,
          title: d.campaign_title,
          category: d.campaign_category,
          amountDonated: d.amount.toLocaleString(), 
          date: new Date(d.created_at).toLocaleDateString(), 
        })),
        donationCampaigns: fetchedDonationCampaigns, 
      }));

      setDonationData(donationHistoryChartData);
      setIsLoading(false); 
    };

    if (userData.username !== "User") {
      setTimeout(() => { 
        fetchData();
      }, 1000);
    }
  }, [userData.username]); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const searchRef = useRef();

  const onMouseEnterSearch = () => {
    searchRef.current.focus();
  };

  // Effect for handling search logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({
        campaigns: [],
        events: [],
        donationCampaigns: [],
      });
      return;
    }

    const query = searchQuery.toLowerCase();

    const filteredRecentCampaigns = userStats.recentCampaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(query) ||
        campaign.category.toLowerCase().includes(query)
    );

    const filteredDonationCampaigns = userStats.donationCampaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(query) ||
        campaign.category.toLowerCase().includes(query)
    );

    // Update search results state
    setSearchResults({
      campaigns: filteredRecentCampaigns,
      events: [], 
      donationCampaigns: filteredDonationCampaigns,
    });
  }, [searchQuery, userStats.recentCampaigns, userStats.donationCampaigns]); 

  const isSearchActive = searchQuery.trim() !== "";

  const handleNavigation = (route) => {
    if (typeof setActiveComponent === "function") {
      setActiveComponent(route);
    } else {
      console.warn("Navigation function (setActiveComponent) is not available.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const showProfileCompletionAlert = !isProfileComplete || !isSurveyComplete;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 min-h-screen bg-gray-50 text-gray-800 dark:bg-slate-900 dark:text-gray-100"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 mt-8 md:mb-8 gap-4">
        <div className="pt-2 md:pt-4 w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold break-words flex flex-col md:flex-row">
            <span className="text-gray-800 dark:text-gray-100">
              Welcome Back!!!,
            </span>
            <span className="text-[lightseagreen] text-[28px] md:text-[36px] lg:text-[42px] pl-2">
              {userData.username}
            </span>
          </h1>
        </div>

        {/* Mobile menu button for small screens */}
        <div className="md:hidden w-full flex justify-end">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Desktop header items / Mobile menu (conditionally rendered) */}
        <div
          className={`${
            isMenuOpen ? "flex " : "hidden"
          } md:flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:space-x-5`}
        >
          {/* Search Input Field */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              ref={searchRef}
              onMouseEnter={onMouseEnterSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns or events..."
              className="px-4 py-2 pl-10 w-full md:w-64 lg:w-96 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-teal-500 duration-200 ease-in-out focus:outline-none focus:ring-2"
              aria-label="Search campaigns or events"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Notifications Component */}
          <NotificationsComponent setActiveComponent={setActiveComponent} />

          {/* User Avatar */}
          <div
            onClick={() => handleNavigation("profile")}
            className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold cursor-pointer ease-in-out duration-100 hover:bg-teal-600 transition-colors"
            title="Go to Profile"
            role="button"
            tabIndex="0"
            aria-label="User Profile"
          >
            {userData.username
              ? userData.username.substring(0, 2).toUpperCase()
              : "U"}
          </div>
        </div>
      </div>

      {/* Search Results Section (visible when search is active) */}
      {isSearchActive && (
        <div className="mb-8 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-gray-100">
            <Search size={20} className="mr-2 text-teal-600" />
            Search Results for "{searchQuery}"
          </h2>

          {/* Message for no search results */}
          {searchResults.campaigns.length === 0 &&
            searchResults.donationCampaigns.length === 0 && (
              <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                No results found. Try a different search term.
              </p>
            )}

          {/* Display User's Recent Donations from Search */}
          {searchResults.campaigns.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-slate-800 dark:text-gray-200">
                Your Recent Donations
              </h3>
              <div className="space-y-4">
                {searchResults.campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border-b pb-4 last:border-0 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-gray-200">
                          {campaign.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {campaign.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-teal-600">
                          {campaign.amountDonated} Francs
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {campaign.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display Other Donation Campaigns from Search */}
          {searchResults.donationCampaigns.length > 0 && (
            <div>
              <h3 className="font-medium mb-3 text-slate-800 dark:text-gray-200">
                Other Donation Campaigns
              </h3>
              <div className="space-y-4">
                {searchResults.donationCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border-b pb-4 last:border-0 border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="font-medium text-slate-800 dark:text-gray-200">
                      {campaign.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm mr-3 text-gray-500 dark:text-gray-400">
                        {campaign.category}
                      </span>
                      <Clock
                        size={16}
                        className="mr-1 text-gray-500 dark:text-gray-400"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(campaign.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Dashboard Content (visible when search is not active) */}
      {!isSearchActive && (
        <>
          {/* User Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 flex items-center bg-white dark:bg-gray-800"
              title="Total Amount Donated"
            >
              <div className="bg-teal-100 p-3 rounded-full mr-4">
                <DollarSign size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Donated
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-gray-100">
                  {userStats.totalDonated} Francs
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 flex items-center bg-white dark:bg-gray-800"
              title="Number of Campaigns Supported"
            >
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Gift size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Campaigns Supported
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-gray-100">
                  {userStats.campaignsSupported}
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 flex items-center bg-white dark:bg-gray-800"
              title="Total Completed Donations"
            >
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed Donations
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-gray-100">
                  {userStats.peopleImpacted}
                </p>
              </div>
            </div>
          </div>

          {/* Donation History Chart Section */}
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 mb-8 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-gray-100">
              <TrendingUp size={20} className="mr-2 text-teal-600" />
              Your Donation History
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={donationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    className="dark:text-gray-400"
                  />
                  <YAxis stroke="#6b7280" className="dark:text-gray-400" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--tooltip-bg, #ffffff)",
                      borderColor: "var(--tooltip-border, #e5e7eb)",
                      color: "var(--tooltip-text, #111827)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      color: "var(--legend-text, #111827)",
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    name="Donation Amount (Francs)"
                    fill="#14b8a6"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conditional Alert to Complete Profile/Survey */}
          {showProfileCompletionAlert && (
            <div className="mt-10 mb-4 p-4 rounded-lg flex items-start shadow-md hover:shadow-lg ease-in-out duration-300 bg-amber-50 border border-amber-200 dark:bg-amber-900 dark:border-amber-800">
              <AlertCircle
                size={24}
                className="mr-3 mt-0.5 flex-shrink-0 text-amber-500 dark:text-amber-300"
              />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-200">
                  Complete Your Profile
                </h3>
                <p className="mt-1 text-amber-700 dark:text-amber-300">
                  Please 🙏 complete your profile and survey to enhance your donation
                  experience and help us match you with campaigns that align with
                  your interests.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {!isProfileComplete && (
                    <button
                      onClick={() => handleNavigation("about-you")}
                      className="py-3 px-5 ease-in-out rounded text-[16px] font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 dark:text-amber-100"
                    >
                      Complete About You
                    </button>
                  )}
                  {!isSurveyComplete && (
                    <button
                      onClick={() => handleNavigation("survey")}
                      className="py-3 px-5 ease-in-out rounded text-sm font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 dark:text-amber-100"
                    >
                      Take Survey
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Recent Campaigns You've Supported Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
            <div className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-gray-100">
                <Heart size={20} className="mr-2 text-teal-600" />
                Recent Campaigns You've Supported
              </h2>
              <div className="overflow-hidden">
                {userStats.recentCampaigns.length > 0 ? (
                  <div className="space-y-4">
                    {userStats.recentCampaigns.slice(0, 5).map((campaign) => (
                      <div
                        key={campaign.id}
                        className="border-b pb-4 last:border-0 border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-slate-800 dark:text-gray-200">
                              {campaign.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {campaign.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-teal-600">
                              {campaign.amountDonated} Francs
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {campaign.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No recent campaign donations
                  </p>
                )}

                <button
                  onClick={() => handleNavigation("Campaigns")}
                  className="mt-4 font-medium flex items-center text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                  aria-label="View all supported campaigns"
                >
                  View all campaigns
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Current Donation Campaigns Section (General campaigns from API) */}
            <div className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-gray-100">
                <Heart size={20} className="mr-2 text-teal-600" />
                Current Donation Campaigns
              </h2>
              <div className="overflow-hidden">
                {userStats.donationCampaigns.length > 0 ? (
                  <div className="space-y-4">
                    {userStats.donationCampaigns.slice(0, 4).map((campaign) => (
                      <div
                        key={campaign.id}
                        className="border-b pb-4 last:border-0 border-gray-200 dark:border-gray-700"
                      >
                        <h3 className="font-medium text-slate-800 dark:text-gray-200">
                          {campaign.title}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                              {campaign.category}
                            </span>
                            <Clock
                              size={16}
                              className="mr-1 text-gray-500 dark:text-gray-400"
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(campaign.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No current donation campaigns
                  </p>
                )}

                <button
                  onClick={() => handleNavigation("Campaigns")}
                  className="mt-4 font-medium flex items-center text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                  aria-label="See all active campaigns"
                >
                  See all campaigns
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DashMain;
