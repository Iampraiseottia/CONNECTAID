import Image from "next/image";
import Link from "next/link";

import { Mail, Phone, MapPin } from "lucide-react";

import Facebook from "/public/icon/fb.png";
import Youtube from "/public/icon/youtube.png";
import Instagram from "/public/icon/ig.png";
import LinkedIn from "/public/icon/linkedin.png";

const Footer = () => {
  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gray-900 opacity-90 z-0"></div>

      <div className="absolute inset-0 z-0 opacity-90">
        <Image
          src="/gallery/footer-graph.png"
          alt="World Map Background"
          fill={true}
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Explore Links */}
          <div>
            <h4 className="text-teal-500 text-xl font-semibold mb-6">
              Explore Links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/donation"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Latest Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/donate-payment"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Change Lives Now
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Latest Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Our Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Support */}
          <div>
            <h4 className="text-teal-500 text-xl font-semibold mb-6">
              Our Work
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/upcoming-event-details-1"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Picture Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/past-event-details-1"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Past Events
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Join Our Community
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Support (Contact) */}
          <div>
            <h4 className="text-teal-500 text-xl font-semibold mb-6">
              Get Support
            </h4>
            <ul className="space-y-5">
              <li>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 p-2 rounded-full">
                    <Mail className="text-white h-5 w-5" />
                  </div>
                  <a
                    href="mailto:connectaid@gmail.com"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    connectaid@gmail.com
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 p-2 rounded-full">
                    <Phone className="text-white h-5 w-5" />
                  </div>
                  <a
                    href="tel:+23767441721"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    +237 674 41 72 61
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 p-2 rounded-full">
                    <MapPin className="text-white h-5 w-5" />
                  </div>
                  <span className="text-gray-300 hover:text-yellow-400">
                    Buea, Southwest, Cameroon
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-teal-500 text-xl font-semibold mb-6">
              Projects
            </h4>
            <ul className="space-y-6">
              <li>
                <div className="flex gap-4">
                  <Link
                    href="/donation-details-1"
                    className="flex-shrink-0 w-20 h-20 hover:scale-105 ease-in-out duration-200 cursor-pointer relative overflow-hidden rounded-md"
                  >
                    <Image
                      src="/project/project-2.png"
                      alt="Charity Project 1"
                      fill={true}
                      style={{ objectFit: "cover" }} 
                    />
                  </Link>
                  <div>
                    <p className="text-yellow-500 text-sm mb-1">18.May.2024</p>
                    <h4 className="text-white font-medium hover:text-teal-500 transition-colors">
                      <Link href="/donation-details-1">
                        Feed the hungry and less privilege and needy.{" "}
                      </Link>
                    </h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-4">
                  <Link
                    href="/donation-details-2"
                    className="flex-shrink-0 w-20 h-20 hover:scale-105 ease-in-out duration-200 cursor-pointer relative overflow-hidden rounded-md"
                  >
                    <Image
                      src="/project/project-1.png"
                      alt="Charity Project 2"
                      fill={true}
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                  <div>
                    <p className="text-yellow-500 text-sm mb-1">20.June.2024</p>
                    <h4 className="text-white font-medium hover:text-teal-500 transition-colors">
                      <Link href="/donation-details-2">
                        Provide quality and good education to children{" "}
                      </Link>
                    </h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-10" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <p className="text-gray-400 mb-4 md:mb-0 text-sm md:text-base">
            Copyright © 2025 ConnectAID. All rights reserved.
          </p>
          <div className="flex justify-center gap-4">
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
    </footer>
  );
};

export default Footer;
