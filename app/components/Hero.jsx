"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

import { useRef, useState, useEffect } from "react";

import { motion } from "motion/react";

import navLogo from "/public/icon/logo.png";

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const firstImageRef = useRef(null);
  const secondImageRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1240 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e, ref) => {
    if (!ref.current || window.innerWidth < 1100) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate position as a value between 0 and 1
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const xPos = (x - 0.5) * 2;
    const yPos = (y - 0.5) * 2;

    const intensityFactor = 1.5;

    const edgeResponse = (val) =>
      Math.sign(val) * Math.pow(Math.abs(val), intensityFactor);

    const tiltX = 20 * edgeResponse(yPos);
    const tiltY = -20 * edgeResponse(xPos);

    const centerProximity = 1 - (Math.abs(xPos) + Math.abs(yPos)) / 2;
    const zoomFactor = 1 + centerProximity * 0.05;

    ref.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${zoomFactor}, ${zoomFactor}, 1)`;

    ref.current.style.transition = `transform ${
      Math.abs(xPos) > 0.8 || Math.abs(yPos) > 0.8 ? "100ms" : "0ms"
    }`;
  };

  const handleMouseLeave = (ref) => {
    if (!ref.current) return;

    ref.current.style.transition = "transform 300ms ease-out";
    ref.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true }}
      className="min-h-[40vh] sm:min-h-[50vh] md:min-h-[70vh] lg:min-h-[97vh] werey relative bg-gray-950 text-white w-full"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/hero-bg.png"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          className="opacity-20 object-top lg:object-center"
          priority
        />
      </div>

      <div className="relative z-10">
        {/* Sticky Header */}
        <nav
          className={`py-4 w-full z-50 transition-all duration-300 
          ${
            isScrolled
              ? "fixed top-0 left-0 bg-gray-950 bg-opacity-85 shadow-lg py-7 "
              : "pt-6 md:pt-12"
          }`}
        >
          <div className="container mx-[5%] header-mid px-4 sm:px-6 flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Image
                    src={navLogo}
                    alt="ConnectAID Logo"
                    width={70}
                    height={60}
                    className={`h-auto transition-all duration-300 
                    ${
                      isScrolled
                        ? "w-[50px] md:w-[70px]"
                        : "w-[60px] md:w-[90px]"
                    }`}
                  />
                  <span
                    className={`ml-2 md:ml-3 tracking-wide werey4 font-bold transition-all duration-300
                    ${
                      isScrolled
                        ? "text-xl md:text-3xl"
                        : "text-2xl md:text-4xl"
                    }`}
                  >
                    ConnectAID
                  </span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button  */}
            <div className="xl:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 focus:outline-none text-teal-500 mr-4"
              >
                {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex space-x-4 xl:space-x-9 ease-in-out duration-300">
              <Link
                href="/"
                className="text-yellow-500 text-lg xl:text-xl font-semibold"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-yellow-500 text-white text-lg xl:text-xl font-semibold"
              >
                About
              </Link>
              <Link
                href="/donation"
                className="hover:text-yellow-500 text-white text-lg xl:text-xl font-semibold"
              >
                Donation
              </Link>
              <Link
                href="/events"
                className="hover:text-yellow-500 text-white text-lg xl:text-xl font-semibold"
              >
                Events
              </Link>
              <div className="relative group z-10">
                <button className="hover:text-yellow-500 text-white text-lg xl:text-xl ease-in-out duration-300 font-semibold flex items-center">
                  Pages <ChevronDown className="ml-1 w-4 h-4 xl:w-5 xl:h-5" />
                </button>
                <div className="absolute hidden bg-white w-60 border-t-2 border-t-teal-500 -ml-1 h-auto py-5 transition-all group-hover:block p-2 rounded shadow-lg">
                  <Link
                    href="/blog"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/faqs"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/donate-payment"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    Donate Pay
                  </Link>
                  <Link
                    href="/upcoming-event-details-1"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    Event Details
                  </Link>
                  <Link
                    href="/donation-details-1"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    Donation Details
                  </Link>

                  {/* Nested dropdown for Login
                  <div className="relative group/login">
                    <div className="py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide flex justify-between items-center cursor-pointer">
                      <p>Login</p>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <div className="absolute left-full top-0 hidden bg-white w-60 border-l-2 border-t-2 border-l-teal-500 border-t-teal-500 h-auto py-5 transition-all group-hover/login:block p-2 rounded shadow-lg">
                      <Link
                        href="/login"
                        className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                      >
                        Registration
                      </Link>
                      <Link
                        href="/forgot-password"
                        className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                      >
                        Forgot Password
                      </Link>
                    </div>
                  </div> */}


                  <Link
                    href="/blog-details-1"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    Blog Details
                  </Link>
                  <Link
                    href="/gallery"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-conditions"
                    className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide"
                  >
                    Terms-Condition
                  </Link>
                </div>
              </div>

              <Link
                href="contact-us"
                className="hover:text-yellow-400 text-white text-lg xl:text-xl font-semibold"
              >
                Contact
              </Link>
            </div>

            {/* Desktop Right Section - Donate Button & Language */}
            <div className="hidden xl:flex items-center space-x-3 xl:space-x-5 -mr-40 header-mid2">
              <div className="relative group">
                <button className="flex items-center hover:text-yellow-400 text-sm xl:text-base">
                  Eng <span className="ml-1">▼</span>
                </button>
                <div className="absolute bg-white hidden group-hover:block p-2 rounded shadow-lg right-0">
                  <button className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    English
                  </button>
                  <button className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    French
                  </button>
                </div>
              </div>
              <Link
                href="/donate-payment"
                className={`bg-white text-black font-bold ease-in-out cursor-pointer rounded hover:rounded-3xl hover:text-[lightseagreen] hover:bg-yellow-300 transition duration-300
                ${
                  isScrolled
                    ? "py-2 px-4 xl:py-3 xl:px-7 text-sm xl:text-base"
                    : "py-2 px-4 xl:py-4 xl:px-9 text-sm xl:text-base"
                }`}
              >
                DONATE NOW
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`xl:hidden bg-gray-900 p-4 z-50 w-full ${
              isScrolled ? "fixed top-16" : "absolute"
            }`}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-yellow-500 text-xl font-semibold">
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-yellow-500 text-white text-xl font-semibold"
              >
                About
              </Link>
              <Link
                href="/donation"
                className="hover:text-yellow-500 text-white text-xl font-semibold"
              >
                Donation
              </Link>
              <Link
                href="/events"
                className="hover:text-yellow-500 text-white text-xl font-semibold"
              >
                Events
              </Link>

              <div className="relative">
                <button
                  onClick={() =>
                    document
                      .getElementById("mobilePages")
                      .classList.toggle("hidden")
                  }
                  className="hover:text-yellow-500 text-white text-xl font-semibold flex items-center justify-between w-full"
                >
                  Pages <ChevronDown className="ml-1 w-5 h-5" />
                </button>
                <div
                  id="mobilePages"
                  className="hidden bg-gray-800 mt-2 p-2 rounded"
                >
                  <Link
                    href="/blog"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/upcoming-event-details-1"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    Event Details
                  </Link>
                  <Link
                    href="/donation-details-1"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    Donation Details
                  </Link>
                  <Link
                    href="/faqs"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/donate-payment"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    Donate Pay
                  </Link>

                  {/* <div className="relative">
                    <button
                      onClick={() =>
                        document
                          .getElementById("mobileLogin")
                          .classList.toggle("hidden")
                      }
                      className="py-2 text-white hover:text-yellow-500 flex items-center justify-between w-full"
                    >
                      Login <ChevronRight className="ml-1 w-4 h-4" />
                    </button>
                    <div
                      id="mobileLogin"
                      className="hidden bg-gray-700 mt-1 p-2 rounded ml-4"
                    >
                      <Link
                        href="/login"
                        className="block py-2 text-white hover:text-yellow-500"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block py-2 text-white hover:text-yellow-500"
                      >
                        Registration
                      </Link>
                      <Link
                        href="/forgot-password"
                        className="block py-2 text-white hover:text-yellow-500"
                      >
                        Forgot Password
                      </Link>
                    </div>
                  </div> */}

                  <Link
                    href="/blog-details-1"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    Blog Details
                  </Link>
                  <Link
                    href="/gallery"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-conditions"
                    className="block py-2 text-white hover:text-yellow-500"
                  >
                    Terms-Condition
                  </Link>
                </div>
              </div>

              <Link
                href="contact-us"
                className="hover:text-yellow-400 text-white text-xl font-semibold"
              >
                Contact
              </Link>

              <div className="flex items-center justify-between mt-4">
                <div className="relative group">
                  <button
                    onClick={() =>
                      document
                        .getElementById("mobileLang")
                        .classList.toggle("hidden")
                    }
                    className="flex items-center hover:text-yellow-400"
                  >
                    Eng <span className="ml-1">▼</span>
                  </button>
                  <div
                    id="mobileLang"
                    className="hidden bg-gray-800 mt-1 p-2 rounded"
                  >
                    <button className="block py-2 text-white hover:text-yellow-500">
                      English
                    </button>
                    <button className="block py-2 text-white hover:text-yellow-500">
                      French
                    </button>
                  </div>
                </div>
                <Link
                  href="/donate-payment"
                  className="bg-white text-black font-bold py-2 px-6 hover:text-[lightseagreen] rounded hover:bg-yellow-300 transition duration-300"
                >
                  DONATE NOW
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Hero Content */}
        <div
          className={`container hero-mid ml-[5%] px-4 sm:px-6 py-6 md:py-12 lg:py-24 flex flex-col md:flex-row justify-between items-center
          ${isScrolled ? "mt-24" : "mt-8 md:mt-12 lg:mt-16"}`}
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 mt-0 sm:mt-0 md:-mt-5 lg:-mt-10">
            <p className="text-yellow-500 text-xl md:text-2xl mb-3 md:mb-6 lg:mb-8 font-semibold">
              Speak Hope for the Homeless
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-10">
              Donate to children & senior citizens of Cameroon 🇨🇲
            </h1>

            <p className="text-gray-300 mb-6 md:mb-8 lg:mb-10 text-sm sm:text-base md:text-lg max-w-2xl mr-2">
              Involves donating to aids and campaigns which includes medical
              cases, education, drinking water, shelters, extreme cases and
              especially food supplies to those in desperate need in all parts
              and regions of cameroon. Play a crucial role in impacting fellow
              citizen/humans life and bring light in to their worlds.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link
                href="/donate-payment"
                className="bg-teal-600 font-semibold border border-teal-600 hover:bg-teal-700 text-white text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer ease-in-out duration-300 py-2 px-6 md:py-2 md:px-10 lg:py-3 lg:px-14 rounded-full transition"
              >
                Donate Now
              </Link>
              <Link
                href="/register"
                className="bg-transparent font-semibold border border-teal-600 hover:opacity-80 text-white text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer ease-in-out duration-300 py-2 px-6 md:py-2 md:px-10 lg:py-3 lg:px-14 rounded-full transition"
              >
                Register To Vee All Your Donations
              </Link>
            </div>
          </div>

          {/* Image Cards - Hidden on small screens, visible from medium screens up */}
          <div className="hidden md:flex flex-col md:flex-row flex-wrap gap-4 lg:gap-6 justify-center md:justify-end md:w-1/2">
            <div
              ref={firstImageRef}
              className="relative w-[150px] h-[250px] lg:w-[250px] lg:h-[410px] overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-out werey2"
              onMouseMove={(e) => handleMouseMove(e, firstImageRef)}
              onMouseLeave={() => handleMouseLeave(firstImageRef)}
            >
              <Image
                src="/hero/hero-2.png"
                alt="Children in need"
                fill
                priority
              />
            </div>
            <div
              ref={secondImageRef}
              className="relative w-[180px] h-[320px] lg:w-[320px] lg:h-[540px] -mt-5 lg:-mt-20 overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-out werey5"
              onMouseMove={(e) => handleMouseMove(e, secondImageRef)}
              onMouseLeave={() => handleMouseLeave(secondImageRef)}
            >
              <Image src="/hero/hero-3.png" alt="Child smiling" fill priority />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
