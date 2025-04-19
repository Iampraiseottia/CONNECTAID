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

const Verify = () => {
  const metadata = {
    title: "Verify - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const router = useRouter();
  const [error, setError] = useState("");
  const [codeValues, setCodeValues] = useState(["", "", "", ""]);
  const [codeErrors, setCodeErrors] = useState([false, false, false, false]);

  const codeRefs = [useRef(), useRef(), useRef(), useRef()];

  const onMouseEnterCode = (index) => {
    codeRefs[index].current.focus();
  };

  const handleCodeChange = (index, e) => {
    const value = e.target.value;

    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }

    const newCodeValues = [...codeValues];
    newCodeValues[index] = e.target.value;
    setCodeValues(newCodeValues);

    setError("");

    const newCodeErrors = [...codeErrors];
    newCodeErrors[index] = false;
    setCodeErrors(newCodeErrors);

    if (value.length === 1 && index < 3) {
      codeRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && codeValues[index] === "") {
      codeRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = codeValues.some((val) => val === "");

    if (isEmpty) {
      setError("Please enter all 4 digits of the verification code");

      const newCodeErrors = codeValues.map((val) => val === "");
      setCodeErrors(newCodeErrors);

      return;
    }

    router.push("/new-password");
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
            <div className="ease-in-out transition-all w-full mx-[10%] pt-5">
              <label
                htmlFor="verification_code"
                className="text-left text-[22px] font-medium tracking-wider  "
              >
                Verification Codes
              </label>

              {error && (
                <p 
                  className="text-red-500 my-3 text-center font-medium"
                >
                  {error}
                </p>
              )}

              <div className="mt-6 mb-1 flex flex-row justify-center items-center -ml-16 ">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="text"
                    ref={codeRefs[index]}
                    value={codeValues[index]}
                    onChange={(e) => handleCodeChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onMouseEnter={() => onMouseEnterCode(index)} 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    placeholder={index + 1}
                    className={`w-[18%] text-center text-base bg-transparent rounded-xl outline-none border-2 ${
                      codeErrors[index] ? "border-red-500 focus:outline-none" : "border-green-500"
                    } py-3 px-4 focus:ring-1 focus:ring-[#0ef] focus:outline-none duration-300 ${
                      index < 3 ? "mr-3" : "" 
                    }`}
                  /> 
                ))}
              </div>
            </div>

            <button
              className="mx-[10%] mt-7 mb-4 py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-3xl font-bold tracking-wide w-[80%]"
              type="submit"
            >
              Verify
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

export default Verify;
