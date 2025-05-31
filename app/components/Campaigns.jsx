"use client";

import React, { useState, useEffect, useRef } from "react";

import {
  Search,
  Eye,
  X,
  Filter,
  DollarSign,
  CheckCircle,
  Heart,
  Download,
  Calendar,
  Share2,
  Users,
} from "lucide-react";

import Image from "next/image";

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

import navLogo from "/public/icon/logo.png";

import { motion } from "motion/react";

const Campaigns = () => {
  const [activeCampaigns, setActiveCampaigns] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Available categories
  const categories = [
    { id: "all", name: "All Categories", icon: faHandHoldingHeart },
    { id: "Food & Supplies", name: "Food & Supplies", icon: faUtensils },
    { id: "Water", name: "Water", icon: faSeedling },
    { id: "Education", name: "Education", icon: faGraduationCap },
    { id: "Healthcare", name: "Healthcare", icon: faHeartPulse },
    { id: "Extreme Cases", name: "Extreme Cases", icon: faPaw },
    { id: "Shelter", name: "Shelter", icon: faHome },
  ];

  // Filter campaigns based on search term and category filters
  const filteredCampaigns = (activeCampaigns || []).filter((activeCamp) => {
    const matchesFilter = filter === "all" || activeCamp.category === filter;
    const matchesSearch =
      activeCamp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activeCamp.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activeCamp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activeCamp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  // Donate Now Setup

  const [showPaymentsPlace, setShowPaymentsPlace] = useState(false);
  const [showCampDetails, setShowCampDetails] = useState(false);
  const [showShareCampaigns, setShowShareCampaigns] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [thankYouMessage, setThankYouMessage] = useState(false);

  const handleViewDetails = (campaignId) => {
    setSelectedCampaign(campaignId);
    setShowPaymentsPlace(true);
    setShowCampDetails(false);
  };

  const handleShareLink = (campaignId) => {
    setSelectedCampaign(campaignId);
    setShowShareCampaigns(true);
  };

  const handleShowCampDetails = (campaignId) => {
    setSelectedCampaign(campaignId);
    setShowCampDetails(true);
  };

  const getSelectedCampaignData = () => {
    return activeCampaigns.find((campaign) => campaign.id === selectedCampaign);
  };

  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Donation data for thank you message
  const [donationData, setDonationData] = useState(null);

  const [errors, setErrors] = useState({
    name: "",
    payment: "",
    phoneNumber: "",
    amount: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    {
      id: "mtn_mobile_money",
      name: "mtn_mobile_money",
      src: "/icon/mtn_mobile_money.png",
    },
    {
      id: "orange_mobile_money",
      name: "orange_mobile_money",
      src: "/icon/orange_mobile_money.png",
    },
  ];

  const predefinedAmounts = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 25000, 50000,
    100000, 250000, 500000, 900000,
  ];

  const handleAmountClick = (value) => {
    setAmount(value);
  };

  const handlePaymentMethodClick = (id) => {
    setSelectedPayment(id);
    setErrors((prev) => ({ ...prev, payment: "" }));
  };

  const handleAmountChange = (e) => {
    setAmount(parseInt(e.target.value) || 0);

    const value = e.target.value;
    setAmount(value);

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        amount:
          "Amount is required. Please click the amounts above to select or input amount manually",
      }));
    } else if (value.trim().length < 2) {
      setErrors((prev) => ({
        ...prev,
        amount: "Donation Amount must be at least 2 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, name: "Full Name is required" }));
    } else if (value.trim().length < 7) {
      setErrors((prev) => ({
        ...prev,
        name: "Full Name must be at least 7 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    const phoneNumberRegex = /^\+237[0-9]{9}$/;
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Phone NUmber is required",
      }));
    } else if (!phoneNumberRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber:
          "Please enter a valid phone number as defined in the format below",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
    }
  };

  const amountDonate = useRef(null);
  const nameDonate = useRef(null);
  const phoneNumberDonate = useRef(null);

  const onMouseEnterPhoneNumber = () => {
    if (phoneNumberDonate.current) {
      phoneNumberDonate.current.focus();
    }
  };

  const onMouseEnterAmountDonate = () => {
    if (amountDonate.current) {
      amountDonate.current.focus();
    }
  };

  const onMouseEnterNameDonate = () => {
    if (nameDonate.current) {
      nameDonate.current.focus();
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      payment: "",
      phoneNumber: "",
      amount: "",
    };

    if (!name.trim()) {
      newErrors.name = "Full Name is required";
      valid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = "Full Name must be at least 2 characters";
      valid = false;
    }

    // Fix: Convert amount to string and handle both string and number cases
    const amountStr = String(amount).trim();
    if (!amountStr || amountStr === "0") {
      newErrors.amount =
        "Amount is required. Please click the amounts above to select or input amount manually";
      valid = false;
    } else if (amountStr.length < 3) {
      newErrors.amount = "Donation Amount must be at least 3 characters";
      valid = false;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else {
      const phoneRegex = /^\+237[0-9]{9}$/;
      if (!phoneRegex.test(phoneNumber.trim())) {
        newErrors.phoneNumber =
          "Phone Number must be in format +237 followed by 9 digits";
        valid = false;
      }
    }

    if (!selectedPayment) {
      newErrors.payment = "Please select a payment method";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Generate transaction ID
  const generateTransactionId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TXN-${timestamp}-${randomStr}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Prepare donation data
      const transactionId = generateTransactionId();
      const paymentMethodName =
        paymentMethods.find((method) => method.id === selectedPayment)?.name ||
        selectedPayment;

      const newDonationData = {
        name: name,
        phoneNumber: phoneNumber,
        amount: amount,
        paymentMethod: paymentMethodName,
        transactionId: transactionId,
        timestamp: new Date().toISOString(),
      };

      setDonationData(newDonationData);

      console.log("Form submitted successfully", newDonationData);

      setShowPaymentsPlace(false);
      setThankYouMessage(true);

      setTimeout(() => {
        setIsSubmitting(false);

        setAmount("");
        setName("");
        setPhoneNumber("");
        setSelectedPayment("");
        setSelectedCampaign(null);
      }, 1000000);
    } else {
      console.log("Form has errors");
    }
  };

  // Calculate Donation Postgres
  const calculateProgress = (raisedamount, totalamount) => {
    return Math.min((raisedamount / totalamount) * 100, 100);
  };

  // Formatting MY Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Loading and display error
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
      <div className="max-w-[1500px] mx-auto rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 transition-colors duration-200">]
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Active Campaigns
          </h1>
          <p className="text-slate-600 dark:text-gray-300">
            Browse through current campaigns and support causes that matter to
            you.
          </p>        </div>

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
              {filteredCampaigns.map((activeCamp) => (
                <tr
                  key={activeCamp.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200">
                    {activeCamp.title}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden md:table-cell">
                    <span
                      className="px-4 py-2 text-sm font-semibold rounded-full 
                        bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                    >
                      {activeCamp.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden sm:table-cell">
                    {Number(activeCamp.raisedamount).toLocaleString()} Francs
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden md:table-cell">
                    {Number(activeCamp.totalamount).toLocaleString()} Francs
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-200 hidden lg:table-cell">
                    {formatDate(activeCamp.date)}
                  </td>

                  <td className="py-4 px-4 text-sm flex gap-2">
                    <button
                      onClick={() => handleShowCampDetails(activeCamp.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center gap-1 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-400 dark:hover:text-gray-100"
                    >
                      <Eye size={14} />
                      <span className="hidden sm:inline">View</span>
                    </button>
                    <button
                      onClick={() => handleViewDetails(activeCamp.id)}
                      className="px-4 py-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 flex items-center gap-1 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
                    >
                      <DollarSign size={14} />
                      <span className="hidden sm:inline">Donate Now</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Payment Modal */}
        {showPaymentsPlace && selectedCampaign && getSelectedCampaignData() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 view_pay">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8 mt-2">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Shine Light 😊 In People's LIfe Through Your Donation 🙏
                </h2>
                <button
                  onClick={() => setShowPaymentsPlace(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Predefined Amounts */}
              <div className="flex flex-wrap gap-2 mb-6 leading-9 ">
                {predefinedAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAmountClick(value)}
                    className={`border rounded-md py-2 px-4 min-w-24 text-center transition-colors text-gray-700 hover:dark:bg-transparent dark:text-white
                          ${
                            amount === value
                              ? "border-green-600 bg-green-50 text-green-600 dark:text-green-600 dark:bg-transparent  "
                              : "border-gray-300 hover:border-green-600 hover:bg-green-50 dark:bg-transparent"
                          }`}
                  >
                    {value} Francs
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Custom Amount */}
                  <div className="md:col-span-3 mt-2 ">
                    <label className="block text-lg font-medium text-gray-700 mb-2 dark:text-white">
                      Donation Amount:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={amount}
                      onChange={handleAmountChange}
                      className={`w-full px-3 py-2 border dark:bg-gray-800 dark:text-white 
                              ${
                                errors.amount
                                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-500 focus:ring-green-500"
                              } rounded-md focus:outline-none focus:ring-1 `}
                      placeholder="eg 10000"
                      ref={amountDonate}
                      onMouseEnter={onMouseEnterAmountDonate}
                    />

                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  {/* Phone NUmber */}
                  <div className="md:col-span-3 mt-2 ">
                    <label className="block text-lg font-medium text-gray-700 mb-2 dark:text-white">
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onMouseEnter={onMouseEnterPhoneNumber}
                      placeholder="+237XXXXXXXXX"
                      ref={phoneNumberDonate}
                      onChange={handlePhoneNumberChange}
                      className={`w-full border outline-none ease-in-out
                            ${
                              errors.phoneNumber &&
                              /^\+237[0-9]{9}$/.test(errors.phoneNumber.trim())
                                ? "border-green-500 focus:ring-green-500"
                                : "border-gray-500 dark:border-gray-600 focus:ring-gray-500 focus:outline-none"
                            } 
                            ${
                              errors.phoneNumber
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-green-500 focus:ring-green-500"
                            }
                            rounded-md px-3 py-2 focus:outline-none focus:ring-1 ease-in-out 
                            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phoneNumber}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                      Format: +237 followed by 9 digits (e.g., +237672528362)
                    </p>
                  </div>

                  {/* Full Name */}
                  <div className="mt-2 md:col-span-3">
                    <label className="block text-lg font-medium text-gray-700 mb-1 dark:text-white">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className={`w-full px-3 py-2 border dark:bg-gray-800 dark:text-white  ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-green-500 focus:ring-green-500"
                      } rounded-md focus:outline-none focus:ring-1 `}
                      placeholder="e.g Mbongo Alex Tabeng"
                      ref={nameDonate}
                      onMouseEnter={onMouseEnterNameDonate}
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Campaign Title */}
                  <div className="mt-2 md:col-span-3">
                    <label className="block text-lg font-medium text-gray-700 mb-1 dark:text-white">
                      Donation Campaign:
                    </label>
                    <input
                      id="category"
                      type="text"
                      placeholder="Donation Campaign"
                      value={getSelectedCampaignData()?.title || ""}
                      readOnly={true}
                      className={`w-full px-3 py-2 border-none dark:bg-gray-800 dark:text-white rounded-md focus:outline-none`}
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-2">
                  <label className="block text-lg font-medium text-gray-700 mb-1 dark:text-white">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-2">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => handlePaymentMethodClick(method.id)}
                        className={`flex items-center justify-center p-4 border rounded-md cursor-pointer relative ${
                          selectedPayment === method.id
                            ? "border-green-600 bg-green-50"
                            : "border-gray-300 hover:border-green-600 hover:bg-green-50"
                        }`}
                      >
                        <div className="h-8 w-full relative flex items-center justify-center">
                          <Image
                            src={method.src}
                            alt={method.name}
                            fill
                            className="max-h-10 max-w-full object-cover"
                          />
                        </div>
                        {selectedPayment === method.id && (
                          <div className="absolute top-2 right-2 text-green-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.payment && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.payment}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto mt-2 ease-in-out cursor-pointer px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Donate Now" : "Donate Now"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Thank You Message */}
        {thankYouMessage && selectedCampaign && getSelectedCampaignData() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8 mt-2">
                <div className="flex items-center ">
                  <Image
                    src={navLogo}
                    alt="ConnectAID Logo"
                    width={20}
                    height={20}
                    className="h-8 w-8 mr-2"
                  />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    ConnectAID
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setThankYouMessage(false);
                    setShowPaymentsPlace(false);
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Success Content */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-green-200 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 relative">
                  <CheckCircle
                    size={130}
                    className="text-green-500 dark:text-green-400"
                  />
                  <div className="absolute -top-2 -right-2">
                    <Heart size={20} className="text-red-500 fill-current" />
                  </div>
                </div>

                {/* Thank You Message */}
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">
                  Thank You, {donationData.name}! 🙏
                </h2>

                <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
                  Your generous donation of{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {Number(donationData.amount).toLocaleString()} Francs
                  </span>{" "}
                  has been successfully processed!
                </p>

                {(() => {
                  const campaign = getSelectedCampaignData();
                  return (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 w-full mb-6">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Campaign Supported:
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {campaign.title}
                      </p>
                      <div className="flex justify-between items-center mt-3 text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          Category:
                        </span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                          {campaign.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          Transaction ID:
                        </span>
                        <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">
                          {donationData.transactionId}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* Download Receipt Button */}
                <button className="w-full py-3 px-4 mb-4 rounded-lg bg-blue-500 dark:bg-blue-600 text-white font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download Receipt
                </button>

                {/* Auto-close Timer */}
                <div className="text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                    Your contribution is making a real difference! 💫
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {showCampDetails && selectedCampaign && getSelectedCampaignData() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8 mt-2">
                <div className="flex">
                  <CheckCircle className="text-green-600 dark:text-green-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white -mt-[2px]">
                    Campaign Details
                  </h2>
                </div>
                <button
                  onClick={() => setShowCampDetails(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>
              <hr />

              {(() => {
                const campaign = getSelectedCampaignData();
                return (
                  <div className="mt-6 mb-3">
                    <div className="">
                      <Image
                        className="w-full max-h-[42vh] rounded-lg"
                        src={campaign.image}
                        alt="Donation Campaign Image"
                        width={400}
                        height={120}
                        unoptimized={true}
                      />
                    </div>

                    <h1 className="md:text-3xl text-xl font-bold text-gray-800 dark:text-white mt-4">
                      {campaign.title}
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mt-2 md:text-xl text-lg">
                      {campaign.description}
                    </p>

                    {/* Progress bar */}
                    <div className="mb-2 pt-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-teal-500 h-2.5 rounded-full"
                          style={{
                            width: `${calculateProgress(
                              campaign.raisedamount,
                              campaign.totalamount
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg sm:text-base text-slate-700 dark:text-gray-300 mb-4 pt-2">
                      <span className="font-medium">
                        {campaign.raisedamount.toLocaleString()} Francs raised
                      </span>
                      <span>
                        {campaign.totalamount.toLocaleString()} Francs
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 mb-4 pt-3">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-1" />
                        <span className="sm:text-[16px] text-sm">
                          {campaign.totaldonors} supporters
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-1" />
                        <span className="sm:text-[16px] text-sm">
                          {formatDate(campaign.date)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-5 relative">
                      <div className="flex space-x-2">
                        <button
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          title="Share Campaign"
                          onClick={() => handleShareLink(campaign.id)}
                        >
                          <Share2 className="h-5 w-5 text-slate-500 dark:text-gray-400" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleViewDetails(campaign.id)}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Donate Now
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareCampaigns && selectedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8 mt-2">
                <div className="flex">
                  <CheckCircle className="text-green-600 dark:text-green-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white -mt-[2px]">
                    Share Campaign 🙏😊
                  </h2>
                </div>
                <button
                  onClick={() => setShowShareCampaigns(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>
              <hr />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Campaigns;
