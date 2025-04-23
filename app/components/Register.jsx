"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faUser,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { motion } from "motion/react";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const userNameRef = useRef();
  const confirmPasswordRef = useRef();

  const onMouseEnterFullNameRef = () => {
    fullNameRef.current.focus();
  };

  const onMouseEnterConfirmPasswordRef = () => {
    confirmPasswordRef.current.focus();
  };

  const onMouseEnterUserNameRef = () => {
    userNameRef.current.focus();
  };

  const onMouseEnterEmailRef = () => {
    emailRef.current.focus();
  };

  const onMouseEnterPasswordRef = () => {
    passwordRef.current.focus();
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      className="py-16 md:py-24 lg:py-32 flex items-center justify-center px-4 min-h-screen"
    >
      <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl h-auto shadow-xl py-6 md:py-8 lg:py-10 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <Image
            src="/icon/logo.png"
            height={80}
            width={80}
            alt="ConnectAID Logo"
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-center md:text-left">
            ConnectAID
          </h1>
        </div>

        <form className="mt-6">
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-4 mb-4">
            <label
              htmlFor="fullName"
              className="text-lg md:text-xl font-medium"
            >
              <FontAwesomeIcon icon={faUser} className="text-teal-500 mr-2" />{" "}
              Full Name
            </label>
            <br />

            <input
              type="text"
              name="fullName"
              placeholder="Your Full Names"
              id="fullName"
              ref={fullNameRef}
              onMouseEnter={onMouseEnterFullNameRef}
              className="border border-slate-400 px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg"
            />
          </div>

          <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-4 mb-4">
            <label
              htmlFor="emailAddress"
              className="text-lg md:text-xl font-medium"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-teal-500 mr-2"
              />{" "}
              Email
            </label>
            <br />

            <input
              type="email"
              name="emailAddress"
              placeholder="Your Email Address"
              id="emailAddress"
              ref={emailRef}
              onMouseEnter={onMouseEnterEmailRef}
              className="border border-slate-400 px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg"
            />
          </div>

          <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-4 mb-4">
            <label
              htmlFor="userName"
              className="text-lg md:text-xl font-medium"
            >
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-teal-500 mr-2"
              />{" "}
              User Name
            </label>
            <br />

            <input
              type="text"
              name="userName"
              placeholder="Your Username"
              id="userName"
              ref={userNameRef}
              onMouseEnter={onMouseEnterUserNameRef}
              className="border border-slate-400 px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1 md:gap-2 px-4 sm:px-6 md:px-8 lg:px-10 mt-4 md:mt-6 mb-4 md:mb-6">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-lg md:text-xl font-medium"
              >
                <FontAwesomeIcon icon={faLock} className="text-teal-500 mr-2" />{" "}
                Password
              </label>
            </div>
            <div className="mb-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                name="password"
                className="border border-slate-400 px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg"
                onMouseEnter={onMouseEnterPasswordRef}
                id="password"
                placeholder="Your Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-400"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 md:gap-2 px-4 sm:px-6 md:px-8 lg:px-10 mt-4 md:mt-6 mb-4 md:mb-6">
            <div className="flex justify-between items-center">
              <label
                htmlFor="confirmPassword"
                className="text-lg md:text-xl font-medium"
              >
                <FontAwesomeIcon icon={faLock} className="text-teal-500 mr-2" />{" "}
                Confirm Password
              </label>
            </div>
            <div className="mb-1 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                ref={confirmPasswordRef}
                name="confirmPassword"
                className="border border-slate-400 px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg"
                onMouseEnter={onMouseEnterConfirmPasswordRef}
                id="confirmPassword"
                placeholder="Confirm Your Password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-400"
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </button>
            </div>
          </div>

          <fieldset className="px-4 sm:px-6 md:px-8 lg:px-10 text-center border-[1px] border-teal-600 mx-10 ">
            <legend className="text-xl font-bold tracking-wide">
              Register As A{" "}
            </legend>
            <div className="flex justify-evenly items-center mt-4 mb-6 px-4 md:px-8">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  id="Donor"
                  defaultChecked
                  className="w-4 h-4 md:w-5 md:h-5 accent-teal-500 cursor-pointer" 
                />
                <label
                  htmlFor="Donor"
                  className="ml-2 text-base md:text-lg font-medium cursor-pointer"
                >
                  Donor
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  id="Seeker"
                  className="w-4 h-4 md:w-5 md:h-5 accent-teal-500 cursor-pointer"
                />
                <label
                  htmlFor="Seeker"
                  className="ml-2 text-base md:text-lg font-medium cursor-pointer"
                >
                  Seeker
                </label>
              </div>
            </div>
          </fieldset>

          <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-6 ">
            <Link
              href="/dashboard"
              className="w-full mt-4 mb-4 py-3 md:py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-xl md:text-2xl lg:text-3xl font-bold tracking-wide rounded-lg"
            >
              Register
            </Link>
          </div>
        </form>

        <p className="px-4 sm:px-6 md:px-8 lg:px-10 mt-4 mb-2 text-center py-2 text-sm md:text-base">
          Already have an account?{" "}
          <Link
            href="/forgot-password"
            className="text-teal-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        <p className="px-4 sm:px-6 md:px-8 lg:px-10 mt-2 mb-2 text-center py-1 text-sm md:text-base font-medium">
          OR
        </p>

        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
          <Link
            href="#"
            target="_blank"
            className="w-full mt-2 mb-4 py-2 md:py-3 flex justify-center items-center bg-transparent border-2 border-teal-500 text-black ease-in-out duration-200 hover:bg-teal-500 hover:text-white hover:rounded-2xl rounded-lg text-base md:text-lg font-medium md:font-bold tracking-wide"
          >
            <Image
              height={24}
              width={24}
              src="/icon/google.png"
              className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6"
              alt="Google logo"
            />
            <span>Sign In With Google</span>
          </Link>
        </div>
      </div>
    </motion.main>
  );
};

export default Register;
