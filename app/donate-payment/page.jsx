"use client";

import React, { useRef, useState } from "react";

import globalStyle from "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";
import DonationList from "../components/DonationList";

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
  const [selectedPayment, setSelectedPayment] = useState("paypal");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  };

  const amountDonate = useRef(null);
  const nameDonate = useRef(null);
  const emailDonate = useRef(null);

  const onMouseEnterAmountDonate = () => {
    amountDonate.current.focus();
  };

  const onMouseEnterNameDonate = () => {
    nameDonate.current.focus();
  };

  const onMouseEnterEmailDonate = () => {
    emailDonate.current.focus();
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
            <h2 className="text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-green-600">
              Select Your Donation
            </h2>
          </div>

          {/* Predefined Amounts */}
          <div className="flex flex-wrap gap-2 mb-6 leading-9 ">
            {predefinedAmounts.map((value) => (
              <button
                key={value}
                onClick={() => handleAmountClick(value)}
                className={`border rounded-md py-2 px-4 min-w-24 text-center transition-colors ${
                  amount === value
                    ? "border-green-600 bg-green-50 text-green-600"
                    : "border-gray-300 hover:border-green-600 hover:bg-green-50"
                }`}
              >
                {value} Francs
              </button>
            ))}
          </div>

          <form className="space-y-5">
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
                  className="w-full px-4 py-3 text-xl border border-gray-300 ease-in-out rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="1000 Francs"
                  ref={amountDonate}
                  onMouseEnter={onMouseEnterAmountDonate}
                />
              </div>

              {/* Name */}
              <div className="mt-2">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g Alex"
                  ref={nameDonate}
                  onMouseEnter={onMouseEnterNameDonate}
                />
              </div>

              {/* Email */}
              <div className="mt-2">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g example@gmail.com"
                  ref={emailDonate}
                  onMouseEnter={onMouseEnterEmailDonate}
                />
              </div>

              {/* Category */}
              <div className="relative mt-2">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Select category
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 flex justify-between items-center"
                  >
                    <span className="text-gray-900">
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
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto border border-gray-200">
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
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-2 ">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
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
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start mb-4 mt-2 ">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300"
                />
              </div>
              <label
                htmlFor="terms"
                className="ml-2 text-lg font-medium text-gray-700"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto mt-2 ease-in-out cursor-pointer px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Donate Now
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
