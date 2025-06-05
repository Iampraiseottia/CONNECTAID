"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Edit3,
} from "lucide-react";

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
  const [surveyId, setSurveyId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);

  // Load data from the database on component mount
  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await fetch("/api/survey");
        if (response.ok) {
          const result = await response.json();
          if (result.survey) {
            setSurveyData({
              donationFrequency: result.survey.donationFrequency,
              donationAmount: result.survey.donationAmount,
              donationPreferences: result.survey.donationPreferences,
              communicationPreferences: result.survey.communicationPreferences,
              taxReceipts: result.survey.taxReceipts,
              howHeard: result.survey.howHeard || "",
              motivations: result.survey.motivations || [],
              additionalComments: result.survey.additionalComments || "",
            });
            setSurveyId(result.survey.id);
            setSubmitted(true);
            setIsEditMode(false);
          } else {
            setIsEditMode(true);
          }
        } else if (response.status === 404) {
          setIsEditMode(true);
        } else {
          console.error("Failed to fetch survey data:", await response.json());
          setIsEditMode(true);
        }
      } catch (error) {
        console.error("Error fetching survey data:", error);
        setIsEditMode(true);
      } finally {
        setHasLoadedData(true);
      }
    };

    fetchSurveyData();
  }, []);

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
      if (surveyData.donationPreferences.length < 2) {
        newErrors.donationPreferences =
          "Please select at least 2 donation preferences";
      }
    }

    if (step === 2) {
      if (surveyData.communicationPreferences.length < 1) {
        newErrors.communicationPreferences =
          "Please select at least 1 communication preferences";
      }
      if (!surveyData.howHeard) {
        newErrors.howHeard = "Please select how you heard about ConnectAID";
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

  const handleEdit = () => {
    setIsEditMode(true);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateStep(currentStep)) {
        setIsSubmitting(false);
        return;
      }

      const submitData = {
        ...surveyData,
      };

      let response;
      if (surveyId) {
        // If surveyId exists, it's an update (PUT request)
        response = await fetch("/api/survey", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: surveyId, ...submitData }),
        });
      } else {
        // Otherwise, it's a new submission (POST request)
        response = await fetch("/api/survey", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit survey");
      }

      // If it's a new submission, set the surveyId from the response
      if (!surveyId && result.survey && result.survey.id) {
        setSurveyId(result.survey.id);
      }

      setSubmitted(true);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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

  const renderDisplayValue = (label, value) => {
    return (
      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md border">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {label}
        </label>
        <div className="text-sm text-gray-900 dark:text-gray-100">
          {Array.isArray(value) ? (
            value.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                None selected
              </span>
            )
          ) : (
            value || (
              <span className="text-gray-500 dark:text-gray-400">
                Not specified
              </span>
            )
          )}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    const isDisplayMode = !isEditMode && submitted;

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
                {isDisplayMode ? (
                  renderDisplayValue("", surveyData.donationFrequency)
                ) : (
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
                )}
              </div>

              {/* Donation Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  What is your typical donation amount?
                </label>
                {isDisplayMode ? (
                  renderDisplayValue("", surveyData.donationAmount)
                ) : (
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
                )}
              </div>

              {/* Donation Type Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  What types of donations do you prefer? (Select atleast 2 that
                  apply)
                </label>
                {isDisplayMode ? (
                  renderDisplayValue("", surveyData.donationPreferences)
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                      {[
                        "Direct financial support to individuals",
                        "Children Fund Aids",
                        "Extreme Cases",
                        "Medical AIDs",
                        "Local community initiatives",
                      ].map((option) => (
                        <div key={option} className="flex items-center ">
                          <input
                            type="checkbox"
                            id={`preference-${option}`}
                            checked={surveyData.donationPreferences.includes(
                              option
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                "donationPreferences",
                                option
                              )
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
                  </>
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
                  1 that apply)
                </label>
                {isDisplayMode ? (
                  renderDisplayValue("", surveyData.communicationPreferences)
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                      {[
                        "Email newsletters",
                        "Text message updates",
                        "Mobile Number notifications",
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
                        <p className="text-sm">
                          {errors.communicationPreferences}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Tax Receipt Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Do you require receipts for your donations?
                </label>
                {isDisplayMode ? (
                  renderDisplayValue("", surveyData.taxReceipts)
                ) : (
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
                )}
              </div>

              {/* How they heard about ConnectAID */}
              <div>
                <label
                  htmlFor="howHeard"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  How did you hear about ConnectAID?
                </label>
                {isDisplayMode ? (
                  renderDisplayValue("", surveyData.howHeard)
                ) : (
                  <>
                    <select
                      id="howHeard"
                      name="howHeard"
                      value={surveyData.howHeard}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-teal-500 dark:focus:border-teal-500 border-[1px]"
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
                    {errors.howHeard && (
                      <div className="mt-2 flex items-center text-red-600 dark:text-red-400">
                        <AlertCircle size={16} className="mr-1" />
                        <p className="text-sm">{errors.howHeard}</p>
                      </div>
                    )}
                  </>
                )}
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
                {isDisplayMode ? (
                  renderDisplayValue("", surveyData.motivations)
                ) : (
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
                )}
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
                {isDisplayMode ? (
                  renderDisplayValue("", surveyData.additionalComments)
                ) : (
                  <textarea
                    id="additionalComments"
                    name="additionalComments"
                    rows="5"
                    value={surveyData.additionalComments}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 border-[1px] dark:focus:ring-teal-500 dark:focus:border-teal-500 p-3 "
                    placeholder="Share your thoughts here..."
                  ></textarea>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Display submitted data and edit button
  if (submitted && !isEditMode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen mt-20"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Your Survey Details
              </h1>
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <Edit3 size={16} className="mr-2" /> Edit Survey
              </button>
            </div>

            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Donation Preferences
              </h2>
              {renderDisplayValue(
                "Donation Frequency",
                surveyData.donationFrequency
              )}
              {renderDisplayValue(
                "Typical Donation Amount",
                surveyData.donationAmount
              )}
              {renderDisplayValue(
                "Preferred Donation Types",
                surveyData.donationPreferences
              )}

              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 mt-8">
                Communication Preferences
              </h2>
              {renderDisplayValue(
                "How you prefer to receive updates",
                surveyData.communicationPreferences
              )}
              {renderDisplayValue(
                "Require Tax Receipts?",
                surveyData.taxReceipts
              )}
              {renderDisplayValue(
                "How you heard about ConnectAID",
                surveyData.howHeard
              )}

              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 mt-8">
                Your Donation Motivations
              </h2>
              {renderDisplayValue(
                "Motivations to Donate",
                surveyData.motivations
              )}
              {renderDisplayValue(
                "Additional Comments",
                surveyData.additionalComments
              )}
            </div>

            <div className="mt-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
                Thank You!
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Your survey response has been successfully submitted.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Show loading state while trying to fetch initial data
  if (!hasLoadedData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">
          Loading survey data...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto sm:pt-20 p-5">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            ConnectAID Donor Survey
          </h1>

          {renderProgressBar()}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  <ArrowLeft size={16} className="mr-2" /> Previous
                </button>
              )}

              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-600"
                >
                  Next <ArrowRight size={16} className="ml-2" />
                </button>
              )}

              {currentStep === totalSteps && (
                <button
                  type="submit"
                  className="ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : surveyId
                    ? "Update Survey"
                    : "Submit Survey"}
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
