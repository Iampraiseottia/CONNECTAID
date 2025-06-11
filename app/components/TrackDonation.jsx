"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Heart,
  CheckCircle,
  Clock,
  User,
  Phone,
} from "lucide-react";

const TrackDonation = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDonations();
  }, []);

  const fetchUserDonations = async () => {
    try {
      setLoading(true);
      setError(null); 

      const response = await fetch("/api/donations");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      const fetchedDonations = result.donations;

      const formattedDonations = fetchedDonations.map((donation) => ({
        id: donation.id,
        amount: donation.amount,
        campaign: donation.campaign_title, 
        category: donation.campaign_category, 
        date: donation.created_at, 
        status: donation.status,
        donorName: donation.donor_name, 
        paymentMethod: donation.payment_method, 
        receipt: donation.transaction_id, 
        description: donation.campaign_description, 
        impact: "Your donation is helping to fund this noble cause.", 
        beneficiaries:
          "The community supported by " + donation.campaign_title + ".", 
        contactEmail: "info@connectaid.com", 
        phoneNumber: donation.phone_number, 
      }));

      setDonations(formattedDonations);

      // Select the first donation by default if there are any
      if (formattedDonations.length > 0) {
        setSelectedDonation(formattedDonations[0]);
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError(err.message || "Failed to load donations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDonationSelect = (donation) => {
    setSelectedDonation(donation);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; 
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, 
    });
  };

  const formatPaymentMethod = (method) => {
    if (!method) return "N/A";
    return method.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-16 sm:pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your donations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-16 sm:pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchUserDonations}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-16 sm:pt-20">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 text-green-700 dark:text-green-500 px-4">
        Your Donation Impact
      </h1>

      {donations.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Heart className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            No donations found
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm sm:text-base">
            Start making a difference today!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Donation List - Fixed Height with Responsive Design */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                Donation History ({donations.length})
              </h2>
            </div>

            {/* Fixed height scrollable area - responsive heights */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                height: "calc(100vh - 280px)",
                minHeight: "300px",
                maxHeight: "600px",
              }}
            >
              <div className="p-4 sm:p-6 pt-4 space-y-3 sm:space-y-4">
                {donations.map((donation) => (
                  <div
                    key={donation.id}
                    onClick={() => handleDonationSelect(donation)}
                    className={`cursor-pointer p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      selectedDonation?.id === donation.id
                        ? "bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700 shadow-md"
                        : "hover:bg-gray-50 border-gray-200 dark:hover:bg-gray-700/50 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                          <DollarSign
                            className="mr-2 text-green-500 flex-shrink-0"
                            size={18}
                          />
                          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                            {donation.amount.toLocaleString()} Francs
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium line-clamp-2">
                          {donation.campaign}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                          <Clock className="mr-1 flex-shrink-0" size={12} />
                          <span className="truncate">
                            {formatDate(donation.date)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            donation.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {donation.status.charAt(0).toUpperCase() +
                            donation.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500 truncate max-w-20 sm:max-w-none">
                          {donation.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Donation Impact Details - Responsive */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {selectedDonation ? (
              <div className="p-4 sm:p-6 h-full overflow-y-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-700 dark:text-blue-400">
                  Impact Details
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  {/* Campaign Info */}
                  <div className="flex items-start gap-3">
                    <Heart
                      className="mt-1 text-red-500 dark:text-red-400 flex-shrink-0"
                      size={20}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                        Campaign
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base break-words">
                        {selectedDonation.campaign}
                      </p>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-1 text-green-500 dark:text-green-400 flex-shrink-0"
                      size={20}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                        Impact
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {selectedDonation.impact}
                      </p>
                    </div>
                  </div>

                  {/* Donor */}
                  <div className="flex items-start gap-3">
                    <User
                      className="mt-1 text-purple-500 dark:text-purple-400 flex-shrink-0"
                      size={20}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                        Donor
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {selectedDonation.donorName}
                      </p>
                    </div>
                  </div>
                  {/* Phone Number */}
                  <div className="flex items-start gap-3">
                    <Phone
                      className="mt-1 text-gray-500 dark:text-gray-400 flex-shrink-0"
                      size={20}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                        Donor Phone
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {selectedDonation.phoneNumber}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <Clock
                      className="mt-1 text-blue-500 dark:text-blue-400 flex-shrink-0"
                      size={20}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                        Donation Date
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {formatDate(selectedDonation.date)}
                      </p>
                    </div>
                  </div>

                  {/* Donation Details */}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm sm:text-base">
                      Donation Details
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg">
                      <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            Amount:
                          </span>
                          <span className="font-semibold dark:text-gray-200">
                            {selectedDonation.amount.toLocaleString()} Francs
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            Payment Method:
                          </span>
                          <span className="dark:text-gray-200">
                            {formatPaymentMethod(
                              selectedDonation.paymentMethod
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-gray-700 dark:text-gray-300">
                            Transaction ID:
                          </span>
                          <span className="dark:text-gray-200 font-mono text-xs break-all text-right ml-2">
                            {selectedDonation.receipt}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            Status:
                          </span>
                          <span
                            className={`font-semibold ${
                              selectedDonation.status === "completed"
                                ? "text-green-600 dark:text-green-400"
                                : "text-yellow-600 dark:text-yellow-400"
                            }`}
                          >
                            {selectedDonation.status.charAt(0).toUpperCase() +
                              selectedDonation.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm sm:text-base">
                      Campaign Description
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {selectedDonation.description}
                    </p>
                  </div>

                  {/* Beneficiaries */}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm sm:text-base">
                      Beneficiaries
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      {selectedDonation.beneficiaries}
                    </p>
                  </div>

                  {/* Contact */}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm sm:text-base">
                      Contact Information
                    </p>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <p className="break-all">
                        {selectedDonation.contactEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8 sm:py-12 px-4">
                <Heart className="mx-auto h-10 w-10 sm:h-12 sm:w-12 mb-4 opacity-50" />
                <p className="text-sm sm:text-base">
                  Select a donation to view its impact details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackDonation;
