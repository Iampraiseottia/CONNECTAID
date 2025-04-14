
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


const About = () => {

  const metadata = {
    title: 'About Us - ConnectAID Web Application',
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
            title="ABOUT US"
            description="ABOUT US"
            breadcrumAlt="About Us Hero Background Image"
            breadcrumbImage="/gallery/breadcrumb-1.png" 
        />
      </motion.div>


      {/* Little Information Section */}  
      <motion.section 
        initial={{opacity: 0, y: 100}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5, delay: 0.5}} 
        className='mt-10 py-10 px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>

          {/* Medical and Blood */}
          <div 
            className={`rounded-xl text-center shadow-xl py-5 px-4 transition-all duration-200 ease-in-out h-full 
            ${isHoveredMedical ? 'bg-teal-600 shadow-xl' : 'bg-white'}`}
            onMouseEnter={() => setIsHoveredMedical(true)}
            onMouseLeave={() => setIsHoveredMedical(false)} 
          > 
            <div className="flex justify-center">
              <FontAwesomeIcon 
                icon={faHospital} 
                className={`text-xl mb-4 mt-2 w-[50px] h-[50px] rounded-full p-4 transition-all duration-200 
                ${isHoveredMedical ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'}`} 
              />
            </div>
            <h1 className={`mb-4 text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-200 
              ${isHoveredMedical ? 'text-white' : 'text-black'}`}> 
              Medicals
            </h1>
            <p className={`mb-3 text-sm md:text-base px-3 transition-colors duration-200 
              ${isHoveredMedical ? 'text-white' : 'text-slate-700'}`}>
              Donating funds for medical 🏥 care supports sick individuals, providing essential treatments, medications, and resources to improve their health and well-being.
            </p>
            <Link href='/donation' className={`mb-3 text-sm md:text-base px-3 transition-colors duration-200 flex justify-center items-center mt-4 
              ${isHoveredMedical ? 'text-white' : 'text-teal-600'}`}> 
              <span className='font-semibold text-xl tracking-wide hover:text-[21px]'>Read More </span>
              <ArrowUpRight className='ml-1' /> 
            </Link>
          </div>

          {/* Education Card */}
          <div 
            className={`rounded-xl text-center shadow-xl py-5 px-4 transition-all duration-200 ease-in-out h-full
            
            ${isHoveredEducation ? 'bg-teal-600 shadow-xl' : 'bg-white'}`}
            onMouseEnter={() => setIsHoveredEducation(true)}
            onMouseLeave={() => setIsHoveredEducation(false)} > 
            <div className="flex justify-center">
              <FontAwesomeIcon 
                icon={faGraduationCap} 
                className={`text-xl mb-4 mt-2 w-[50px] h-[50px] rounded-full p-4 transition-all duration-200 
                ${isHoveredEducation ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'}`} 
              />
            </div>
            <h1 className={`mb-4 text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-200 
            ${isHoveredEducation ? 'text-white' : 'text-black'}`}> 
              Education
            </h1>
            <p className={`mb-3 text-sm md:text-base px-3 transition-colors duration-200 
            ${isHoveredEducation ? 'text-white' : 'text-slate-700'}`}>
              Investing in education changes lives! Your donations provide essential resources and opportunities for those in need. Help us empower future generations 🏫 and create a brighter tomorrow!
            </p>
            <Link href='/donation' className={`mb-3 text-sm md:text-base px-3 transition-colors duration-200 flex justify-center items-center mt-4 
              ${isHoveredEducation ? 'text-white' : 'text-teal-600'}`}> 
              <span className='font-semibold text-xl tracking-wide hover:text-[21px]'>Read More </span>
              <ArrowUpRight className='ml-1' /> 
            </Link>
          </div>

          {/* Charity Card */}
          <div 
            className={`rounded-xl text-center shadow-xl py-5 px-4 transition-all duration-200 ease-in-out h-full 
            ${isHoveredCharity ? 'bg-teal-600 shadow-xl' : 'bg-white'}`}
            onMouseEnter={() => setIsHoveredCharity(true)}
            onMouseLeave={() => setIsHoveredCharity(false)} 
          > 
            <div className="flex justify-center">
              <FontAwesomeIcon 
                icon={faGift} 
                className={`text-xl mb-4 mt-2 w-[50px] h-[50px] rounded-full p-4 transition-all duration-200 
                ${isHoveredCharity ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'}`} 
              />
            </div>
            <h1 className={`mb-4 text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-200 
            ${isHoveredCharity ? 'text-white' : 'text-black'}`}> 
              Send a Charitable
            </h1>
            <p className={`mb-3 text-sm md:text-base px-3 transition-colors duration-200 
            ${isHoveredCharity ? 'text-white' : 'text-slate-700'}`}>
              Make a meaningful difference in the lives of those in need. Your generosity provides essential resources, support, and hope, fostering positive change in communities and individuals.
            </p>
            <Link href='/donation' className={`mb-3 text-sm md:text-base px-3 transition-colors duration-200 flex justify-center items-center mt-4 
              ${isHoveredCharity ? 'text-white' : 'text-teal-600'}`}> 
              <span className='font-semibold text-xl tracking-wide hover:text-[21px]'>Read More </span>
              <ArrowUpRight className='ml-1' /> 
            </Link>
          </div>

          {/* Donations Card */}
          <div 
            className={`rounded-xl text-center shadow-xl py-5 px-4 transition-all duration-200 ease-in-out h-full 
            ${isHoveredSocialService ? 'bg-teal-600 shadow-xl' : 'bg-white'}`}
            onMouseEnter={() => setIsHoveredSocialService(true)}
            onMouseLeave={() => setIsHoveredSocialService(false)} 
          > 
            <div className="flex justify-center">
              <FontAwesomeIcon 
                icon={faPeopleArrows} 
                className={`text-xl mb-4 mt-2 w-[50px] h-[50px] rounded-full p-4 transition-all duration-200 
                ${isHoveredSocialService ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'}`} 
              />
            </div>
            <h1 className={`mb-4 text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-200 
            ${isHoveredSocialService ? 'text-white' : 'text-black'}`}> 
              Social Service
            </h1>
            <p className={`mb-3 text-sm md:text-base px-3 transition-colors duration-200 
            ${isHoveredSocialService ? 'text-white' : 'text-slate-700'}`}>
              Social service promotes community well-being by addressing needs, providing support, and empowering individuals through programs that enhance quality of life and foster social connection.
            </p>
            <Link href='/donation' className={`mb-3 text-sm md:text-base px-3 transition-colors duration-200 flex justify-center items-center mt-4 
              ${isHoveredSocialService ? 'text-white' : 'text-teal-600'}`}> 
              <span className='font-semibold text-xl tracking-wide hover:text-[21px]'>Read More </span>
              <ArrowUpRight className='ml-1' /> 
            </Link>
          </div>
        </div>
      </motion.section>

      
      {/* About Us Main  */}
      <AboutUs />

      {/* Favorite */}
      <Favorite />

      {/* Our Team */}
      <Team />

      {/* Testimony */}
      <Testimony />

      {/* Blog Post */}
      <Blog />

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />

    </main>
  )
}

export default About;
