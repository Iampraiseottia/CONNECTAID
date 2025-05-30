import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "motion/react";

const Partners = () => {
  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const logos = [
    { src: "/partners/brand-1.png", alt: "Brand Logo 1" },
    { src: "/partners/brand-2.png", alt: "Brand Logo 2" },
    { src: "/partners/brand-3.png", alt: "Brand Logo 3" },
    { src: "/partners/brand-4.png", alt: "SBrand Logo 4" },
  ];

  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const slider = sliderRef.current;
    let slideInterval;

    const startSliding = () => {
      slideInterval = setInterval(() => {
        if (!isAnimating && slider) {
          setIsAnimating(true);

          const firstItem = slider.querySelector(".gallery-img");
          const itemWidth = firstItem ? firstItem.offsetWidth : 0;

          slider.style.transition = "transform 1s ease-in-out";
          slider.style.transform = `translateX(-${itemWidth}px)`;

          setTimeout(() => {
            slider.style.transition = "none";
            slider.style.transform = "translateX(0)";

            if (slider.firstChild) {
              slider.appendChild(slider.firstChild);
            }

            setIsAnimating(false);
          }, 1000);
        }
      }, 1200);
    };

    startSliding();

    return () => {
      clearInterval(slideInterval);
    };
  }, [isAnimating]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full py-10 sm:pt-24 sm:pb-20 sm:px-40 mr-40 bg-white relative"
    >
      <div className="sm:w-[100%] w-full overflow-hidden bg-white border-gray-50 border-solid border-2">
        <div
          className="gallery-slider flex items-center justify-center"
          ref={sliderRef}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="gallery-img flex-none px-8 py-4 ">
              <div className="h-16 w-36 relative">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill={true}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Partners;
