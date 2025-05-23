"use client";

import React, { useState, useEffect, useRef } from "react";

import { Search, Filter, Share2, Calendar, Users, X, Eye } from "lucide-react";

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

import Image from "next/image";

const Campaigns = ({ setActiveComponent }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample campaign data
  useEffect(() => {
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

  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

    if (!amount.trim()) {
      newErrors.amount =
        "Amount is required. Please click the amounts above to select or input amount manually";
      valid = false;
    } else if (amount.trim().length < 3) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      console.log("Form submitted successfully", {
        amount,
        name,
        selectedPayment,
      });

      setTimeout(() => {
        alert("Donation submitted successfully!");
        setIsSubmitting(false);
      }, 1000);
    } else {
      console.log("Form has errors");
    }
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                  className={`border rounded-md py-2 px-4 min-w-24 text-center transition-colors text-gray-700 dark:text-gray-700 ${
                    amount === value
                      ? "border-green-600 bg-green-50 text-green-600 dark:text-green-600 "
                      : "border-gray-300 hover:border-green-600 hover:bg-green-50"
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
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Donation Amount:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={handleAmountChange}
                    className={`w-full px-3 py-2 border dark:bg-white dark:text-gray-800 ${
                      errors.amount
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-500 focus:ring-green-500"
                    } rounded-md focus:outline-none focus:ring-1 `}
                    placeholder="eg 10000"
                    ref={amountDonate}
                    onMouseEnter={onMouseEnterAmountDonate}
                  />

                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
                  )}
                </div>

                {/* Phone NUmber */}
                <div className="md:col-span-3 mt-2 ">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Phone Number:
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
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Format: +237 followed by 9 digits (e.g., +237672528362)
                  </p>
                </div>

                {/* Full Name */}
                <div className="mt-2 md:col-span-3">
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className={`w-full px-3 py-2 border dark:bg-white dark:text-gray-800 ${
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

                {/* Category */}
                <div className="mt-2 md:col-span-3">
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Category<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="category"
                    type="text"
                    // value={category}
                    placeholder="Donation Category"
                    value="Category by ID of  Donation"
                    readOnly={true}
                    className={`w-full px-3 py-2 border-none dark:bg-white dark:text-gray-800 rounded-md focus:outline-none `}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-2">
                <label className="block text-lg font-medium text-gray-700 mb-1">
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
                  <p className="mt-1 text-red-500 text-sm">{errors.payment}</p>
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
                {isSubmitting ? "Processing..." : "Donate Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Campaigns;
