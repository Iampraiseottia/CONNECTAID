import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { motion } from "motion/react";

const UpcomingEvents = () => {
  return (
    <main className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center mb-8 sm:mb-10 md:mb-12 sm:mt-24"
      >
        <div className="w-full text-center">
          <h3 className="text-center text-teal-700 font-bold tracking-wide text-3xl sm:text-5xl">
            Upcoming Events{" "}
          </h3>
          <p className="text-center text-xl mt-3 tracking-tight font-normal mb-10 leading-8 sm:mx-32 mx-3">
            Join us for an unforgettable experience filled with inspiration,
            community connection, and impactful moments that empower change,
            celebrate togetherness, and create lasting memories for everyone
            involved in our upcoming events!
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full my-6 mx-3"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={200}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 swiper-slide-content">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/hero/hero4.png"
                  alt="Donation Campaign"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-6 right-6 z-10">
                <div className="relative">
                  <div className="sm:w-20 sm:h-16 h-12 w-12 rounded bg-[#fbbf24] sm:rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-black">
                    <span className="text-xl font-bold">09</span>
                    <span className="text-sm">Nov</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold mb-2 text-xl">
                  Your donation, no matter how big or small, can make.
                </h3>
                <div className="flex">
                  <p className="text-yellow-500 text-xl font-semibold ">
                    Impact Lives, Formal
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-white/90 text-sm">
                    Join us for this special event and help people in critical
                    conditions in our community.
                  </p>
                </div>
              </div>

              <Link href="#" className="absolute inset-0 z-10">
                <span className="sr-only">View details</span>
              </Link>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 swiper-slide-content">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/gallery/event-6.png"
                  alt="Donation Campaign"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-6 right-6 z-10">
                <div className="relative">
                  <div className="sm:w-20 sm:h-16 h-12 w-12 rounded bg-[#fbbf24] sm:rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-black">
                    <span className="text-xl font-bold">15</span>
                    <span className="text-sm">Jul</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold mb-2 text-xl">
                  Community Outreach Program
                </h3>
                <div className="flex">
                  <p className="text-yellow-500 text-xl font-semibold ">
                    Community, Outreach
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-white/90 text-sm">
                    Help us reach more people in facing and suffering from
                    proper drinking water source.
                  </p>
                </div>
              </div>

              <Link href="#" className="absolute inset-0 z-10">
                <span className="sr-only">View details</span>
              </Link>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 swiper-slide-content">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/gallery/event-2.png"
                  alt="Donation Campaign"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-6 right-6 z-10">
                <div className="relative">
                  <div className="sm:w-20 sm:h-16 h-12 w-12 rounded bg-[#fbbf24] sm:rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-black">
                    <span className="text-xl font-bold">22</span>
                    <span className="text-sm">Aug</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold mb-2 text-xl">
                  Workshop Series
                </h3>
                <div className="flex">
                  <p className="text-yellow-500 text-xl font-semibold ">
                    Skills & Technology, Workshop
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-white/90 text-sm">
                    Learn new skills and expand your knowledge with our
                    expert-led workshops.
                  </p>
                </div>
              </div>

              <Link href="#" className="absolute inset-0 z-10">
                <span className="sr-only">View details</span>
              </Link>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 swiper-slide-content">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/hero/hero-bg.png"
                  alt="Donation Campaign"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-6 right-6 z-10">
                <div className="relative">
                  <div className="sm:w-20 sm:h-16 h-12 w-12 rounded bg-[#fbbf24] sm:rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-black">
                    <span className="text-xl font-bold">10</span>
                    <span className="text-sm">Sep</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold mb-2 text-xl">
                  Annual Fundraising Gala
                </h3>
                <div className="flex">
                  <p className="text-yellow-500 text-xl font-semibold ">
                    Fundraising, Formal
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-white/90 text-sm">
                    Join us for an evening of celebration and support for our
                    ongoing initiatives.
                  </p>
                </div>
              </div>

              <Link href="#" className="absolute inset-0 z-10">
                <span className="sr-only">View details</span>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Styles remain the same */}
        <style jsx global>{`
          .swiper-slide {
            transition: all 0.5s ease;
          }

          .swiper-slide-active {
            z-index: 10;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: lightseagreen;
          }

          .swiper-pagination-bullet-active {
            background: lightseagreen;
          }
          .swiper-pagination-bullet {
            margin-top: 200px !important;
          }
        `}</style>
      </motion.div>
    </main>
  );
};

export default UpcomingEvents;
