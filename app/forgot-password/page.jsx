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

      <motion.main
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.1 }}
        className="py-32 flex items-center justify-center"
      >
        <div className="  bg-white sm:w-[40%] h-auto shadow-xl py-10">
          <div className="flex items-center justify-center">
            <Image
              src="/icon/logo.png"
              height={100}
              width={100}
              alt="ConnectAID Logo"
            />
            <h1 className="ml-4 text-4xl font-bold tracking-wide">
              ConnectAID
            </h1>
          </div>

          <br />

          <form onSubmit={handleSubmit} className="">
            <div className="px-[10%] mt-4 mb-4">
              <label htmlFor="emailAddress" className="text-xl ">
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
                } py-3 px-4 focus:ring-1 focus:ring-[#0ef] outline-none focus:outline-none duration-300 mt-3 `}
              />

              {error && (
                <p className="text-red-500 mt-2 text-right font-medium">
                  {error}
                </p>
              )}
            </div>

            <button
              className="mx-[10%] mt-7 mb-4 py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-3xl font-bold tracking-wide w-[80%]"
              type="submit"
            >
              Reset Password
            </button>
          </form>

          <p className="mx-[10%] mt-4 mb-4 text-center py-2 ">
            Go back to{" "}
            <Link href="/login" className="text-teal-500">
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
