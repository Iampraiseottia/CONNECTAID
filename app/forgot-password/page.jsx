"use client";

import { React, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import globalStyle from "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import navLogo from "/public/icon/logo.png";

const ForgotPassword = () => {
  const metadata = {
    title: "Forgot Password - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const emailRef = useRef(); 

  const onMouseEnterEmailRef = () => {
    emailRef.current.focus();
  };

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter an Email Address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    router.push("/verify");
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
        viewport={{ once: true, amount: 0.1 }}
        className="w-full"
      >
        <Breadcrumb
          homeTitle="HOME"
          homeSlug="/"
          title="FORGOT PASSWORD"
          description="FORGOT PASSWORD"
          breadcrumAlt=" Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

   Forgot Password 
      <motion.main
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.1 }}
        className="py-6 md:py-8 lg:py-10 flex items-center justify-center px-4 min-h-screen"
      >
        <div className="bg-white w-full max-w-md md:max-w-2xl lg:max-w-3xl h-auto shadow-xl py-6 md:py-8 lg:py-10 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <Image
              src={navLogo}
              height={80} 
              width={80}
              alt="ConnectAID Logo"
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-center md:text-left dark:text-slate-950 text-black ">
              ConnectAID 
            </h1>
          </div> 

          <br />

          <form onSubmit={handleSubmit} className="">
            <div className="px-[10%] mt-4 mb-4">
              <label
                htmlFor="emailAddress"
                className="text-xl dark:text-slate-900 text-black"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-teal-500 mr-2 "
                />{" "}
                Email
              </label>
              <br />

              <input
                id="email"
                type="email"
                ref={emailRef}
                value={email}
                onChange={handleEmailChange}
                onMouseEnter={onMouseEnterEmailRef}
                placeholder="Enter Your Email Address"
                className={`w-full text-base bg-transparent rounded-xl border-2 ${
                  error ? "border-red-500" : "border-green-500"
                } py-3 px-4 focus:ring-1 focus:ring-[#0ef] outline-none focus:outline-none duration-300 mt-3 dark:text-slate-900 `}
              />

              {error && (
                <p className="text-red-500 mt-2 text-right font-medium">
                  {error}
                </p>
              )}
            </div>

            <button
              className="mx-[10%] mt-7 mb-4 py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-xl font-bold tracking-wide w-[80%] sm:text-2xl md:text-3xl"
              type="submit"
            >
              Reset Password
            </button>
          </form>

          <p className="mx-[10%] mt-4 mb-4 text-center py-2 dark:text-slate-900 text-black text-sm md:text-base text-[16px] ">
            Go back to{" "}
            <Link
              href="/login"
              className="text-teal-500  hover:text-[16.2px] hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.main>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default ForgotPassword;
