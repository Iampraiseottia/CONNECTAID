"use client";

import { useState, useEffect } from "react";

import globalStyle from "../globals.css";

import Image from "next/image";
import Link from "next/link";

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Clock,
  DollarSign,
  MessageSquare,
  User,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";
import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import eventImg from "/public/gallery/donateList-1.png";
import eventImg2 from "/public/gallery/donationList-2.png";

import relatedPostImg1 from "/public/gallery/donateList-1.png";
import relatedPostImg2 from "/public/gallery/gallery-4.png";
import relatedPostImg3 from "/public/gallery/gallery-20.png";
import relatedPostImg4 from "/public/urgent/urgent-1.png";
import relatedPostImg5 from "/public/gallery/donationList-2.png";
import relatedPostImg6 from "/public/gallery/gallery-1.png";
import relatedPostImg7 from "/public/gallery/gallery-3.png";
import relatedPostImg8 from "/public/gallery/gallery-2.png";
import relatedPostImg9 from "/public/blog/blog-5.png";
import relatedPostImg10 from "/public/gallery/education.png";
import relatedPostImg11 from "/public/gallery/gallery-13.png";
import relatedPostImg12 from "/public/gallery/water.png";

const UpcomingEventDetail1 = () => {
  const metadata = {
    title:
      "Hope for the Homeless: Compassion / Provide Home for the Homeless - ConnectAID ",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State to track if event has passed
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-10-15T11:30:00");
    let timer;

    // Calculate time difference immediately on component mount
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        // Event is in the future
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setEventPassed(false);
      } else {
        // Event has passed
        if (timer) {
          clearInterval(timer);
        }
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setEventPassed(true);
      }
    };

    // Calculate immediately when component mounts
    calculateTimeLeft();

    // Update countdown every second
    timer = setInterval(calculateTimeLeft, 1000);

    // Clean up the interval on component unmount
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <main className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

      {/* Navigation Bar | Header  */}
      <Navbar />

      {/* Breadcrumb for About Page */}
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
          title="SHELTER"
          description="Hope for the Homeless: Compassion / Provide Home for the Homeless"
          breadcrumAlt="EVENTS Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

      {/* Upcoming event main  */}
      <div className="min-h-screen bg-white">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                className="w-full lg:col-span-9"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start flex-wrap mb-6 gap-4">
                  {/* Date Time Counter */}
                  <div className="flex gap-2">
                    {eventPassed ? (
                      <div className="bg-red-600 text-white p-3 rounded">
                        <p className="text-md font-medium">Event has ended</p>
                      </div>
                    ) : (
                      timeUnits.map((unit, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center bg-emerald-700 text-white p-3 rounded w-16 h-16"
                        >
                          <span className="text-xl font-bold">
                            {unit.value}
                          </span>
                          <p className="text-xs">{unit.label}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Share */}
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <Link
                        href="#"
                        className="p-2 bg-gray-200 rounded-full text-emerald-500 ease-in-out hover:bg-emerald-600 hover:text-white hover:scale-105"
                      >
                        <Facebook size={18} />
                      </Link>
                      <Link
                        href="#"
                        className="p-2 bg-gray-200 rounded-full text-emerald-500 ease-in-out hover:bg-emerald-600 hover:text-white hover:scale-105"
                      >
                        <Twitter size={18} />
                      </Link>
                      <Link
                        href="#"
                        className="p-2 bg-gray-200 rounded-full text-emerald-500 ease-in-out hover:bg-emerald-600 hover:text-white hover:scale-105"
                      >
                        <Linkedin size={18} />
                      </Link>
                      <Link
                        href="#"
                        className="p-2 bg-gray-200 rounded-full text-emerald-500 ease-in-out hover:bg-emerald-600 hover:text-white hover:scale-105"
                      >
                        <Instagram size={18} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Main Event Content */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-slate-900 text-black">
                      Hope for the Homeless: Compassion / Together, we can
                      change lives! ~ Your generous donations will provide
                      shelter, food, and support for those in need. Join us in
                      this vital mission to end homelessness.
                    </h1>

                    <div className="relative w-full h-64 md:h-[550px] mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={eventImg}
                        alt="Homeless Pic"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Events Details</h2>
                      <p className="text-gray-700 mb-4">
                        Join us for our upcoming charity event, "Hope for the
                        Homeless: Compassion," where we unite to make a tangible
                        difference in the lives of those experiencing
                        homelessness. This inspiring event will feature
                        heartfelt stories from individuals who have overcome
                        adversity, as well as expert speakers who will shed
                        light on the challenges faced by our homeless community.
                        Your generous donations will directly fund essential
                        services, including shelter, nutritious meals, and vital
                        support programs. Together, we can create a
                        compassionate environment that empowers individuals to
                        rebuild their lives and regain their dignity. Your
                        participation is crucial in this mission to end
                        homelessness.
                      </p>

                      <p className="text-gray-700 mb-6">
                        By attending "Hope for the Homeless," you are not just
                        contributing to a cause; you are becoming part of a
                        community dedicated to change. Every ticket purchased
                        and donation made will help provide immediate relief and
                        long-term solutions for those in need. Imagine the
                        impact your support can have—transforming lives,
                        restoring hope, and fostering a sense of belonging for
                        those who feel forgotten. Join us in this vital mission
                        to end homelessness and be a beacon of hope for those
                        who need it most. Together, we can change lives and
                        create a brighter future for everyone in our community.
                      </p>

                      <ul className="space-y-2 mb-6 dark:text-slate-900 text-black ">
                        <li className="flex gap-2">
                          <strong>Event Type:</strong> Onsite
                        </li>
                        <li className="flex gap-2">
                          <strong>Date:</strong> 15-06-2025
                        </li>
                        <li className="flex gap-2">
                          <strong>Start Time:</strong> 11:00 AM
                        </li>
                        <li className="flex gap-2">
                          <strong>End Time:</strong> 4:00 PM
                        </li>
                        <li className="flex gap-2">
                          <strong>Organizer Name:</strong> ConnectAID
                          Organization
                        </li>
                        <li className="flex gap-2">
                          <strong>Organizer Email:</strong> connectaid@gmail.com
                        </li>
                        <li className="flex gap-2">
                          <strong>Organizer Phone:</strong> +237 656 826 638
                        </li>
                        <li className="flex gap-2">
                          <strong>Availability:</strong> All Willing Donors
                        </li>
                        <li className="flex gap-2">
                          <strong>Venue:</strong> Council Hall
                        </li>
                        <li className="flex gap-2">
                          <strong>Venue Location:</strong> Down Beach, Limbe,
                          South-west, Cameroon
                        </li>
                      </ul>

                      <p className="text-gray-700 mb-6">
                        Don’t miss your chance to make a real impact! Join us at
                        "Hope for the Homeless: Compassion" and be part of a
                        transformative movement. Your presence and support can
                        provide shelter, food, and hope to those in need.
                        Together, we can change lives—let’s stand united against
                        homelessness!
                      </p>

                      <br />

                      {/* Related Event Section */}
                      <div className="mt-12">
                        <motion.h3
                          initial={{ opacity: 0, y: 100 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          viewport={{ once: true, amount: 0.1 }}
                          className="text-xl font-bold text-gray-800 mb-6"
                        >
                          Related Upcoming Events
                        </motion.h3>

                        <motion.div
                          initial={{ opacity: 0, y: 100 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          viewport={{ once: true, amount: 0.1 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          {/* {[1, 2].map((item) => ( */}
                          <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative h-72">
                              <Link href="/upcoming-event-details-2">
                                <Image
                                  src={eventImg2}
                                  alt="Related event"
                                  fill
                                  className="object-cover hover:scale-105 ease-in-out duration-200 "
                                />
                              </Link>
                            </div>
                            <div className="p-6">
                              <div className="flex flex-wrap gap-4 mb-4 items-center">
                                <div className="flex gap-2 items-center">
                                  <User className="w-4 h-4 text-gray-700" />
                                  <p className="text-gray-600 text-sm">
                                    By: admin
                                  </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <MessageSquare className="w-4 h-4 text-gray-700" />
                                  <p className="text-gray-600 text-sm">Water</p>
                                </div>
                              </div>

                              <h4 className="text-lg font-bold text-gray-800 mb-3">
                                Empowering Future Generations: Access to Clean
                                Water for Children
                              </h4>

                              <p className="text-gray-600 mb-6 text-sm">
                                It focuses on providing clean water access,
                                essential for children's health and education,
                                ensuring a sustainable future. Join us in making
                                a vital impact!
                              </p>

                              <Link
                                href="/upcoming-event-details-2"
                                className="inline-block px-6 py-3 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                          {/* ))} */}
                          <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative h-72">
                              <Link href="/upcoming-event-details-3">
                                <Image
                                  src="/gallery/suffering.png"
                                  alt="Related event 2"
                                  fill
                                  className="object-cover hover:scale-105 ease-in-out duration-200"
                                />
                              </Link>
                            </div>
                            <div className="p-6">
                              <div className="flex flex-wrap gap-4 mb-4 items-center">
                                <div className="flex gap-2 items-center">
                                  <User className="w-4 h-4 text-gray-700" />
                                  <p className="text-gray-600 text-sm">
                                    By: admin
                                  </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <MessageSquare className="w-4 h-4 text-gray-700" />
                                  <p className="text-gray-600 text-sm">
                                    Extreme Cases
                                  </p>
                                </div>
                              </div>

                              <h4 className="text-lg font-bold text-gray-800 mb-3">
                                Stand Together for Change: Aid Those in Extreme
                                Cases of Need!
                              </h4>

                              <p className="text-gray-600 mb-6 text-sm">
                                Your donations can transform lives! Help us
                                provide critical resources and support for
                                individuals facing extreme cases and have given
                                up on life. Join us in making a lasting impact!.
                              </p>

                              <Link
                                href="/upcoming-event-details-3"
                                className="inline-block px-6 py-3 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <div className="lg:col-span-3">
                <div className="space-y-8">
                  {/* Category */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-8"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-600 font-medium">Category List</p>
                      <div className="flex space-x-1">
                        <div className="h-1 w-6 bg-green-600 rounded"></div>
                        <div className="h-1 w-6 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <ul className="space-y-2">
                        {[
                          { name: "Food", active: false },
                          { name: "Medical", active: false },
                          { name: "Shelter", active: true },
                          { name: "Water", active: false },
                          { name: "Education", active: false },
                        ].map((category, index) => (
                          <li
                            key={index}
                            className={`py-2 px-4 rounded transition ${
                              category.active
                                ? "bg-green-50 text-green-600 font-semibold"
                                : "hover:bg-gray-50 dark:text-slate-900 text-black "
                            }`}
                          >
                            {/* <a href="#" className="flex items-center"> */}
                            {category.active && (
                              <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                            )}
                            {category.name}
                            {/* </a> */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Related Posts */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    Global
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Related Post
                    </h3>
                    <div className="space-y-4">
                      {/* {[1, 2, 3, 4].map((post) => ( */}
                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-24 relative">
                            <Link href="/upcoming-event-details-1">
                              <Image
                                src={relatedPostImg1}
                                alt="Upcoming Event 1"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <Clock className="w-3 h-3 text-teal-500  " />
                              <span>June 15, 2025</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/upcoming-event-details-1">
                                Hope for the Homeless: Compassion / Provide Home
                                for the Homeless
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-[110px] relative">
                            <Link href="/donation-details-6">
                              <Image
                                src={relatedPostImg2}
                                alt="Donation List 1"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <DollarSign className="w-3 h-3 text-teal-500 " />
                              <span>Raised Amount: 22, 000, 000 Francs</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/donation-details-6">
                                Act now, save lives—your donation can support
                                those facing extreme hardships and urgent needs!
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-20 relative">
                            <Link href="/past-event-details-1">
                              <Image
                                src={relatedPostImg3}
                                alt="Past Event 1"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <Clock className="w-3 h-3 text-teal-500 " />
                              <span>September 03, 2024</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/past-event-details-1">
                                Empowering Futures Through Accessible Education
                                for All
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-[110px] relative">
                            <Link href="/donation-details-5">
                              <Image
                                src={relatedPostImg4}
                                alt="Donation List 1"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <DollarSign className="w-3 h-3 text-teal-500 " />
                              <span>Raised Amount: 15, 100, 000 Francs</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/donation-details-5">
                                Give hope, change lives—your donation can
                                provide shelter and support for the homeless
                                today!
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      {/* ))} */}

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-20 relative">
                            <Link href="/upcoming-event-details-2">
                              <Image
                                src={relatedPostImg5}
                                alt="Upcoming Event 2"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <Clock className="w-3 h-3 text-teal-500 " />
                              <span>August 20, 2025</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/upcoming-event-details-2">
                                Empowering Future Generations: Access to Clean
                                Water for Children.
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-[110px] relative">
                            <Link href="/donation-details-1">
                              <Image
                                src={relatedPostImg6}
                                alt="Donation List 1"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <DollarSign className="w-3 h-3 text-teal-500 " />
                              <span>Raised Amount: 6, 126, 750 Francs</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/donation-details-1">
                                Empower minds, change futures — Donate today and
                                make a long lasting impacts in lives of people
                                and communities!
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-20 relative">
                            <Link href="/past-event-details-2">
                              <Image
                                src={relatedPostImg7}
                                alt="Past Event 2"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <Clock className="w-3 h-3 text-teal-500 " />
                              <span>November 09, 2024</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/past-event-details-2">
                                Quality Medicine: Empowering a Healthier
                                Community
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-[110px] relative">
                            <Link href="/donation-details-3">
                              <Image
                                src={relatedPostImg8}
                                alt="Donation List 1"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <DollarSign className="w-3 h-3 text-teal-500 " />
                              <span>Raised Amount: 12, 050, 250 Francs</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/donation-details-3">
                                Heal lives, restore hope — Your donation can
                                provide essential medical care to those in
                                need!!
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-20 relative">
                            <Link href="/upcoming-event-details-2">
                              <Image
                                src={relatedPostImg9}
                                alt="Upcoming Event 2"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <Clock className="w-3 h-3 text-teal-500 " />
                              <span>October 13, 2025</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/upcoming-event-details-2">
                                Stand Together for Change: Aid Those in Extreme
                                Cases of Need!
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-[110px] relative">
                            <Link href="/donation-details-2">
                              <Image
                                src={relatedPostImg10}
                                alt="Donation List 1"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <DollarSign className="w-3 h-3 text-teal-500 " />
                              <span>Raised Amount: 6, 126, 750 Francs</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/donation-details-2">
                                Empower minds, change futures — Your donation
                                can provide education and hope to children in
                                need!
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-20 relative">
                            <Link href="/past-event-details-3">
                              <Image
                                src={relatedPostImg11}
                                alt="Past Event 3"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <Clock className="w-3 h-3 text-teal-500 " />
                              <span>February 24, 2024</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/past-event-details-3">
                                Nourished Communities: The Power of Good Food
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>

                      <div className="">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-20 h-[110px] relative">
                            <Link href="/donation-details-4">
                              <Image
                                src={relatedPostImg12}
                                alt="Donation List 1"
                                fill
                                className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                              <DollarSign className="w-3 h-3 text-teal-500 " />
                              <span>Raised Amount: 26, 058, 500 Francs</span>
                            </div>
                            <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                              <a href="/donation-details-4">
                                Quench thirst, transform lives—your donation can
                                provide clean water to communities in need!
                              </a>
                            </h4>
                          </div>
                        </div>
                        <hr className="my-4 border-gray-200" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Tags */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Tags
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Water
                      </span>
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Food
                      </span>
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Medicine
                      </span>
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Education
                      </span>
                      <span className="px-4 py-2 bg-teal-600 text-white  rounded-full text-sm">
                        Shelter
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default UpcomingEventDetail1;
