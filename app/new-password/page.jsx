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
import {
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const NewPassword = () => {
  const metadata = {
    title: "New Password - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formValues, setFormValues] = useState({ userType: "Donor" }); // Default to Donor

  const new_Pass = useRef(null);
  const confirm_new_Pass = useRef(null);

  const onMouseEnterNewPassword = () => {
    new_Pass.current.focus();
  };

  const onMouseEnterConfirmNewPassword = () => {
    confirm_new_Pass.current.focus();
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({ newPassword: "", confirmPassword: "" });

    const newPasswordErrors = validatePassword(newPassword);
    if (newPasswordErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        newPassword: newPasswordErrors.join(". "),
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    if (formValues.userType === "Donor") {
      router.push("/dashboard-donor");
    } else if (formValues.userType === "Seeker") {
      router.push("/dashboard-seeker");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUserTypeChange = (e) => {
    setFormValues({ ...formValues, userType: e.target.value });
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
        className="py-16 md:py-24 lg:py-32 flex items-center justify-center px-4 min-h-screen"
      >
        <div className="bg-white w-full max-w-md md:max-w-2xl lg:max-w-3xl h-auto shadow-xl py-6 md:py-8 lg:py-10 rounded-lg">
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

          <br />

          <form onSubmit={handleSubmit} className="">
            <div className="ease-in-out transition-all mx-[10%]">
              <label
                htmlFor="new_pass"
                className="text-left text-[22px] font-medium tracking-wider"
              >
                New Password:
              </label>
              <div className="mt-4 mb-1 relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  ref={new_Pass}
                  name="new_pass"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onMouseEnter={onMouseEnterNewPassword}
                  id="new_pass"
                  placeholder="Your New Password"
                  className={`w-full text-base bg-transparent rounded-xl border-2 ${
                    errors.newPassword
                      ? "border-red-500 focus:outline-none"
                      : "border-green-500 focus:outline-none"
                  } py-4 px-4 focus:ring-1 focus:ring-[#0ef] focus:outline-none duration-300 pr-10`}
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0ef] "
                >
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEyeSlash : faEye}
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.newPassword && (
                <motion.p
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-red-500 text-sm mt-3"
                >
                  {errors.newPassword}
                </motion.p>
              )}
              <br />

              <label
                htmlFor="confirm_new_Pass"
                className="text-left text-[22px] font-medium tracking-wider"
              >
                Confirm New Password:
              </label>
              <div className="mt-4 mb-1 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  ref={confirm_new_Pass}
                  name="confirm_new_Pass"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onMouseEnter={onMouseEnterConfirmNewPassword}
                  id="confirm_new_Pass"
                  placeholder="Confirm Your New Password"
                  className={`w-full text-base bg-transparent rounded-xl border-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:outline-none"
                      : "border-green-500 focus:outline-none"
                  } py-4 px-4 focus:ring-1 focus:ring-[#0ef] focus:outline-none duration-300  pr-10`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0ef] "
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-red-500 text-sm mt-3"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            <fieldset className="px-4 sm:px-6 md:px-8 lg:px-10 text-center border-[1px] border-teal-600 mx-5 sm:mx-20 mt-8 ">
              <legend className="text-xl font-bold tracking-wide">
                Login As A{" "}
              </legend>
              <div className="flex justify-evenly items-center mt-4 mb-6 px-4 md:px-8">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    id="Donor"
                    value="Donor"
                    checked={formValues.userType === "Donor"}
                    onChange={handleUserTypeChange}
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
                    value="Seeker"
                    checked={formValues.userType === "Seeker"}
                    onChange={handleUserTypeChange}
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

            <button
              className="mx-[10%] mt-7 mb-4 py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-3xl font-bold tracking-wide w-[80%]"
              type="submit"
            >
              Continue{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ml-1 w-6 h-6" />
            </button>
          </form>
        </div>
      </motion.main>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default NewPassword;
