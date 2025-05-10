"use client";

import React, { useState, useEffect } from "react";

import { motion } from "motion/react";

import { ArrowLeft, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";

const Survey_User = ({ setActiveComponent }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [surveyData, setSurveyData] = useState({
    donationFrequency: "Monthly",
    donationAmount: "11, 000 francs - 100, 000 francs",
    donationPreferences: [],
    communicationPreferences: [],
    taxReceipts: "Yes, always",
    howHeard: "",
    motivations: [],
    additionalComments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurveyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setSurveyData((prev) => {
      const current = [...prev[field]];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });

    if (field === "donationPreferences") {
      setErrors((prev) => ({ ...prev, donationPreferences: null }));
    }

    if (field === "communicationPreferences") {
      setErrors((prev) => ({ ...prev, communicationPreferences: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (surveyData.donationPreferences.length < 4) {
        newErrors.donationPreferences =
          "Please select at least 4 donation preferences";
      }
    }

    if (step === 2) {
      if (surveyData.communicationPreferences.length < 3) {
        newErrors.communicationPreferences =
          "Please select at least 3 communication preferences";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation could be added here if needed

    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setActiveComponent("dashboardMain");
    }, 3000);
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center rounded-full h-8 w-8 text-sm font-medium transition-colors ${
                currentStep > index + 1
                  ? "bg-teal-600 text-white dark:bg-teal-500"
                  : currentStep === index + 1
                  ? "bg-teal-600 text-white dark:bg-teal-500"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {currentStep > index + 1 ? <CheckCircle size={16} /> : index + 1}
            </div>
          ))}
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
          <div
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600 dark:bg-teal-500 transition-all duration-300"
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
          <span>Donation Preferences</span>
          <span>Communication</span>
          <span>Motivations</span>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Donation Preferences
            </h2>

            <div className="space-y-6">
              {/* Donation Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  How often do you prefer to donate?
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["One-time", "Monthly", "Quarterly", "Annually"].map(
                    (option) => (
                      <div key={option} className="flex items-center ">
                        <input
                          type="radio"
                          id={`frequency-${option}`}
                          name="donationFrequency"
                          value={option}
                          checked={surveyData.donationFrequency === option}
                          onChange={handleInputChange}
                          defaultChecked={option[1]}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 accent-teal-500 dark:accent-teal-400 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`frequency-${option}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-200 hover:cursor-pointer ease-in-out "
                        >
                          {option}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Donation Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  What is your typical donation amount?
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 ">
                  {[
                    "1, 000 francs - 10, 000 francs ",
                    "11, 000 francs - 100, 000 francs",
                    "100, 000 francs - 900, 000 francs",
                    "900, 000+ francs",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="radio"
                        id={`amount-${option}`}
                        name="donationAmount"
                        value={option}
                        checked={surveyData.donationAmount === option}
                        onChange={handleInputChange}
                        defaultChecked={option[1]}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 accent-teal-500 dark:accent-teal-400 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`amount-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-200 hover:cursor-pointer ease-in-out "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donation Type Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  What types of donations do you prefer? (Select atleast 4 that
                  apply)
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                  {[
                    "Direct financial support to individuals",
                    "Children Fund Aids",
                    "Emergency relief",
                    "Long-term development projects",
                    "Local community initiatives",
                    "International aid",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="checkbox"
                        id={`preference-${option}`}
                        checked={surveyData.donationPreferences.includes(
                          option
                        )}
                        onChange={() =>
                          handleCheckboxChange("donationPreferences", option)
                        }
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 hover:cursor-pointer ease-in-out "
                      />
                      <label
                        htmlFor={`preference-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-200 hover:cursor-pointer ease-in-out  "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.donationPreferences && (
                  <div className="mt-2 flex items-center text-red-600 dark:text-red-400">
                    <AlertCircle size={16} className="mr-1" />
                    <p className="text-sm">{errors.donationPreferences}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Communication Preferences
            </h2>

            <div className="space-y-6">
              {/* Communication Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  How would you like to receive updates? (Please Select atleast
                  3 that apply)
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                  {[
                    "Email newsletters",
                    "Text message updates",
                    "Mobile Number notifications",
                    "Direct mail",
                    "Social media",
                    "No updates, please",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="checkbox"
                        id={`communication-${option}`}
                        checked={surveyData.communicationPreferences.includes(
                          option
                        )}
                        defaultChecked={option[0]}
                        onChange={() =>
                          handleCheckboxChange(
                            "communicationPreferences",
                            option
                          )
                        }
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 hover:cursor-pointer ease-in-out "
                      />
                      <label
                        htmlFor={`communication-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-200 hover:cursor-pointer ease-in-out "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.communicationPreferences && (
                  <div className="mt-2 flex items-center text-red-600 dark:text-red-400">
                    <AlertCircle size={16} className="mr-1" />
                    <p className="text-sm">{errors.communicationPreferences}</p>
                  </div>
                )}
              </div>

              {/* Tax Receipt Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Do you require receipts for your donations?
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 ">
                  {[
                    "Yes, always",
                    "Only for larger donations",
                    "No, not necessary",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="radio"
                        id={`tax-${option}`}
                        name="taxReceipts"
                        value={option}
                        checked={surveyData.taxReceipts === option}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 accent-teal-500 dark:accent-teal-400 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`tax-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-200 hover:cursor-pointer ease-in-out "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* How they heard about ConnectAID */}
              <div>
                <label
                  htmlFor="howHeard"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  How did you hear about ConnectAID?
                </label>
                <select
                  id="howHeard"
                  name="howHeard"
                  value={surveyData.howHeard}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-teal-500 dark:focus:border-teal-500"
                >
                  <option value="">Select an option</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friend/Family">Friend/Family</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="News Article">News Article</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Charity Event">Charity Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Your Donation Motivations
            </h2>

            <div className="space-y-6">
              {/* Motivations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  What motivates you to donate? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                  {[
                    "Personal connection to cause",
                    "Religious or spiritual beliefs",
                    "Desire to help others",
                    "Tax benefits",
                    "Social responsibility",
                    "Setting an example for others",
                    "Being part of a community effort",
                    "Seeing direct impact of donations",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="checkbox"
                        id={`motivation-${option}`}
                        checked={surveyData.motivations.includes(option)}
                        onChange={() =>
                          handleCheckboxChange("motivations", option)
                        }
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 hover:cursor-pointer ease-in-out "
                      />
                      <label
                        htmlFor={`motivation-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-200 hover:cursor-pointer ease-in-out "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Comments */}
              <div>
                <label
                  htmlFor="additionalComments"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Is there anything else you'd like to share about your donation
                  preferences or experiences?
                </label>
                <textarea
                  id="additionalComments"
                  name="additionalComments"
                  rows="4"
                  value={surveyData.additionalComments}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  placeholder="Share your thoughts here..."
                ></textarea>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
              Thank You!
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your survey responses have been submitted successfully. Your input
              will help us improve your donation experience.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setActiveComponent("dashboardMain")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-offset-gray-800"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
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
      className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto mt-12 ">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setActiveComponent("identity")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-gray-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Donor Survey
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Help us understand your donation preferences and interests better.
            This information will help us personalize your experience and match
            you with causes you care about.
          </p>

          {renderProgressBar()}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800"
                >
                  Next
                  <ArrowRight size={16} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800"
                >
                  Submit Survey
                  <CheckCircle size={16} className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Survey_User;
