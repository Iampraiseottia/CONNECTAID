"use client";

import React, { useState, useEffect } from "react";

import { MapPin, DollarSign, Heart, CheckCircle, Clock } from "lucide-react";

import { motion } from "motion/react";

const donationData = [
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
    status: "completed",
    category: "Poverty Alleviation",
    receipt: "completed",
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
];

const TrackDonation = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    // Set donations from the imported data
    setDonations(donationData);
  }, []);

  const handleDonationSelect = (donation) => {
    setSelectedDonation(donation);
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Donation List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Donation History
          </h2>
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
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <DollarSign
                      className="mr-2 text-green-600 dark:text-green-400"
                      size={20}
                    />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {donation.amount} Francs
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {donation.campaign}
                  </p>
                </div>
                <div className="flex items-center">
                  <MapPin
                    className="mr-2 text-red-500 dark:text-red-400"
                    size={20}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {donation.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
                  <MapPin
                    className="mr-3 text-green-500 dark:text-green-400"
                    size={24}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      Location
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedDonation.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle
                    className="mr-3 text-blue-500 dark:text-blue-400"
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
                  <Clock
                    className="mr-3 text-purple-500 dark:text-purple-400"
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
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Amount:
                      </span>
                      <span className="font-semibold dark:text-gray-200">
                        {selectedDonation.amount} Francs
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Organization:
                      </span>
                      <span className="dark:text-gray-200">
                        {selectedDonation.organization}
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
                            : "dark:text-gray-200"
                        }`}
                      >
                        {selectedDonation.status.charAt(0).toUpperCase() +
                          selectedDonation.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Description
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 italic">
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
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
              <p>Select a donation to view its impact details</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TrackDonation;
