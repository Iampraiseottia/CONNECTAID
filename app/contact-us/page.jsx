"use client";

import React, { useState, useRef } from "react";

import globalStyle from "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import { Phone, Mail, MapPin } from "lucide-react";

const ContactUS = () => {
  const metadata = {
    title: "Contact Us - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form data submitted:", formData);

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: "",
      });

      console.log("Message sent successfully!");
    } else {
      console.log("Form validation failed");
    }
  };

  const fullNameRef = useRef();

  const onMouseEnterFullNameRef = () => {
    fullNameRef.current.focus();
  };

  const phoneNumberRef = useRef();

  const onMouseEnterPhoneNumberRefRef = () => {
    phoneNumberRef.current.focus();
  };

  const emailAddressRef = useRef();

  const onMouseEnterEmailAddressRef = () => {
    emailAddressRef.current.focus();
  };

  const messageRef = useRef();

  const onMouseEnterMessageRef = () => {
    messageRef.current.focus();
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
          title="CONTACT US"
          description="CONTACT US"
          breadcrumAlt="BreadCrumAlt Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

      {/* Contact Us Main Content */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="py-16 md:py-24 "
      >
        <div className="container mx-auto px-4">
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="bg-emerald-600 rounded-full p-4 text-white">
                    <Phone size={24} />
                  </div>
                  <div className="hidden md:block w-px h-12 bg-gray-200 mx-2"></div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <a
                      href="tel:+237681395750"
                      className="text-gray-800 font-medium hover:text-emerald-600"
                    >
                      +237 681 395 750
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="bg-emerald-600 rounded-full p-4 text-white">
                    <Mail size={24} />
                  </div>
                  <div className="hidden md:block w-px h-12 bg-gray-200 mx-2"></div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <a
                      href="mailto:connectaid@gmail.com"
                      className="text-gray-800 font-medium hover:text-emerald-600"
                    >
                      connectaid@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="bg-emerald-600 rounded-full p-4 text-white">
                    <MapPin size={24} />
                  </div>
                  <div className="hidden md:block w-px h-12 bg-gray-200 mx-2"></div>
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <a
                      href="https://www.google.com/maps?q=Malingo+Southwest+Buea+Cameroon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 font-medium hover:text-emerald-600"
                    >
                      View on Google Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Alex Jordan"
                      className={`w-full px-4 py-3 border ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      } ease-in-out duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      ref={fullNameRef}
                      onMouseEnter={onMouseEnterFullNameRef}
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Phone"
                      className={`w-full px-4 py-3 border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } ease-in-out duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      ref={phoneNumberRef}
                      onMouseEnter={onMouseEnterPhoneNumberRefRef}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } ease-in-out duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      ref={emailAddressRef}
                      onMouseEnter={onMouseEnterEmailAddressRef}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="6"
                      placeholder="Type You message here"
                      className={`w-full px-4 py-3 border ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } ease-in-out duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      ref={messageRef}
                      onMouseEnter={onMouseEnterMessageRef}
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition duration-300 uppercase"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div className="sm:h-auto h-[40vh] w-full shadow-xl rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?q=Malingo+Southwest+Buea+Cameroon&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default ContactUS;
