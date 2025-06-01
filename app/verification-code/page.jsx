"use client";

import { React, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import globalStyle from "../globals.css";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import Image from "next/image";
import Link from "next/link";

import navLogo from "/public/icon/logo.png";

const Code_Verification = () => {
  const metadata = {
    title: "Validate Account - ConnectAID ",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const router = useRouter();
  const [error, setError] = useState("");
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

    if (value.length === 1 && index < 5) {
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
      setError("Please enter all 6 digits of the verification code");

      const newCodeErrors = codeValues.map((val) => val === "");
      setCodeErrors(newCodeErrors);

      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

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

          <form onSubmit={handleSubmit} className="">
            <div className="ease-in-out transition-all w-full mx-[10%] pt-5">
              <label
                htmlFor="verification_code"
                className="text-left text-[22px] font-medium tracking-wider dark:text-slate-900 text-black "
              >
                Verification Codes
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
                    className={`w-[12%] text-center text-base bg-transparent rounded-xl outline-none border-2 
                    ${
                      codeErrors[index]
                        ? "border-red-500 focus:outline-none "
                        : "border-green-500"
                    } 
                    py-3 px-4 focus:ring-1 focus:ring-[#0ef] focus:outline-none duration-300 
                    ${index < 5 ? "mr-3" : ""}`}
                  />
                ))}
              </div>

              {error && (
                <p className="text-red-500 my-3 text-start font-medium">
                  {error}
                </p>
              )}
            </div>

            <button
              className="mx-[10%] mt-7 mb-4 py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-3xl font-bold tracking-wide w-[80%]"
              type="submit"
            >
              Verify 
            </button>
          </form>
        </div>
      </motion.main>
    </main>
  );
};

export default Code_Verification; 
