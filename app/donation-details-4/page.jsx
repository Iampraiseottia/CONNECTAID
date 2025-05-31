"use client";

import globalStyle from "../globals.css";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";

import {
  X,
  CheckCircle,
  Heart,
  Download,
  Clock,
  DollarSign,
} from "lucide-react";

import navLogo from "/public/icon/logo.png";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import relatedPostImg1 from "/public/gallery/donateList-1.png";
import relatedPostImg2 from "/public/gallery/gallery-4.png";
import relatedPostImg4 from "/public/urgent/urgent-1.png";
import relatedPostImg5 from "/public/gallery/donationList-2.png";
import relatedPostImg6 from "/public/gallery/gallery-1.png";
import relatedPostImg8 from "/public/gallery/gallery-2.png";
import relatedPostImg9 from "/public/blog/blog-5.png";
import relatedPostImg10 from "/public/gallery/education.png";
import relatedPostImg12 from "/public/gallery/water.png";

const DonationDetails4 = () => {
  const metadata = {
    title: "Quench thirst, transform lives - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const [selectedPayment, setSelectedPayment] = useState("mtn");
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    fullName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    mobileNumber: "",
    fullName: "",
    email: "",
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
    const mobileRegex = /^\d{3}\d{3}\d{3}$/;
    return mobileRegex.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const mobileMoneyNumberRef = useRef();
  const fullNameRef = useRef();
  const emailAddressRef = useRef();

  const onMouseEnterMobileNUmberRef = () => {
    mobileMoneyNumberRef.current.focus();
  };

  const onMouseEnterFullNameRef = () => {
    fullNameRef.current.focus();
  };

  const onMouseEnterEmailAddressRef = () => {
    emailAddressRef.current.focus();
  };

  const [donationData, setDonationData] = useState(null);
  const [thankYouMessage, setThankYouMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
      isValid = false;
    } else if (!validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber =
        "Please enter a valid mobile number (e.g. 686529762)";
      isValid = false;
    } else if (formData.mobileNumber.length < 2) {
      newErrors.mobileNumber = "Mobile Number must be at least 2 characters";
      isValid = false;
    } else if (formData.mobileNumber.length > 16) {
      newErrors.mobileNumber = "Mobile Number cannot exceed 16 characters";
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

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms of Service";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);

      // Generate transaction ID
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      const transactionId = `TXN-${timestamp}-${randomStr}`;

      // Get payment method name
      const paymentMethodName =
        selectedPayment === "mtn" ? "MTN Mobile Money" : "Orange Mobile Money";

      const newDonationData = {
        name: formData.fullName,
        email: formData.email,
        phoneNumber: formData.mobileNumber,
        amount: selectedAmount,
        category: "Water Donation -  Quench Thirst Of Those In Desperate Need",
        paymentMethod: paymentMethodName,
        transactionId: transactionId,
        timestamp: new Date().toISOString(),
      };

      setDonationData(newDonationData);

      console.log("Form submitted successfully", newDonationData);

      setThankYouMessage(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setSelectedAmount(1000);
        setFormData({
          mobileNumber: "",
          fullName: "",
          email: "",
        });
        setSelectedPayment("mtn");
        setAgreedToTerms(false);
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
          title="WATER"
          description="Quench thirst, transform lives"
          breadcrumAlt="Hero Background Image"
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
                      src="/gallery/water.png"
                      alt="Donation List main image"
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
                    <h4 className="text-2xl font-bold mb-3 mt-2 dark:text-slate-900 text-black">
                      Your donation can provide clean water to communities in
                      need!
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Access to clean water is a fundamental human right, yet
                      millions of people around the world still lack this
                      essential resource. Contaminated water sources lead to a
                      myriad of health issues, including waterborne diseases,
                      malnutrition, and even death. Your donation can make a
                      significant difference in the lives of those in need by
                      providing clean, safe drinking water. Join us in our
                      mission to provide clean water to those in need. Make a
                      donation today and be a part of the solution! Your support
                      can change lives and create a ripple effect of positive
                      change in communities around the world.
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
                        style={{ width: "72.12%" }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mb-6 leading-8">
                      <div className="flex gap-6 dark:text-slate-900 text-black">
                        <div>
                          <p className="text-gray-600">35, 750, 000 Francs</p>
                          <h4 className="font-semibold">Goals</h4>
                        </div>
                        <div>
                          <p className="text-gray-600">26, 058, 500 Francs</p>
                          <h4 className="font-semibold">Raised</h4>
                        </div>
                      </div>
                      <button className="text-green-600 p-2 border border-green-600 rounded-full hover:bg-green-50">
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

                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {/* Payment Method */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-4 dark:text-slate-900 text-black ">
                        Select Payment Method
                      </h4>
                      <div className="space-y-3 ">
                        <div className="flex items-center">
                          <input
                            id="mtn-momo"
                            type="radio"
                            name="payment"
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
                    </div>

                    {/* Amount */}
                    <div className="mb-8">
                      <button
                        type="button"
                        className="mb-4 w-full sm:w-auto text-xl font-semibold py-2 px-10 dark:text-slate-900 text-black  "
                      >
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
                            type="button"
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
                    </div>

                    {/* Your Full Name */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-4 dark:text-slate-900 text-black ">
                        Donation Payment Number
                      </h4>
                      <div className="bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          <div>
                            <input
                              type="text"
                              placeholder="Mobile Money Number e.g 686529762*"
                              className={`w-full border outline-none ease-in-out px-3 py-2 rounded-md focus:outline-none focus:ring-2 dark:bg-white dark:text-gray-800 ${
                                errors.mobileNumber
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                              }`}
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
                        </div>
                      </div>
                    </div>

                    {/* Your Full Name */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-4 dark:text-slate-900 text-black ">
                        Full Name
                      </h4>
                      <div className="bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 gap-4 mb-4">
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
                      </div>
                    </div>

                    {/* Address */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-4 dark:text-slate-900 text-black ">
                        Email Address
                      </h4>
                      <div className="bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 gap-4 mb-4">
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
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="mb-20 ">
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
                      {errors.terms && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.terms}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 -mt-10 mb-10 ">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto mt-2 ease-in-out cursor-pointer px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? "Processing..." : "Donate Now"}
                      </button>
                      <button
                        type="button"
                        className="py-3 px-6 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition"
                      >
                        Total Donation: {selectedAmount} Francs
                      </button>
                    </div>
                  </motion.form>
                </div>
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
                  In Garoua, Communities faced severe water scarcity, relying on
                  contaminated sources that led to frequent illness. Thanks to
                  generous donations, a clean water well was constructed,
                  transforming lives. Fatmata Conteh, a local mother, shared how
                  her family's health improved dramatically. Her children, once
                  often sick, now thrive, attending school regularly and
                  dreaming of brighter futures. This change not only enhanced
                  their health but also empowered the community, fostering hope
                  and resilience.
                  <br />
                </p>

                <motion.hr
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="my-6 border-gray-200"
                />

                <h4 className="text-xl font-bold mb-3 dark:text-slate-900 text-black">
                  Our Challenge{" "}
                </h4>
                <p className="text-gray-600 mb-4">
                  While the impact of providing clean water to communities in
                  need is profound, several challenges can arise in the process
                  of implementing water projects. Understanding these challenges
                  is crucial for developing effective strategies to overcome
                  them. Here are some of the key challenges faced in clean water
                  initiatives:
                </p>
                <p className="text-gray-600 mb-4">
                  <b>1. Infrastructure Limitations</b> <br />
                  <strong>Geographical Barriers:</strong>
                  Many communities are located in remote or difficult-to-access
                  areas, making it challenging to transport materials and
                  equipment needed for water projects.
                  <br />
                  <strong>Existing Infrastructure: </strong>
                  In some regions, outdated or poorly maintained infrastructure
                  can hinder the implementation of new water systems.
                </p>

                <p className="text-gray-600 mb-4">
                  <b>2. Funding Constraints</b> <br />
                  <strong>Limited Resources: </strong> Many organizations face
                  budget constraints that limit their ability to undertake
                  large-scale projects or maintain existing systems. <br />
                  <strong>Dependence on Donations:</strong> Reliance on
                  donations can lead to fluctuations in funding, making it
                  difficult to plan long-term projects.
                </p>

                <p className="text-gray-600 mb-4">
                  <b> 3. Sustainability Issues</b> <br />
                  <strong>Maintenance and Repair:</strong> Ensuring that water
                  systems are maintained and repaired over time is crucial for
                  sustainability. Communities may lack the technical skills or
                  resources to perform necessary upkeep. <br />
                  <strong>Environmental Factors: </strong> Changes in climate,
                  such as droughts or floods, can impact water sources and the
                  effectiveness of water projects.
                </p>

                <p className="text-gray-600 mb-4">
                  <b>4. Health and Hygiene Education</b> <br />
                  <strong>Behavioral Change: </strong> Educating communities
                  about hygiene practices and the importance of using clean
                  water can be challenging. Behavioral change often requires
                  ongoing education and reinforcement. <br />
                  <strong>Access to Information:</strong> In some areas, limited
                  access to information and resources can hinder effective
                  health education initiatives.
                </p>

                <p className="text-gray-600 mb-4">
                  Addressing these challenges requires a multifaceted approach
                  that includes community engagement, sustainable practices,
                  adequate funding, and ongoing education. By recognizing and
                  proactively tackling these obstacles, organizations can
                  enhance the effectiveness of clean water initiatives and
                  ensure that communities receive the long-term benefits of
                  access to safe drinking water. Collaboration with local
                  governments, community leaders, and other stakeholders is
                  essential to create sustainable solutions that empower
                  communities and improve health outcomes.
                </p>

                <motion.hr
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="my-6 border-gray-200"
                />

                <h4 className="text-xl font-bold mb-3 dark:text-slate-900 text-black">
                  Our Goals{" "}
                </h4>
                <p className="text-gray-600 mb-4">
                  Setting clear and achievable goals is essential for the
                  success of clean water initiatives. These goals should focus
                  on improving access to clean water, enhancing community
                  health, and promoting sustainable practices. Here are some key
                  goals that can guide your efforts in providing clean water to
                  communities in need:
                </p>
                <p className="text-gray-600 mb-4">
                  <b>1. Increase Access to Clean Water </b> <br /> Ensure that
                  at least 90% of the targeted community has access to safe and
                  reliable drinking water within the next three years. <br />
                  <b>Action Steps</b> <br />
                  <ul>
                    <li>
                      Construct new wells and water systems in underserved
                      areas.
                    </li>
                    <li>
                      Implement rainwater harvesting systems to supplement water
                      supply.
                    </li>
                  </ul>
                </p>

                <p className="text-gray-600 mb-4">
                  <b>2. Promote Sustainable Water Management</b> <br />{" "}
                  Establish sustainable water management practices in the
                  community, ensuring the longevity of water sources and
                  systems. <br />
                  <b>Action Steps:</b> <br />
                  <ul>
                    <li>
                      Train community members in maintenance and repair of water
                      systems.
                    </li>
                    <li>
                      Develop a community-led water management committee to
                      oversee operations and sustainability.
                    </li>
                  </ul>
                </p>

                <p className="text-gray-600 mb-4">
                  <b> 3. Increase Funding and Resources </b> <br />
                  Secure funding to support clean water initiatives, aiming to
                  raise at least 20% more than the previous year through
                  donations, grants, and partnerships. <br />
                  <b>Action Steps:</b> <br />
                  <ul>
                    <li>
                      Develop a comprehensive fundraising strategy that includes
                      online campaigns, events, and grant applications.
                    </li>
                    <li>
                      Engage with corporate sponsors and local businesses to
                      support water projects.
                    </li>
                  </ul>
                </p>

                <p className="text-gray-600 mb-4">
                  <b> 4. Advocate for Policy Change </b> <br />
                  Advocate for improved water policies and regulations at the
                  local and national levels to support sustainable water
                  management practices. <br />
                  <b>Action Steps:</b> <br />
                  <ul>
                    <li>
                      Collaborate with advocacy groups to raise awareness about
                      water issues.
                    </li>
                    <li>
                      Engage with policymakers to promote legislation that
                      supports clean water access and sustainability.
                    </li>
                  </ul>
                </p>

                <p className="text-gray-600 mb-4">
                  By setting these goals, connectAID can create a clear roadmap
                  for providing clean water to communities in need. These goals
                  not only focus on immediate access to safe drinking water but
                  also emphasize the importance of sustainability, community
                  engagement, and health education. Achieving these goals will
                  lead to lasting positive impacts on the health and well-being
                  of communities, empowering them to thrive and build a better
                  future.
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
                    {[
                      { name: "Food", active: false },
                      { name: "Medical", active: false },
                      { name: "Water", active: true },
                      { name: "Education", active: false },
                    ].map((category, index) => (
                      <li
                        key={index}
                        className={`py-2 px-4 rounded transition ${
                          category.active
                            ? "bg-green-50 text-green-600 font-semibold"
                            : "hover:bg-gray-50 dark:text-slate-900 text-black "
                        }`}
                      >
                        {/* <a href="#" className="flex items-center"> */}
                        {category.active && (
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        )}
                        {category.name}
                        {/* </a> */}
                      </li>
                    ))}
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
                className="bg-white rounded-lg shadow-md p-6 "
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">Tags</h3>

                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm">
                    Water
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Food
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Medical
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Education
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Kindness
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Thank You Message */}
          {thankYouMessage && donationData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8 mt-2">
                  <div className="flex items-center ">
                    <Image
                      src={navLogo}
                      alt="ConnectAID Logo"
                      width={32}
                      height={32}
                      className="h-8 w-8 mr-2"
                    />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      ConnectAID
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setThankYouMessage(false);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Success Content */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-green-200 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 relative">
                    <CheckCircle
                      size={48}
                      className="text-green-500 dark:text-green-400"
                    />
                    <div className="absolute -top-2 -right-2">
                      <Heart size={20} className="text-red-500 fill-current" />
                    </div>
                  </div>

                  {/* Thank You Message */}
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">
                    Thank You, {donationData.name}! 🙏
                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
                    Your generous donation of{" "}
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {Number(donationData.amount).toLocaleString()} Francs
                    </span>{" "}
                    has been successfully processed!
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 w-full mb-6">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Donation Details:
                    </h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">
                          Name:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {donationData.name}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">
                          Email:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {donationData.email}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">
                          Phone:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {donationData.phoneNumber}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">
                          Category:
                        </span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                          {donationData.category}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">
                          Payment Method:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium capitalize">
                          {donationData.paymentMethod.replace(/_/g, " ")}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">
                          Transaction ID:
                        </span>
                        <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">
                          {donationData.transactionId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 px-4 mb-4 rounded-lg bg-blue-500 dark:bg-blue-600 text-white font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Receipt
                  </button>

                  <div className="text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                      Your contribution is making a real difference! 💫
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      The Donation Receipt Has been Sent To Your Email{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default DonationDetails4;
