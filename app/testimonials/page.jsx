
"use client"

import React, { useState } from 'react'

import globalStyle from '../globals.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import Breadcrumb from '../components/Breadcrumb'
import AboutUs from '../components/AboutUs'
import Favorite from '../components/Favorite'
import Team from '../components/Team'
import Testimony from '../components/Testimony'
import Blog from '../components/Blog'

import { motion } from "motion/react" 

import Metadata from '../components/Metadata'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faPeopleArrows, faGift, faHospital } from '@fortawesome/free-solid-svg-icons' 
import { ArrowUpRight } from 'lucide-react'

import Link from 'next/link' 


const Testimonials = () => {

  const metadata = {
    title: 'Testimonials - ConnectAID Web Application',
    description: 'ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.',
  };

  const [isHoveredMedical, setIsHoveredMedical] = useState(false);
  const [isHoveredEducation, setIsHoveredEducation] = useState(false);
  const [isHoveredSocialService, setIsHoveredSocialService] = useState(false);
  const [isHoveredCharity, setIsHoveredCharity] = useState(false);


  return (
    <main className='bg-[#f9f9f9]'>

      <Metadata title={metadata.title} description={metadata.description} />

      {/* Navigation Bar | Header  */}
      <Navbar />

      {/* Breadcrumb for ABout Page */} 
      <motion.div 
        initial={{opacity: 0, y: 100}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5, delay: 0.5}} 
        viewport={{once: true, amount: 0.5}} 
        className="w-full">
        <Breadcrumb 
            homeTitle="HOME"
            homeSlug="/"
            title="TESTIMONY"
            description="TESTIMONIALS"
            breadcrumAlt="TESTIMONIALS Hero Background Image"
            breadcrumbImage="/gallery/breadcrumb-1.png" 
        />
      </motion.div>

  
      {/* Testimony */}
      <Testimony /> 

      {/* Favorite */}
      <Favorite />

      {/* Our Team */}
      <Team />

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />

    </main>
  )
}


export default Testimonials;