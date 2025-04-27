import BlogCard from "../components/BlogCard";

import { motion } from "motion/react";

const Upcoming = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-block text-emerald-600 text-3xl font-semibold mb-6 sm:text-5xl">
            Upcoming Events
          </span>
          <h2 className="text-2xl md:text-4xl font-bold sm:-ml-[150px] sm:-mr-[130px]">
            Join us to make a difference 🔥, one event at a time!
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20"
        >
          <div className="w-full">
            <BlogCard
              linkBlog="/upcoming-event-details-2"
              imageSrc="/gallery/donateList-1.png"
              date="15 June 2025"
              title="Hope for the Homeless: Compassion / Provide Home for the Homeless"
              excerpt="Together, we can change lives! Your generous donations will provide shelter, food, and support for those in need. Join us in this vital mission to end homelessness."
            />
          </div>
          <div className="w-full my-5 sm:my-0">
            <BlogCard
              imageSrc="/gallery/donationList-2.png"
              date="20 Aug 2025"
              title="Empowering Future Generations: Access to Clean Water for Children"
              linkBlog="/upcoming-event-details-1"
              excerpt="It focuses on providing clean water access, essential for children's health and education, ensuring a sustainable future. Join us in making a vital impact!"
            /> 
          </div>
          
          <div className="w-full">
            <BlogCard
              linkBlog="/upcoming-event-details-3"
              imageSrc="/blog/blog-5.png"
              date="13 Oct 2025"
              title="Stand Together for Change: Aid Those in Extreme Cases of Need!"
              excerpt="Your donations can transform lives! Help us provide critical resources and support for individuals facing extreme cases and have given up on life. Join us in making a lasting impact!."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Upcoming;
