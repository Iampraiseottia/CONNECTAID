"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useRef } from "react";

import globalStyle from "../globals.css";

import Metadata from "../components/Metadata";

import {
  User,
  MessageSquare,
  Search,
  Clock,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from "lucide-react";

import Facebook from "/public/icon/fb.png";
import Youtube from "/public/icon/youtube.png";
import Instagram from "/public/icon/ig.png";
import LinkedIn from "/public/icon/linkedin.png";

const BlogDetails2 = () => {
  const metadata = {
    title:
      "Transforming Lives Through Accessible Medical Care - ConnectAID Web Application",
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

      {/* Blog Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <div className="rounded-lg overflow-hidden shadow-md">
                {/* Blog Main Image */}
                <div className="relative">
                  <div className="">
                    <Image
                      src="/gallery/medicine.jpg"
                      alt="Blog main image"
                      width={500}
                      height={500}
                      className="w-[100%] h-[68vh] object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute top-0 left-0">
                    <Image
                      src="/gallery/brush-bg-two.png"
                      alt="Brush background"
                      width={200}
                      height={100}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Blog Info */}
                <div className="p-6 bg-white">
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-4 mb-5 items-center">
                      <div className="flex gap-2 items-center">
                        <User className="w-5 h-5 text-gray-700" />
                        <p className="text-gray-600 text-sm">By: admin</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <MessageSquare className="w-5 h-5 text-gray-700" />
                        <p className="text-gray-600 text-sm">Medicine</p>
                      </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                      Transforming Lives Through Accessible Medical Care
                    </h1>

                    <p className="text-gray-600 mb-6">
                      Medicine saves lives, enhances health, and guarantees
                      equitable access for all communities in need. By
                      addressing healthcare disparities and promoting
                      well-being, it plays a crucial role in fostering healthier
                      societies and improving the quality of life for everyone.
                    </p>

                    <hr className="my-6 border-gray-200" />

                    <p className="text-gray-600 mb-6">
                      In an increasingly interconnected world, the importance of
                      accessible medical care cannot be overstated. Access to
                      healthcare is a fundamental human right, yet millions of
                      people around the globe still face barriers that prevent
                      them from receiving the medical attention they need.
                      Transforming lives through accessible medical care is not
                      just a noble goal; it is a necessity for building
                      healthier communities and fostering social equity. This
                      blog delves into the various dimensions of accessible
                      medical care, its significance, the challenges faced, and
                      the innovative solutions that are making a difference.
                    </p>

                    <p className="text-gray-600 mb-6">
                      Accessible medical care refers to the ability of
                      individuals to obtain necessary healthcare services
                      without facing significant barriers. These barriers can be
                      financial, geographical, cultural, or systemic. Accessible
                      care encompasses a range of services, including preventive
                      care, primary care, specialty services, mental health
                      support, and emergency care.
                    </p>

                    <hr className="my-6 border-gray-200" />

                    {/* Quote Section */}
                    <div className="bg-gray-50 p-6 my-8 rounded-lg relative">
                      <div className="absolute top-6 left-6 text-gray-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="76"
                          height="54"
                          viewBox="0 0 76 54"
                          fill="none"
                          className="w-16 h-16 text-gray-300"
                        >
                          <path
                            d="M67.1429 32.4V30.4H65.1429H54.2857C49.3919 30.4 45.4286 26.4424 45.4286 21.6V10.8C45.4286 5.95763 49.3919 2 54.2857 2H65.1429C70.0366 2 74 5.95763 74 10.8V16.2V21.6V33.75C74 43.8236 65.7956 52 55.6429 52H54.2857C52.3776 52 50.8571 50.4724 50.8571 48.6C50.8571 46.7276 52.3776 45.2 54.2857 45.2H55.6429C61.9794 45.2 67.1429 40.0789 67.1429 33.75V32.4ZM23.7143 32.4V30.4H21.7143H10.8571C5.96336 30.4 2 26.4424 2 21.6V10.8C2 5.95763 5.96336 2 10.8571 2H21.7143C26.6081 2 30.5714 5.95763 30.5714 10.8V16.2V21.6V33.75C30.5714 43.8236 22.367 52 12.2143 52H10.8571C8.94907 52 7.42857 50.4724 7.42857 48.6C7.42857 46.7276 8.94907 45.2 10.8571 45.2H12.2143C18.5509 45.2 23.7143 40.0789 23.7143 33.75V32.4Z"
                            stroke="#090E0D"
                            strokeWidth="4"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 pl-20 pt-4">
                        Contributing to medical charities is an impactful way to
                        make a difference in the world and assist those in need.
                        There are various medical causes to support, from local
                        programs to global initiatives.
                      </h4>
                    </div>

                    {/* Multiple Images */}
                    <div className="flex flex-col md:flex-row gap-5 my-8">
                      <div className="w-full md:w-1/2">
                        <Image
                          src="/gallery/gallery-3.png"
                          alt="gallery image 1"
                          width={400}
                          height={300}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <Image
                          src="/gallery/gallery-4.png"
                          alt="gallery image 2"
                          width={400}
                          height={300}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Donation Content */}
                    <div className="mt-8">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">
                        Donation
                      </h4>
                      <p className="text-gray-600 mb-6">
                        Charitable donations in the medical field not only
                        provide immediate assistance but also contribute to
                        long-term health improvements. By supporting medical
                        charities, donors play a crucial role in enhancing
                        healthcare access, funding research, and fostering
                        healthier communities. Engaging others in your
                        charitable efforts can amplify the impact, creating a
                        ripple effect of generosity and support for those in
                        need.
                      </p>

                      <hr className="my-6 border-gray-200" />

                      <p className="text-gray-600 mb-6">
                        Key Components of Accessible Medical Care includes:
                      </p>

                      <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                        <li>
                          <b>Affordability:</b> Healthcare should be affordable
                          for everyone, regardless of their economic status.{" "}
                        </li>
                        <li>
                          <b>Availability:</b> Medical services must be
                          available in sufficient quantity and variety to meet
                          the needs of the population.{" "}
                        </li>
                        <li>
                          <b>Geographical Accessibility: </b>Healthcare
                          facilities should be located within reasonable
                          distances from where people live, especially in rural
                          and under-served urban areas.
                        </li>
                        <li>
                          <b>Cultural Competence: </b> Healthcare providers must
                          be trained to understand and respect the diverse
                          cultural backgrounds of their patients, ensuring that
                          care is sensitive to their needs and preferences.{" "}
                        </li>
                        <li>
                          <b>Health Literacy: </b> Patients should have the
                          knowledge and understanding necessary to make informed
                          decisions about their health and navigate the
                          healthcare system effectively.
                        </li>
                      </ul>

                      <hr className="my-6 border-gray-200" />

                      <p className="text-gray-600 mb-6">
                        The Significance of Accessible Medical Care:
                      </p>

                      <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                        <li> Improving Health Outcomes.</li>
                        <li>Reducing Health Disparities</li>
                        <li>Enhancing Community Resilience</li>
                        <li> Economic Benefits</li>
                      </ul>

                      <hr className="my-6 border-gray-200" />

                      <p className="text-gray-600 mb-6">
                        Challenges to Achieving Accessible Medical Care:
                      </p>

                      <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                        <li> Financial Barriers</li>
                        <li>Geographic Barriers</li>
                        <li>Systemic Inequities</li>
                        <li> Cultural and Linguistic Barriers</li>
                      </ul>

                      <hr className="my-6 border-gray-200" />
                    </div>
                  </div>

                  {/* Blog Info Tags and Share */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm">
                        Medicine
                      </span>
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Food
                      </span>
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Education
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
                  </div>
                </div>
              </div>

              {/* Related Blogs Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Related Blogs
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* {[1, 2].map((item) => ( */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-72">
                      <Link href="/blog-details-1">
                        <Image
                          src="/gallery/event-6.png"
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
                  {/* ))} */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-72">
                      <Link href="/blog-details-3">
                        <Image
                          src="/blog/blog-5.png"
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
                        href="/blog-details-3"
                        className="inline-block px-6 py-3 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Form */}
              <div className="mt-16">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Leave a Comment
                </h3>

                <div className="bg-white rounded-lg shadow-md p-6">
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
                          className="w-full p-3 border border-gray-300 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
                          className="w-full p-3 border border-gray-300 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
                        className="w-full p-3 border border-gray-300 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
                </div>
              </div>

              {/* Comments List */}
              <div className="mt-16">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  04 Comment
                </h3>

                {/* {[1, 2, 3, 4].map((comment) => ( */}
                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={`/gallery/comment-7.png`}
                        alt="Commenter"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <p className="font-semibold text-gray-800">
                          Sita Reddy
                        </p>
                        <p className="text-sm text-gray-500">
                          Sep 02, 2024 At 5.00 am
                        </p>
                      </div>
                      <p className="text-gray-600 mb-3">
                        The economic benefits of accessible healthcare are often
                        overlooked. Healthier communities contribute more to the
                        economy. Thank you for highlighting this!
                      </p>
                      <a
                        href="/blog-details-1"
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                  <hr className="my-6 border-gray-200" />
                </div>
                {/* ))} */}
                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={`/gallery/comment-9.png`}
                        alt="Commenter"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <p className="font-semibold text-gray-800">
                          Pedro Karan
                        </p>
                        <p className="text-sm text-gray-500">
                          Oct 17, 2024 At 11.45 am
                        </p>
                      </div>
                      <p className="text-gray-600 mb-3">
                        I love how this blog emphasizes the importance of health
                        literacy. Educating patients is key to empowering them
                        to make informed decisions about their health.
                      </p>
                      <a
                        href="/blog-details-1"
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                  <hr className="my-6 border-gray-200" />
                </div>

                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={`/gallery/comment-8.png`}
                        alt="Commenter"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <p className="font-semibold text-gray-800">
                          Meera Patel
                        </p>
                        <p className="text-sm text-gray-500">
                          Nov 21, 2024 At 1.23 pm
                        </p>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Thank you for addressing the barriers to healthcare
                        access. It's a complex issue, but with awareness and
                        action, we can create positive change.
                      </p>
                      <a
                        href="/blog-details-1"
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                  <hr className="my-6 border-gray-200" />
                </div>

                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={`/gallery/comment-10.png`}
                        alt="Commenter"
                        width={55}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <p className="font-semibold text-gray-800">
                          Neha Gupta
                        </p>
                        <p className="text-sm text-gray-500">
                          Dec 28, 2024 At 7.42 pm
                        </p>
                      </div>
                      <p className="text-gray-600 mb-3">
                        It beautifully highlights the importance of accessible
                        medical care. It's crucial for improving health outcomes
                        in under-served communities. Thank you for raising
                        awareness!"
                      </p>
                      <a
                        href="/blog-details-1"
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                  <hr className="my-6 border-gray-200" />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Search Box */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Search Here
                  </h3>
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Enter Your Keyword"
                      className="w-full p-3 pr-10 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      ref={searchRef}
                      onMouseEnter={onMouseEnterSearchRef}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Search className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </div>

                {/* Category List */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Category List
                  </h3>

                  <ul className="space-y-2">
                    {[
                      "Food",
                      "Medical",
                      "Education",
                      "Wireframing",
                      "Recycline",
                      "Education",
                    ].map((category, index) => (
                      <li
                        key={category}
                        className={
                          index === 1 ? "text-teal-700 font-medium" : ""
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
                </div>

                {/* Related Posts */}
                <div className="bg-white rounded-lg shadow-md p-6">
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
                              src="/gallery/donateList-1.png"
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
                              src="/gallery/gallery-4.png"
                              alt="Donation List 1"
                              fill
                              className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                            <DollarSign className="w-3 h-3 text-teal-500 " />
                            <span>Raised Amount: $782, 000</span>
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
                              src="/gallery/gallery-20.png"
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
                              src="/gallery/donateList-1.png"
                              alt="Donation List 1"
                              fill
                              className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                            <DollarSign className="w-3 h-3 text-teal-500 " />
                            <span>Raised Amount: $63, 100</span>
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
                              src="/gallery/donationList-2.png"
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
                              src="/gallery/gallery-1.png"
                              alt="Donation List 1"
                              fill
                              className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                            <DollarSign className="w-3 h-3 text-teal-500 " />
                            <span>Raised Amount: $155, 750</span>
                          </div>
                          <h4 className="font-medium text-gray-800 hover:text-teal-600 transition-colors">
                            <a href="/donation-details-1">
                              Together we can end hunger — Donate today and make
                              a long lasting impacts in lives of people and
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
                              src="/gallery/gallery-3.png"
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
                              src="/gallery/gallery-2.png"
                              alt="Donation List 1"
                              fill
                              className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                            <DollarSign className="w-3 h-3 text-teal-500 " />
                            <span>Raised Amount: $2, 050, 284</span>
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
                              src="/blog/blog-5.png"
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
                              src="/gallery/gallery-1.png"
                              alt="Donation List 1"
                              fill
                              className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                            <DollarSign className="w-3 h-3 text-teal-500 " />
                            <span>Raised Amount: $155, 750</span>
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
                              src="/gallery/gallery-13.png"
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
                              src="/gallery/donationList-2.png"
                              alt="Donation List 1"
                              fill
                              className="rounded object-cover hover:scale-105 duration-200 ease-in-out pt-2"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                            <DollarSign className="w-3 h-3 text-teal-500 " />
                            <span>Raised Amount: $40, 090</span>
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
                </div>

                {/* Tags */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Tags</h3>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm">
                      Medical
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Food
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Water
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Education
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
                      src="/gallery/user.png"
                      alt="Author"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    Nikluas Michealson
                  </h4>
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
    </div>
  );
};

export default BlogDetails2;
