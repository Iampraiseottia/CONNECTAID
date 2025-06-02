"use client";

import { React, useRef, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import globalStyle from "../globals.css";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import navLogo from "/public/icon/logo.png";

const CodeVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codeValues, setCodeValues] = useState(["", "", "", "", "", ""]);
  const [codeErrors, setCodeErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const codeRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Get email from URL parameters when component mounts
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push("/email-verification");
    }
  }, [searchParams, router]);

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
    setSuccess("");

    const newCodeErrors = [...codeErrors];
    newCodeErrors[index] = false;
    setCodeErrors(newCodeErrors);

    if (value.length === 1 && index < 5) {
      codeRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && codeValues[index] === "") {
      codeRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    const isEmpty = codeValues.some((val) => val === "");

    if (isEmpty) {
      setError("Please enter all 6 digits of the verification code");
      const newCodeErrors = codeValues.map((val) => val === "");
      setCodeErrors(newCodeErrors);
      setIsLoading(false);
      return;
    }

    const code = codeValues.join("");

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Email verified successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError(data.error || "Invalid verification code");
        setCodeValues(["", "", "", "", "", ""]);
        codeRefs[0].current.focus();
      }
    } catch (error) {
      console.error('Error:', error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return;
    
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("New verification code sent!");
        setCodeValues(["", "", "", "", "", ""]);
        codeRefs[0].current.focus();
      } else {
        setError(data.error || "Failed to resend code");
      }
    } catch (error) {
      console.error('Error:', error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      className="py-6 md:py-8 lg:py-10 flex items-center justify-center px-4 min-h-screen"
    >
      <div className="bg-white w-full max-w-md md:max-w-2xl lg:max-w-5xl h-auto shadow-xl py-6 md:py-8 lg:py-10 rounded-lg">
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

        {/* Back button and email display */}
        <div className="px-[10%] mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-teal-500 hover:text-teal-600 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </button>
          {email && (
            <p className="text-sm text-gray-600 mt-2">
              Verification code sent to: <span className="font-medium">{email}</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className="ease-in-out transition-all w-full mx-[10%] pt-5">
            <label
              htmlFor="verification_code"
              className="text-left text-[22px] font-medium tracking-wider dark:text-slate-900 text-black "
            >
              Verification Code
            </label>

            <div className="mt-6 mb-1 flex flex-row justify-start items-center ">
              {[0, 1, 2, 3, 4, 5].map((index) => (
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
                  disabled={isLoading}
                  className={`sm:w-[12%] w-[9%] text-center text-base bg-transparent rounded-xl outline-none border-2 
                  ${
                    codeErrors[index]
                      ? "border-red-500 focus:outline-none "
                      : success
                      ? "border-green-500"
                      : "border-gray-300"
                  } 
                  py-3 sm:px-4 focus:ring-1 focus:ring-[#0ef] focus:outline-none duration-300 dark:text-black
                  ${index < 5 ? "mr-3" : ""} ${isLoading ? "opacity-50" : ""}`}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 my-3 text-start font-medium">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-500 my-3 text-start font-medium">
                {success}
              </p>
            )}
          </div>

          <button
            className={`mx-[10%] mt-7 mb-4 py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-3xl font-bold tracking-wide w-[80%] ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>

          {/* Resend code button */}
          <div className="text-center mx-[10%]">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className={`text-teal-500 hover:text-teal-600 text-sm underline ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </form>
      </div>
    </motion.main>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="py-6 md:py-8 lg:py-10 flex items-center justify-center px-4 min-h-screen">
    <div className="bg-white w-full max-w-md md:max-w-2xl lg:max-w-5xl h-auto shadow-xl py-6 md:py-8 lg:py-10 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="px-[10%] mt-8">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="flex gap-3 mb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

const Code_Verification = () => {
  const metadata = {
    title: "Validate Account - ConnectAID ",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  return (
    <main className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

      <Suspense fallback={<LoadingFallback />}>
        <CodeVerificationForm />
      </Suspense>
    </main>
  );
};

export default Code_Verification;