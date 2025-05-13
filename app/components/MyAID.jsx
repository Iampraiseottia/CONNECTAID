"use client";

import React, { useState } from "react";

import {
  Eye,
  X,
  CheckCircle,
  Clock,
  RefreshCw,
  Calendar,
  DollarSign,
  Tag,
  FileText,
  HelpCircle,
  MapPin,
  Users,
  Filter,
  ArrowLeft,
  AlertCircle,
  Search,
} from "lucide-react";

import { motion } from "motion/react";

import AID1 from "/public/gallery/water.png";
import AID2 from "/public/gallery/africanchildren.png";
import AID4 from "/public/gallery/medical.png";
import AID5 from "/public/gallery/donateList-1.png";
import AID6 from "/public/gallery/chop2.png";

import Image from "next/image";

const MyAID = ({ setActiveComponent }) => {
  const [AIDs, setAIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAIDs, setSelectedAIDs] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const categories = [
    "Education",
    "Healthcare",
    "Disaster Relief",
    "Poverty Alleviation",
    "Children",
    "Environment",
    "Humanitarian",
  ];

  React.useEffect(() => {
    setTimeout(() => {
      setAIDs([
        {
          id: "AID-2025-001",
          campaign: "Clean Water Initiative",
          organization: "Water for All",
          date: "2025-04-15",
          amount: 10000,
          status: "completed",
          category: "Humanitarian",
          impact: "Provided clean water to an entire local community",
          description:
            "This donation helped fund the construction of a water treatment facility in a rural community facing water scarcity and contamination issues.",
          beneficiaries: "350 families in Karatu Village",
          location: "Eastern Province",
          campaignCreator: "Maria Hernandez",
          creatorEmail: "m.hernandez@waterforall.org",
          campaignImage: AID1,
          alt: "AID Image 1",
        },
        {
          id: "AID-2025-002",
          campaign: "School Supplies Drive",
          organization: "Education First",
          date: "2025-03-22",
          amount: 30000,
          status: "completed",
          category: "Education",
          impact: "Equipped 8 students with supplies",
          description:
            "Your donation provided textbooks, notebooks, calculators, and other essential school supplies to underprivileged students.",
          beneficiaries: "8 high school students from low-income families",
          location: "Central District Schools",
          campaignCreator: "David Omondi",
          creatorEmail: "d.omondi@educationfirst.org",
          campaignImage: AID2,
          alt: "AID Image 2",
        },
        {
          id: "AID-2025-004",
          campaign: "Monthly Children's Hospital Support",
          organization: "Children's Medical Foundation",
          date: "2025-04-01",
          amount: 50000,
          status: "rejected",
          category: "Healthcare",
          impact: "Contributed to pediatric care",
          description:
            "Your monthly donation supports ongoing medical treatment for children with chronic illnesses, helping to cover medication costs and specialized care.",
          beneficiaries: "Children's Ward at Regional Hospital",
          location: "Metropolitan Medical Center",
          campaignCreator: "Dr. Sarah Chen",
          creatorEmail: "s.chen@childrenmedical.org",
          nextPaymentDate: "2025-05-01",
          campaignImage: AID4,
          alt: "AID Image 4",
        },
        {
          id: "AID-2025-005",
          campaign: "Shelter For Homeless",
          organization: "Housing Support",
          date: "2025-07-09",
          amount: 85000,
          status: "completed",
          category: "Environment",
          impact: "Supported habitat restoration efforts",
          description:
            "Your donation contributed to the construction of environmentally sustainable temporary housing units for homeless individuals.",
          beneficiaries: "12 individuals experiencing homelessness",
          location: "Western District",
          campaignCreator: "Patrick Mwangi",
          creatorEmail: "p.mwangi@housingsupport.org",
          campaignImage: AID5,
          alt: "AID Image 5",
        },
        {
          id: "AID-2025-006",
          campaign: "Food Bank Distribution",
          organization: "Community Helpers",
          date: "2025-04-10",
          amount: 20000,
          status: "on_going",
          category: "Poverty Alleviation",
          impact: "Processing",
          description:
            "This donation will help stock local food banks with nutritious meals for families facing food insecurity.",
          beneficiaries: "Estimated 25 families",
          location: "Southern Community Center",
          campaignCreator: "Elena Rodriguez",
          creatorEmail: "e.rodriguez@communityhelpers.org",
          expectedCompletionDate: "2025-04-20",
          campaignImage: AID6,
          alt: "AID Image 6",
        },
      ]); 
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const resetFilters = () => {
    setFilter("all");
    setSearchQuery("");
    setDateRange({ from: "", to: "" });
    setAmountRange({ min: "", max: "" });
    setSelectedCategories([]);
  };

  const openAIDsDetail = (AIDs) => {
    setSelectedAIDs(AIDs);
    setShowDetailModal(true);
  };

  const closeAIDsDetail = () => {
    setShowDetailModal(false);
    setSelectedAIDs(null);
  };

  const filteredAIDs = AIDs.filter((AIDs) => {
    // Filter by status
    if (filter !== "all" && AIDs.status !== filter) return false;

    // Filter by search query
    if (
      searchQuery &&
      !AIDs.campaign.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !AIDs.organization.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by date range
    if (dateRange.from && new Date(AIDs.date) < new Date(dateRange.from))
      return false;
    if (dateRange.to && new Date(AIDs.date) > new Date(dateRange.to))
      return false;

    // Filter by amount range
    if (amountRange.min && AIDs.amount < parseFloat(amountRange.min))
      return false;
    if (amountRange.max && AIDs.amount > parseFloat(amountRange.max))
      return false;

    // Filter by categories
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(AIDs.category)
    )
      return false;

    return true;
  });

  const totalAssistanceReceived = filteredAIDs.reduce(
    (sum, AIDs) => sum + AIDs.amount,
    0
  );

  const completedCount = filteredAIDs.filter(
    (d) => d.status === "completed"
  ).length;
  const onGoingCount = filteredAIDs.filter(
    (d) => d.status === "on_going"
  ).length;
  const rejectedCount = filteredAIDs.filter(
    (d) => d.status === "rejected"
  ).length;

  // AIDsDetailModal Component
  const AIDsDetailModal = ({ AIDs, onClose }) => {
    if (!AIDs) return null;

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case "completed":
          return <CheckCircle className="text-green-600 dark:text-green-400" />;
        case "rejected":
          return <Clock className="text-yellow-600 dark:text-yellow-400" />;
        case "on_going":
          return <RefreshCw className="text-blue-600 dark:text-blue-400" />;
        default:
          return <HelpCircle className="text-gray-600 dark:text-gray-400" />;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.05 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              {getStatusIcon(AIDs.status)}
              <h2 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                Donation Campaign Details
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={24} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Primary Info */}
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="rounded-full bg-teal-100 dark:bg-teal-900 p-2 mr-3 mt-1">
                    <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Campaign Name
                    </h3>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {AIDs.campaign}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mr-3 mt-1">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Campaign Date
                    </h3>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {formatDate(AIDs.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-2 mr-3 mt-1">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Donation Amount
                    </h3>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {AIDs.amount} Francs
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-yellow-100 dark:bg-yellow-900 p-2 mr-3 mt-1">
                    <Tag className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </h3>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {AIDs.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Campaign Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Organization
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {AIDs.organization}
                    </p>
                  </div>
                  <div className="mb-4 flex justify-start align-middle mt-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4">
                      Status:
                    </h4>
                    <div className="flex items-center mt-1 ml-4">
                      <span
                        className={`px-7 py-3 inline-flex text-[16px] leading-5 font-semibold rounded-full 
                      ${
                        AIDs.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800 hover:text-green-900 dark:hover:text-green-50 ease-in-out transition-colors"
                          : AIDs.status === "on_going"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800 hover:text-yellow-900 dark:hover:text-yellow-50 ease-in-out transition-colors"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-900 dark:hover:text-blue-50 ease-in-out transition-colors"
                      }`}
                      >
                        {AIDs.status.charAt(0).toUpperCase() +
                          AIDs.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  {AIDs.status === "rejected" && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Next Payment Date
                      </h4>
                      <p className="text-gray-800 dark:text-gray-200">
                        {formatDate(AIDs.nextPaymentDate)}
                      </p>
                    </div>
                  )}
                  {AIDs.status === "on_going" && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Expected Completion
                      </h4>
                      <p className="text-gray-800 dark:text-gray-200">
                        {formatDate(AIDs.expectedCompletionDate)}
                      </p>
                    </div>
                  )}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Campaign Creator
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {AIDs.campaignCreator}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Creator Email
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {AIDs.creatorEmail}
                    </p>
                  </div>
                </div>

                <div className="border-2 border-green-500 overflow-hidden">
                  <Image
                    src={AIDs.campaignImage}
                    alt={`Campaign ${AIDs.alt}`}
                    height={400}
                    width={400}
                    className="w-full h-full hover:scale-105 ease-in-out duration-300 origin-center"
                  />
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Campaign Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Impact Summary
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {AIDs.impact}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Description
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {AIDs.description}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-4 flex items-start">
                    <MapPin
                      className="text-gray-400 dark:text-gray-500 mr-2 mt-1"
                      size={16}
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Location
                      </h4>
                      <p className="text-gray-800 dark:text-gray-200">
                        {AIDs.location}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-start">
                    <Users
                      className="text-gray-400 dark:text-gray-500 mr-2 mt-1"
                      size={16}
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Beneficiaries
                      </h4>
                      <p className="text-gray-800 dark:text-gray-200">
                        {AIDs.beneficiaries}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-slate-700 px-6 py-4 flex justify-center mx-auto rounded-b-lg">
            <button
              onClick={onClose}
              className="px-4 py-2 w-full cursor-pointer text-white text-2xl tracking-wide font-bold rounded-md bg-teal-600 hover:bg-teal-500 dark:bg-teal-700 dark:hover:bg-teal-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setActiveComponent("dashboardMain")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-800 dark:text-gray-200" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            My AID Assistance
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Total Assistance Received"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Assistance Received
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalAssistanceReceived} Francs
                </p>
              </div>
              <div className="p-3 bg-teal-100 dark:bg-teal-800 rounded-full">
                <DollarSign
                  size={20}
                  className="text-teal-600 dark:text-teal-300"
                />
              </div>
            </div>
          </div>

          <div
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Completed"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Completed AIDs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedCount}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                <Calendar
                  size={20}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
            </div>
          </div>

          <div
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="On-going"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  On-going AIDs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {onGoingCount}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                <AlertCircle
                  size={20}
                  className="text-blue-600 dark:text-blue-300"
                />
              </div>
            </div>
          </div>

          <div
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Rejected AIDs"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Rejected AIDs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {rejectedCount}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-800 rounded-full">
                <Tag
                  size={20}
                  className="text-yellow-600 dark:text-yellow-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow ease-in-out">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search AIDs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "all"
                      ? "bg-teal-600 dark:bg-teal-700 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "completed"
                      ? "bg-teal-600 dark:bg-teal-700 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter("on_going")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "on_going"
                      ? "bg-teal-600 dark:bg-teal-700 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  On-Going
                </button>
                <button
                  onClick={() => setFilter("rejected")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "rejected"
                      ? "bg-teal-600 dark:bg-teal-700 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  Rejected
                </button>
              </div>

              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Filter
                  size={20}
                  className="text-gray-600 dark:text-gray-300"
                />
              </button>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          {showFilter && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        From
                      </label>
                      <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, from: e.target.value })
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        To
                      </label>
                      <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, to: e.target.value })
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount Range
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Min (Francs)
                      </label>
                      <input
                        type="number"
                        value={amountRange.min}
                        onChange={(e) =>
                          setAmountRange({
                            ...amountRange,
                            min: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Max (Francs)
                      </label>
                      <input
                        type="number"
                        value={amountRange.max}
                        onChange={(e) =>
                          setAmountRange({
                            ...amountRange,
                            max: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-2 py-1 text-xs rounded-md ${
                          selectedCategories.includes(category)
                            ? "bg-teal-600 dark:bg-teal-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md mr-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="px-4 py-1.5 text-sm bg-teal-600 dark:bg-teal-500 text-white rounded-md hover:bg-teal-700 dark:hover:bg-teal-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AIDs Table */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow ease-in-out">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-600 dark:text-gray-300">
                Loading...
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Donation AIDs Received
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAIDs.map((AIDs) => (
                    <tr
                      key={AIDs.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {AIDs.campaign}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {AIDs.organization}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(AIDs.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {AIDs.amount} Francs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            AIDs.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : AIDs.status === "rejected"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {AIDs.status.charAt(0).toUpperCase() +
                            AIDs.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {AIDs.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="flex items-center justify-end  text-teal-600 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 mr-3"
                          title="View AIDs Details"
                          onClick={() => openAIDsDetail(AIDs)}
                        >
                          View <Eye className="ml-1" size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal for AIDs details */}
        {showDetailModal && (
          <AIDsDetailModal AIDs={selectedAIDs} onClose={closeAIDsDetail} />
        )}
      </div>
    </motion.div>
  );
};

export default MyAID;
