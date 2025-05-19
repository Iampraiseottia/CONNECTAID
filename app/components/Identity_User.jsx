"use client";

import React, { useState, useEffect } from "react";

import {
  Upload,
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  ChevronRight,
  Pencil,
  X,
  Maximize,
} from "lucide-react";

import { motion } from "motion/react";

const Identity_User = ({ setActiveComponent }) => {
  const [verificationMethod, setVerificationMethod] =
    useState("idVerification");
  const [birthCertificateFile, setBirthCertificateFile] = useState(null);
  const [idFiles, setIdFiles] = useState([]);
  const [selfieFile, setSelfieFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [hasStoredData, setHasStoredData] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  // Load stored documents from localStorage on component mount
  useEffect(() => {
    const storedBirthCertificate = localStorage.getItem("birthCertificateFile");
    const storedIdFiles = localStorage.getItem("idFiles");
    const storedSelfieFile = localStorage.getItem("selfieFile");

    if (storedBirthCertificate) {
      setBirthCertificateFile(JSON.parse(storedBirthCertificate));
    }

    if (storedIdFiles) {
      setIdFiles(JSON.parse(storedIdFiles));
    }

    if (storedSelfieFile) {
      setSelfieFile(JSON.parse(storedSelfieFile));
    }

    const hasData = storedBirthCertificate || storedIdFiles || storedSelfieFile;
    setHasStoredData(!!hasData);
  }, []);

  const handleVerificationMethodChange = (method) => {
    setVerificationMethod(method);
    setErrors({});
  };

  const createFileObject = (file) => {
    // Create a serializable file object
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      dataUrl: URL.createObjectURL(file),
      originalFile: file,
    };
  };

  const handleBCUpload = (e) => {
    if (e.target.files[0]) {
      const fileObj = createFileObject(e.target.files[0]);
      setBirthCertificateFile(fileObj);
      setErrors((prev) => ({ ...prev, birthCertificateFile: null }));
    }
  };

  const handleIdUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileObjs = files.map((file) => createFileObject(file));
      setIdFiles(fileObjs);
      setErrors((prev) => ({ ...prev, idFiles: null }));
    }
  };

  const handleSelfieUpload = (e) => {
    if (e.target.files[0]) {
      const fileObj = createFileObject(e.target.files[0]);
      setSelfieFile(fileObj);
      setErrors((prev) => ({ ...prev, selfieFile: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!verificationMethod) {
      newErrors.verificationMethod = "Please select a verification method";
    }

    if (verificationMethod === "idVerification") {
      if (!birthCertificateFile) {
        newErrors.birthCertificateFile =
          "Please upload your Birth Certificate document";
      }
      if (idFiles.length === 0) {
        newErrors.idFiles =
          "Please upload any identification document e.g Passport, Driver's License etc.";
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

    // Store files in localStorage
    localStorage.setItem(
      "birthCertificateFile",
      JSON.stringify(birthCertificateFile)
    );
    localStorage.setItem("idFiles", JSON.stringify(idFiles));
    localStorage.setItem("selfieFile", JSON.stringify(selfieFile));

    setTimeout(() => {
      setProcessing(false);
      setSubmitted(true);
      setHasStoredData(true);
      setEditMode(false);

      setTimeout(() => {
        setSubmitted(false);
      }, 2000);
    }, 1500);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const removeFile = (type) => {
    if (type === "birthCertificate") {
      setBirthCertificateFile(null);
      localStorage.removeItem("birthCertificateFile");
    } else if (type === "id") {
      setIdFiles([]);
      localStorage.removeItem("idFiles");
    } else if (type === "selfie") {
      setSelfieFile(null);
      localStorage.removeItem("selfieFile");
    }

    // Check if all files are removed
    const hasFiles = birthCertificateFile || idFiles.length > 0 || selfieFile;
    if (!hasFiles) {
      setHasStoredData(false);
      setEditMode(false);
    }
  };

  const handleDocumentPreview = (file) => {
    setPreviewDocument(file);
  };

  const closePreview = () => {
    setPreviewDocument(null);
  };

  const renderDocumentPreview = (file, type) => {
    if (!file) return null;

    return (
      <div className="mt-2 border rounded-md p-3 bg-gray-50 dark:bg-gray-700">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-xs">
            {file.name}
          </p>
          <div className="flex space-x-2">
            {editMode && (
              <button
                type="button"
                onClick={() => removeFile(type)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDocumentPreview(file)}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>

        {file.type.startsWith("image/") && (
          <div className="relative h-32 w-full overflow-hidden rounded border border-gray-200 dark:border-gray-600">
            <img
              src={file.dataUrl}
              alt={`Preview of ${file.name}`}
              className="h-full w-full object-contain cursor-pointer"
              onClick={() => handleDocumentPreview(file)}
            />
          </div>
        )}

        {!file.type.startsWith("image/") && (
          <div
            className="h-32 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 cursor-pointer"
            onClick={() => handleDocumentPreview(file)}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {file.type.includes("pdf") ? "PDF Document" : "Document File"}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderIdFilesPreviews = () => {
    if (!idFiles.length) return null;

    return (
      <div className="mt-2 space-y-2">
        {idFiles.map((file, index) => (
          <div
            key={index}
            className="border rounded-md p-3 bg-gray-50 dark:bg-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-xs">
                {file.name}
              </p>
              <div className="flex space-x-2">
                {editMode && (
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = [...idFiles];
                      newFiles.splice(index, 1);
                      setIdFiles(newFiles);
                      if (newFiles.length === 0) {
                        localStorage.removeItem("idFiles");
                      } else {
                        localStorage.setItem(
                          "idFiles",
                          JSON.stringify(newFiles)
                        );
                      }
                    }}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X size={18} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDocumentPreview(file)}
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Maximize size={18} />
                </button>
              </div>
            </div>

            {file.type.startsWith("image/") && (
              <div className="relative h-32 w-full overflow-hidden rounded border border-gray-200 dark:border-gray-600">
                <img
                  src={file.dataUrl}
                  alt={`Preview of ${file.name}`}
                  className="h-full w-full object-contain cursor-pointer"
                  onClick={() => handleDocumentPreview(file)}
                />
              </div>
            )}

            {!file.type.startsWith("image/") && (
              <div
                className="h-32 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 cursor-pointer"
                onClick={() => handleDocumentPreview(file)}
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {file.type.includes("pdf") ? "PDF Document" : "Document File"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      viewport={{ once: true, amount: 0.05 }}
      className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => setActiveComponent("about-you")}
              className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} className="text-black dark:text-white" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Identity Verification
            </h1>
          </div>

          {hasStoredData && !editMode && (
            <button
              onClick={toggleEditMode}
              className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <Pencil size={16} className="mr-1" />
              Edit Documents
            </button>
          )}

          {hasStoredData && editMode && (
            <button
              onClick={toggleEditMode}
              className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Cancel Editing
            </button>
          )}
        </div>

        <div className="shadow-md rounded-lg p-6 mb-8 bg-white dark:bg-gray-800">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                Documents Saved Successfully
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your verification documents have been saved.
              </p>
            </div>
          ) : (
            <div>
              <div className="border-l-4 p-4 mb-6 bg-blue-50 border-blue-500 dark:bg-blue-900/30">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Identity verification helps us prevent fraud and ensures
                      the security of our platform. All your information is
                      encrypted and protected.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Select Verification Method
                  </label>

                  <div className="space-y-3">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        verificationMethod === "idVerification"
                          ? "border-teal-500 bg-teal-50 dark:border-teal-500 dark:bg-teal-900/30"
                          : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
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
                          className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          ID Verification
                        </label>
                      </div>
                      <p className="mt-1 text-sm ml-7 text-gray-500 dark:text-gray-400">
                        Upload a government-issued ID (passport, driver's
                        license, or ID card) and a selfie for verification.
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
                    {/* Upload Birth Certificate  */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Upload Birth Certificate
                      </label>

                      {(!birthCertificateFile || editMode) && (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                              <label
                                htmlFor="birth-certificate-upload"
                                className="relative cursor-pointer rounded-md font-medium bg-white text-teal-600 hover:text-teal-500 dark:bg-gray-800 dark:text-teal-400 dark:hover:text-teal-300 focus-within:outline-none"
                              >
                                <span>Upload a Birth Certificate</span>
                                <input
                                  id="birth-certificate-upload"
                                  name="birth-certificate-upload"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*,.pdf"
                                  onChange={handleBCUpload}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, PDF up to 7MB
                            </p>
                          </div>
                        </div>
                      )}

                      {birthCertificateFile &&
                        renderDocumentPreview(
                          birthCertificateFile,
                          "birthCertificate"
                        )}

                      {errors.birthCertificateFile && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.birthCertificateFile}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-300 dark:font-medium dark:text-opacity-90">
                        Please ensure your document is clear and all information
                        is visible.
                      </p>
                    </div>

                    {/* Upload ID Document */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Upload ID Document
                      </label>

                      {(idFiles.length === 0 || editMode) && (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                              <label
                                htmlFor="id-upload"
                                className="relative cursor-pointer rounded-md font-medium bg-white text-teal-600 hover:text-teal-500 dark:bg-gray-800 dark:text-teal-400 dark:hover:text-teal-300 focus-within:outline-none"
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
                      )}

                      {idFiles.length > 0 && renderIdFilesPreviews()}

                      {errors.idFiles && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.idFiles}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-300 dark:font-medium dark:text-opacity-90">
                        Please ensure your ID is valid, not expired, and all
                        information is clearly visible.
                      </p>
                    </div>

                    {/* Upload Selfie */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Upload Selfie
                      </label>

                      {(!selfieFile || editMode) && (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                              <label
                                htmlFor="selfie-upload"
                                className="relative cursor-pointer rounded-md font-medium bg-white text-teal-600 hover:text-teal-500 dark:bg-gray-800 dark:text-teal-400 dark:hover:text-teal-300 focus-within:outline-none"
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
                      )}

                      {selfieFile &&
                        renderDocumentPreview(selfieFile, "selfie")}

                      {errors.selfieFile && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.selfieFile}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-300 dark:font-medium dark:text-opacity-90">
                        Please ensure your face is clearly visible, well-lit,
                        and you are not wearing sunglasses or a hat.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className={`flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      processing ? "opacity-75 cursor-not-allowed" : ""
                    } bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 dark:bg-teal-700 dark:hover:bg-teal-600 dark:focus:ring-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2`}
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
                        {hasStoredData ? "Update Documents" : "Save Documents"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Large Document Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate max-w-md">
                {previewDocument.name}
              </h3>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              {previewDocument.type.startsWith("image/") ? (
                <img
                  src={previewDocument.dataUrl}
                  alt={`Preview of ${previewDocument.name}`}
                  className="max-w-full max-h-[80vh] mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <svg
                      className="h-16 w-16"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {previewDocument.type.includes("pdf")
                      ? "PDF Document Preview Not Available"
                      : "Document Preview Not Available"}
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                    {previewDocument.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Identity_User;
