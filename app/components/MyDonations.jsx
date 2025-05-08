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

import globalStyle from "../globals.css";

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
    "Animal Welfare",
    "Humanitarian",
  ];

  React.useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setDonations([
        {
          id: "DON-2025-001",
          campaign: "Clean Water Initiative",
          organization: "Water for All",
          date: "2025-04-15",
          amount: 10000,
          status: "completed",
          category: "Humanitarian",
          receipt: "R-2025-001",
          impact: "Provided clean water to an entire local community",
          description:
            "This donation helped fund the construction of a water treatment facility in a rural community facing water scarcity and contamination issues.",
          beneficiaries: "350 families in Karatu Village",
          location: "Eastern Province",
          taxDeductible: true,
          contactPerson: "Maria Hernandez",
          contactEmail: "m.hernandez@waterforall.org",
        },
        {
          id: "DON-2025-002",
          campaign: "School Supplies Drive",
          organization: "Education First",
          date: "2025-03-22",
          amount: 30000,
          status: "completed",
          category: "Education",
          receipt: "R-2025-002",
          impact: "Equipped 8 students with supplies",
          description:
            "Your donation provided textbooks, notebooks, calculators, and other essential school supplies to underprivileged students.",
          beneficiaries: "8 high school students from low-income families",
          location: "Central District Schools",
          taxDeductible: true,
          contactPerson: "David Omondi",
          contactEmail: "d.omondi@educationfirst.org",
        },
        {
          id: "DON-2025-003",
          campaign: "Hurricane Relief Fund",
          organization: "Disaster Response Team",
          date: "2025-02-10",
          amount: 250000,
          status: "completed",
          category: "Disaster Relief",
          receipt: "R-2025-003",
          impact: "Helped 5 families with emergency housing",
          description:
            "Your generous contribution provided temporary housing, food, clean water, and basic necessities to families displaced by Hurricane Marcus.",
          beneficiaries: "5 families (21 individuals)",
          location: "Coastal Region",
          taxDeductible: true,
          contactPerson: "James Wilson",
          contactEmail: "j.wilson@disasterresponse.org",
        },
        {
          id: "DON-2025-004",
          campaign: "Monthly Children's Hospital Support",
          organization: "Children's Medical Foundation",
          date: "2025-04-01",
          amount: 50000,
          status: "recurring",
          category: "Healthcare",
          receipt: "R-2025-004",
          impact: "Contributed to pediatric care",
          description:
            "Your monthly donation supports ongoing medical treatment for children with chronic illnesses, helping to cover medication costs and specialized care.",
          beneficiaries: "Children's Ward at Regional Hospital",
          location: "Metropolitan Medical Center",
          taxDeductible: true,
          contactPerson: "Dr. Sarah Chen",
          contactEmail: "s.chen@childrenmedical.org",
          nextPaymentDate: "2025-05-01",
        },
        {
          id: "DON-2025-005",
          campaign: "Shelter For Homeless",
          organization: "Housing Support",
          date: "2025-07-09",
          amount: 85000,
          status: "completed",
          category: "Environment",
          receipt: "R-2025-005",
          impact: "Supported habitat restoration efforts",
          description:
            "Your donation contributed to the construction of environmentally sustainable temporary housing units for homeless individuals.",
          beneficiaries: "12 individuals experiencing homelessness",
          location: "Western District",
          taxDeductible: true,
          contactPerson: "Patrick Mwangi",
          contactEmail: "p.mwangi@housingsupport.org",
        },
        {
          id: "DON-2025-006",
          campaign: "Food Bank Distribution",
          organization: "Community Helpers",
          date: "2025-04-10",
          amount: 20000,
          status: "pending",
          category: "Poverty Alleviation",
          receipt: "Pending",
          impact: "Processing",
          description:
            "This donation will help stock local food banks with nutritious meals for families facing food insecurity.",
          beneficiaries: "Estimated 25 families",
          location: "Southern Community Center",
          taxDeductible: true,
          contactPerson: "Elena Rodriguez",
          contactEmail: "e.rodriguez@communityhelpers.org",
          expectedCompletionDate: "2025-04-20",
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
          return <CheckCircle className="text-green-600" />;
        case "pending":
          return <Clock className="text-yellow-600" />;
        case "recurring":
          return <RefreshCw className="text-blue-600" />;
        default:
          return <HelpCircle className="text-gray-600" />;
      }
    };

    // View Receipt Content

    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        viewport={{ once: true, amount: 0.05 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              {getStatusIcon(donation.status)}
              <h2 className="ml-2 text-xl font-bold text-gray-800">
                Donation Details
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Primary Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="rounded-full bg-teal-100 p-2 mr-3 mt-1">
                    <FileText className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">ID</h3>
                    <p className="text-lg font-semibold dark:text-black text-black ">{donation.id}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-2 mr-3 mt-1">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date</h3>
                    <p className="text-lg font-semibold dark:text-black text-black ">
                      {formatDate(donation.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-green-100 p-2 mr-3 mt-1">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Amount
                    </h3>
                    <p className="text-lg font-semibold dark:text-black text-black ">
                      {donation.amount} Francs
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-yellow-100 p-2 mr-3 mt-1">
                    <Tag className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Category
                    </h3>
                    <p className="text-lg font-semibold dark:text-black text-black ">{donation.category}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Campaign Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Campaign Name
                    </h4>
                    <p className="text-gray-800">{donation.campaign}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Organization
                    </h4>
                    <p className="text-gray-800">{donation.organization}</p>
                  </div>
                  <div className="mb-4 flex justify-start align-middle mt-2 ">
                    <h4 className="text-sm font-medium text-gray-500 mt-4"> 
                      Status: 
                    </h4> 
                    <div className="flex items-center mt-1 ml-4 ">
                      <span 
                        className={`px-7 py-3 inline-flex text-[16px] leading-5 font-semibold rounded-full 
                        ${ 
                          donation.status === "completed" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 ease-in-out transition-colors"
                            : donation.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900 ease-in-out transition-colors" 
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 ease-in-out transition-colors"
                        }`} 
                      >
                        {donation.status.charAt(0).toUpperCase() +
                          donation.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  {donation.status === "recurring" && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">
                        Next Payment Date
                      </h4>
                      <p className="text-gray-800">
                        {formatDate(donation.nextPaymentDate)}
                      </p>
                    </div>
                  )}
                  {donation.status === "pending" && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">
                        Expected Completion
                      </h4>
                      <p className="text-gray-800">
                        {formatDate(donation.expectedCompletionDate)}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Receipt Number
                    </h4>
                    <p className="text-gray-800">{donation.receipt}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Tax Deductible
                    </h4>
                    <p className="text-gray-800">
                      {donation.taxDeductible ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Contact Person
                    </h4>
                    <p className="text-gray-800">{donation.contactPerson}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Contact Email
                    </h4>
                    <p className="text-gray-800">{donation.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Impact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Impact Summary
                    </h4>
                    <p className="text-gray-800">{donation.impact}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Description
                    </h4>
                    <p className="text-gray-800">{donation.description}</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4 flex items-start">
                    <MapPin className="text-gray-400 mr-2 mt-1" size={16} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Location
                      </h4>
                      <p className="text-gray-800">{donation.location}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-start">
                    <Users className="text-gray-400 mr-2 mt-1" size={16} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Beneficiaries
                      </h4>
                      <p className="text-gray-800">{donation.beneficiaries}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Preview */}
            {donation.status !== "pending" && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Receipt
                  </h3>
                  <button className="flex items-center text-teal-600 hover:text-teal-700">
                    <Download size={18} className="mr-1" />
                    <span>Download Receipt</span>
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-gray-500 mb-2">
                    Receipt {donation.receipt}
                  </p>
                  <div className="flex flex-col items-center justify-center my-4">
                    <FileText size={64} className="text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click download to get your receipt
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-center mx-auto rounded-b-lg">
            <button
              onClick={onClose}
              className="px-4 py-2 w-full cursor-pointer text-white text-2xl tracking-wide font-bold rounded-md bg-teal-600 hover:bg-teal-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Main My DOnation Content

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setActiveComponent("dashboardMain")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">My Donations</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Total Amount Donated"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Donated
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalDonated} Francs
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-full">
                <DollarSign size={20} className="text-teal-600" />
              </div>
            </div>
          </div>

          <div
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Completed"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Completed Donations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedCount}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar size={20} className="text-green-600" />
              </div>
            </div>
          </div>

          <div
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Pending"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Donations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingCount}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out"
            title="Recurring"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Recurring Donations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {recurringCount}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Tag size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow ease-in-out">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search donations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-white dark:text-black "
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
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "completed"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "pending"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("recurring")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === "recurring"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Recurring
                </button>
              </div>

              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                <Filter size={20} className="text-gray-600" />
              </button>

              <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                <Download size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          {showFilter && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        From
                      </label>
                      <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, from: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm dark:bg-white dark:text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        To
                      </label>
                      <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, to: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm dark:bg-white dark:text-black"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Amount Range
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
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
                        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm dark:bg-white dark:text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
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
                        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm dark:bg-white dark:text-black"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-2 py-1 text-xs rounded-md ${
                          selectedCategories.includes(category)
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-800"
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
                  className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md mr-2 hover:bg-gray-200"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="px-4 py-1.5 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Donations Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow ease-in-out">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center">Loading...</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {donation.campaign}
                          </div>
                          <div className="text-sm text-gray-500">
                            {donation.organization}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(donation.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {donation.amount} Francs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            donation.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : donation.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {donation.status.charAt(0).toUpperCase() +
                            donation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donation.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-teal-600 hover:text-teal-900 mr-3"
                          title="View Donation Details"
                          onClick={() => openDonationDetail(donation)}
                        >
                          <Eye size={18} />
                        </button>
                        {donation.status !== "pending" && (
                          <button
                            className="text-gray-600 hover:text-gray-900"
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
