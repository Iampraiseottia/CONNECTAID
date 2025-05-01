"use client";

import React, { useState } from "react";
import {
  Upload,
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const Identity_User = ({ setActiveComponent }) => {
  const [verificationMethod, setVerificationMethod] = useState("");
  const [idFiles, setIdFiles] = useState([]);
  const [selfieFile, setSelfieFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleVerificationMethodChange = (method) => {
    setVerificationMethod(method);
    setErrors({});
  };

  const handleIdUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIdFiles(files);
      setErrors((prev) => ({ ...prev, idFiles: null }));
    }
  };

  const handleSelfieUpload = (e) => {
    if (e.target.files[0]) {
      setSelfieFile(e.target.files[0]);
      setErrors((prev) => ({ ...prev, selfieFile: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!verificationMethod) {
      newErrors.verificationMethod = "Please select a verification method";
    }

    if (verificationMethod === "idVerification") {
      if (idFiles.length === 0) {
        newErrors.idFiles = "Please upload your identification document";
      }
      if (!selfieFile) {
        newErrors.selfieFile = "Please upload a selfie";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSubmitted(true);
      setTimeout(() => {
        setActiveComponent("survey");
      }, 2000);
    }, 3000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto mt-12 ">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setActiveComponent("about-you")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">
            Identity Verification
          </h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          {!submitted ? (
            <div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Identity verification helps us prevent fraud and ensures
                      the security of our platform. All your information is
                      encrypted and protected.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Verification Method
                  </label>

                  <div className="space-y-3">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        verificationMethod === "idVerification"
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        handleVerificationMethodChange("idVerification")
                      }
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="idVerification"
                          name="verificationMethod"
                          checked={verificationMethod === "idVerification"}
                          onChange={() => {}}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <label
                          htmlFor="idVerification"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          ID Verification
                        </label>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 ml-7">
                        Upload a government-issued ID (passport, driver's
                        license, or ID card) and a selfie for verification.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        verificationMethod === "emailVerification"
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        handleVerificationMethodChange("emailVerification")
                      }
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="emailVerification"
                          name="verificationMethod"
                          checked={verificationMethod === "emailVerification"}
                          onChange={() => {}}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <label
                          htmlFor="emailVerification"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Email Verification (Limited Features)
                        </label>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 ml-7">
                        Verify via email. Note: This option provides limited
                        access to platform features.
                      </p>
                    </div>
                  </div>
                  {errors.verificationMethod && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.verificationMethod}
                    </p>
                  )}
                </div>

                {verificationMethod === "idVerification" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload ID Document
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 transition-colors">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="id-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input
                                id="id-upload"
                                name="id-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*,.pdf"
                                onChange={handleIdUpload}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF up to 10MB
                          </p>
                        </div>
                      </div>
                      {idFiles.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {idFiles.length} file{idFiles.length > 1 ? "s" : ""}{" "}
                            uploaded
                          </p>
                        </div>
                      )}
                      {errors.idFiles && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.idFiles}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        Please ensure your ID is valid, not expired, and all
                        information is clearly visible.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Selfie
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 transition-colors">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="selfie-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none"
                            >
                              <span>Upload a selfie</span>
                              <input
                                id="selfie-upload"
                                name="selfie-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleSelfieUpload}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </div>
                      {selfieFile && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Selfie uploaded: {selfieFile.name}
                          </p>
                        </div>
                      )}
                      {errors.selfieFile && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.selfieFile}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        Please ensure your face is clearly visible, well-lit,
                        and you are not wearing sunglasses or a hat.
                      </p>
                    </div>
                  </div>
                )}

                {verificationMethod === "emailVerification" && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Email verification provides limited access. For full
                          access to all features, including higher donation
                          limits, please choose ID verification.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className={`flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                      processing ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Submit Verification
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">
                Verification Submitted
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Your verification has been successfully submitted. You will be
                automatically redirected to the next step.
              </p>
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  onClick={() => setActiveComponent("survey")}
                >
                  Continue to Survey
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Identity_User;
