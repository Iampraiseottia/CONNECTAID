"use client";

import { React } from "react";

import globalStyle from "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";
import Image from "next/image";

import galleryImg1 from "/public/gallery/water.png";
import galleryImg2 from "/public/gallery/training.png";
import galleryImg3 from "/public/gallery/suffering.png";
import galleryImg4 from "/public/gallery/pastevent.png";
import galleryImg5 from "/public/gallery/medicine2.png";
import galleryImg6 from "/public/gallery/food.jpg";
import galleryImg7 from "/public/gallery/education.png";
import galleryImg8 from "/public/gallery/donateList-1.png";
import galleryImg9 from "/public/gallery/africanchildren2.png";

const PictureGallery = () => {
  const metadata = {
    title: "Gallery - ConnectAID ",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  return (
    <main className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

      {/* Navigation Bar  */}
      <Navbar />

      {/* Breadcrumb  */}
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
          title="GALLERY"
          description="GALLERY "
          breadcrumAlt="GALLERY Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

      {/* Our Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <span className="inline-block text-emerald-600 text-3xl font-semibold mb-6 sm:text-5xl">
              Picture Gallery
            </span>
            <h2 className="text-2xl md:text-4xl font-bold sm:-ml-[150px] sm:-mr-[130px] dark:text-slate-800 text-slate-800">
              View our gallery of pictures which cuts across all past events 🔥
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg1}
                  alt="Gallery Image 1"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg2}
                  alt="Gallery Image 2"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg3}
                  alt="Gallery Image 3"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg4}
                  alt="Gallery Image 4"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg5}
                  alt="Gallery Image 5"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg6}
                  alt="Gallery Image 6"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg7}
                  alt="Gallery Image 7"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg8}
                  alt="Gallery Image 8"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={galleryImg9}
                  alt="Gallery Image 9"
                  height={384}
                  width="100%"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default PictureGallery;
