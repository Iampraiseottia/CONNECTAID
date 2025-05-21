"use client";

import React, { useState, useEffect } from "react";

import {
  Search,
  Filter,
  Share2,
  Calendar,
  Users,
  X,
  Eye,
} from "lucide-react";

import { motion } from "motion/react";

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

import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Campaigns = ({ setActiveComponent }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedCampaigns, setLikedCampaigns] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLikes = localStorage.getItem("likedCampaigns");
      if (storedLikes) {
        try {
          const parsedLikes = JSON.parse(storedLikes);
          setLikedCampaigns(parsedLikes);
        } catch (e) {
          console.error("Error parsing liked campaigns from localStorage:", e);

          localStorage.setItem("likedCampaigns", JSON.stringify({}));
        }
      }
    }
  }, []);

  // Sample campaign data - in production you would fetch this from your API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCampaigns([
        {
          id: 1,
          title: "Provide Clean Water in Rural Communities",
          description:
            "Help us provide clean drinking water to communities struggling with access to safe water sources.",
          category: "basic-needs",
          categoryName: "Basic Needs",
          icon: faSeedling,
          raised: 26058500,
          goal: 35750000,
          supporters: 345,
          daysLeft: 35,
          image: "/gallery/water.png",
          location: "East Africa",
        },
        {
          id: 2,
          title: "Educational Support for Children",
          description:
            "Support education initiatives for children in low-income areas by providing school supplies and resources.",
          category: "education",
          categoryName: "Education",
          icon: faGraduationCap,
          raised: 6127500,
          goal: 10000000,
          supporters: 189,
          daysLeft: 50,
          image: "/gallery/education.png",
          location: "North Africa",
        },
        {
          id: 3,
          title: "Medical Aid for Rural Health Centers",
          description:
            "Help us supply essential medical equipment and medications to rural health centers.",
          category: "healthcare",
          categoryName: "Healthcare",
          icon: faHeartPulse,
          raised: 12050250,
          goal: 53000000,
          supporters: 278,
          daysLeft: 71,
          image: "/gallery/medical.png",
          location: "West Africa",
        },
        {
          id: 4,
          title: " Extreme Case",
          description:
            "Your donation can support those facing extreme hardships and urgent needs!",
          category: "Extreme Case",
          categoryName: "Extreme Case",
          icon: faPaw,
          raised: 100000000,
          goal: 20000000,
          supporters: 125,
          daysLeft: 95,
          image: "/gallery/suffering.png",
          location: "Central Africa",
        },
        {
          id: 5,
          title: "Food Initiative",
          description:
            "Join our mission to reduce hunger by supporting sustainable food production and distribution programs.",
          category: "food",
          categoryName: "Food",
          icon: faUtensils,
          raised: 8650000,
          goal: 20000000,
          supporters: 210,
          daysLeft: 115,
          image: "/gallery/endHunger.png",
          location: "Southeast Africa",
        },
        {
          id: 6,
          title: "Homeless Shelter Support Program",
          description:
            "Support our shelter providing temporary housing, meals, and resources for people experiencing homelessness.",
          category: "housing",
          categoryName: "Housing",
          icon: faHome,
          raised: 28500000,
          goal: 28500000,
          supporters: 231,
          daysLeft: 138,
          image: "/gallery/donateList-1.png",
          location: "Africa",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter campaigns based on category and search query
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesFilter = filter === "all" || campaign.category === filter;
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle donation button click
  const handleDonate = (campaignId) => {
    console.log(`Donating to campaign ${campaignId}`);
  };

  // Categories for filter
  const categories = [
    { id: "all", name: "All Campaigns", icon: faHandHoldingHeart },
    { id: "basic-needs", name: "Basic Needs", icon: faSeedling },
    { id: "education", name: "Education", icon: faGraduationCap },
    { id: "healthcare", name: "Healthcare", icon: faHeartPulse },
    { id: "extreme case", name: "Extreme case", icon: faPaw },
    { id: "food", name: "Food", icon: faUtensils },
    { id: "housing", name: "Housing", icon: faHome },
  ];

  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  // Donate Now Setup

  const [showPaymentsPlace, setShowPaymentsPlace] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setShowPaymentsPlace(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-14"
    >
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
              <FontAwesomeIcon icon={category.icon} className="h-4 w-4 mr-2" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            Error loading campaigns. Please try again later.
          </p>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">
            No campaigns found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-56 object-cover hover:scale-[1.01] ease-in-out duration-200"
                />
                <span className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 text-teal-600 dark:text-teal-400 px-3 py-1 rounded-full text-sm font-medium">
                  <FontAwesomeIcon icon={campaign.icon} className="mr-1" />
                  {campaign.categoryName}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {campaign.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {campaign.description}
                </p>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-teal-500 h-2.5 rounded-full"
                      style={{
                        width: `${calculateProgress(
                          campaign.raised,
                          campaign.goal
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-slate-700 dark:text-gray-300 mb-4">
                  <span className="font-medium">
                    {campaign.raised.toLocaleString()} Francs raised
                  </span>
                  <span> {campaign.goal.toLocaleString()} Francs</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{campaign.supporters} supporters</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5 relative">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center gap-1 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      <Eye size={14} />
                      <span className="hidden sm:inline">View</span>
                    </button>

                    <button
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Share"
                    >
                      <Share2 className="h-5 w-5 text-slate-500 dark:text-gray-400" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleViewDetails(campaign)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Details Modal */}
      {showPaymentsPlace && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Donate Now Payments Place
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Campaigns;
