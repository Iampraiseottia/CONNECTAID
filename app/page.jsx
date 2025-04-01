
import React from 'react'

import globalStyle from './globals.css'

import Navbar from './components/Navbar'

import Metadata from './components/Metadata'


const ConnectAID_App = () => {

  const metadata = {
    title: 'Njangi Web Application',
    description: 'An application created where members join, create, and manage njangi groups with others all over the world.',
  };

  return (
    <section className=''>
      <Metadata title={metadata.title} description={metadata.description} />

      <Navbar />
      
    </section>
  )
}

export default ConnectAID_App;