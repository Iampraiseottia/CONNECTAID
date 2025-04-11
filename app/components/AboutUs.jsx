
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDollarToSlot, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

const AboutUs = () => {

    const [videoOverlay, setVideoOverlay] = useState(false);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mt-16">
          {/* Left Content Area */}
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0 leading-10">
            {/* Section Title */}
            <div className="mb-8">
              <span className="text-emerald-600 font-semibold text-2xl">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold pb-4 mt-2">We Are The Best, Efficient and Most Reliable Charity Organization</h2>
              <p className="text-gray-600 mb-5 text-[18px]">
              Here at ConnectAID, we are the Best 💯 Charity Organization out there. Our commitment to excellence drives us to deliver impactful solutions for those in need. We prioritize efficiency, ensuring that every donation reaches its intended purpose swiftly ✅.
              </p>
              <p className="text-gray-600 mb-5 text-[18px]">
              Reliability 🔥 is at the core of our mission. We maintain transparency and accountability 🔥, building trust with our donors and beneficiaries ✅. Together, we create a brighter future 🌟, one act of kindness at a time. 
              </p>
              <p className="text-gray-600 text-[18px]">
              Our dedicated team works tirelessly ❤️‍🔥 to identify, verify and address pressing community and personal issues. By leveraging resources effectively, we maximize the impact of our programs, fostering sustainable change and uplifting lives in the communities we serve.
              </p>
            </div>

            {/* Info Boxes */}
            <div className="space-y-6 mt-2">
              <div className="flex gap-5">
                <FontAwesomeIcon icon={faCircleDollarToSlot} 
                    className="bg-white rounded-full h-9 w-9 text-teal-500 flex items-center justify-center mt-2 flex-shrink-0"
                 />
                <div>
                  <h4 className="text-xl font-semibold">Donation</h4>
                  <p className="text-gray-600">Fund programs that help children escape poverty providing vocational training.</p>
                </div>
              </div>

              <div className="flex gap-5">
              <FontAwesomeIcon icon={faPeopleGroup} 
                    className="bg-white rounded-full h-9 w-9 text-teal-500 flex items-center justify-center mt-2 flex-shrink-0"
                />
                <div>
                  <h4 className="text-xl font-semibold">Campaigns</h4>
                  <p className="text-gray-600">Fund programs that help children escape poverty providing vocational training.</p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/about" className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-md inline-block font-medium transition duration-300">
                  Read More
                </Link>
              </div>
            </div>
          </div>

          {/* Right Images Area */}
          <div className="lg:w-5/12 relative w-full max-w-md md:max-w-lg lg:max-w-xl sm:mt-20 ">
                <Image 
                    src='/about/about-1.png' 
                    width={800}
                    height={800}
                    className=' object-contain' 
                    alt="Frequently Asked Questions Image" 
                />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
