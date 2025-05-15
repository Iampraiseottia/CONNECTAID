"use client";

import React, { useState, useEffect } from "react";

import NewRequest from "../components/NewRequest";

import {
  Search,
  Plus,
  Eye,
  UserCheck,
  X,
  Filter,
  Star,
  Calendar,
  Award,
  AlertCircle,
} from "lucide-react";

import { motion } from "motion/react";

const Campaigns_Seeker = () => {
  // State for campaigns data
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Food Drive for Homeless Shelter",
      organizer: "Community Outreach",
      location: "Downtown",
      date: "2025-05-15",
      category: "Food & Supplies",
      participants: 12,
      description:
        "Collecting non-perishable food items and essential supplies for our local homeless shelter. We need volunteers to help sort and distribute items.",
      requirements:
        "Must be able to lift 10-20 pounds and commit to at least 2 hours",
      contact: "outreach@community.org",
    },
    {
      id: 2,
      title: "Elderly Home Visitation",
      organizer: "Silver Care",
      location: "Sunshine Valley",
      date: "2025-05-20",
      category: "Social Support",
      participants: 8,
      description:
        "Visiting elderly residents at Sunshine Valley Retirement Home to provide companionship and assistance with daily activities.",
      requirements:
        "Patience and good communication skills required. Background check necessary.",
      contact: "volunteer@silvercare.org",
    },
    {
      id: 3,
      title: "Beach Cleanup Initiative",
      organizer: "Ocean Friends",
      location: "Seaside Beach",
      date: "2025-05-25",
      category: "Environmental",
      participants: 24,
      description:
        "Join us for our monthly beach cleanup to remove plastic and other waste from our local shoreline. Equipment will be provided.",
      requirements: "Comfortable working outdoors, sunscreen recommended",
      contact: "cleanup@oceanfriends.org",
    },
    {
      id: 4,
      title: "After-School Tutoring Program",
      organizer: "Education Matters",
      location: "Central Library",
      date: "2025-06-01",
      category: "Education",
      participants: 6,
      description:
        "Tutoring middle school students in math and science subjects. Looking for volunteers with teaching experience or strong academic background.",
      requirements:
        "Knowledge in mathematics or science subjects, experience with children preferred",
      contact: "tutoring@educationmatters.org",
    },
    {
      id: 5,
      title: "Community Garden Project",
      organizer: "Green Thumb Society",
      location: "West Side Park",
      date: "2025-06-05",
      category: "Environmental",
      participants: 15,
      description:
        "Help plant and maintain our community garden that provides fresh produce to local food banks. No gardening experience necessary!",
      requirements:
        "Physical activity required, bring your own gloves if possible",
      contact: "garden@greenthumb.org",
    },
  ]);

  // State for form visibility and data
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // State for past campaign details
  const [showPastDetails, setShowPastDetails] = useState(false);
  const [selectedPastCampaign, setSelectedPastCampaign] = useState(null);

  // State pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);
  const [notification, setNotification] = useState(null);
  const itemsPerPage = 5;

  // Available categories
  const categories = [
    "Food & Supplies",
    "Social Support",
    "Environmental",
    "Education",
    "Healthcare",
    "Crisis Relief",
    "Other",
  ];

  // Handle showing notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handle join campaign
  const handleJoin = (id) => {
    setCampaigns(
      campaigns.map((campaign) => {
        if (campaign.id === id) {
          showNotification(`Requested to join "${campaign.title}"`);
          return { ...campaign, participants: campaign.participants + 1 };
        }
        return campaign;
      })
    );
  };

  // Handle view details
  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDetails(true);
  };

  // Handle past campaign details
  const handleViewPastDetails = (campaign) => {
    setSelectedPastCampaign(campaign);
    setShowPastDetails(true);
  };

  // Handle category filter
  const toggleCategoryFilter = (category) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((c) => c !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
    setCurrentPage(1);
  };

  // Filter campaigns based on search term and category filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategories.length === 0 ||
      activeCategories.includes(campaign.category);

    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Joining Campaign
  const [joinedCampaignIds, setJoinedCampaignIds] = useState({});

  const handleJoinCampaign = (campaignId) => {
    console.log(`Joining campaign: ${campaignId}`);
    setJoinedCampaignIds((prev) => ({
      ...prev,
      [campaignId]: true,
    }));
  };

  // Fetching Past Successful Event Data from Postgres

  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch past events
  useEffect(() => {
    async function fetchPastEvents() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/pastEvents");

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        setPastEvents(data.events || []);
      } catch (err) {
        console.error("Error fetching past events:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPastEvents();
  }, []);

  if (error)
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="min-h-screen p-4 pt-20 mb-10 "
    >
      <div className="max-w-6xl mx-auto rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 transition-colors duration-200">
        {notification && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md flex items-center shadow-sm">
            <AlertCircle size={18} className="mr-2" />
            <div>
              <strong>{notification}</strong>
              <p className="text-sm">
                NB: After requesting to join, the admin will review and accept
                within 30 minutes of submission.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Assistance Campaigns
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Create Campaign</span>
            </button>
          </div>
        </div>

        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search campaigns by title, organizer, category, or location..."
            className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 ease-in-out mt-1 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Filter
              size={16}
              className="mr-2 text-gray-500 dark:text-gray-400"
            />
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Filter by Category
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategoryFilter(category)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  activeCategories.includes(category)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
            {activeCategories.length > 0 && (
              <button
                onClick={() => setActiveCategories([])}
                className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                  Organizer
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Location
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentCampaigns.length > 0 ? (
                currentCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200">
                      {campaign.title}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden sm:table-cell">
                      {campaign.organizer}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden md:table-cell">
                      {campaign.location}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden lg:table-cell">
                      {campaign.date}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden md:table-cell">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full 
                        bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      >
                        {campaign.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm flex gap-2">
                      <button
                        onClick={() => handleViewDetails(campaign)}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center gap-1 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <Eye size={14} />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button
                        onClick={() => {
                          handleJoin(campaign.id);
                          handleJoinCampaign(campaign.id);
                        }}
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200 flex items-center gap-1 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
                      >
                        <UserCheck size={14} />
                        <span className="hidden sm:inline">
                          {joinedCampaignIds[campaign.id]
                            ? "Request Received"
                            : "Join Campaign"}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-4 px-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No campaigns found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Past Campaigns Section */}
        <div className="mt-20 mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <Award size={20} className="mr-2" />
            Past Campaigns Impact
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 mb-6">
            Review our previous campaigns and their impact on the community
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-Cteal-500 text-center"></div>
            </div>
            
          ) : error ? (
            <p className="text-red-500">
              Error loading Past Successful Events: {error} 
            </p>
          ) : pastEvents.length === 0 ? (
            <p>No Past Events Found.</p>
          ) : (
            <motion.div  initial={{ opacity: 0, y: 100 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.05 }} className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      Category
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Success Rate
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Impact Score
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {pastEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200">
                        {event.campaigns}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden sm:table-cell">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden md:table-cell">
                        <span
                          className="px-2 py-1 text-xs font-semibold rounded-full 
                        bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                        >
                          {event.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2 dark:bg-gray-700">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${event.success_rate}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-700 dark:text-gray-200">
                            {event.success_rate}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < Math.floor(event.impact_score / 2)
                                  ? "text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                              fill={
                                i < Math.floor(event.impact_score / 2)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                          <span className="ml-2">{event.impact_score}/10</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <button
                          onClick={() => handleViewPastDetails(event)}
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 flex items-center gap-1 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
                        >
                          <Eye size={14} />
                          <span className="hidden sm:inline">View Impact</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Campaign Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, amount: 0.05 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-5xl w-full max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Create New Campaign
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <NewRequest />
          </div>
        </motion.div>
      )}

      {/* View Details Modal */}
      {showDetails && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Campaign Details
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {selectedCampaign.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    {selectedCampaign.category}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    {selectedCampaign.participants} participants
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedCampaign.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Organizer
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selectedCampaign.organizer}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selectedCampaign.location}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selectedCampaign.date}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Contact
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selectedCampaign.contact}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Requirements
                </h4>
                <p className="text-gray-800 dark:text-gray-200">
                  {selectedCampaign.requirements}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    handleJoin(selectedCampaign.id);
                    setShowDetails(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                >
                  <UserCheck size={16} />
                  Join Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Past Campaign Details Modal */}
      {showPastDetails && selectedPastCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Campaign Impact Report
              </h2>
              <button
                onClick={() => setShowPastDetails(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={selectedPastCampaign.image}
                    alt={selectedPastCampaign.title}
                    className="w-full h-52 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {selectedPastCampaign.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                      {selectedPastCampaign.category}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {selectedPastCampaign.date}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedPastCampaign.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-center">
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        Participants
                      </p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">
                        {selectedPastCampaign.participants}
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-center">
                      <p className="text-sm text-green-600 dark:text-green-300">
                        Success Rate
                      </p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-200">
                        {selectedPastCampaign.successRate}%
                      </p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center">
                      <p className="text-sm text-indigo-600 dark:text-indigo-300">
                        People Helped
                      </p>
                      <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-200">
                        {selectedPastCampaign.peopleHelped}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <Award size={18} className="mr-2" />
                  Impact Assessment
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Community Impact
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {Math.round(selectedPastCampaign.impactScore * 10)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${selectedPastCampaign.impactScore * 10}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Volunteer Satisfaction
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {Math.round(selectedPastCampaign.successRate)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{
                          width: `${selectedPastCampaign.successRate}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Resource Efficiency
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {Math.round(selectedPastCampaign.impactScore * 8.5)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{
                          width: `${selectedPastCampaign.impactScore * 8.5}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Testimonials
                </h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "This campaign made a real difference in our community.
                      I'm proud to have been part of it!"
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      — Volunteer Participant
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border-l-4 border-green-500">
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "Thanks to all the volunteers, we were able to exceed our
                      initial goals and help more people than expected."
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      — Campaign Organizer
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowPastDetails(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Campaigns_Seeker;
