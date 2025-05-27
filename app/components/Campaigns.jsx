"use client";

import React, { useState, useEffect } from "react";

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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faSeedling,
  faGraduationCap,
  faHeartPulse,
  faPaw,
  faUtensils,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import { motion } from "motion/react";

const Campaigns = () => {

  const [joinedActiveCampIds, setJoinedActiveCampIds] = useState({});
  const [activeCampaigns, setActiveCampaigns] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); 

  // State for form visibility and data
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // State for past campaign details
  const [showPastDetails, setShowPastDetails] = useState(false);
  const [selectedPastCampaign, setSelectedPastCampaign] = useState(null);

  // Available categories
  const categories = [
    { id: "all", name: "All Categories", icon: faHandHoldingHeart },
    { id: "Food & Supplies", name: "Food & Supplies", icon: faUtensils },
    { id: "Environmental", name: "Environmental", icon: faSeedling },
    { id: "Education", name: "Education", icon: faGraduationCap },
    { id: "Healthcare", name: "Healthcare", icon: faHeartPulse },
    { id: "Crisis Relief", name: "Crisis Relief", icon: faPaw },
    { id: "Other", name: "Other", icon: faHome },
  ];

  // Filter campaigns based on search term and category filters 
  const filteredCampaigns = activeCampaigns.filter((campaign) => {
    const matchesFilter = filter === "all" || campaign.category === filter;
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });


  // Handle View Details

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDetails(true); 
  };


  // Fetching Past Successful Event Data from Postgres

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActiveCampaigns() {
      try {
        const response = await fetch("/api/campaigns-donation");
        if (!response.ok) {
          throw new Error("Failed to fetch active campaigns");
        }
        const data = await response.json();
        setActiveCampaigns(data.activeCampaigns);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchActiveCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  if (error)
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-20"
    >
      <div className="max-w-6xl mx-auto rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Active Campaigns
          </h1>
          <p className="text-slate-600 dark:text-gray-300">
            Browse through current campaigns and support causes that matter to
            you.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
            </div>

            <div className="flex items-center gap-2 text-sm w-full md:w-auto">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              <span className="text-gray-600 dark:text-gray-300">Filter:</span>
              <select
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  filter === category.id
                    ? "bg-teal-500 text-white"
                    : "bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
                onClick={() => setFilter(category.id)}
              >
                <FontAwesomeIcon
                  icon={category.icon}
                  className="h-4 w-4 mr-2"
                />
                {category.name}
              </button>
            ))}
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
                  Category
                </th>
               
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                  Raised Amount
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Target Amount
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            

            <tbody className="divide-y divide-gray-200">
              {activeCampaigns.map((activeCamp) => (
                <tr key={activeCamp.id}  className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200">
                      {activeCamp.title}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden md:table-cell">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full 
                        bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      >
                        {activeCamp.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden sm:table-cell">
                      {activeCamp.raisedamount}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden md:table-cell">
                      {activeCamp.totalamount}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden lg:table-cell">
                      {activeCamp.date}
                    </td>
                    
                    <td className="py-4 px-4 text-sm flex gap-2">
                      <button
                        onClick={() => handleViewDetails(activeCamp)}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center gap-1 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <Eye size={14} />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button
                        onClick={() => {
                          handleJoin(activeCamp.id);
                          handleJoinactiveCamp(activeCamp.id);
                        }}
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200 flex items-center gap-1 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
                      >
                        <UserCheck size={14} />
                        <span className="hidden sm:inline">
                          {joinedActiveCampIds[activeCamp.id]
                            ? "Request Received"
                            : "Join activeCamp"}
                        </span>
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default Campaigns;
