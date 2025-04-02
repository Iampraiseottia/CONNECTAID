
"use client"

import Image from 'next/image';
import Link from 'next/link';

import globalStyle from '../globals.css'

import { ChevronDown, ChevronRight } from 'lucide-react'; 

import { useRef } from 'react';

const Hero = () => {


  const firstImageRef = useRef(null);
  const secondImageRef = useRef(null);
  
  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    
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



  return (
    <div className="min-h-screen relative bg-gray-950 text-white w-full">

      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/hero-bg.png"
          alt="Background" 
          layout="fill" 
          style={{objectFit: 'cover'}}
          quality={100}  
          className="opacity-20"
        />
      </div>
      
      <div className="relative z-10">
        {/*ConnectAID Home Page Header */} 
        <nav className="py-4 pt-12">
          <div className="container px-4 ml-[5%] flex justify-between items-center"> 
            {/* ConnectAID Logo Section */} 
            <div className="flex items-center">
              <Link href="/home">
                <div className="flex items-center cursor-pointer">
                  <Image src="/logo.png" alt="ConnectAID Logo" width={90} height={80} />
                  <span className="ml-3 tracking-wide text-4xl font-bold">ConnectAID</span>
                </div>
              </Link>
            </div>

            {/* ConnectAID Navigation Links Section */}
            <div className="md:flex space-x-9 ease-in-out duration-300">
              <Link href="/home" className="text-yellow-500 text-xl font-semibold">Home</Link>
              <Link href="/about" className="hover:text-yellow-500 text-white text-xl font-semibold">About</Link>
              <Link href="/donation" className="hover:text-yellow-500 text-white text-xl font-semibold">Donation</Link>
              <Link href="/blog" className="hover:text-yellow-500 text-white text-xl font-semibold">Events</Link>
              <div className="relative group z-10">
                <button className="hover:text-yellow-500 text-white text-xl ease-in-out duration-300 font-semibold flex items-center">
                  Pages <ChevronDown className="ml-1 w-5 h-5" />
                </button>
                <div className="absolute hidden bg-white w-60 border-t-2 border-t-teal-500 -ml-1 h-auto py-5 transition-all group-hover:block p-2 rounded shadow-lg">
                  <Link href="/pages/team" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Blog
                  </Link>
                  <Link href="/pages/gallery" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Event Details
                  </Link>
                  {/* Nested dropdown for Login */}
                  <div className="relative group/login">
                    <div className="py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide flex justify-between items-center cursor-pointer">
                      <p>Login</p>
                      <ChevronRight />
                    </div>
                    <div className="absolute left-full top-0 hidden bg-white w-60 border-l-2 border-t-2 border-l-teal-500 border-t-teal-500 h-auto py-5 transition-all group-hover/login:block p-2 rounded shadow-lg">
                      <Link href="/login/user" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                        User Login
                      </Link>
                      <Link href="/login/admin" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                        Admin Login
                      </Link>
                      <Link href="/login/volunteer" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                        Volunteer Login
                      </Link>
                    </div>
                  </div>
                  <Link href="/pages/team" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Blog Details
                  </Link>
                  <Link href="/pages/gallery" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Privacy Policy
                  </Link>
                  <Link href="/pages/events" className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">
                    Terms-Condition
                  </Link>
                </div>
              </div>
              <Link href="/blog" className="hover:text-yellow-500 text-white text-xl font-semibold">FAQs</Link>
              <Link href="/contact" className="hover:text-yellow-400 text-white text-xl font-semibold">Contact</Link>
            </div>

            {/* ConnectAID Right Section - Useful Button Area */}
            <div className="flex items-center space-x-5 -mr-40">
              
              <div className="relative group">
                <button className="flex items-center hover:text-yellow-400">
                  Eng <span className="ml-1">▼</span>
                </button>
                <div className="absolute bg-white hidden group-hover:block p-2 rounded shadow-lg right-0">
                  <button className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">English</button>
                  <button className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[18px] hover:text-xl hover:text-teal-600 font-semibold tracking-wide">French</button>
                </div>
              </div>
              <Link href="/donate" className="bg-white text-black font-bold ease-in-out cursor-pointer py-4 px-9 hover:rounded-3xl hover:text-[lightseagreen] rounded hover:bg-yellow-300 transition duration-300">
                DONATE NOW
              </Link>
            </div>
          </div>
        </nav>


        {/*Main Section - Hero Content */}
        <div className="container ml-[1%] px-4 py-24 mt-10 leading-10 flex justify-evenly items-center flex-col md:flex-row"> 
          
          <div  className="">
            <p className="text-yellow-500 text-2xl  mb-8 font-semibold">Speak Hope for the Homeless</p>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-10 max-w-2xl">
              Donate to children & senior citizens
            </h1>
            
            <p className="text-gray-300 max-w-2xl mb-10 text-lg">
              Involves donating one's body after death for medical research, education, or
              anatomical dissection. Body donation plays a crucial role in advancing medical
              science
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/donate" className="bg-teal-600 font-semibold border border-teal-600 hover:bg-teal-700 text-white text-xl cursor-pointer ease-in-out duration-300 py-3 px-14 rounded-full transition ">
                Donate Now
              </Link>
              <Link href="/register" className="bg-transparent font-semibold border border-teal-600 hover:opacity-80 text-white text-xl cursor-pointer ease-in-out duration-300 py-3 px-14 rounded-full transition">
                Join ConnectAID
              </Link>
            </div>
            
          </div>

          {/* Image Cards */}
          <div className="mt-16 flex flex-wrap gap-6 justify-end ml-24 -mr-40">
            <div 
              ref={firstImageRef}
              className="relative w-[250px] h-[410px] overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-out" 
              onMouseMove={(e) => handleMouseMove(e, firstImageRef)}
              onMouseLeave={() => handleMouseLeave(firstImageRef)} > 
              <Image
                src="/hero/hero-2.png"
                alt="Children in need"
                fill
                priority
              />
            </div>
            <div 
              ref={secondImageRef}
              className="relative w-[320px] h-[540px] -mt-20 overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-out"
              onMouseMove={(e) => handleMouseMove(e, secondImageRef)} 
              onMouseLeave={() => handleMouseLeave(secondImageRef)} >
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
    </div>
  );
}

export default Hero;
