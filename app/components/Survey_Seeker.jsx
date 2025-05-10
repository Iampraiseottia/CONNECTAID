"use client";

import React, { useState } from "react";

import { motion } from "motion/react";

import { ArrowLeft, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";

const Survey_Seeker = ({ setActiveComponent }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [surveyData, setSurveyData] = useState({
    assistanceFrequency: "Monthly",
    assistanceAmount: "11,000 francs - 100,000 francs",
    assistancePreferences: [],
    communicationPreferences: [],
    documentationNeeded: "Yes, always",
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

    if (field === "assistancePreferences") {
      setErrors((prev) => ({ ...prev, assistancePreferences: null }));
    }

    if (field === "communicationPreferences") {
      setErrors((prev) => ({ ...prev, communicationPreferences: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (surveyData.assistancePreferences.length < 4) {
        newErrors.assistancePreferences =
          "Please select at least 4 assistance preferences";
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
                  ? "bg-teal-600 text-white"
                  : currentStep === index + 1
                  ? "bg-teal-600 text-white"
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
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600 transition-all duration-300"
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
          <span>Assistance Needs</span>
          <span>Communication</span>
          <span>Situation</span>
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
              Assistance Needs
            </h2>

            <div className="space-y-6">
              {/* Assistance Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How often do you need assistance?
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["One-time", "Monthly", "Quarterly", "Ongoing"].map(
                    (option) => (
                      <div key={option} className="flex items-center ">
                        <input
                          type="radio"
                          id={`frequency-${option}`}
                          name="assistanceFrequency"
                          value={option}
                          checked={surveyData.assistanceFrequency === option}
                          onChange={handleInputChange}
                          defaultChecked={option[1]}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 accent-green-500"
                        />
                        <label
                          htmlFor={`frequency-${option}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300 hover:cursor-pointer ease-in-out "
                        >
                          {option}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Assistance Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What amount of assistance do you typically need?
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 ">
                  {[
                    "1,000 francs - 10,000 francs",
                    "11,000 francs - 100,000 francs",
                    "100,000 francs - 900,000 francs",
                    "900,000+ francs",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="radio"
                        id={`amount-${option}`}
                        name="assistanceAmount"
                        value={option}
                        checked={surveyData.assistanceAmount === option}
                        onChange={handleInputChange}
                        defaultChecked={option[1]}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 accent-green-500"
                      />
                      <label
                        htmlFor={`amount-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300 hover:cursor-pointer ease-in-out "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assistance Type Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What types of assistance do you need? (Select at least 4 that
                  apply)
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                  {[
                    "Direct financial support",
                    "Educational assistance",
                    "Emergency relief",
                    "Long-term support services",
                    "Local community resources",
                    "Healthcare assistance",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="checkbox"
                        id={`preference-${option}`}
                        checked={surveyData.assistancePreferences.includes(
                          option
                        )}
                        onChange={() =>
                          handleCheckboxChange("assistancePreferences", option)
                        }
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded hover:cursor-pointer ease-in-out "
                      />
                      <label
                        htmlFor={`preference-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300 hover:cursor-pointer ease-in-out "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.assistancePreferences && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertCircle size={16} className="mr-1" />
                    <p className="text-sm">{errors.assistancePreferences}</p>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How would you like to receive updates? (Please select at least
                  3 that apply)
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                  {[
                    "Email updates",
                    "Text message notifications",
                    "Mobile phone calls",
                    "Letters by mail",
                    "Through social worker",
                    "No updates needed",
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
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded hover:cursor-pointer ease-in-out "
                      />
                      <label
                        htmlFor={`communication-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300 hover:cursor-pointer ease-in-out "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.communicationPreferences && (
                  <div className="mt-2 flex items-center text-red-600"> 
                    <AlertCircle size={16} className="mr-1" />
                    <p className="text-sm">{errors.communicationPreferences}</p>
                  </div>
                )}
              </div>

              {/* Documentation Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Do you need help with documentation for assistance?
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 ">
                  {[
                    "Yes, always",
                    "Only for complex applications",
                    "No, I can manage documentation",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="radio"
                        id={`doc-${option}`}
                        name="documentationNeeded"
                        value={option}
                        checked={surveyData.documentationNeeded === option}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 accent-green-500"
                      />
                      <label
                        htmlFor={`doc-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300 hover:cursor-pointer ease-in-out "
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                  <option value="Social Worker">Social Worker</option>
                  <option value="Community Center">Community Center</option>
                  <option value="Healthcare Provider">
                    Healthcare Provider
                  </option>
                  <option value="Outreach Event">Outreach Event</option>
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
              Your Situation
            </h2>

            <div className="space-y-6">
              {/* Motivations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What circumstances led you to seek assistance? (Select all
                  that apply)
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                  {[
                    "Unexpected medical expenses",
                    "Loss of employment",
                    "Natural disaster impact",
                    "Housing insecurity",
                    "Educational needs",
                    "Family emergency",
                    "Ongoing chronic condition",
                    "Transitional life situation",
                  ].map((option) => (
                    <div key={option} className="flex items-center ">
                      <input
                        type="checkbox"
                        id={`motivation-${option}`}
                        checked={surveyData.motivations.includes(option)}
                        onChange={() =>
                          handleCheckboxChange("motivations", option)
                        }
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded hover:cursor-pointer ease-in-out "
                      />
                      <label
                        htmlFor={`motivation-${option}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300 hover:cursor-pointer ease-in-out "
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Is there anything else you'd like to share about your
                  situation or needs?
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
      <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
              Thank You!
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your survey responses have been submitted successfully. Your input
              will help us better understand your needs and match you with
              appropriate assistance.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setActiveComponent("dashboardMain")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
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
      className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto mt-12 ">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setActiveComponent("identity")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} className="dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Assistance Survey
          </h1>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Help us understand your assistance needs better. This information
            will help us personalize your experience and connect you with the
            most appropriate resources and support.
          </p>

          {renderProgressBar()}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
                >
                  Next
                  <ArrowRight size={16} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
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

export default Survey_Seeker;
