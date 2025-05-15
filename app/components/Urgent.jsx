"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faClock,
  faShare,
  faGift,
  faGraduationCap,
  faBottleWater,
  faHome,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

import slideImg1 from "/public/urgent/urgent-1.png";
import slideImg2 from "/public/urgent/urgent-2.png";
import slideImg3 from "/public/urgent/urgent-3.png";
import slideImg4 from "/public/urgent/urgent-4.png";
import slideImg6 from "/public/urgent/urgent-6.png";

import { motion } from "motion/react";

const Urgent = () => {
  const [activeTab, setActiveTab] = useState("tab-section-one");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20"> 
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="w-full max-w-3xl text-center">
            <h3 className="text-center text-teal-700 font-bold tracking-wide text-3xl">
              In urgent cases
            </h3>
            <p className="text-center text-5xl mt-8 tracking-tight font-semibold mb-10 text-gray-900 dark:text-gray-900 py-1 px-4 ">
              The best way is to find yourself
            </p>
          </div>
        </motion.div> 

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }} 
          className="flex flex-col lg:flex-row justify-center gap-6 responsiveUrgent2"
        >
          {/* Left side - Swiper Slider */}
          <div className="w-full lg:w-2/3 xl:w-7/12">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={true}
              pagination={{
                clickable: true,
                bulletActiveClass:
                  "swiper-pagination-bullet-active !bg-teal-500 !important",
                bulletClass: "swiper-pagination-bullet !bg-white",
              }}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] lg:w-[1000px] responsiveUrgent3"
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <div className="relative h-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={slideImg1}
                    alt="Seeking Human Kindness"
                  />
                  <div className="absolute bottom-5 left-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                    <div className="flex gap-3 sm:gap-5 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faGift}
                          className="text-yellow-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Kindness
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faMapPin}
                          className="text-teal-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Africa
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold max-w-lg">
                        Show Kindness 💝 To Those Desperately In Need
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <div className="relative h-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={slideImg2}
                    alt="Help Poor Little Children"
                  />
                  <div className="absolute bottom-5 left-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                    <div className="flex gap-3 sm:gap-5 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faGraduationCap}
                          className="text-yellow-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Education
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faMapPin}
                          className="text-teal-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Asia
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold max-w-lg">
                        Help Children To Attain Good and Quality Education 🎓
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 3 */}
              <SwiperSlide>
                <div className="relative h-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={slideImg3}
                    alt="Give a community good drinking water source"
                  />
                  <div className="absolute bottom-3 left-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                    <div className="flex gap-3 sm:gap-5 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faBottleWater}
                          className="text-yellow-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Water
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faMapPin}
                          className="text-teal-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Africa
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold max-w-lg">
                        Donate To Give A Community Gain and Good Clean Drinking
                        Water 🚰
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 4 */}
              <SwiperSlide>
                <div className="relative h-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={slideImg4}
                    alt="Come to the AID of the Homeless"
                  />
                  <div className="absolute bottom-5 left-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                    <div className="flex gap-3 sm:gap-5 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faHome}
                          className="text-yellow-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Housing
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faMapPin}
                          className="text-teal-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          America
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold max-w-lg">
                        Grant The Homeless A Place To Call Home 🏠
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 5 */}
              <SwiperSlide>
                <div className="relative h-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={slideImg6}
                    alt="Grant the elder a happy and peaceful old age"
                  />
                  <div className="absolute bottom-5 left-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                    <div className="flex gap-3 sm:gap-5 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faFaceSmile}
                          className="text-yellow-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Happiness
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FontAwesomeIcon
                          icon={faMapPin}
                          className="text-teal-500 text-xs sm:text-base"
                        />
                        <p className="text-white text-xs sm:text-sm md:text-base">
                          Africa
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold max-w-lg">
                        Put A Beautiful Smile 😊 On The Faces Of Amazing
                        Children
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Right side - Tab Content */}
          <div className="w-full lg:w-[40%] lg:ml-[100px] xl:w-3/12 bg-[#00815D] text-white shadow-lg mt-6 lg:mt-0 responsiveUrgent">
            <div className="p-4 sm:p-5 md:p-6 leading-8">
              <div
                className={`${
                  activeTab === "tab-section-one" ? "block" : "hidden"
                }`}
              >
                <div className="flex justify-center items-center gap-2 mb-2 sm:mb-5 sm:mt-16 mt-5">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-xs sm:text-sm"
                  />
                  <p className="text-xs sm:text-xl">652 Days Remaining</p>
                </div>
                <h4 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-6 sm:mt-4 text-center">
                  The Universal Hands-free lighting Solution
                </h4>
                <p className="mb-3 sm:mb-12 text-sm sm:text-xl leading-8 text-center">
                  Fund programs that help children escape poverty by providing
                  vocational training.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3 sm:mb-7 sm:mt-5">
                  <div
                    className="bg-yellow-400 h-2 mt-2 rounded-full relative"
                    style={{ width: "65%" }}
                  >
                    <span className="absolute -right-3 -top-6 text-xl font-semibold">
                      65%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 sm:mt-4">
                  <div>
                    <h5 className="font-semibold text-xs sm:text-xl">Goals</h5>
                    <p className="text-xs sm:text-xl ">70, 000, 000 Francs</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs sm:text-xl">Raised</h5>
                    <p className="text-xs sm:text-xl">24, 700, 000 Francs</p>
                  </div>
                  <div className="bg-yellow-500 w-12 h-12 rounded-full p-2 sm:p-2 text-center cursor-pointer">
                    <FontAwesomeIcon
                      icon={faShare}
                      className="text-white text-xs text-center sm:text-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex justify-center mt-4 sm:mt-8">
                <div className="inline-flex h-auto">
                  <Link
                    href="/donate-payment"
                    className="bg-yellow-400 h-12 w-36 text-black text-2xl font-semibold pt-2 pl-6 hover:opacity-85 "
                  >
                    Donate
                  </Link>
                  <Link
                    href="/donation-details-7"
                    className="bg-white h-12 w-36 text-black text-2xl font-semibold pt-2 pl-6 hover:opacity-85"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Urgent;
