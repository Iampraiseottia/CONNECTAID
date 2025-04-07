
"use client"

import React, { useState } from 'react'

import globalStyle from './globals.css'

import Image from 'next/image'

import Hero from './components/Hero'
import Urgent from './components/Urgent'
import FAQs from './components/FAQs'

import Metadata from './components/Metadata'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faGraduationCap, faDollarSign, faHandsHoldingChild } from '@fortawesome/free-solid-svg-icons'

import { motion } from "motion/react"



const ConnectAID_App = () => {

  const metadata = {
    title: 'ConnectAID Web Application',
    description: 'ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.'
  };
 
  const [isHoveredSupport, setIsHoveredSupport] = useState(false);
  const [isHoveredEducation, setIsHoveredEducation] = useState(false);
  const [isHoveredDonations, setIsHoveredDonations] = useState(false);
  const [isHoveredRequest, setIsHoveredRequest] = useState(false);


  return (
    <main className='bg-[#f7f7f7]'>
      <Metadata title={metadata.title} description={metadata.description} /> 

      <Hero /> 
 
      {/* Little Information Section */}  
      <motion.section 
        initial={{opacity: 0, y: 100}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5, delay: 0.5}} 
        className='mt-10 py-10 px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {/* Support Card */}
          <div 
            className={`rounded-xl text-center shadow-md py-5 px-4 transition-all duration-300 ease-in-out h-full 
            ${isHoveredSupport ? 'bg-teal-600 shadow-xl' : 'bg-white'}`}
            onMouseEnter={() => setIsHoveredSupport(true)}
            onMouseLeave={() => setIsHoveredSupport(false)} 
          > 
            <div className="flex justify-center">
              <FontAwesomeIcon 
                icon={faHandshake} 
                className={`text-xl mb-4 mt-2 w-[50px] h-[50px] rounded-full p-4 transition-all duration-300 
                ${isHoveredSupport ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'}`} 
              />
            </div>
            <h1 className={`mb-4 text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-300 
              
            ${isHoveredSupport ? 'text-white' : 'text-black'}`}> 
              Support
            </h1>
            <p className={`mb-3 text-sm md:text-base px-3 transition-colors duration-300 
            ${isHoveredSupport ? 'text-white' : 'text-slate-700'}`}>
              Your support can transform lives! By donating through our application, you empower those in need and create lasting change 🫶🏽. Join us in making a difference today!
            </p>
          </div>

          {/* Education Card */}
          <div 
            className={`rounded-xl text-center shadow-md py-5 px-4 transition-all duration-300 ease-in-out h-full
            
            ${isHoveredEducation ? 'bg-teal-600 shadow-xl' : 'bg-white'}`}
            onMouseEnter={() => setIsHoveredEducation(true)}
            onMouseLeave={() => setIsHoveredEducation(false)} > 
            <div className="flex justify-center">
              <FontAwesomeIcon 
                icon={faGraduationCap} 
                className={`text-xl mb-4 mt-2 w-[50px] h-[50px] rounded-full p-4 transition-all duration-300 
                ${isHoveredEducation ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'}`} 
              />
            </div>
            <h1 className={`mb-4 text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-300 
            ${isHoveredEducation ? 'text-white' : 'text-black'}`}> 
              Education
            </h1>
            <p className={`mb-3 text-sm md:text-base px-3 transition-colors duration-300 
            ${isHoveredEducation ? 'text-white' : 'text-slate-700'}`}>
              Investing in education changes lives! Your donations provide essential resources and opportunities for those in need. Help us empower future generations 🏫 and create a brighter tomorrow!
            </p>
          </div>

          {/* Request Card */}
          <div 
            className={`rounded-xl text-center shadow-md py-5 px-4 transition-all duration-300 ease-in-out h-full 
            ${isHoveredRequest ? 'bg-teal-600 shadow-xl' : 'bg-white'}`}
            onMouseEnter={() => setIsHoveredRequest(true)}
            onMouseLeave={() => setIsHoveredRequest(false)} 
          > 
            <div className="flex justify-center">
              <FontAwesomeIcon 
                icon={faHandsHoldingChild} 
                className={`text-xl mb-4 mt-2 w-[50px] h-[50px] rounded-full p-4 transition-all duration-300 
                ${isHoveredRequest ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'}`} 
              />
            </div>
            <h1 className={`mb-4 text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-300 
            ${isHoveredRequest ? 'text-white' : 'text-black'}`}> 
              Request
            </h1>
            <p className={`mb-3 text-sm md:text-base px-3 transition-colors duration-300 
            ${isHoveredRequest ? 'text-white' : 'text-slate-700'}`}>
              ConnectAID encourages you to submit your valid requests for assistance. We ensure that your cry for assistance in a difficult situation 🥺 is put to rest. We're here to support you every step of the way!
            </p>
          </div>

          {/* Donations Card */}
          <div 
            className={`rounded-xl text-center shadow-md py-5 px-4 transition-all duration-300 ease-in-out h-full 
            ${isHoveredDonations ? 'bg-teal-600 shadow-xl' : 'bg-white'}`}
            onMouseEnter={() => setIsHoveredDonations(true)}
            onMouseLeave={() => setIsHoveredDonations(false)} 
          > 
            <div className="flex justify-center">
              <FontAwesomeIcon 
                icon={faDollarSign} 
                className={`text-xl mb-4 mt-2 w-[50px] h-[50px] rounded-full p-4 transition-all duration-300 
                ${isHoveredDonations ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'}`} 
              />
            </div>
            <h1 className={`mb-4 text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-300 
            ${isHoveredDonations ? 'text-white' : 'text-black'}`}> 
              Donations
            </h1>
            <p className={`mb-3 text-sm md:text-base px-3 transition-colors duration-300 
            ${isHoveredDonations ? 'text-white' : 'text-slate-700'}`}>
              Your donations make a real difference! By contributing, you help provide essential resources 💵 to those in need. Join us in spreading kindness and transforming lives today!
            </p>
          </div>
        </div>
      </motion.section>


      {/* Urgent Situations */}
      <Urgent />  

      {/* Urgent Situations */}
      <FAQs />  

    </main> 
  )
}

export default ConnectAID_App;