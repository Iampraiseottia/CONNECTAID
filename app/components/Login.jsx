"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { motion } from "motion/react";

const Login = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    userType: "Donor",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  const onMouseEnterEmailRef = () => {
    emailRef.current.focus();
  };

  const onMouseEnterPasswordRef = () => {
    passwordRef.current.focus();
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleUserTypeChange = (e) => {
    setFormValues({
      ...formValues,
      userType: e.target.id,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formValues.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[A-Z])/.test(formValues.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
      isValid = false;
    } else if (!/(?=.*[0-9])/.test(formValues.password)) {
      newErrors.password = "Password must contain at least one number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (formValues.userType === "Donor") {
        router.push("/dashboard-donor");
      } else {
        router.push("/dashboard-seeker");
      }
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField && firstErrorField !== "general") {
        document.getElementById(firstErrorField)?.focus();
      }
    }
  };

  // Error message component
  const ErrorMessage = ({ message }) => {
    return message ? (
      <p className="text-red-500 text-sm mt-1 flex items-center justify-start">
        <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />{" "}
        {message}
      </p>
    ) : null;
  };

  return (
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

        {errors.general && (
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{errors.general}</span>
            </div>
          </div>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
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
              name="email"
              placeholder="Your Email Address"
              id="emailAddress"
              ref={emailRef}
              value={formValues.email}
              onChange={handleInputChange}
              onMouseEnter={onMouseEnterEmailRef}
              className={`border ${
                errors.email ? "border-red-500" : "border-slate-400"
              } px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg`}
            />
            <ErrorMessage message={errors.email} />
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex flex-col gap-1 md:gap-2 px-4 sm:px-6 md:px-8 lg:px-10 mt-4 md:mt-6 mb-4 md:mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-lg font-semibold">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-teal-500 mr-2"
                  />
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-teal-500 text-sm font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mb-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className={`border ${
                    errors.password ? "border-red-500" : "border-slate-400"
                  } px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg`}
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
              <ErrorMessage message={errors.password} />
              {formValues.password && !errors.password && (
                <p className="text-green-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />{" "}
                  Password meets requirements
                </p>
              )}
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-[90%] mx-5 sm:mx-10 mt-10 bg-teal-500 hover:bg-teal-600 text-white text-xl font-bold py-3 rounded-lg transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-teal-600 font-semibold">
            Register
          </Link>
        </p>

        {/* Google Login */}
        <button
          type="submit"
          className="mt-6 w-[90%] mx-5 sm:mx-10 flex items-center justify-center border-2 border-teal-500 text-black hover:bg-teal-500 hover:text-white transition-all duration-300 py-3 rounded-lg font-semibold text-lg"
        >
          <Image
            src="/icon/google.png"
            alt="Google Icon"
            width={24}
            height={24}
            className="mr-3"
          />
          Login With Google
        </button>
      </div>
    </motion.main>
  );
};

export default Login;
