import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { motion } from "motion/react";

import galleryPic1 from "/public/gallery/water.png";
import galleryPic2 from "/public/gallery/training.png";
import galleryPic3 from "/public/gallery/suffering.png";
import galleryPic4 from "/public/gallery/pastevent.png";
import galleryPic5 from "/public/gallery/medicine2.png";
import galleryPic6 from "/public/gallery/food.jpg";
import galleryPic7 from "/public/gallery/education.png";
import galleryPic8 from "/public/gallery/donateList-1.png";
import galleryPic9 from "/public/gallery/africanchildren2.png";
import galleryPic10 from "/public/gallery/gallery-2.png";
import galleryPic11 from "/public/gallery/medicine.jpg";
import galleryPic12 from "/public/gallery/endHunger.png";
import galleryPic13 from "/public/gallery/donationList-2.png";
import galleryPic14 from "/public/gallery/gallery-3.png";
import galleryPic15 from "/public/urgent/urgent-2.png";
import galleryPic16 from "/public/urgent/urgent-1.png";
import galleryPic17 from "/public/urgent/urgent-6.png";
import galleryPic18 from "/public/gallery/gallery-11.png";
import galleryPic19 from "/public/blog/blog-13.png";
import galleryPic20 from "/public/gallery/Childfoodhelp.jpg";

const Gallery = () => {
  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const logos = [
    { src: galleryPic1, alt: "Gallery Image 1" },
    { src: galleryPic2, alt: "Gallery Image 2" },
    { src: galleryPic3, alt: "Gallery Image 3" },
    { src: galleryPic4, alt: "Gallery Image 4" },
    { src: galleryPic5, alt: "Gallery Image 5" },
    { src: galleryPic6, alt: "Gallery Image 6" },
    { src: galleryPic7, alt: "Gallery Image 7" },
    { src: galleryPic8, alt: "Gallery Image 8" },
    { src: galleryPic9, alt: "Gallery Image 9" },
    { src: galleryPic10, alt: "Gallery Image 10" },
    { src: galleryPic11, alt: "Gallery Image 11" },
    { src: galleryPic12, alt: "Gallery Image 12" },
    { src: galleryPic13, alt: "Gallery Image 13" },
    { src: galleryPic14, alt: "Gallery Image 14" },
    { src: galleryPic15, alt: "Gallery Image 15" },
    { src: galleryPic16, alt: "Gallery Image 16" },
    { src: galleryPic17, alt: "Gallery Image 17" },
    { src: galleryPic18, alt: "Gallery Image 18" },
    { src: galleryPic19, alt: "Gallery Image 19" },
    { src: galleryPic20, alt: "Gallery Image 20" },
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
      transition={{ duration: 0.3, delay: 0.3 }}
      className="w-full mr-40 bg-white pt-32 relative"
    >
      <div className="sm:w-[100%] w-full overflow-hidden">
        <div className="gallery-slider flex" ref={sliderRef}>
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="gallery-img flex-none bg-white px-4 transition-transform duration-300 hover:scale-[1.05] cursor-pointer"
            >
              <div className="h-60 w-96 relative -p-1 -m-1 ">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;
