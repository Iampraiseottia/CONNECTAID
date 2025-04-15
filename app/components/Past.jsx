
import BlogCard from '../components/BlogCard'

import { motion } from "motion/react"


const Past = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        
        <motion.div 
            initial={{opacity: 0, y: 100}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: 0.5}}
            className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-emerald-600 text-3xl font-semibold mb-6 sm:text-5xl">Past Events</span>
          <h2 className="text-2xl md:text-4xl font-bold sm:-ml-[150px] sm:-mr-[130px]">Together, we changed lives 📈 and created lasting memories 🔥!</h2>
        </motion.div>
      

        <motion.div 
            initial={{opacity: 0, y: 100}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: 0.5}}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          <div className="w-full"> 
            <BlogCard 
              imageSrc="/gallery/gallery-20.png"
              date="03 Sept 2024"
              title="Empowering Futures Through Accessible Education for All"
              linkBlog="/past-event-details-1"
              excerpt="Through your donations, we provided educational resources and support, empowering underprivileged children and fostering a brighter future through enhanced access to quality education."
            />
          </div>
          <div className="w-full my-5 sm:my-0">
            <BlogCard  
              linkBlog="/past-event-details-2"
              imageSrc="/gallery/gallery-11.png"
              date="09 Nov 2024"
              title="Quality Medicine: Empowering a Healthier Community "
              excerpt="Your generous donations enabled us to deliver essential medical care and education, empowering underprivileged persons and communities and ensuring their well-being and good way of living."
            />
          </div>
          <div className="w-full"> 
            <BlogCard 
                linkBlog="/past-event-details-3" 
                imageSrc="/gallery/gallery-13.png"
                date="24 Feb 2025"
                title="Nourished Communities: The Power of Good Food"
                excerpt="Your generous donations provided essential nutrition resources, empowering underprivileged and ensuring their growth through improved access to quality food and healthy meals." 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Past;
