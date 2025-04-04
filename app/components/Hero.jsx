
"use client"

import Image from 'next/image';
import Link from 'next/link';

import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'; 

import { useRef, useState, useEffect } from 'react';

import { motion } from "motion/react"


const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const firstImageRef = useRef(null);
  const secondImageRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1240 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);
  
  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleMouseMove = (e, ref) => {
    if (!ref.current || window.innerWidth < 1100) return;  
    
    const rect = ref.current.getBoundingClientRect(); 
    
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const tiltX = 10 * (0.5 - y);
    const tiltY = -10 * (0.5 - x);
    
    ref.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.00, 1.00, 1.00)`; 
  };
  
  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div 
      initial={{opacity: 0, y: 100}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 0.5, delay: 0.5}} 
      className="min-h-[60vh] sm:min-h-[97vh] werey relative bg-gray-950 text-white w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/hero-bg.png"
          alt="Background" 
          fill 
          style={{objectFit: 'cover'}}
          quality={100}   
          className="opacity-20"
          priority 
        />
      </div>
      
      <div className="relative z-10">
        {/* Sticky Header */} 
        <nav className={`py-4 w-full z-50 transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 bg-gray-950 bg-opacity-85 shadow-lg py-7 ' : 'pt-6 md:pt-12'}`}>
          <div className="container mx-[5%] header-mid px-4 sm:px-6 flex justify-between items-center"> 
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Image src="/logo.png" alt="ConnectAID Logo" width={70} height={60} className={`h-auto transition-all duration-300 ${isScrolled ? 'w-[50px] md:w-[70px]' : 'w-[60px] md:w-[90px]'}`} />
                  <span className={`ml-2 md:ml-3 tracking-wide werey4 font-bold transition-all duration-300 ${isScrolled ? 'text-xl md:text-3xl' : 'text-2xl md:text-4xl'}`}>ConnectAID</span>
                </div>
              </Link>
            </div> 

            {/* Mobile Menu Button  */}
            <div className="xl:hidden">
              <button 
                onClick={toggleMobileMenu} 
                className="p-2 focus:outline-none text-teal-500 mr-4"
              >
                {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div> 

            {/* Desktop Navigation - Hidden until >= 1240px */}
            <div className="hidden xl:flex space-x-4 xl:space-x-9 ease-in-out duration-300">
              <Link href="/" className="text-yellow-500 text-lg xl:text-xl font-semibold">Home</Link>
              <Link href="/about" className="hover:text-yellow-500 text-white text-lg xl:text-xl font-semibold">About</Link>
              <Link href="/donation" className="hover:text-yellow-500 text-white text-lg xl:text-xl font-semibold">Donation</Link>
              <Link href="/blog" className="hover:text-yellow-500 text-white text-lg xl:text-xl font-semibold">Events</Link>
              <div className="relative group z-10">
                <button className="hover:text-yellow-500 text-white text-lg xl:text-xl ease-in-out duration-300 font-semibold flex items-center">
                  Pages <ChevronDown className="ml-1 w-4 h-4 xl:w-5 xl:h-5" />
                </button>
                <div className="absolute hidden bg-white w-60 border-t-2 border-t-teal-500 -ml-1 h-auto py-5 transition-all group-hover:block p-2 rounded shadow-lg">
                  <Link href="/pages/team" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Blog
                  </Link>
                  <Link href="/pages/team" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    FAQs
                  </Link>
                  <Link href="/pages/gallery" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Event Details
                  </Link>
                  {/* Nested dropdown for Login */}
                  <div className="relative group/login">
                    <div className="py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide flex justify-between items-center cursor-pointer">
                      <p>Login</p>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <div className="absolute left-full top-0 hidden bg-white w-60 border-l-2 border-t-2 border-l-teal-500 border-t-teal-500 h-auto py-5 transition-all group-hover/login:block p-2 rounded shadow-lg">
                      <Link href="/login/user" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                        Login
                      </Link>
                      <Link href="/login/admin" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                        Registration
                      </Link>
                      <Link href="/login/volunteer" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                  <Link href="/pages/team" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Blog Details
                  </Link>
                  <Link href="/pages/gallery" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Privacy Policy
                  </Link>
                  <Link href="/pages/events" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Terms-Condition
                  </Link>
                </div>
              </div>
              
              <Link href="/contact" className="hover:text-yellow-400 text-white text-lg xl:text-xl font-semibold">Contact</Link>
            </div>

            {/* Desktop Right Section - Donate Button & Language */}
            <div className="hidden xl:flex items-center space-x-3 xl:space-x-5 -mr-40 header-mid2">
              <div className="relative group">
                <button className="flex items-center hover:text-yellow-400 text-sm xl:text-base">
                  Eng <span className="ml-1">▼</span>
                </button>
                <div className="absolute bg-white hidden group-hover:block p-2 rounded shadow-lg right-0">
                  <button className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">English</button>
                  <button className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">French</button>
                </div>
              </div>
              <Link href="/donate" className={`bg-white text-black font-bold ease-in-out cursor-pointer rounded hover:rounded-3xl hover:text-[lightseagreen] hover:bg-yellow-300 transition duration-300 ${isScrolled ? 'py-2 px-4 xl:py-3 xl:px-7 text-sm xl:text-base' : 'py-2 px-4 xl:py-4 xl:px-9 text-sm xl:text-base'}`}>
                DONATE NOW
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Display on top of the hero content until 1240px */}
        {mobileMenuOpen && (
          <div className={`xl:hidden bg-gray-900 p-4 z-50 w-full ${isScrolled ? 'fixed top-16' : 'absolute'}`}>
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-yellow-500 text-xl font-semibold">Home</Link>
              <Link href="/about" className="hover:text-yellow-500 text-white text-xl font-semibold">About</Link>
              <Link href="/donation" className="hover:text-yellow-500 text-white text-xl font-semibold">Donation</Link>
              <Link href="/blog" className="hover:text-yellow-500 text-white text-xl font-semibold">Events</Link>
              
              <div className="relative">
                <button 
                  onClick={() => document.getElementById('mobilePages').classList.toggle('hidden')}
                  className="hover:text-yellow-500 text-white text-xl font-semibold flex items-center justify-between w-full"
                >
                  Pages <ChevronDown className="ml-1 w-5 h-5" />
                </button>
                <div id="mobilePages" className="hidden bg-gray-800 mt-2 p-2 rounded">
                  <Link href="/pages/team" className="block py-2 text-white hover:text-yellow-500">Blog</Link>
                  <Link href="/pages/gallery" className="block py-2 text-white hover:text-yellow-500">Event Details</Link>
                  <Link href="/blog" className="block py-2 text-white hover:text-yellow-500">FAQs</Link> 
                  
                  <div className="relative">
                    <button 
                      onClick={() => document.getElementById('mobileLogin').classList.toggle('hidden')}
                      className="py-2 text-white hover:text-yellow-500 flex items-center justify-between w-full"
                    >
                      Login <ChevronRight className="ml-1 w-4 h-4" />
                    </button>
                    <div id="mobileLogin" className="hidden bg-gray-700 mt-1 p-2 rounded ml-4">
                      <Link href="/login" className="block py-2 text-white hover:text-yellow-500">Login</Link>
                      <Link href="/register" className="block py-2 text-white hover:text-yellow-500">Registration</Link>
                      <Link href="/forgot_password" className="block py-2 text-white hover:text-yellow-500">Forgot Password</Link>
                    </div>
                  </div>
                  
                  <Link href="/pages/team" className="block py-2 text-white hover:text-yellow-500">Blog Details</Link>
                  <Link href="/pages/gallery" className="block py-2 text-white hover:text-yellow-500">Privacy Policy</Link>
                  <Link href="/pages/events" className="block py-2 text-white hover:text-yellow-500">Terms-Condition</Link>
                </div>
              </div>
              
              <Link href="/contact" className="hover:text-yellow-400 text-white text-xl font-semibold">Contact</Link>
              
              <div className="flex items-center justify-between mt-4">
                <div className="relative group">
                  <button  
                    onClick={() => document.getElementById('mobileLang').classList.toggle('hidden')}
                    className="flex items-center hover:text-yellow-400"
                  >
                    Eng <span className="ml-1">▼</span>
                  </button>
                  <div id="mobileLang" className="hidden bg-gray-800 mt-1 p-2 rounded">
                    <button className="block py-2 text-white hover:text-yellow-500">English</button>
                    <button className="block py-2 text-white hover:text-yellow-500">French</button>
                  </div>
                </div>
                <Link href="/donate" className="bg-white text-black font-bold py-2 px-6 hover:text-[lightseagreen] rounded hover:bg-yellow-300 transition duration-300">
                  DONATE NOW
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Hero Content */}
        <div className={`container hero-mid ml-[5%] px-4 sm:px-6 py-8 md:py-16 lg:py-24 flex flex-col md:flex-row justify-between items-center ${isScrolled ? 'mt-24' : 'mt-16'}`}> 
          {/* Text Content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0 -mt-10 sm:-mt-5"> 
            <p className="text-yellow-500 text-xl md:text-2xl mb-4 md:mb-8 font-semibold">Speak Hope for the Homeless</p>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-10">
              Donate to children & senior citizens
            </h1>
            
            <p className="text-gray-300 mb-8 md:mb-10 text-base md:text-lg max-w-2xl mr-2">
              Involves donating one's body after death for medical research, education, or
              anatomical dissection. Body donation plays a crucial role in advancing medical
              science
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/donate" className="bg-teal-600 font-semibold border border-teal-600 hover:bg-teal-700 text-white text-base md:text-xl cursor-pointer ease-in-out duration-300 py-2 px-8 md:py-3 md:px-14 rounded-full transition">
                Donate Now
              </Link>
              <Link href="/register" className="bg-transparent font-semibold border border-teal-600 hover:opacity-80 text-white text-base md:text-xl cursor-pointer ease-in-out duration-300 py-2 px-8 md:py-3 md:px-14 rounded-full transition">
                Join ConnectAID
              </Link>
            </div>
          </div>

          {/* Image Cards - Hidden on small screens, visible from medium screens up */}
          <div className="hidden md:flex flex-col md:flex-row flex-wrap gap-4 lg:gap-6 justify-center md:justify-end md:w-1/2">
            <div 
              ref={firstImageRef}
              className="relative w-[180px] h-[300px] lg:w-[250px] lg:h-[410px] overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-out werey2" 
              onMouseMove={(e) => handleMouseMove(e, firstImageRef)}
              onMouseLeave={() => handleMouseLeave(firstImageRef)} 
            > 
              <Image
                src="/hero/hero-2.png"
                alt="Children in need"
                fill
                priority
              />
            </div>
            <div 
              ref={secondImageRef}
              className="relative w-[220px] h-[400px] lg:w-[320px] lg:h-[540px] -mt-10 lg:-mt-20 overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-out werey5"
              onMouseMove={(e) => handleMouseMove(e, secondImageRef)} 
              onMouseLeave={() => handleMouseLeave(secondImageRef)} 
            >
              <Image
                src="/hero/hero-3.png"
                alt="Child smiling"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;
