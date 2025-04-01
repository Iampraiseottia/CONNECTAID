
import React from 'react'

import globalStyle from '../globals.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
  return (
    <div>Navbar <FontAwesomeIcon icon={faEnvelope} className='w-10 h-10 text-blue-600' /> </div> 
  )
}

export default Navbar;
