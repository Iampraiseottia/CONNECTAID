"use client";

import globalStyle from "../globals.css";

import { useState, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";

import { Clock, DollarSign } from "lucide-react";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import relatedPostImg1 from "/public/gallery/donateList-1.png";
import relatedPostImg2 from "/public/gallery/gallery-4.png";
import relatedPostImg3 from "/public/gallery/gallery-20.png";
import relatedPostImg4 from "/public/urgent/urgent-1.png";
import relatedPostImg5 from "/public/gallery/donationList-2.png";
import relatedPostImg6 from "/public/gallery/gallery-1.png";
import relatedPostImg7 from "/public/gallery/gallery-3.png";
import relatedPostImg8 from "/public/gallery/gallery-2.png";
import relatedPostImg9 from "/public/blog/blog-5.png";
import relatedPostImg10 from "/public/gallery/education.png";
import relatedPostImg11 from "/public/gallery/gallery-13.png";
import relatedPostImg12 from "/public/gallery/water.png";

const DonationDetails1 = () => {
  const metadata = {
    title: "Together we can end hunger - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const [selectedPayment, setSelectedPayment] = useState("mtn");
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    mobileName: "",
    fullName: "",
    email: "",
    region: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    mobileNumber: "",
    mobileName: "",
    fullName: "",
    email: "",
    region: "",
    city: "",
    address: "",
    terms: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/;
    return mobileRegex.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDonation = (e) => {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
      isValid = false;
    } else if (!validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber =
        "Please enter a valid mobile number (e.g. +237 686 529 762)";
      isValid = false;
    } else if (formData.mobileNumber.length < 2) {
      newErrors.mobileNumber = "Mobile Number must be at least 2 characters";
      isValid = false;
    } else if (formData.mobileNumber.length > 16) {
      newErrors.mobileNumber = "Mobile Number cannot exceed 16 characters";
      isValid = false;
    }

    if (!formData.mobileName) {
      newErrors.mobileName = "Mobile money name is required";
      isValid = false;
    } else if (formData.mobileName.length < 2) {
      newErrors.mobileName = " Mobile Name must be at least 2 characters";
      isValid = false;
    } else if (formData.mobileName.length > 30) {
      newErrors.mobileName = " Mobile Name cannot exceed 30 characters";
      isValid = false;
    }

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full Name must be at least 2 characters";
      isValid = false;
    } else if (formData.fullName.length > 40) {
      newErrors.fullName = "Full Name cannot exceed 50 characters";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.region) {
      newErrors.region = "Region is required";
      isValid = false;
    } else if (formData.region.length < 2) {
      newErrors.region = "Region must be at least 2 characters";
      isValid = false;
    } else if (formData.region.length > 20) {
      newErrors.region = "Region cannot exceed 20 characters";
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = "City/Town is required";
      isValid = false;
    } else if (formData.city.length < 2) {
      newErrors.city = "City must be at least 2 characters";
      isValid = false;
    } else if (formData.city.length > 50) {
      newErrors.city = "City cannot exceed 50 characters";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Home address is required";
      isValid = false;
    } else if (formData.address.length < 2) {
      newErrors.address = "Home Address must be at least 2 characters";
      isValid = false;
    } else if (formData.address.length > 50) {
      newErrors.address = "Home Address cannot exceed 50 characters";
      isValid = false;
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms of Service";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Donation input fields okay! .");
    }

    setFormData({
      mobileNumber: "",
      mobileName: "",
      fullName: "",
      email: "",
      region: "",
      city: "",
      address: "",
    });
  };

  const mobileMoneyNumberRef = useRef();
  const mobileMoneyNameRef = useRef();
  const fullNameRef = useRef();
  const emailAddressRef = useRef();
  const regionRef = useRef();
  const cityRef = useRef();
  const homeAddressRef = useRef();

  const onMouseEnterMobileNUmberRef = () => {
    mobileMoneyNumberRef.current.focus();
  };

  const onMouseEnterMobileMoneyNameRef = () => {
    mobileMoneyNameRef.current.focus();
  };

  const onMouseEnterFullNameRef = () => {
    fullNameRef.current.focus();
  };

  const onMouseEnterEmailAddressRef = () => {
    emailAddressRef.current.focus();
  };

  const onMouseEnterRegionRef = () => {
    regionRef.current.focus();
  };

  const onMouseEnterCityRef = () => {
    cityRef.current.focus();
  };

  const onMouseEnterHomeAddressRef = () => {
    homeAddressRef.current.focus();
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
          title="FOOD"
          description="Together we can end hunger"
          breadcrumAlt="About Us Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content - Left Section */}
            <div className="w-full lg:w-2/3">
              {/* Donate Details */}
              <div className="rounded-lg shadow-md overflow-hidden mb-12">
                {/* Hero Image */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative"
                >
                  <div className="">
                    <Image
                      src="/gallery/endHunger.png"
                      alt="Blog main image"
                      width={500}
                      height={500}
                      className="w-[100%] h-[68vh] object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute top-0 left-0">
                    <Image
                      src="/gallery/brush.png"
                      alt="Brush background"
                      width={200}
                      height={100}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>

                {/* Donation Content */}
                <div className="p-6 md:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-6"
                  >
                    <h4 className="text-2xl font-bold mb-3 mt-2 dark:text-slate-900 text-black ">
                      Your Little Help Can Heal Their Pains.
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Hunger is a pressing issue that affects millions of
                      individuals and families in our local communities. Every
                      day, countless people go without the nutritious food they
                      need to thrive. This is not just a statistic; it’s a
                      reality that impacts our neighbors, friends, and families.
                      But together, we can change this narrative. By donating to
                      our local hunger relief initiatives, you can play a vital
                      role in ensuring that everyone has access to the food they
                      need.
                    </p>

                    {/* Alert */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start mb-6">
                      <div className="text-yellow-500 mr-3">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Notice:</h4>
                        <p className="text-gray-600">
                          Be The Source Of Someone's Joy Today. Please Ensure to
                          DONATE something 🥺
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-green-600 h-2.5 rounded-full mt-4"
                        style={{ width: "43.36%" }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mb-6 leading-8 ">
                      <div className="flex gap-6 dark:text-slate-900 text-black ">
                        <div>
                          <p className="text-gray-600">20, 000, 000 Francs</p>
                          <h4 className="font-semibold">Goals</h4>
                        </div>
                        <div>
                          <p className="text-gray-600">8, 650, 000 Francs</p>
                          <h4 className="font-semibold">Raised</h4>
                        </div>
                      </div>
                      <button className="text-green-600 p-2  border border-green-600 rounded-full hover:bg-green-50">
                        <svg
                          className="w-5 h-5 transform rotate-180"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </motion.div>

                  {/* Payment Method */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-8"
                  >
                    <h4 className="text-lg font-bold mb-4 dark:text-slate-900 text-black ">
                      Select Payment Method
                    </h4>
                    <div className="space-y-3 ">
                      <div className="flex items-center">
                        <input
                          id="mtn-momo"
                          type="radio"
                          name="mtn-momo"
                          value="mtn"
                          checked={selectedPayment === "mtn"}
                          onChange={() => setSelectedPayment("mtn")}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 accent-green-600"
                        />
                        <label
                          htmlFor="mtn-momo"
                          className="ml-2 text-gray-700"
                        >
                          MTN Mobile Money
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="orange-momo"
                          type="radio"
                          name="payment"
                          value="orange"
                          checked={selectedPayment === "orange"}
                          onChange={() => setSelectedPayment("orange")}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 accent-green-600"
                        />
                        <label
                          htmlFor="orange-momo"
                          className="ml-2 text-gray-700"
                        >
                          ORANGE Mobile Money
                        </label>
                      </div>
                    </div>
                  </motion.div>

                  {/* Amount */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-8"
                  >
                    <button className="mb-4 w-full sm:w-auto text-xl font-semibold py-2 px-10 dark:text-slate-900 text-black  ">
                      Select An Amount From Available Options Below
                    </button>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
                        5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000,
                        9500, 10000, 50000, 100000, 500000, 1000000,
                      ].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setSelectedAmount(amount)}
                          className={`py-2 px-4 rounded border ${
                            selectedAmount === amount
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {amount} Frs
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-8"
                  >
                    <h4 className="text-lg font-bold mb-4 dark:text-slate-900 text-black ">
                      Payment Details
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Mobile Money Number e.g +237 686 529 762*"
                            className={`w-full px-4 py-2 border ${
                              errors.mobileNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:text-black `}
                            name="mobileNumber"
                            id="Mobile_Money_Number"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            ref={mobileMoneyNumberRef}
                            onMouseEnter={onMouseEnterMobileNUmberRef}
                          />
                          {errors.mobileNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.mobileNumber}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="mobileName"
                            id="Mobile_Money_Name"
                            placeholder="Mobile Money Name e.g Alex Jordan*"
                            className={`w-full px-4 py-2 border ${
                              errors.mobileName
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:text-black `}
                            value={formData.mobileName}
                            onChange={handleInputChange}
                            ref={mobileMoneyNameRef}
                            onMouseEnter={onMouseEnterMobileMoneyNameRef}
                          />
                          {errors.mobileName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.mobileName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Your Full Name*"
                          className={`w-full px-4 py-2 border ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:text-black `}
                          name="fullName"
                          id="Full_Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          ref={fullNameRef}
                          onMouseEnter={onMouseEnterFullNameRef}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Address */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-8"
                  >
                    <h4 className="text-lg font-bold mb-4 dark:text-slate-900 text-black ">
                      Address
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address e.g name@gmail.com*"
                            name="email"
                            id="Email_Address"
                            className={`w-full px-4 py-2 border ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:text-black `}
                            value={formData.email}
                            onChange={handleInputChange}
                            ref={emailAddressRef}
                            onMouseEnter={onMouseEnterEmailAddressRef}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Region e.g South-west*"
                            className={`w-full px-4 py-2 border ${
                              errors.region
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:text-black `}
                            name="region"
                            id="Region"
                            value={formData.region}
                            onChange={handleInputChange}
                            ref={regionRef}
                            onMouseEnter={onMouseEnterRegionRef}
                          />
                          {errors.region && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.region}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <input
                            type="text"
                            placeholder="City/Town e.g Limbe*"
                            name="city"
                            id="City_Town"
                            className={`w-full px-4 py-2 border ${
                              errors.city ? "border-red-500" : "border-gray-300"
                            } rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:text-black `}
                            value={formData.city}
                            onChange={handleInputChange}
                            ref={cityRef}
                            onMouseEnter={onMouseEnterCityRef}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Home Address e.g Quater 4, House 104, Samco, Mile 4*"
                            name="address"
                            id="Home_Address"
                            className={`w-full px-4 py-2 border ${
                              errors.address
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:text-black `}
                            value={formData.address}
                            onChange={handleInputChange}
                            ref={homeAddressRef}
                            onMouseEnter={onMouseEnterHomeAddressRef}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.address}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Terms */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-20 "
                  >
                    <div className="flex items-center ">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={() => setAgreedToTerms(!agreedToTerms)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="terms" className="ml-2 text-gray-700">
                        I agree with the Terms Of service
                      </label>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex flex-wrap gap-4 -mt-10 mb-10 "
                  >
                    <button className="py-3 px-6 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition">
                      Donate Now
                    </button>
                    <button className="py-3 px-6 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition">
                      Total Donation: ${selectedAmount}
                    </button>
                  </motion.div>
                </div>
                {/* <p className="text-[]">We love you</p> */}
              </div>
              <motion.hr
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                className="my-6 border-gray-200"
              />
              {/* Donation Content */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                className="mb-12"
              >
                <p className="text-gray-600 mb-4">
                  <b>
                    <strong>Real Life Story, Real Impact</strong>
                  </b>
                  <br />
                  Meet Sarah, a single mother of two who recently lost her job.
                  With limited resources, she struggled to put food on the
                  table. Thanks to generous donations from community members
                  like you, Sarah was able to access a local food pantry. With
                  the support she received, she not only fed her children but
                  also enrolled in a job training program that helped her secure
                  stable employment. Sarah’s story is just one of many that
                  illustrate the profound impact your donations can have.
                </p>
                <p className="text-gray-600 mb-6">
                  Hunger is a solvable problem, and with your help, we can
                  create a future where everyone has access to the food they
                  need to thrive. Join us in the fight against hunger in our
                  local communities. Your donation can change lives and build a
                  stronger, healthier community for all.
                </p>

                <motion.hr
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="my-6 border-gray-200"
                />

                <h4 className="text-xl font-bold mb-3 dark:text-slate-900 text-black ">
                  Our Challenge{" "}
                </h4>
                <p className="text-gray-600 mb-4">
                  Hunger is a pervasive issue that affects millions of
                  individuals and families in our communities. Despite the
                  abundance of food produced globally, many people still face
                  food insecurity and malnutrition. The challenge of ending
                  hunger is multifaceted and includes:
                </p>
                <p className="text-gray-600 mb-4">
                  <b>1. Food Insecurity:</b> <br /> Many families lack
                  consistent access to enough food for an active, healthy life.
                  This can be due to economic barriers, lack of transportation,
                  or limited availability of nutritious food options.
                </p>
                <p className="text-gray-600 mb-4">
                  <b>2. Rising Costs :</b> <br /> The increasing cost of living,
                  coupled with stagnant wages, makes it difficult for low-income
                  families to afford healthy food. Many are forced to choose
                  cheaper, less nutritious options.
                </p>

                <p className="text-gray-600 mb-4">
                  <b>3. Food Deserts: </b> <br /> In many urban and rural areas,
                  access to grocery stores and fresh produce is limited. Food
                  deserts contribute to poor dietary choices and health
                  outcomes.
                </p>

                <p className="text-gray-600 mb-4">
                  <b>4. Lack of Awareness:</b> <br /> Many people are unaware of
                  the resources available to help them access food. This lack of
                  information can prevent those in need from seeking assistance.
                </p>

                <motion.hr
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="my-6 border-gray-200"
                />

                <h4 className="text-xl font-bold mb-3 dark:text-slate-900 text-black ">
                  Our Goals{" "}
                </h4>
                <p className="text-gray-600 mb-4">
                  Our goal is to create a hunger-free community where everyone
                  has access to nutritious food. We aim to achieve this through
                  a comprehensive approach that includes:
                </p>
                <p className="text-gray-600 mb-4">
                  <b>1. Increasing Access to Food:</b> <br /> We will work to
                  establish more food pantries, community kitchens, and mobile
                  food distribution programs to ensure that everyone can access
                  healthy food options.
                </p>
                <p className="text-gray-600 mb-4">
                  <b>2. Supporting Local Agriculture: </b> <br /> By partnering
                  with local farmers and food producers, we can promote
                  farm-to-table initiatives that provide fresh, seasonal produce
                  to our communities while supporting the local economy.
                </p>

                <p className="text-gray-600 mb-4">
                  <b>3. Education and Awareness: I</b> <br /> We will implement
                  nutrition education programs that teach individuals and
                  families how to make healthy food choices, cook nutritious
                  meals, and budget for food expenses.
                </p>

                <p className="text-gray-600 mb-4">
                  <b>4. Advocacy:</b> <br /> We will advocate for policies that
                  address the root causes of hunger, such as living wages,
                  affordable housing, and improved access to healthcare. By
                  raising awareness and mobilizing community support, we can
                  influence change at the local and national levels.
                </p>

                <p className="text-gray-600 mb-4">
                  <b>5. Building Community Resilience:</b> <br /> We will foster
                  community engagement through volunteer opportunities,
                  community gardens, and collaborative events that bring people
                  together to share resources and knowledge.
                </p>

                <motion.hr
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="my-6 border-gray-200"
                />
              </motion.div>
            </div>

            {/* Sidebar - Right Section */}
            <div className="w-full lg:w-1/3">
              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                className="mb-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600 font-medium">Category List</p>
                  <div className="flex space-x-1">
                    <div className="h-1 w-6 bg-green-600 rounded"></div>
                    <div className="h-1 w-6 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <ul className="space-y-2">
                    <li className="py-2 px-4 rounded transition bg-green-50 text-green-600 font-semibold">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Food
                    </li>

                    <li className="py-2 px-4 rounded transition hover:bg-gray-50 dark:text-slate-900 text-black ">
                      Medical
                    </li>

                    <li className="py-2 px-4 rounded transition hover:bg-gray-50 dark:text-slate-900 text-black ">
                      Water
                    </li>

                    <li className="py-2 px-4 rounded transition hover:bg-gray-50 dark:text-slate-900 text-black ">
                      Education
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Related Posts */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                Global
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Related Post
                </h3>
                <div className="space-y-4">
                  {/* {[1, 2, 3, 4].map((post) => ( */}
                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-24 relative">
                        <Link href="/upcoming-event-details-1">
                          <Image
                            src={relatedPostImg1}
                            alt="Upcoming Event 1"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <Clock className="w-3 h-3 text-teal-500  " />
                          <span>June 15, 2025</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/upcoming-event-details-1">
                            Hope for the Homeless: Compassion / Provide Home for
                            the Homeless
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>

                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-[110px] relative">
                        <Link href="/donation-details-6">
                          <Image
                            src={relatedPostImg2}
                            alt="Donation List 1"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <DollarSign className="w-3 h-3 text-teal-500 " />
                          <span>Raised Amount: 22, 000, 000 Francs</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/donation-details-6">
                            Act now, save lives—your donation can support those
                            facing extreme hardships and urgent needs!
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>

                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-[110px] relative">
                        <Link href="/donation-details-5">
                          <Image
                            src={relatedPostImg4}
                            alt="Donation List 1"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <DollarSign className="w-3 h-3 text-teal-500 " />
                          <span>Raised Amount: 15, 100, 000 Francs</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/donation-details-5">
                            Give hope, change lives—your donation can provide
                            shelter and support for the homeless today!
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>

                  {/* ))} */}

                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-20 relative">
                        <Link href="/upcoming-event-details-2">
                          <Image
                            src={relatedPostImg5}
                            alt="Upcoming Event 2"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <Clock className="w-3 h-3 text-teal-500 " />
                          <span>August 20, 2025</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/upcoming-event-details-2">
                            Empowering Future Generations: Access to Clean Water
                            for Children.
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>

                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-[110px] relative">
                        <Link href="/donation-details-1">
                          <Image
                            src={relatedPostImg6}
                            alt="Donation List 1"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <DollarSign className="w-3 h-3 text-teal-500 " />
                          <span>Raised Amount: 6, 126, 750 Francs</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/donation-details-1">
                            Empower minds, change futures — Donate today and
                            make a long lasting impacts in lives of people and
                            communities!
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>

                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-[110px] relative">
                        <Link href="/donation-details-3">
                          <Image
                            src={relatedPostImg8}
                            alt="Donation List 1"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <DollarSign className="w-3 h-3 text-teal-500 " />
                          <span>Raised Amount: 12, 050, 250 Francs</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/donation-details-3">
                            Heal lives, restore hope — Your donation can provide
                            essential medical care to those in need!!
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>

                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-20 relative">
                        <Link href="/upcoming-event-details-2">
                          <Image
                            src={relatedPostImg9}
                            alt="Upcoming Event 2"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <Clock className="w-3 h-3 text-teal-500 " />
                          <span>October 13, 2025</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/upcoming-event-details-2">
                            Stand Together for Change: Aid Those in Extreme
                            Cases of Need!
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>

                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-[110px] relative">
                        <Link href="/donation-details-2">
                          <Image
                            src={relatedPostImg10}
                            alt="Donation List 1"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <DollarSign className="w-3 h-3 text-teal-500 " />
                          <span>Raised Amount: 6, 126, 750 Francs</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/donation-details-2">
                            Empower minds, change futures — Your donation can
                            provide education and hope to children in need!
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>

                  <div className="">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-20 h-[110px] relative">
                        <Link href="/donation-details-4">
                          <Image
                            src={relatedPostImg12}
                            alt="Donation List 1"
                            fill
                            className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <DollarSign className="w-3 h-3 text-teal-500 " />
                          <span>Raised Amount: 26, 058, 500 Francs</span>
                        </div>
                        <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                          <a href="/donation-details-4">
                            Quench thirst, transform lives—your donation can
                            provide clean water to communities in need!
                          </a>
                        </h4>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                  </div>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">Tags</h3>

                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm">
                    Food
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Education
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Water
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Medical
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Kindness
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default DonationDetails1;
