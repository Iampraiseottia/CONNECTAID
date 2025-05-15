import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import TestimonialCard from "../components/TestimonialCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion } from "motion/react";

const testimonials = [
  {
    id: 1,
    name: "Ngwa Martin",
    location: "Bamenda, Cameroon 🇨🇲",
    text: `I found help when I needed it most. This platform empowers individuals to seek assistance and provides valuable resources, making a significant difference in our lives.`,
    image: "/testimony/testimonial-1.png",
  },
  {
    id: 2,
    name: "Ebong Johnson",
    location: "Douala, Cameroon 🇨🇲",
    text: `ConnectAID has transformed my life. It connects people in need with essential resources and support, proving that compassion and community can overcome any challenge we face.`,
    image: "/testimony/testimonial-2.png",
  },
  {
    id: 3,
    name: "Amina Nalowa",
    location: "Yaounde, Cameroon 🇨🇲",
    text: `I was struggling until I discovered ConnectAID. It provides a platform for those in need to find help and support, reminding us that we are never alone.`,
    image: "/testimony/testimonial-3.png",
  },
  {
    id: 4,
    name: "Che Brackson",
    location: "Buea, Cameroon 🇨🇲",
    text: `I never thought I could find help so easily. ConnectAID has opened doors for many, providing essential services and fostering a spirit of unity among those in need.`,
    image: "/testimony/testimonial-4.png",
  },
  {
    id: 5,
    name: "Njou Bryan",
    location: "Baffousam, Cameroon 🇨🇲",
    text: `In the face of hardship, ConnectAID has been a source of strength. It connects us with vital resources, helping our community rebuild and thrive despite the challenges we encounter`,
    image: "/testimony/testimonial-8.png",
  },
  {
    id: 6,
    name: "Fatima Abongwie",
    location: "Garoua, Cameroon 🇨🇲",
    text: `ConnectAID has been a game-changer for my community. It connects us with vital resources and support, empowering individuals to overcome challenges and build a better future together.`,
    image: "/testimony/testimonial-5.png",
  },
  {
    id: 7,
    name: "Elena Ayuk",
    location: "Maroua, Cameroon 🇨🇲",
    text: `In our toughest moments, ConnectAID has been a source of strength. It links us to essential resources, reminding us that together we can overcome any challenge we encounter.`,
    image: "/testimony/testimonial-6.png",
  },
  {
    id: 8,
    name: "Tchapda Faith",
    location: "Limbe, Cameroon 🇨🇲",
    text: `During these trying times, ConnectAID has been invaluable. It helps us find resources and support, reminding us that solidarity can help us overcome any challenge we face.`,
    image: "/testimony/testimonial-7.png",
  },
];

const Testimony = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8 md:mb-12 flex flex-wrap items-center justify-between"
        >
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <span className="text-teal-700 font-semibold mb-1 md:mb-2 block">
              Testimonials
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              What They're Talking About Us
            </h2>
          </div>

          {/* Navigation buttons positioned above the testimonials */}
          <div className="w-full md:w-auto flex justify-end space-x-2">
            <button
              ref={navigationPrevRef}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-md focus:outline-none"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              ref={navigationNextRef}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-md focus:outline-none"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              bulletClass:
                "w-3 h-3 rounded-full bg-gray-300 mx-1 inline-block cursor-pointer",
              bulletActiveClass: "!bg-teal-700",
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === activeIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonial-pagination flex justify-center space-x-2 mt-6"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimony;
