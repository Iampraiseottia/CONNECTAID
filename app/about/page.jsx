
import React from 'react'
import globalStyle from '../globals.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { motion } from "motion/react"

import Metadata from '../components/Metadata'



const Login = () => {

  const metadata = {
    title: 'About Us - ConnectAID Web Application',
    description: 'ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.',
  };


  return (
    <main className=''>

      <Metadata title={metadata.title} description={metadata.description} />

      <Navbar />

      <Footer />



    </main>
  )
}

export default Login; 
