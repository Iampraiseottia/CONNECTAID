"use client";

import React, { useState } from "react";

import globalStyle from "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";
import Upcoming from "../components/Upcoming";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

const Events = () => {
  const metadata = {
    title: "Upcoming Charity Events - ConnectAID ",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  return (
    <main className="bg-[#f9f9f9]">
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
          title="UPCOMING EVENTS"
          description="UPCOMING EVENT LIST"
          breadcrumAlt="EVENTS Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png" 
        />
      </motion.div>

      {/* Upcoming Events */}
      <Upcoming />


      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default Events;
