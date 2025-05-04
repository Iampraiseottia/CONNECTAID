"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useRef } from "react";

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


import relatedPostImg1 from '/public/gallery/donateList-1.png'
import relatedPostImg2 from '/public/gallery/gallery-4.png'
import relatedPostImg3 from '/public/gallery/gallery-20.png'
import relatedPostImg4 from '/public/urgent/urgent-1.png'
import relatedPostImg5 from '/public/gallery/donationList-2.png'
import relatedPostImg6 from '/public/gallery/gallery-1.png'
import relatedPostImg7 from '/public/gallery/gallery-3.png'
import relatedPostImg8 from '/public/gallery/gallery-2.png'
import relatedPostImg9 from '/public/blog/blog-5.png'
import relatedPostImg10 from '/public/gallery/education.png'
import relatedPostImg11 from '/public/gallery/gallery-13.png'
import relatedPostImg12 from '/public/gallery/water.png'

const PastEventDetails1 = () => {
  const metadata = {
    title:
      "Empowering Futures Through Accessible Education for All - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
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
          title="EDUCATION"
          description="Empowering Futures Through Accessible Education for All"
          breadcrumAlt="EDUCATION Hero Background Image"
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
                      src="/gallery/pastevent.png"
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
                        03 September 2024
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
                        <p className="text-gray-600 text-sm">Education</p>
                      </div>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                    >
                      Empowering Futures Through Accessible Education for All: A
                      Charity Event Overview
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="text-gray-600 mb-6"
                    >
                      Education is a fundamental right that lays the foundation
                      for a brighter future. However, millions of children
                      around the world still lack access to quality education
                      due to various barriers, including poverty, geographical
                      location, and social inequality. To address this pressing
                      issue, a charity event titled "Empowering Futures Through
                      Accessible Education for All" was organized to raise
                      awareness and funds for educational initiatives aimed at
                      providing underprivileged children with the opportunities
                      they deserve.
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
                          src="/gallery/africanchildren.png"
                          alt="Events Picture image 1"
                          width={400}
                          height={300}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <Image
                          src="/gallery/africanchildren2.png"
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
                        the Carita's Hall in Check POint, Buea South-west,
                        Cameroon. The venue was chosen for its accessibility and
                        capacity to accommodate a large audience, including
                        community members, local businesses, educators, and
                        philanthropists.
                      </p>
                      <br />
                      <h3 className="font-bold text-xl ">Objectives</h3>
                      <p className="mt-1">
                        The primary objectives of the event were:
                      </p>
                      <ul>
                        <li> Distribution of School Items </li>
                        <li>Give Scholarships </li>
                        <li>Engage the Community </li>
                      </ul>
                      <br />
                      <h3 className="font-bold text-xl ">Event Activities</h3>
                      <h3 className="font-bold text-xl ">
                        1. Keynote Speakers
                      </h3>
                      <p>
                        The event featured inspiring keynote speakers, including
                        educators, community leaders, and advocates for
                        children's rights. They shared personal stories and
                        insights about the transformative power of education and
                        the urgent need for accessible learning opportunities.
                        Their speeches resonated with the audience, emphasizing
                        the importance of collective action in addressing
                        educational disparities.
                      </p>
                      <br />
                      <h3 className="font-bold text-xl ">
                        2. Panel Discussions
                      </h3>
                      <p className="mt-1">
                        A series of panel discussions were held, focusing on
                        various topics related to education, such as:
                      </p>
                      <ul className="ml-7 leading-8 ">
                        <li>
                          {" "}
                          <span className="font-bold">
                            Innovative Approaches to Learning:
                          </span>{" "}
                          Exploring new teaching methods and technologies that
                          can enhance learning experiences for children.{" "}
                        </li>

                        <li>
                          {" "}
                          <span className="font-bold">
                            The Role of Community in Education:
                          </span>{" "}
                          Discussing how local communities can support schools
                          and students through mentorship, resources, and
                          advocacy.
                        </li>

                        <li>
                          {" "}
                          <span className="font-bold">
                            Breaking Barriers:
                          </span>{" "}
                          Addressing the challenges faced by marginalized groups
                          in accessing education and strategies to overcome
                          these obstacles.
                        </li>
                      </ul>
                      <br />
                      <h3 className="font-bold text-xl ">
                        3. Distribution of School Items and Scholarships
                      </h3>
                      <p>
                        A significant highlight of the event was the
                        distribution of school items and scholarships to
                        children in need. Attendees witnessed the joy on the
                        faces of the recipients as they received essential
                        school supplies, including backpacks, notebooks, pens,
                        and educational materials. Additionally, scholarships
                        were awarded to deserving students, providing them with
                        the financial support necessary to pursue their
                        education without the burden of financial constraints.
                        This direct impact reinforced the event's mission of
                        empowering futures through accessible education.
                      </p>
                      <br />
                      <h3 className="font-bold text-xl ">4. Entertainment</h3>
                      <p>
                        To create an engaging atmosphere, the event included
                        performances by locals, and student groups. These
                        performances not only entertained the audience but also
                        showcased the talent and creativity of young
                        individuals, reinforcing the event's theme of empowering
                        futures through education.
                      </p>
                      <br />
                      <p>
                        The "Empowering Futures Through Accessible Education for
                        All" charity event was a resounding success, bringing
                        together community members, educators, and advocates to
                        support a vital cause. By giving out grants , fostering
                        community engagement, and increasing awareness, the
                        event made significant strides toward ensuring that
                        every child has access to quality education. The
                        distribution of school items and scholarships directly
                        impacted the lives of many children.
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
                        Education
                      </span>
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Food
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
                      <Link href="/past-event-details-2">
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
                        href="/past-event-details-2"
                        className="inline-block px-6 py-3 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                  {/* ))} */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-72">
                      <Link href="/past-event-details-3">
                        <Image
                          src="/gallery/food.jpg"
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
                          <p className="text-gray-600 text-sm">Food</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Nourishing Communities: The Power of Good Food
                      </h4>

                      <p className="text-gray-600 mb-6 text-sm">
                        Food sustains life, fosters community, and combats
                        hunger for a healthier, more equitable world.
                      </p>

                      <Link
                        href="/past-event-details-3"
                        className="inline-block px-6 py-3 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
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
                    {[
                      "Food",
                      "Medical",
                      "Education",
                      "Water",
                      "Shelter",
                    ].map((category, index) => (
                      <li
                        key={category}
                        className={
                          index === 2 ? "text-teal-700 font-medium" : "dark:text-slate-900 text-black "
                        }
                      >
                        <a
                          href="/blog-details-1"
                          className="hover:text-teal-600 hover:text-[17px] ease-in-out transition-colors"
                        >
                          {category}
                        </a>
                      </li>
                    ))}
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
                            Hope for the Homeless: Compassion / Provide Home for
                            the Homeless
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
                            Act now, save lives—your donation can support those
                            facing extreme hardships and urgent needs!
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
                            Empowering Futures Through Accessible Education for
                            All
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
                            Empowering Future Generations: Access to Clean Water
                            for Children.
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
                            Quality Medicine: Empowering a Healthier Community
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
                            Heal lives, restore hope — Your donation can provide
                            essential medical care to those in need!!
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
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Tags</h3>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm">
                      Education
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Food
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

export default PastEventDetails1;
