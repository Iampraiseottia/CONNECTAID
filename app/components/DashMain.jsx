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
    totalDonated: "497, 500",
    campaignsSupported: 27,
    peopleImpacted: 485,
    recentCampaigns: [],
    upcomingEvents: [],
  });

  const [donationData, setDonationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const mockDonationData = [
      { month: "Jan", amount: 25000 },
      { month: "Feb", amount: 50000 },
      { month: "Mar", amount: 10000 },
      { month: "Apr", amount: 70000 },
      { month: "May", amount: 20000 },
      { month: "Jun", amount: 30000 },
      { month: "Jul", amount: 15000 },
      { month: "Aug", amount: 85000 },
      { month: "Sep", amount: 12500 },
      { month: "Oct", amount: 40000 },
      { month: "Nov", amount: 50000 },
      { month: "Dec", amount: 90000 },
    ];

    // Mock recent campaigns
    const mockRecentCampaigns = [
      {
        id: 1,
        title: "Education for Rural Children",
        category: "Education",
        amountDonated: "10, 000",
        date: "2024-03-12",
      },
      {
        id: 2,
        title: "Medical Supplies for Local Clinic",
        category: "Healthcare",
        amountDonated: "70, 000",
        date: "2024-04-05",
      },
      {
        id: 3,
        title: "Local Community Food Distribution",
        category: "Food ",
        amountDonated: "20, 000",
        date: "2024-05-28",
      },
      {
        id: 4,
        title: "Clean Water Source For Community",
        category: "Water",
        amountDonated: "30, 000",
        date: "2024-06-18",
      },
      {
        id: 5,
        title: "Shelter For Homeless",
        category: "Healthcare",
        amountDonated: "85, 000",
        date: "2025-07-09",
      },
    ];

    // Mock upcoming events
    const mockUpcomingEvents = [
      {
        id: 1,
        title:
          "Hope for the Homeless: Compassion / Provide Home for the Homeless",
        date: "15 June 2025",
        time: "11:00 AM",
      },
      {
        id: 2,
        title:
          "Empowering Future Generations: Access to Clean Water for Children",
        date: "20 Aug 2025",
        time: "2:30 PM",
      },
      {
        id: 3,
        title: "Stand Together for Change: Aid Those in Extreme Cases of Need!",
        date: "13 Oct 2025",
        time: "11:30 AM",
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setDonationData(mockDonationData);
      setUserStats((prev) => ({
        ...prev,
        recentCampaigns: mockRecentCampaigns,
        upcomingEvents: mockUpcomingEvents,
      }));
      setIsLoading(false);
    }, 1000);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Search Input
  const searchRef = useRef();

  const onMouseEnterSearch = () => {
    searchRef.current.focus();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    campaigns: [],
    events: [],
  });

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({
        campaigns: [],
        events: [],
      });
      return;
    }

    const query = searchQuery.toLowerCase();

    const filteredCampaigns = userStats.recentCampaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(query) ||
        campaign.category.toLowerCase().includes(query)
    );

    const filteredEvents = userStats.upcomingEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.date.includes(query) ||
        event.time.toLowerCase().includes(query)
    );

    setSearchResults({
      campaigns: filteredCampaigns,
      events: filteredEvents,
    });
  }, [searchQuery, userStats.recentCampaigns, userStats.upcomingEvents]);

  const isSearchActive = searchQuery.trim() !== "";

  const handleNavigation = (route) => {
    if (typeof setActiveComponent === "function") {
      setActiveComponent(route);
    } else {
      console.warn("Navigation function is not available");
    }
  };

  // Loading State UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 min-h-screen bg-gray-50 text-gray-800 dark:bg-slate-900 dark:text-gray-100"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 mt-8 md:mb-8 gap-4">
        <div className="pt-2 md:pt-4 w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold break-words flex flex-col md:flex-row">
            <span className="text-gray-800 dark:text-gray-100">
              Welcome Back!!!,
            </span>
            <span className="text-[lightseagreen] text-[28px] md:text-[36px] lg:text-[42px] pl-1">
              Ottia Praise
            </span>
          </h1>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden w-full flex justify-end">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu size={24} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Desktop header items / Mobile menu */}
        <div
          className={`${
            isMenuOpen ? "flex " : "hidden"
          } md:flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:space-x-5`}
        >
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              ref={searchRef}
              onMouseEnter={onMouseEnterSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns or events..."
              className="px-4 py-2 pl-10 w-full md:w-64 lg:w-96 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-teal-500 duration-200 ease-in-out focus:outline-none focus:ring-2"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Use the new Notifications Component */}
          <NotificationsComponent setActiveComponent={setActiveComponent} />

          {/* User Avatar */}
          <div
            onClick={() => handleNavigation("profile")}
            className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold cursor-pointer ease-in-out duration-100 hover:bg-teal-600 transition-colors"
            title="Profile"
          >
            OP
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {isSearchActive && (
        <div className="mb-8 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-gray-100">
            <Search size={20} className="mr-2 text-teal-600" />
            Search Results for "{searchQuery}"
          </h2>

          {/* No results message */}
          {searchResults.campaigns.length === 0 &&
            searchResults.events.length === 0 && (
              <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                No results found. Try a different search term.
              </p>
            )}

          {/* Campaign Search Results */}
          {searchResults.campaigns.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-slate-800 dark:text-gray-200">
                Campaigns
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
                          ${campaign.amountDonated}
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

          {/* Event Search Results */}
          {searchResults.events.length > 0 && (
            <div>
              <h3 className="font-medium mb-3 text-slate-800 dark:text-gray-200">
                Events
              </h3>
              <div className="space-y-4">
                {searchResults.events.map((event) => (
                  <div
                    key={event.id}
                    className="border-b pb-4 last:border-0 border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="font-medium text-slate-800 dark:text-gray-200">
                      {event.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Calendar
                        size={16}
                        className="mr-1 text-gray-500 dark:text-gray-400"
                      />
                      <span className="text-sm mr-3 text-gray-500 dark:text-gray-400">
                        {event.date}
                      </span>
                      <Clock
                        size={16}
                        className="mr-1 text-gray-500 dark:text-gray-400"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {event.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Only show the regular content when not searching */}
      {!isSearchActive && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 flex items-center bg-white dark:bg-gray-800"
              title="Total Donated"
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
              title="Campaigns Supported"
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
              title="People Impacted"
            >
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  People Impacted
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-gray-100">
                  {userStats.peopleImpacted}
                </p>
              </div>
            </div>
          </div>

          {/* Donation History Chart */}
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

          {/* Incomplete Profile Alert */}
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
                Please 🙏 complete your profile to enhance your donation
                experience and help us match you with campaigns that align with
                your interests.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleNavigation("about-you")}
                  className="py-3 px-5 ease-in-out rounded text-[16px] font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 dark:text-amber-100"
                >
                  Complete About You
                </button>
                <button
                  onClick={() => handleNavigation("identity")}
                  className="py-3 px-5 ease-in-out mx-3 rounded text-sm font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 dark:text-amber-100"
                >
                  Verify Identity
                </button>
                <button
                  onClick={() => handleNavigation("survey")}
                  className="py-3 px-5 ease-in-out rounded text-sm font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 dark:text-amber-100"
                >
                  Take Survey
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
            {/* Recent Campaigns */}
            <div className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-gray-100">
                <Heart size={20} className="mr-2 text-teal-600" />
                Recent Campaigns You've Supported
              </h2>
              <div className="overflow-hidden">
                {userStats.recentCampaigns.length > 0 ? (
                  <div className="space-y-4">
                    {userStats.recentCampaigns.map((campaign) => (
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

            {/* Upcoming Events */}
            <div className="p-6 rounded-lg shadow-md hover:shadow-lg ease-in-out duration-300 bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-gray-100">
                <Calendar size={20} className="mr-2 text-teal-600" />
                Upcoming Events
              </h2>
              <div className="overflow-hidden">
                {userStats.upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {userStats.upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="border-b pb-4 last:border-0 border-gray-200 dark:border-gray-700"
                      >
                        <h3 className="font-medium text-slate-800 dark:text-gray-200">
                          {event.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Calendar
                            size={16}
                            className="mr-1 text-gray-500 dark:text-gray-400"
                          />
                          <span className="text-sm mr-3 text-gray-500 dark:text-gray-400">
                            {event.date}
                          </span>
                          <Clock
                            size={16}
                            className="mr-1 text-gray-500 dark:text-gray-400"
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {event.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No upcoming events
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DashMain; 
