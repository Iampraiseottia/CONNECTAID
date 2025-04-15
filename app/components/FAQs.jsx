
"use client"

import {React, useRef, useEffect} from 'react'

import Image from 'next/image';

import faqImg from '/public/gallery/about-cover-2.png';

import { motion } from "motion/react"


const FAQs = () => {
  const faqImgRef = useRef(null);
  
  const handleMouseMove = (e, ref) => {
    if (!ref.current || window.innerWidth < 1100) return;  
    
    const rect = ref.current.getBoundingClientRect(); 
    
    // Calculate position as a value between 0 and 1
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const xPos = (x - 0.5) * 2;
    const yPos = (y - 0.5) * 2;
    
    const intensityFactor = 1.5;
    
    const edgeResponse = (val) => Math.sign(val) * Math.pow(Math.abs(val), intensityFactor);
    
    const tiltX = 20 * edgeResponse(yPos); 
    const tiltY = -20 * edgeResponse(xPos);
    
    const centerProximity = 1 - (Math.abs(xPos) + Math.abs(yPos)) / 2;
    const zoomFactor = 1 + (centerProximity * 0.05);
    
    ref.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${zoomFactor}, ${zoomFactor}, 1)`;
    
    ref.current.style.transition = `transform ${Math.abs(xPos) > 0.8 || Math.abs(yPos) > 0.8 ? '100ms' : '0ms'}`;
  };
  
  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    
    ref.current.style.transition = 'transform 300ms ease-out';
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };


  const detailsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (detailsRef[0].current){
      detailsRef[0].current.setAttribute('open', true);
    }
  }, []);

  const handleToggle = (clickedIndex) => {
    detailsRef.forEach((refs, index) =>{
      if (index !== clickedIndex && refs.current && refs.current.hasAttribute('open')){
        refs.current.removeAttribute('open');
      }
    })
  }


  return (
    <main className='mt-28 sm:mx-4 md:mx-8 lg:mx-20 xl:mx-40 pb-20 px-5'>
      <motion.h1 
        initial={{opacity: 0, y: 100}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5, delay: 0.5}} 
        className='font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 faq1'>
          Any Questions
      </motion.h1>

      <motion.p 
        initial={{opacity: 0, y: 100}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5, delay: 0.5}} 
        className='text-lg sm:text-xl mb-6 sm:mb-10 md:w-[60%] faq1'>
        When deciding which charity to donate to, it's important to do your search and find one that aligns with your values and interests. 
      </motion.p>

      <motion.div 
        initial={{opacity: 0, y: 100}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5, delay: 0.5}}  
        className='flex flex-col-reverse lg:flex-row' > 
        
        <div className='w-full lg:w-2/4 mb-10 md:mb-0 -mt-20 md:mt-5 faq1 transition-all ease-in-out'> 
          <details className='bg-white p-4 sm:p-6 leading-7 mb-2 faq2 faq2'
            ref={detailsRef[0]}
            onClick={() => handleToggle(0)}>
            <summary className='font-semibold text-lg sm:text-xl cursor-pointer'>
              What percentage of my donation goes directly to the cause?
            </summary>
            <p className='mt-2 ml-4 sm:ml-11 text-[18px]'>
              On average, 92% of donations made through our platform go directly to the charitable programs. We maintain a standard 5% platform fee to cover operational costs, payment processing, and security measures. The remaining 3% covers payment processing fees. However, you can always opt to cover these fees yourself, ensuring 100% of your intended donation reaches the charity.
            </p> 
          </details> 

          <details 
            className='bg-white p-4 sm:p-6 leading-7 mb-2 faq2 '
            ref={detailsRef[1]}
            onClick={() => handleToggle(1)}>
            <summary className='font-semibold text-lg sm:text-xl cursor-pointer'>
              How can I track the impact of my donations and volunteering?
            </summary>
            <p className='mt-2 ml-4 sm:ml-11 text-[18px]'>
              Our impact dashboard provides real-time updates on how your contributions are making a difference. For monetary donations, you'll receive impact reports showing exactly what your donation has funded.
            </p>
          </details>

          <details 
            className='bg-white p-4 sm:p-6 leading-7 mb-2 faq2 '
            ref={detailsRef[2]}
            onClick={() => handleToggle(2)}>
            <summary className='font-semibold text-lg sm:text-xl cursor-pointer'>
              Is my personal and payment information secure on your platform?
            </summary>
            <p className='mt-2 ml-4 sm:ml-11 text-[18px]'>
              Yes, we prioritize the security of your data. We employ bank-level encryption (256-bit SSL) for all transactions and personal information. We never store complete credit card information on our servers. Our platform undergoes regular security audits and penetration testing by independent cybersecurity firms. We're also compliant with GDPR, CCPA, and other privacy regulations to ensure your data is handled responsibly.
            </p>
          </details>

          <details 
            className='bg-white p-4 sm:p-6 leading-7 faq2'
            ref={detailsRef[3]}
            onClick={() => handleToggle(3)}>
            <summary className='font-semibold text-lg sm:text-xl cursor-pointer'>
              Can I create fundraising campaigns for important causes?
            </summary>
            <p className='mt-2 ml-4 sm:ml-11 text-[18px]'>
              Absolutely, you can create fundraising campaigns for a variety of important causes. Our platform allows you to personalize your campaign to reflect the cause. However, please note that all campaigns must be verified by our admins to ensure their legitimacy before they go live.
            </p>
          </details>
        </div>

        <div className='flex justify-center lg:-mt-36 lg:justify-start -mt-28 md:ml-10 faq3 lg:ml-20 xl:ml-36'
          ref={faqImgRef}
          onMouseMove={(e) => handleMouseMove(e, faqImgRef)}
          onMouseLeave={() => handleMouseLeave(faqImgRef)}>
          <div className='relative w-full max-w-md md:max-w-lg lg:max-w-xl'>
            <Image 
              src={faqImg} 
              className='w-[600px] h-[600px] object-contain' 
              alt="Frequently Asked Questions Image" 
            />
          </div>
        </div> 

      </motion.div> 

    </main>
  )
}

export default FAQs;
