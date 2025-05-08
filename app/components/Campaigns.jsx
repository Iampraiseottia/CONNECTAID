"use client";

import React, { useState, useEffect } from "react";

import {
  Search,
  Filter,
  Heart,
  Share2,
  Calendar,
  Users,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

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
          title: "Educational Support for Underprivileged Children",
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

  // Handle like button click and update localStorage
  const handleLike = (campaignId) => {
    setLikedCampaigns((prev) => {
      const newLikedState = {
        ...prev,
        [campaignId]: !prev[campaignId],
      };

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("likedCampaigns", JSON.stringify(newLikedState));
      }

      return newLikedState;
    });
  };

  // Floating Heart Animation Component
  const FloatingHearts = ({ campaignId }) => {
    const hearts = [1, 2, 3, 4, 5]; 

    return (
      <AnimatePresence>
        {likedCampaigns[campaignId] && (
          <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden pointer-events-none">
            {hearts.map((heart, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 0, x: `${20 + Math.random() * 60}%` }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -80,
                  transition: {
                    duration: 2, 
                    times: [0, 0.1, 1],
                    delay: index * 0.1,
                  },
                }}
                exit={{ opacity: 0 }}
                className="absolute"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-red-500"
                  style={{
                    fontSize: `${12 + Math.random() * 8}px`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    );
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 bg-gray-50 min-h-screen mt-14"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Active Campaigns
        </h1>
        <p className="text-slate-600">
          Browse through current campaigns and support causes that matter to
          you.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white dark:text-black"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 text-sm w-full md:w-auto">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">Filter:</span>
            <select
              className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white dark:text-black dark:border-gray-500 dark:focus:ring-teal-500"
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
                  : "bg-white text-slate-700 hover:bg-gray-100"
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
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600">
            Error loading campaigns. Please try again later.
          </p>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No campaigns found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-white/90 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
                  <FontAwesomeIcon icon={campaign.icon} className="mr-1" />
                  {campaign.categoryName}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {campaign.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-2">
                  {campaign.description}
                </p>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
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

                <div className="flex justify-between text-sm text-slate-700 mb-4">
                  <span className="font-medium">
                    {campaign.raised.toLocaleString()} Francs raised
                  </span>
                  <span> {campaign.goal.toLocaleString()} Francs</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{campaign.supporters} supporters</span> 
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 relative">
                  <div className="flex space-x-2">
                    <button
                      className="p-2 rounded-full hover:bg-gray-100 relative overflow-visible"
                      onClick={() => handleLike(campaign.id)}
                      title="Like"
                    >
                      {likedCampaigns[campaign.id] ? (
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                        </motion.div>
                      ) : (
                        <Heart className="h-5 w-5 text-slate-500" />
                      )}
                      <FloatingHearts campaignId={campaign.id} />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      title="Share"
                    >
                      <Share2 className="h-5 w-5 text-slate-500" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDonate(campaign.id)}
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
    </motion.div>
  );
};

export default Campaigns;
