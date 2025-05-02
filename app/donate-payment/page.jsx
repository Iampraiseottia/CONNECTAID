"use client";

import React, { useRef, useState } from "react";

import globalStyle from "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import Image from "next/image";

const DonatePayment = () => {
  const metadata = {
    title: "Donate - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const [amount, setAmount] = useState(50);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    category: "",
    terms: "",
    payment: "",
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

  const categories = [
    "Charity For Food Campaign",
    "Charity For Education  ",
    "Charity For Medical ",
    "Charity For Water ",
    "Charity For Extreme Cases ",
    "Charity For Kindness ",
    "Others",
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
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    setDropdownOpen(false);
    setErrors((prev) => ({ ...prev, category: "" }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
    } else if (value.trim().length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 2 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!emailRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleTermsChange = () => {
    const newValue = !agreeToTerms;
    setAgreeToTerms(newValue);

    if (newValue) {
      setErrors((prev) => ({ ...prev, terms: "" }));
    }
  };

  const amountDonate = useRef(null);
  const nameDonate = useRef(null);
  const emailDonate = useRef(null);

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

  const onMouseEnterEmailDonate = () => {
    if (emailDonate.current) {
      emailDonate.current.focus();
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      category: "",
      terms: "",
      payment: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!category) {
      newErrors.category = "Please select a category";
      valid = false;
    }

    if (!selectedPayment) {
      newErrors.payment = "Please select a payment method";
      valid = false;
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and privacy policy";
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
        email,
        category,
        selectedPayment,
      });

      // Simulate API call
      setTimeout(() => {
        alert("Donation submitted successfully!");
        setIsSubmitting(false);
      }, 1000);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <main className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

      {/* Navigation Bar | Header  */}
      <Navbar />

      {/* Breadcrumb for ABout Page */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full"
      >
        <Breadcrumb
          homeTitle="HOME"
          homeSlug="/"
          title="DONATE"
          description="BECOME A LIGHT 🙏 IN SOMEONE'S LIFE THROUGH YOUR DONATION "
          breadcrumAlt="Donation Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

      {/* Donate For Charity */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto p-6 sm:my-16 my-9"
      >
        <div className="bg-white rounded-lg shadow-md p-6 sm:pb-10 ">
          <div className="mb-8 mt-2 ">
            <h2 className="text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-green-600 text-gray-800 dark:text-gray-800">
              Select Your Donation
            </h2>
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
                  className="w-full px-4 py-3 text-xl border border-gray-300 dark:bg-white dark:text-gray-800 ease-in-out rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="1000 Francs"
                  ref={amountDonate}
                  onMouseEnter={onMouseEnterAmountDonate}
                />
              </div>

              {/* Name */}
              <div className="mt-2">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className={`w-full px-3 py-2 border dark:bg-white dark:text-gray-800 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 ${
                    errors.name ? "focus:ring-red-500" : "focus:ring-green-500"
                  } ${
                    errors.name
                      ? "focus:border-red-500"
                      : "focus:border-green-500"
                  }`}
                  placeholder="e.g Alex"
                  ref={nameDonate}
                  onMouseEnter={onMouseEnterNameDonate}
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mt-2">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-3 py-2 border dark:bg-white dark:text-gray-800 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 ${
                    errors.email ? "focus:ring-red-500" : "focus:ring-green-500"
                  } ${
                    errors.email
                      ? "focus:border-red-500"
                      : "focus:border-green-500"
                  }`}
                  placeholder="e.g example@gmail.com"
                  ref={emailDonate}
                  onMouseEnter={onMouseEnterEmailDonate}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Category */}
              <div className="relative mt-2">
                <label className="block text-lg font-medium text-gray-700 mb-1  dark:text-gray-800">
                  Select category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className={`w-full px-3 py-2 bg-white border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } rounded-md text-left focus:outline-none focus:ring-1 ${
                      errors.category
                        ? "focus:ring-red-500"
                        : "focus:ring-green-500"
                    } ${
                      errors.category
                        ? "focus:border-red-500"
                        : "focus:border-green-500"
                    } flex justify-between items-center`}
                  >
                    <span
                      className={`${
                        category ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {category || "Please Select Category"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${
                        dropdownOpen ? "transform rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto border border-gray-200 text-gray-700 dark:text-gray-700">
                      {categories.map((cat) => (
                        <div
                          key={cat}
                          className="px-4 py-2 hover:bg-green-50 cursor-pointer"
                          onClick={() => handleCategorySelect(cat)}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )} 
                </div>
                {errors.category && (
                  <p className="mt-1 text-red-500 text-sm">{errors.category}</p> 
                )}
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

            {/* Terms Checkbox */}
            <div className="flex items-start mb-4 mt-2 ">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={handleTermsChange}
                  className={`w-4 h-4 border mt-1 ${
                    errors.terms ? "border-red-500" : "border-gray-300"
                  } rounded bg-gray-50 focus:ring-3 ${
                    errors.terms ? "focus:ring-red-300" : "focus:ring-green-300"
                  }`}
                />
              </div>
              <label
                htmlFor="terms"
                className={`ml-2 text-lg font-medium ${
                  errors.terms ? "text-red-500" : "text-gray-700"
                }`}
              >
                I agree to all the{" "}
                <a
                  href="/terms-conditions"
                  className="text-green-600 hover:underline"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  className="text-green-600 hover:underline"
                >
                  Privacy policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="-mt-2 text-red-500 text-sm">{errors.terms}</p>
            )}

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
      </motion.div>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default DonatePayment;
