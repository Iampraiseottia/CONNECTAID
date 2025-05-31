"use client";

import { useState, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import globalStyle from "../globals.css";

import Metadata from "../components/Metadata";

import { motion } from "motion/react";

import { User, MessageSquare, Clock, DollarSign } from "lucide-react";

import Facebook from "/public/icon/fb.png";
import Youtube from "/public/icon/youtube.png";
import Instagram from "/public/icon/ig.png";
import LinkedIn from "/public/icon/linkedin.png";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";

import relatedPostImg1 from "/public/gallery/donateList-1.png";
import relatedPostImg2 from "/public/gallery/gallery-4.png";
import relatedPostImg4 from "/public/urgent/urgent-1.png";
import relatedPostImg5 from "/public/gallery/donationList-2.png";
import relatedPostImg6 from "/public/gallery/gallery-1.png";
import relatedPostImg8 from "/public/gallery/gallery-2.png";
import relatedPostImg9 from "/public/blog/blog-5.png";
import relatedPostImg10 from "/public/gallery/education.png";
import relatedPostImg12 from "/public/gallery/water.png";

const BlogDetails3 = () => {
  const metadata = {
    title:
      "Nourished Communities: The Power of Good Food - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ fullName, email, comment });
      setFullName("");
      setEmail("");
      setComment("");
    };
  
    const fullNameRef = useRef();
    const emailAddressRef = useRef();
    const commentRef = useRef();
    const searchRef = useRef();
  
    const onMouseEnterFullNameRef = () => {
      fullNameRef.current.focus();
    };
    const onMouseEnterEmailAddressRef = () => {
      emailAddressRef.current.focus();
    };
    const onMouseEnterCommentRef = () => {
      commentRef.current.focus();
    };
    const onMouseEnterSearchRef = () => {
      searchRef.current.focus();
    };
  

  return (
    <div className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

      {/* Navigation Bar | Header  */}
      <Navbar />

      {/* Breadcrumb for ABout Page */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full"
      >
        <Breadcrumb
          homeTitle="HOME"
          homeSlug="/"
          title="FOOD"
          description="Nourished Communities: The Power of Good Food"
          breadcrumAlt="FOOD Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

      {/* Blog Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <div className="rounded-lg overflow-hidden shadow-md">
                {/* Blog Main Image */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative"
                >
                  <div className="">
                    <Image
                      src="/gallery/food.jpg"
                      alt="Blog main image"
                      width={500}
                      height={500}
                      className="w-[100%] h-[68vh] object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute top-0 left-0">
                    <div className=" bg-emerald-600 text-white p-3 text-center rounded">
                      <p className="text-xl font-bold tracking-wide ">
                        24 February 2025
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Blog Info */}
                <div className="p-6 bg-white">
                  <div className="mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="flex flex-wrap gap-4 mb-5 items-center"
                    >
                      <div className="flex gap-2 items-center">
                        <User className="w-5 h-5 text-gray-700" />
                        <p className="text-gray-600 text-sm">By: admin</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <MessageSquare className="w-5 h-5 text-gray-700" />
                        <p className="text-gray-600 text-sm">Food</p>
                      </div>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                    >
                      Nourished Communities: The Power of Good Food: A Charity
                      Event Overview
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="text-gray-600 mb-6"
                    >
                      Access to nutritious food is essential for the health and
                      well-being of individuals and communities. However, many
                      people face food insecurity and lack access to healthy
                      food options, leading to adverse health outcomes. To
                      address this critical issue, a charity event titled
                      "Nourished Communities: The Power of Good Food" was
                      organized to raise awareness and funds for initiatives
                      aimed at improving food access and promoting healthy
                      eating.
                    </motion.p>

                    <motion.hr
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="my-6 border-gray-200"
                    />

                    {/* Multiple Images */}
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="flex flex-col md:flex-row gap-5 my-8"
                    >
                      <div className="w-full md:w-1/2">
                        <Image
                          src="/gallery/chop.png"
                          alt="Events Picture image 1"
                          width={400}
                          height={300}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <Image
                          src="/gallery/chop2.png"
                          alt="Events Picture image 2"
                          width={400}
                          height={300}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </motion.div>

                    <motion.hr
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="my-6 border-gray-200"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="text-gray-700 mb-6"
                    >
                      <h3 className="font-bold text-2xl ">Event Overview</h3>{" "}
                      <br />
                      <h3 className="font-bold text-xl ">Date and Location</h3>
                      <p className="mt-1">
                        The charity event took place on September 03, 2024, at
                        the Council Hall in Kumba, South-west, Cameroon. The
                        venue was chosen for its accessibility and capacity to
                        accommodate a diverse audience, including community
                        members, local farmers, nutritionists, and health
                        advocates.
                      </p>
                      <br />
                      <h3 className="font-bold text-xl ">Objectives</h3>
                      <p className="mt-1">
                        The primary objectives of the event were:
                      </p>
                      <ul>
                        <li> Distribution of Food Items </li>
                        <li>Give Financila AIDs </li>
                        <li>Engage the Community </li>
                      </ul>
                      <br />
                      <h3 className="font-bold text-xl ">Event Activities</h3>
                      <h3 className="font-bold text-xl ">
                        1. Keynote Speakers
                      </h3>
                      <p>
                        The event featured a lineup of esteemed keynote
                        speakers, including nutritionists, chefs, and community
                        leaders. They shared their insights on the importance of
                        nutrition and the impact of food insecurity on health.
                        Their powerful stories and experiences resonated with
                        the audience, emphasizing the need for collective action
                        to improve food access in the community.
                      </p>
                      <br />
                      <h3 className="font-bold text-xl ">
                        2. Cooking Demonstrations
                      </h3>
                      <p className="mt-1">
                        One of the highlights of the event was live cooking
                        demonstrations led by local chefs and nutritionists.
                        Attendees learned how to prepare healthy, affordable
                        meals using fresh, locally sourced ingredients. The
                        demonstrations focused on:
                      </p>
                      <ul className="ml-7 leading-8 ">
                        <li>
                          {" "}
                          <span className="font-bold">
                            Quick and Easy Recipes:
                          </span>{" "}
                          Showcasing simple recipes that can be made in under 30
                          minutes, encouraging families to cook at home.
                        </li>

                        <li>
                          {" "}
                          <span className="font-bold">
                            Budget-Friendly Cooking:
                          </span>{" "}
                          Providing tips on how to shop for and prepare
                          nutritious meals on a budget, making healthy eating
                          accessible to all.
                        </li>

                        <li>
                          {" "}
                          <span className="font-bold">
                            Seasonal Ingredients:
                          </span>{" "}
                          Highlighting the benefits of using seasonal produce
                          and supporting local farmers.
                        </li>
                      </ul>
                      <br />
                      <h3 className="font-bold text-xl ">
                        3. Distribution of Food Items
                      </h3>
                      <p>
                        A significant highlight of the event was the
                        distribution of food items to children in need.
                        Attendees witnessed the joy on the faces of the
                        recipients as they received essential food supplies,
                        including rice, groundnut oil, maggi, salt, sugar, and
                        house hold materials. Additionally, extra funds where
                        distributed to help individuals in times of need and get
                        basic food supply needs. This direct impact reinforced
                        the event's mission of empowering futures through
                        accessible education.
                      </p>
                      <br />
                      <p>
                        The "Nourished Communities: The Power of Good Food"
                        charity event was a remarkable success, uniting
                        community members, local farmers, and health advocates
                        to address food insecurity. By distributing essential
                        foods, the event funded vital initiatives, including
                        food distribution programs that provided fresh produce,
                        canned goods, grains, and dairy products to families in
                        need. Attendees also received essential nutrition
                        education and cooking resources. The event fostered
                        community engagement and increased awareness of the
                        importance of access to nutritious food. Together, we
                        empowered individuals to make healthier choices and
                        strengthened the community's commitment to ensuring that
                        everyone has access to good food.
                      </p>
                    </motion.div>
                  </div>

                  {/* Blog Info Tags and Share */}
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8 "
                  >
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm">
                        Food
                      </span>
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Education
                      </span>
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Medicine
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-gray-700 font-medium">Share:</p>
                      <div className="flex gap-2">
                        <Link
                          href="#"
                          className="bg-white p-2 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
                        >
                          <Image
                            src={Facebook}
                            alt="Facebook Icon"
                            className="text-white h-9 w-9"
                          />
                        </Link>
                        <Link
                          href="#"
                          className="bg-white p-3 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
                        >
                          <Image
                            src={Youtube}
                            alt="Youtube Icon"
                            className="text-white h-6 w-6"
                          />
                        </Link>
                        <Link
                          href="#"
                          className="bg-white p-3 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
                        >
                          <Image
                            src={Instagram}
                            alt="Instagram Icon"
                            className="text-white h-6 w-6"
                          />
                        </Link>
                        <Link
                          href="#"
                          className="bg-white p-3 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
                        >
                          <Image
                            src={LinkedIn}
                            alt="Linked Icon"
                            className="text-white h-6 w-6"
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Related Blogs Section */}
              <div className="mt-12">
                <motion.h3
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-xl font-bold text-gray-800 mb-6"
                >
                  Related Past Events
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
                      <Link href="/blog-details-2">
                        <Image
                          src="/gallery/medicine2.png"
                          alt="Related blog"
                          fill
                          className="object-cover hover:scale-105 ease-in-out duration-200 "
                        />
                      </Link>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-4 mb-4 items-center">
                        <div className="flex gap-2 items-center">
                          <User className="w-4 h-4 text-gray-700" />
                          <p className="text-gray-600 text-sm">By: admin</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <MessageSquare className="w-4 h-4 text-gray-700" />
                          <p className="text-gray-600 text-sm">Medicine</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Quality Medicine: Empowering a Healthier Community
                      </h4>

                      <p className="text-gray-600 mb-6 text-sm">
                        Medicine saves lives, promotes health, and ensures
                        equitable access for all communities in need.
                      </p>

                      <Link
                        href="/blog-details-2"
                        className="inline-block px-6 py-3 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                  {/* ))} */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-72">
                      <Link href="/blog-details-1">
                        <Image
                          src="/gallery/pastevent.png"
                          alt="Related blog"
                          fill
                          className="object-cover hover:scale-105 ease-in-out duration-200 "
                        />
                      </Link>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-4 mb-4 items-center">
                        <div className="flex gap-2 items-center">
                          <User className="w-4 h-4 text-gray-700" />
                          <p className="text-gray-600 text-sm">By: admin</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <MessageSquare className="w-4 h-4 text-gray-700" />
                          <p className="text-gray-600 text-sm">Education</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Empowering Futures Through Accessible Education for All
                      </h4>

                      <p className="text-gray-600 mb-6 text-sm">
                        Education transforms lives, fostering opportunities and
                        breaking barriers for under-served communities
                        worldwide.
                      </p>

                      <Link
                        href="/blog-details-1"
                        className="inline-block px-6 py-3 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>


              {/* Comment Form */}
              <div className="mt-16">
                <motion.h3
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-xl font-bold text-gray-800 mb-6"
                >
                  Leave a Comment
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Alex Jordan"
                          className="w-full p-3 border border-gray-300 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-white dark:text-black"
                          ref={fullNameRef}
                          onMouseEnter={onMouseEnterFullNameRef}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full p-3 border border-gray-300 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-white dark:text-black"
                          ref={emailAddressRef}
                          onMouseEnter={onMouseEnterEmailAddressRef}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Type Keyword"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-white dark:text-black"
                        ref={commentRef}
                        onMouseEnter={onMouseEnterCommentRef}
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Submit Comment
                    </button>
                  </form>
                </motion.div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Category List */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Category List
                  </h3>

                  <ul className="space-y-2">
                    {["Food", "Medical", "Education", "Shelter", "Water"].map(
                      (category, index) => (
                        <li
                          key={category}
                          className={
                            index === 0
                              ? "text-teal-700 font-medium"
                              : "dark:text-slate-900 text-black"
                          }
                        >
                          <a
                            href="/blog-details-1"
                            className="hover:text-teal-600 hover:text-[17px] ease-in-out transition-colors"
                          >
                            {category}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
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
                              Give hope, change lives—your donation can provide
                              shelter and support for the homeless today!
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
                              make a long lasting impacts in lives of people and
                              communities!
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
                              provide essential medical care to those in need!!
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
                              Empower minds, change futures — Your donation can
                              provide education and hope to children in need!
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
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Tags</h3>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm">
                      Food
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Education
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Water
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Medical
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Kindness
                    </span>
                  </div>
                </div>

                {/* User Box */}
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <Image
                      src="/team/cute.jpg"
                      alt="Author"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Ottia Praise</h4>
                  <p className="text-gray-600 mb-4">
                    Hi! amazing people. I`m the author of this blog.
                  </p>
                  <div className="flex justify-center gap-2">
                    <Link
                      href="#"
                      className="bg-white p-2 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
                    >
                      <Image
                        src={Facebook}
                        alt="Facebook Icon"
                        className="text-white h-9 w-9"
                      />
                    </Link>
                    <Link
                      href="#"
                      className="bg-white p-3 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
                    >
                      <Image
                        src={Youtube}
                        alt="Youtube Icon"
                        className="text-white h-6 w-6"
                      />
                    </Link>
                    <Link
                      href="#"
                      className="bg-white p-3 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
                    >
                      <Image
                        src={Instagram}
                        alt="Instagram Icon"
                        className="text-white h-6 w-6"
                      />
                    </Link>
                    <Link
                      href="#"
                      className="bg-white p-3 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
                    >
                      <Image
                        src={LinkedIn}
                        alt="Linked Icon"
                        className="text-white h-6 w-6"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default BlogDetails3;
