"use client";

import React, { useState } from "react";

import {
  Eye,
  Download,
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
import Image from "next/image";

const MyDonations = ({ setActiveComponent }) => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
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
    const fetchDonations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/my-donation");

        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }

        const data = await response.json();

        // Transform the database data to match the component's expected format
        const transformedDonations = data.donations.map((donation) => ({
          id: `DON-${donation.id}`,
          campaign: donation.campaign_title,
          organization: "ConnectAID",
          date: donation.created_at.split("T")[0],
          amount: donation.amount,
          status: donation.status,
          category: donation.campaign_category,
          receipt: `R-${donation.transaction_id}`,
          impact: getImpactMessage(donation.campaign_category, donation.amount),
          description: donation.campaign_description,
          beneficiaries: getBeneficiaries(donation.campaign_category),
          location: "Cameroon",
          contactPerson: "ConnectAID",
          contactEmail: "connectaid@gmail.com",
          transactionId: donation.transaction_id,
          paymentMethod: donation.payment_method,
          donorName: donation.donor_name,
          phoneNumber: donation.phone_number,
          campaignImage: donation.campaign_image,
        }));

        setDonations(transformedDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const getImpactMessage = (category, amount) => {
    const baseMessages = {
      Food: "Helped provide meals to families in need",
      Education: "Supported educational resources for students",
      Healthcare: "Contributed to medical care and treatment",
      "Disaster Relief": "Provided emergency assistance to affected families",
      Children: "Supported children and youth programs",
      Environment: "Contributed to environmental conservation efforts",
      Humanitarian: "Provided humanitarian aid to communities",
      "Extreme-Cases": "Provided critical emergency assistance",
      "Poverty Alleviation": "Helped families escape poverty",
    };

    return baseMessages[category] || "Made a positive impact in the community";
  };

  const getBeneficiaries = (category) => {
    const beneficiaryMessages = {
      Food: "Families facing food insecurity",
      Education: "Students from underserved communities",
      Healthcare: "Patients in need of medical care",
      "Disaster Relief": "Families affected by disasters",
      Children: "Children and youth in our programs",
      Environment: "Local communities and wildlife",
      Humanitarian: "Communities in crisis",
      "Extreme-Cases": "Individuals in extreme situations",
      "Poverty Alleviation": "Low-income families",
    };

    return beneficiaryMessages[category] || "Community members in need";
  };

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

  const openDonationDetail = (donation) => {
    setSelectedDonation(donation);
    setShowDetailModal(true);
  };

  const closeDonationDetail = () => {
    setShowDetailModal(false);
    setSelectedDonation(null);
  };

  const filteredDonations = donations.filter((donation) => {
    // Filter by status
    if (filter !== "all" && donation.status !== filter) return false;

    // Filter by search query
    if (
      searchQuery &&
      !donation.campaign.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !donation.organization.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by date range
    if (dateRange.from && new Date(donation.date) < new Date(dateRange.from))
      return false;
    if (dateRange.to && new Date(donation.date) > new Date(dateRange.to))
      return false;

    // Filter by amount range
    if (amountRange.min && donation.amount < parseFloat(amountRange.min))
      return false;
    if (amountRange.max && donation.amount > parseFloat(amountRange.max))
      return false;

    // Filter by categories
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(donation.category)
    )
      return false;

    return true;
  });

  const totalDonated = filteredDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  const completedCount = filteredDonations.filter(
    (d) => d.status === "completed"
  ).length;
  const pendingCount = filteredDonations.filter(
    (d) => d.status === "pending"
  ).length;
  const recurringCount = filteredDonations.filter(
    (d) => d.status === "recurring"
  ).length;

  // DonationDetailModal Component
  const DonationDetailModal = ({ donation, onClose }) => {
    if (!donation) return null;

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
        case "pending":
          return <Clock className="text-yellow-600 dark:text-yellow-400" />;
        case "recurring":
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
              {getStatusIcon(donation.status)}
              <h2 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                Donation Details
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
            <Image
              src={donation.campaignImage}
              width={400}
              height={400}
              alt={donation.campaign}
              className="w-full h-96 object-cover mb-6"
            />

            {/* Primary Info */}
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="rounded-full bg-teal-100 dark:bg-teal-900 p-2 mr-3 mt-1">
                    <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      ID
                    </h3>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {donation.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mr-3 mt-1">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Date
                    </h3>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {formatDate(donation.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-2 mr-3 mt-1">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Amount
                    </h3>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {donation.amount} Francs
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
                      {donation.category}
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
                      Campaign Name
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {donation.campaign}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Organization
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {donation.organization}
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
                          donation.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800 hover:text-green-900 dark:hover:text-green-50 ease-in-out transition-colors"
                            : donation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800 hover:text-yellow-900 dark:hover:text-yellow-50 ease-in-out transition-colors"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-900 dark:hover:text-blue-50 ease-in-out transition-colors"
                        }`}
                      >
                        {donation.status.charAt(0).toUpperCase() +
                          donation.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  {donation.status === "recurring" && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Next Payment Date
                      </h4>
                      <p className="text-gray-800 dark:text-gray-200">
                        {formatDate(donation.nextPaymentDate)}
                      </p>
                    </div>
                  )}
                  {donation.status === "pending" && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Expected Completion
                      </h4>
                      <p className="text-gray-800 dark:text-gray-200">
                        {formatDate(donation.expectedCompletionDate)}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Receipt Number
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {donation.receipt}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Contact Person
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {donation.contactPerson}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Contact Email
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {donation.contactEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Impact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Impact Summary
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {donation.impact}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Description
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {donation.description}
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
                        {donation.location}
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
                        {donation.beneficiaries}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Preview */}
            {donation.status !== "pending" && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Receipt
                  </h3>
                  <button className="flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                    <Download size={18} className="mr-1" />
                    <span>Download Receipt</span>
                  </button>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    Receipt {donation.receipt}
                  </p>
                  <div className="flex flex-col items-center justify-center my-4">
                    <FileText
                      size={64}
                      className="text-gray-300 dark:text-gray-600 mb-2"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click download to get your receipt
                    </p>
                  </div>
                </div>
              </div>
            )}
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
            My Donations
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Total Amount Donated"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Donated
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalDonated} Francs
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
                  Completed Donations
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
            title="Pending"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pending Donations
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingCount}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-800 rounded-full">
                <AlertCircle
                  size={20}
                  className="text-yellow-600 dark:text-yellow-300"
                />
              </div>
            </div>
          </div>

          <div
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Recurring"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Recurring Donations
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {recurringCount}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                <Tag size={20} className="text-blue-600 dark:text-blue-300" />
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
                  placeholder="Search donations..."
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
                  onClick={() => setFilter("pending")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "pending"
                      ? "bg-teal-600 dark:bg-teal-700 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("recurring")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "recurring"
                      ? "bg-teal-600 dark:bg-teal-700 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  Recurring
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

              <button className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                <Download
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

        {/* Donations Table */}
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
                      Donation
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
                  {filteredDonations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {donation.campaign}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {donation.organization}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(donation.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {donation.amount} Francs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            donation.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : donation.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {donation.status.charAt(0).toUpperCase() +
                            donation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {donation.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-teal-600 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 mr-3"
                          title="View Donation Details"
                          onClick={() => openDonationDetail(donation)}
                        >
                          <Eye size={18} />
                        </button>
                        {donation.status !== "pending" && (
                          <button
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                            title="Download Receipt"
                          >
                            <Download size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal for donation details */}
        {showDetailModal && (
          <DonationDetailModal
            donation={selectedDonation}
            onClose={closeDonationDetail}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MyDonations;
