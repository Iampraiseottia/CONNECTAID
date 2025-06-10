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
import { motion } from "motion/react";

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
      const response = await fetch("/api/donations");
      const data = await response.json();

      if (data.success) {
        // Transform database data to match component expectations
        const transformedDonations = data.donations.map((donation) => ({
          id: donation.transaction_id,
          campaign: donation.campaign_title,
          organization: donation.campaign_category,
          date: donation.created_at,
          amount: donation.amount,
          status: donation.status,
          category: donation.campaign_category,
          receipt: donation.transaction_id,
          impact: getImpactMessage(donation.campaign_category, donation.amount),
          description: donation.campaign_description,
          beneficiaries: getBeneficiariesMessage(donation.campaign_category),
          location: "Community Impact Area", // You can modify this based on your needs
          taxDeductible: true,
          contactPerson: getContactPerson(donation.campaign_category),
          contactEmail: getContactEmail(donation.campaign_category),
          donorName: donation.donor_name,
          phoneNumber: donation.phone_number,
          paymentMethod: donation.payment_method,
          campaignImage: donation.campaign_image,
        }));

        setDonations(transformedDonations);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch donations");
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError("Failed to load donations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to generate dynamic content based on category
  const getImpactMessage = (category, amount) => {
    const impacts = {
      Food: `Provided ${Math.floor(amount / 5000)} meals to families in need`,
      Medicine: `Supported medical treatment for ${Math.floor(
        amount / 10000
      )} patients`,
      "Extreme-Cases": `Provided emergency assistance to ${Math.floor(
        amount / 50000
      )} individuals`,
      Education: `Supported educational resources for ${Math.floor(
        amount / 15000
      )} students`,
      Environment: `Contributed to environmental conservation efforts`,
    };
    return (
      impacts[category] || `Made a positive impact in ${category.toLowerCase()}`
    );
  };

  const getBeneficiariesMessage = (category) => {
    const beneficiaries = {
      Food: "Families facing food insecurity",
      Medicine: "Patients in under-served communities",
      "Extreme-Cases": "Individuals in crisis situations",
      Education: "Students in need of educational support",
      Environment: "Communities affected by environmental issues",
    };
    return beneficiaries[category] || "Community members in need";
  };

  const getContactPerson = (category) => {
    const contacts = {
      Food: "Sarah Johnson",
      Medicine: "Dr. Michael Chen",
      "Extreme-Cases": "Emergency Response Team",
      Education: "Maria Rodriguez",
      Environment: "Environmental Team",
    };
    return contacts[category] || "Support Team";
  };

  const getContactEmail = (category) => {
    const emails = {
      Food: "connectaid@gmail.com",
      Medicine: "connectaid@gmail.com",
      "Extreme-Cases": "connectaid@gmail.com",
      Education: "connectaid@gmail.com",
      Environment: "connectaid@gmail.com",
    };
    return emails[category] || "support@connectaid.org";
  };

  const handleDonationSelect = (donation) => {
    setSelectedDonation(donation);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPaymentMethod = (method) => {
    return method.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 flex items-center justify-center">
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
      <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 flex items-center justify-center">
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
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen pt-20"
    >
      <h1 className="sm:text-5xl text-3xl font-bold text-center mb-8 text-green-700 dark:text-green-500">
        Your Donation Impact
      </h1>

      {donations.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No donations found
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            Start making a difference today!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Donation List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Donation History ({donations.length})
            </h2>
            <div className="max-h-96 overflow-y-auto">
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  onClick={() => handleDonationSelect(donation)}
                  className={`cursor-pointer p-4 mb-4 rounded-lg border transition-colors ${
                    selectedDonation?.id === donation.id
                      ? "bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700"
                      : "hover:bg-gray-100 border-gray-200 dark:hover:bg-gray-700 dark:border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <DollarSign className="mr-2 text-green-500" size={20} />
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {donation.amount.toLocaleString()} Francs
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                        {donation.campaign}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                        <Clock className="mr-1" size={12} />
                        {formatDate(donation.date)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          donation.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {donation.status.charAt(0).toUpperCase() +
                          donation.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {donation.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Impact Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {selectedDonation ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
                  Impact Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Heart
                      className="mr-3 text-red-500 dark:text-red-400"
                      size={24}
                    />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Campaign
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedDonation.campaign}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <CheckCircle
                      className="mr-3 text-green-500 dark:text-green-400"
                      size={24}
                    />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Impact
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedDonation.impact}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <User
                      className="mr-3 text-purple-500 dark:text-purple-400"
                      size={24}
                    />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Donor
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedDonation.donorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock
                      className="mr-3 text-blue-500 dark:text-blue-400"
                      size={24}
                    />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Donation Date
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {formatDate(selectedDonation.date)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      Donation Details
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Amount:
                          </span>
                          <span className="font-semibold dark:text-gray-200">
                            {selectedDonation.amount.toLocaleString()} Francs
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Payment Method:
                          </span>
                          <span className="dark:text-gray-200">
                            {formatPaymentMethod(
                              selectedDonation.paymentMethod
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Transaction ID:
                          </span>
                          <span className="dark:text-gray-200 font-mono text-xs">
                            {selectedDonation.receipt}
                          </span>
                        </div>
                        <div className="flex justify-between">
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

                  <div className="mt-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      Campaign Description
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {selectedDonation.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      Beneficiaries
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedDonation.beneficiaries}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      Contact Information
                    </p>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {/* <p>{selectedDonation.contactPerson}</p> */}
                      <p>{selectedDonation.contactEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                <Heart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Select a donation to view its impact details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TrackDonation;
