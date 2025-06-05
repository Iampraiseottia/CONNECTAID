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
  faUser,
  faCircleUser,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { motion } from "motion/react";

import navLogo from "/public/icon/logo.png";

const Register = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const userNameRef = useRef();
  const confirmPasswordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onMouseEnterFullNameRef = () => {
    fullNameRef.current.focus();
  };

  const onMouseEnterEmailRef = () => {
    emailRef.current.focus();
  };

  const onMouseEnterUserNameRef = () => {
    userNameRef.current.focus();
  };

  const onMouseEnterPasswordRef = () => {
    passwordRef.current.focus();
  };

  const onMouseEnterConfirmPasswordRef = () => {
    confirmPasswordRef.current.focus();
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formValues.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (formValues.fullName.trim().length < 7) {
      newErrors.fullName = "Full name must be at least 7 characters";
      isValid = false;
    } else if (formValues.fullName.trim().length > 38) {
      newErrors.fullName = "Full name must not exceed 37 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formValues.userName.trim()) {
      newErrors.userName = "Username is required";
      isValid = false;
    } else if (formValues.userName.trim().length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
      isValid = false;
    } else if (formValues.userName.trim().length > 15) {
      newErrors.userName = "Username must not exceed 14 characters";
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

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField && firstErrorField !== "general") {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formValues.fullName,
          email: formValues.email,
          userName: formValues.userName,
          password: formValues.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful - user session is now set via cookie
        // Store user data in localStorage for immediate access
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to email verification
        router.push(
          `/email-verification?email=${encodeURIComponent(formValues.email)}`
        );
      } else {
        // Handle errors
        if (response.status === 409) {
          setErrors({
            ...errors,
            general:
              data.error || "User with this email or username already exists",
          });
        } else {
          setErrors({
            ...errors,
            general: data.error || "Registration failed. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        ...errors,
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
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

        <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-6 mb-5">
          <Link
            href="#"
            className="w-full mt-2 mb-4 py-2 md:py-4 flex justify-center items-center bg-transparent border-2 border-teal-500 text-black ease-in-out transition-all hover:bg-teal-500 hover:text-white hover:rounded-2xl rounded-lg text-base md:text-xl font-medium md:font-bold tracking-wide"
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

        <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-6">
          <Link
            href="#"
            className="w-full mt-2 mb-4 py-2 md:py-4 flex justify-center items-center bg-transparent border-2 border-teal-500 text-black ease-in-out transition-all hover:bg-teal-500 hover:text-white hover:rounded-2xl rounded-lg text-base md:text-xl font-medium md:font-bold tracking-wide"
          >
            <Image
              height={24}
              width={24}
              src="/icon/apple.png"
              className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6 "
              alt="Apple logo"
            />
            <span>Sign In With Apple</span>
          </Link>
        </div>

        <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-6 mb-5">
          <Link
            href="#"
            className="w-full mt-2 mb-4 py-2 md:py-4 flex justify-center items-center bg-transparent border-2 border-teal-500 text-black ease-in-out transition-all hover:bg-teal-500 hover:text-white hover:rounded-2xl rounded-lg text-base md:text-xl font-medium md:font-bold tracking-wide"
          >
            <Image
              height={24}
              width={24}
              src="/icon/fb2.png"
              className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6"
              alt="Google logo"
            />
            <span>Sign In With Facebook</span>
          </Link>
        </div>

        <br />

        <p className="px-4 sm:px-6 md:px-8 lg:px-10 mb-2 text-center py-1 text-xs md:text-2xl font-medium dark:text-slate-900 text-black">
          OR
        </p>

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
              htmlFor="fullName"
              className="text-lg md:text-xl font-medium dark:text-slate-900 text-black"
            >
              <FontAwesomeIcon icon={faUser} className="text-teal-500 mr-2" />{" "}
              Full Name
            </label>
            <br />

            <input
              type="text"
              name="fullName"
              placeholder="Your Full Names..."
              id="fullName"
              ref={fullNameRef}
              value={formValues.fullName}
              onChange={handleInputChange}
              onMouseEnter={onMouseEnterFullNameRef}
              className={`border ${
                errors.fullName ? "border-red-500" : "border-slate-400"
              }
              dark:bg-white dark:text-black px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg
              `}
            />
            <ErrorMessage message={errors.fullName} />
          </div>

          <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-4 mb-4">
            <label
              htmlFor="emailAddress"
              className="text-lg md:text-xl font-medium dark:text-slate-900 text-black"
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
              }
              dark:bg-white dark:text-black px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg`}
            />
            <ErrorMessage message={errors.email} />
          </div>

          <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-4 mb-4">
            <label
              htmlFor="userName"
              className="text-lg md:text-xl font-medium dark:text-slate-900 text-black"
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
              value={formValues.userName}
              onChange={handleInputChange}
              onMouseEnter={onMouseEnterUserNameRef}
              className={`border ${
                errors.userName ? "border-red-500" : "border-slate-400"
              }
              dark:bg-white dark:text-black px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg`}
            />
            <ErrorMessage message={errors.userName} />
          </div>

          <div className="flex flex-col gap-1 md:gap-2 px-4 sm:px-6 md:px-8 lg:px-10 mt-4 md:mt-6 mb-4 md:mb-6">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-lg md:text-xl font-medium dark:text-slate-900 text-black"
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
                value={formValues.password}
                onChange={handleInputChange}
                className={`border ${
                  errors.password ? "border-red-500" : "border-slate-400"
                }
                dark:bg-white dark:text-black px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg`}
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

          <div className="flex flex-col gap-1 md:gap-2 px-4 sm:px-6 md:px-8 lg:px-10 mt-4 md:mt-6 mb-4 md:mb-6">
            <div className="flex justify-between items-center">
              <label
                htmlFor="confirmPassword"
                className="text-lg md:text-xl font-medium dark:text-slate-900 text-black"
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
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                className={`border ${
                  errors.confirmPassword ? "border-red-500" : "border-slate-400"
                }
                dark:bg-white dark:text-black px-3 md:px-5 mt-2 ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 outline-none w-full py-2 md:py-3 text-base md:text-lg rounded-lg`}
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
            <ErrorMessage message={errors.confirmPassword} />
            {formValues.confirmPassword &&
              formValues.password === formValues.confirmPassword &&
              !errors.confirmPassword && (
                <p className="text-green-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />{" "}
                  Passwords match
                </p>
              )}
          </div>

          <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-6 ">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 mb-4 py-3 md:py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-xl md:text-2xl lg:text-3xl font-bold tracking-wide rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </div>
        </form>

        <p className="px-4 sm:px-6 md:px-8 lg:px-10 mt-4 text-center py-2 text-sm md:text-base text-[16px] dark:text-slate-900 text-black">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-teal-600 font-medium  hover:text-[16.2px] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.main>
  );
};

export default Register;
