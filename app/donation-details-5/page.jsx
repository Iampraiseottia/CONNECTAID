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
import relatedPostImg11 from "/public/gallery/gallery-13.png";
import relatedPostImg12 from "/public/gallery/water.png";

const DonationDetails5 = () => {
  const metadata = {
    title: "Give hope, change lives - ConnectAID Web Application",
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
        category: "Shelter Donation ",
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
          title="SHELTER"
          description="Give hope, change lives"
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
                      src="/gallery/donateList-1.png"
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
                    <h4 className="text-2xl font-bold mb-3 mt-2 dark:text-slate-900 text-black ">
                      Your donation can provide shelter and support for the
                      homeless today!
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Homelessness is a pressing issue that affects millions of
                      individuals and families worldwide. The lack of stable
                      housing not only impacts physical health but also mental
                      well-being, employment opportunities, and access to
                      essential services. Your donation can play a crucial role
                      in providing shelter and support for the homeless, helping
                      to restore dignity and hope to those in need. Your
                      donation can be a powerful catalyst for change, providing
                      shelter and support for the homeless. By understanding the
                      importance of addressing homelessness, the impact of your
                      contributions, and how to effectively support initiatives,
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
                        style={{ width: "55%" }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mb-6 leading-8">
                      <div className="flex gap-6 dark:text-slate-900 text-black ">
                        <div>
                          <p className="text-gray-600">28, 500, 000 Francs</p>
                          <h4 className="font-semibold">Goals</h4>
                        </div>
                        <div>
                          <p className="text-gray-600">15, 100, 000 Francs</p>
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

                  {/* Form starts here */}
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
                  James was a 35-year-old man living in a baffousam city. He had
                  a stable job as a mechanic and a small apartment that he
                  called home. However, life took a drastic turn when he was
                  involved in a serious car accident that left him unable to
                  work for several months. The medical bills piled up, and
                  without a steady income, James quickly fell behind on rent.
                  Eventually, he was evicted from his apartment and found
                  himself homeless.
                  <br />
                </p>

                <hr className="my-6 border-gray-200" />

                <p className="text-gray-600 mb-6">
                  <b className="mb-2">Struggles on the Streets</b>
                  <br />
                  For the next six months, James lived on the streets. He faced
                  numerous challenges, including harsh weather conditions, lack
                  of access to food, and the constant threat of violence. The
                  psychological toll of homelessness weighed heavily on him,
                  leading to feelings of despair and isolation. James struggled
                  to find resources, often relying on soup kitchens and shelters
                  for meals and temporary refuge.
                </p>

                <hr className="my-6 border-gray-200" />

                <p className="text-gray-600 mb-6">
                  <b className="mb-2">Turning Point: Finding Support</b>
                  <br />
                  One day, while seeking shelter from the rain, James stumbled
                  upon a local nonprofit organization dedicated to helping the
                  homeless which is ConnectAID. We provided emergency shelter,
                  meals, and access to support services. With the help of a
                  compassionate caseworker, James began to see a glimmer of
                  hope.
                </p>

                <hr className="my-6 border-gray-200" />

                <h3>Impact of Donations</h3>

                <p className="text-gray-600 mb-6">
                  <b className="mb-2">Emergency Shelter:</b>
                  <br />
                  Thanks to donations from the community, connectAID was able to
                  provide James with a safe place to sleep. This immediate
                  support allowed him to regain some stability in his life.
                </p>

                <p className="text-gray-600 mb-6">
                  <b className="mb-2">Access to Healthcare:</b>
                  <br />
                  The organization connected James with healthcare services,
                  where he received treatment for his injuries and mental health
                  support. This access to care was crucial in helping him
                  recover physically and emotionally.
                </p>

                <p className="text-gray-600 mb-6">
                  <b className="mb-2">Job Training Programs:</b>
                  <br />
                  With encouragement from his caseworker, James enrolled in a
                  job training program funded by donations. He learned new
                  skills and received assistance in job placement. Within a few
                  months, he secured a position at a local auto repair shop.
                </p>

                <p className="text-gray-600 mb-6">
                  <b className="mb-2">Transitional Housing:</b>
                  <br />
                  As part of the program, James was offered transitional
                  housing, which provided him with a stable living environment
                  while he worked towards permanent housing. This support was
                  instrumental in helping him rebuild his life.
                </p>
                <hr className="my-6 border-gray-200" />

                <p className="text-gray-600 mb-6">
                  <b className="mb-2">A New Beginning</b>
                  <br />
                  After several months of hard work and determination, James was
                  able to move into his own apartment again. He not only
                  regained his independence but also developed a sense of
                  community with others who had faced similar challenges. James
                  became an advocate for the homeless, sharing his story to
                  raise awareness and encourage others to support local
                  organizations.
                </p>

                <hr className="my-6 border-gray-200" />

                <p className="text-gray-600 mb-6">
                  <b className="mb-2">The Ripple Effect of Your Donation</b>
                  <br />
                  James's journey from homelessness to stability illustrates the
                  profound impact that donations can have on individuals in
                  need. By providing shelter, healthcare, job training, and
                  transitional housing, the community came together to support
                  James during his most challenging times.
                  <br />
                  His story is a testament to the power of compassion and the
                  difference that each donation can make. With continued
                  support, organizations can help more individuals like James
                  find their way back to stability, dignity, and hope. Your
                  donation can be the catalyst for change, transforming lives
                  and creating a ripple effect of positive impact in the
                  community.
                </p>
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
                      { name: "Shelter", active: true },
                      { name: "Water", active: false },
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
                    Shelter
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

export default DonationDetails5;
