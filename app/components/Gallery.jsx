import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const Gallery = () => {
  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const logos = [
    { src: "/gallery/gallery-1.png", alt: "Gallery Image 1" },
    { src: "/gallery/gallery-2.png", alt: "Gallery Image 2" },
    { src: "/gallery/gallery-3.png", alt: "Gallery Image 3" },
    { src: "/gallery/gallery-4.png", alt: "Gallery Image 4" },
    { src: "/gallery/gallery-5.png", alt: "Gallery Image 5" },
    // { src: '/gallery/gallery-6.png', alt: 'Gallery Image 6' },
    { src: "/gallery/gallery-7.png", alt: "Gallery Image 7" },
    { src: "/gallery/gallery-8.png", alt: "Gallery Image 8" },
    { src: "/gallery/gallery-9.png", alt: "Gallery Image 9" },
    { src: "/gallery/gallery-10.png", alt: " Gallery Image 10" },
    { src: "/gallery/gallery-11.png", alt: "Gallery Image 11" },
    { src: "/gallery/gallery-12.png", alt: "Gallery Image 12" },
    { src: "/gallery/gallery-13.png", alt: "Gallery Image 13" },
    { src: "/gallery/gallery-15.png", alt: "Gallery Image 15" },
    { src: "/gallery/gallery-16.png", alt: "Gallery Image 16" },
    { src: "/gallery/gallery-17.png", alt: "Gallery Image 17" },
    { src: "/gallery/gallery-18.png", alt: " Gallery Image 18" },
    { src: "/gallery/gallery-19.png", alt: "Gallery Image 19" },
    { src: "/gallery/gallery-20.png", alt: "Gallery Image 20" },
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
