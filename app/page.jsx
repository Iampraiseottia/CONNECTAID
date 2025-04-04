
import React from 'react'

import globalStyle from './globals.css'

import Hero from './components/Hero'
// import Navbar from './components/Navbar'

import Metadata from './components/Metadata'


const ConnectAID_App = () => {

  const metadata = {
    title: 'ConnectAID Web Application',
    description: 'ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.',
  };

  return (
    <section className=''>
      <Metadata title={metadata.title} description={metadata.description} />

      <Hero />

      {/* <Navbar /> */}

      
    </section> 
  )
}

export default ConnectAID_App;