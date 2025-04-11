"use client"

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'; 
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to determine if link is active
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <main className='min-h-[20%] w-full bg-slate-600'>  
      {/* Sticky Header */} 
      <nav className={`py-4 w-full z-50 transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 bg-white shadow-lg mb-96 ' : 'pt-6 md:pt-12 bg-white'}`}>
        <div className="container mx-[5%] mt-3 mb-3 header-mid px-4 sm:px-6 flex justify-between items-center"> 
          {/* Logo Section */}  
          <div className="flex items-center">
            <Link href="/">
                <div className="flex items-center cursor-pointer"> 
                <Image src="/icon/logo.png" alt="ConnectAID Logo" width={70} height={60}  className={`h-auto transition-all duration-300 ${isScrolled ? 'w-[50px] md:w-[70px]' : 'w-[60px] md:w-[90px]'}`} />
                <span className={`ml-2 md:ml-3 tracking-wide werey4 font-bold text-black transition-all duration-300 ${isScrolled ? 'text-xl md:text-3xl' : 'text-2xl md:text-4xl'}`}>ConnectAID</span>
              </div> 
            </Link>
          </div>
 
          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button  
              onClick={toggleMobileMenu}
              className="p-2 focus:outline-none text-teal-500 mr-4" 
            >
              {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div> 

          {/* Desktop Navigation  */}
          <div className="hidden xl:flex space-x-4 xl:space-x-9 ease-in-out duration-300">
            <Link 
              href="/" 
              className={`text-lg xl:text-xl font-semibold transition-colors duration-300 
              ${isActive('/') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-lg xl:text-xl font-semibold transition-colors duration-300 
              ${isActive('/about') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              About
            </Link>
            <Link 
              href="/donation" 
              className={`text-lg xl:text-xl font-semibold transition-colors duration-300
              ${isActive('/donation') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              Donation
            </Link>
            <Link 
              href="/blog" 
              className={`text-lg xl:text-xl font-semibold transition-colors duration-300 
              ${isActive('/blog') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              Events
            </Link>
            <div className="relative group z-10">
              <button className={`text-lg xl:text-xl ease-in-out duration-300 font-semibold flex items-center ${
                ['/pages/team', '/pages/gallery', '/login/user', '/login/admin', '/login/volunteer'].some(path => isActive(path)) 
                  ? 'text-teal-500' 
                  : 'text-black hover:text-teal-600'
              }`}>
                Pages <ChevronDown className="ml-1 w-4 h-4 xl:w-5 xl:h-5" />
              </button>
              <div className="absolute hidden bg-white w-60 border-t-2 border-t-teal-500 -ml-1 h-auto py-5 transition-all group-hover:block p-2 rounded shadow-lg">
                <Link 
                  href="/pages/team" 
                  className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                    isActive('/pages/team') ? 'text-teal-600' : 'text-slate-800'
                  }`}
                >
                  Blog
                </Link>
                <Link 
                  href="/blog" 
                  className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                    isActive('/blog') && pathname !== '/blog' ? 'text-teal-600' : 'text-slate-800'
                  }`}
                >
                  FAQs
                </Link>
                <Link 
                  href="/pages/gallery" 
                  className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                    isActive('/pages/gallery') ? 'text-teal-600' : 'text-slate-800'
                  }`}
                >
                  Event Details
                </Link>
                {/* Nested dropdown for Login */}
                <div className="relative group/login">
                  <div className={`py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide flex justify-between items-center cursor-pointer ${
                    ['/login/user', '/login/admin', '/login/volunteer'].some(path => isActive(path)) ? 'text-teal-600' : 'text-slate-800'
                  }`}>
                    <p>Login</p>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <div className="absolute left-full top-0 hidden bg-white w-60 border-l-2 border-t-2 border-l-teal-500 border-t-teal-500 h-auto py-5 transition-all group-hover/login:block p-2 rounded shadow-lg">
                    <Link 
                      href="/login/user" 
                      className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                        isActive('/login/user') ? 'text-teal-600' : 'text-slate-800'
                      }`}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/login/admin" 
                      className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                        isActive('/login/admin') ? 'text-teal-600' : 'text-slate-800'
                      }`}
                    >
                      Registration
                    </Link>
                    <Link 
                      href="/login/volunteer" 
                      className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                        isActive('/login/volunteer') ? 'text-teal-600' : 'text-slate-800'
                      }`}
                    >
                      Forgot Password
                    </Link>
                  </div>
                </div>
                <Link 
                  href="/pages/blog-details" 
                  className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                    isActive('/pages/blog-details') ? 'text-teal-600' : 'text-slate-800'
                  }`}
                >
                  Blog Details
                </Link>
                <Link 
                  href="/pages/privacy-policy" 
                  className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                    isActive('/pages/privacy-policy') ? 'text-teal-600' : 'text-slate-800'
                  }`}
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/pages/terms-condition" 
                  className={`block py-2 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide ${
                    isActive('/pages/terms-condition') ? 'text-teal-600' : 'text-slate-800'
                  }`}
                >
                  Terms-Condition
                </Link>
              </div>
            </div>
            
            <Link 
              href="/contact" 
              className={`text-lg xl:text-xl font-semibold transition-colors duration-300 
              ${isActive('/contact') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Section - Donate Button & Language */}  
          <div className="hidden xl:flex items-center space-x-3 xl:space-x-5 -mr-40 header-mid2">
            <div className="relative group">
              <button className="flex items-center hover:text-teal-400 text-black text-sm xl:text-base">
                Eng <span className="ml-1">▼</span>
              </button> 
              <div className="absolute bg-white hidden group-hover:block p-2 rounded shadow-lg right-0">
                <button className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">English</button>
                <button className="block py-2 text-slate-800 pl-2 ease-in-out duration-200 text-[16px] xl:text-[18px] hover:text-lg xl:hover:text-xl hover:text-teal-600 font-semibold tracking-wide">French</button>
              </div>
            </div>
            <Link href="/donate" className={`bg-teal-600 text-white font-bold ease-in-out cursor-pointer rounded hover:rounded-3xl  hover:bg-transparent hover:border-2 hover:border-teal-500 hover:text-teal-600  transition duration-300 ${isScrolled ? 'py-3 px-4 xl:py-3 xl:px-7 text-sm xl:text-base' : 'py-3 px-4 xl:py-4 xl:px-9 text-sm xl:text-base'}`}>
              DONATE NOW
            </Link>
          </div>
        </div> 
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`xl:hidden bg-white p-4 z-50 w-full ${isScrolled ? 'fixed top-16' : 'absolute'}`}> 
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`text-xl font-semibold 
              ${isActive('/') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-xl font-semibold 
              ${isActive('/about') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              About
            </Link>
            <Link 
              href="/donation" 
              className={`text-xl font-semibold 
              ${isActive('/donation') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              Donation
            </Link>
            <Link 
              href="/blog" 
              className={`text-xl font-semibold 
              ${isActive('/blog') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
            >
              Events
            </Link>
            
            <div className="relative">
              <button 
                onClick={() => document.getElementById('mobilePages').classList.toggle('hidden')}
                className={`text-xl font-semibold flex items-center justify-between w-full ${
                  ['/pages/team', '/pages/gallery', '/login/user', '/login/admin', '/login/volunteer', '/pages/blog-details', '/pages/privacy-policy', '/pages/terms-condition'].some(path => isActive(path)) 
                    ? 'text-teal-500' 
                    : 'text-black hover:text-teal-600'
                }`}
              >
                Pages <ChevronDown className="ml-1 w-5 h-5" />
              </button>
              <div id="mobilePages" className="hidden bg-gray-100 mt-2 p-2 rounded">
                <Link 
                  href="/pages/team" 
                  className={`block py-2 
                  ${isActive('/pages/team') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                >
                  Blog
                </Link>
                <Link 
                  href="/pages/gallery" 
                  className={`block py-2 
                  ${isActive('/pages/gallery') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                >
                  Event Details
                </Link>
                <Link 
                  href="/blog" 
                  className={`block py-2 
                  ${isActive('/blog') && pathname !== '/blog' ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                >
                  FAQs
                </Link> 
                
                <div className="relative">
                  <button 
                    onClick={() => document.getElementById('mobileLogin').classList.toggle('hidden')}
                    className={`py-2 flex items-center justify-between w-full ${
                      ['/login/user', '/login/admin', '/login/volunteer'].some(path => isActive(path)) 
                      ? 'text-teal-500' 
                      : 'text-black hover:text-teal-600'
                    }`}
                  >
                    Login <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                  <div id="mobileLogin" className="hidden bg-gray-200 mt-1 p-2 rounded ml-4">
                    <Link 
                      href="/login/user" 
                      className={`block py-2 
                      ${isActive('/login/user') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/login/admin" 
                      className={`block py-2 
                      ${isActive('/login/admin') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                    >
                      Registration
                    </Link>
                    <Link 
                      href="/login/volunteer" 
                      className={`block py-2 
                      ${isActive('/login/volunteer') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                    >
                      Forgot Password
                    </Link>
                  </div>
                </div>
                
                <Link 
                  href="/pages/blog-details" 
                  className={`block py-2 
                  ${isActive('/pages/blog-details') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                >
                  Blog Details
                </Link>
                <Link 
                  href="/pages/privacy-policy" 
                  className={`block py-2 
                  ${isActive('/pages/privacy-policy') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/pages/terms-condition" 
                  className={`block py-2 
                  ${isActive('/pages/terms-condition') ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
                >
                  Terms-Condition
                </Link>
              </div>
            </div>
            
            <Link 
              href="/contact" 
              className={`text-xl font-semibold 
              ${isActive('/contact') ? 'text-teal-500' : 'text-black hover:text-yellow-400'}`}
            >
              Contact
            </Link>
            
            <div className="flex items-center justify-between mt-4">
              <div className="relative group">
                <button  
                  onClick={() => document.getElementById('mobileLang').classList.toggle('hidden')}
                  className="flex items-center hover:text-yellow-400 text-black"
                >
                  Eng <span className="ml-1">▼</span>
                </button>
                <div id="mobileLang" className="hidden bg-gray-100 mt-1 p-2 rounded">
                  <button className="block py-2 text-black hover:text-teal-600">English</button>
                  <button className="block py-2 text-black hover:text-teal-600">French</button>
                </div>
              </div>
              <Link href="/donate" className="bg-teal-600 text-white font-bold py-2 px-6 hover:text-white hover:bg-teal-500 rounded transition duration-300">
                DONATE NOW
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Navbar;