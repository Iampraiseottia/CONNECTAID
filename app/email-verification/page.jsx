"use client";

import { React, useRef, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import globalStyle from "../globals.css";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import navLogo from "/public/icon/logo.png";

const EmailVerificationForm = () => {
  
  const emailRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Get email from URL parameters when component mounts
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

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

    router.push("/verification-code");
  };

  return (
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
              className="text-xl dark:text-slate-900 text-black "
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-teal-500 mr-2 "
              />{" "}
              Verify Email
            </label>
            <br />

            <input
              id="email"
              type="email"
              ref={emailRef}
              value={email}
              readOnly={true}
              className={`w-full text-base bg-gray-100 rounded-xl border-2 ${
                error ? "border-red-500" : "border-green-500"
              } py-3 px-4 focus:ring-1 focus:ring-[#0ef] outline-none focus:outline-none duration-300 mt-3 dark:text-slate-900 cursor-not-allowed`}
            />

            {error && (
              <p className="text-red-500 mt-2 text-right font-medium">
                {error}
              </p>
            )}
          </div>

          <div className="px-[10%] mt-4">
            <p className="text-sm text-gray-600">
              We will send a verification code to this email address.
            </p>
          </div>

          <button
            className="mx-[10%] mt-7 mb-4 py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-xl font-bold tracking-wide w-[80%] sm:text-2xl md:text-3xl"
            type="submit"
          >
            Send Code
          </button>
        </form>
      </div>
    </motion.main>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="py-6 md:py-8 lg:py-10 flex items-center justify-center px-4 min-h-screen">
    <div className="bg-white w-full max-w-md md:max-w-2xl lg:max-w-3xl h-auto shadow-xl py-6 md:py-8 lg:py-10 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="px-[10%] mt-8">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 w-full bg-gray-200 rounded animate-pulse mt-8"></div>
      </div>
    </div>
  </div>
);

const Email_Verification = () => {
  const metadata = {
    title: "Verify Email Address - ConnectAID ",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  return (
    <main className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

      <Suspense fallback={<LoadingFallback />}>
        <EmailVerificationForm />
      </Suspense>
    </main>
  );
};

export default Email_Verification;
