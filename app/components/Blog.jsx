import BlogCard from "../components/BlogCard";

import { motion } from "motion/react";

const Blog = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-block text-emerald-600 font-semibold mb-2">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Our Blog & Feeds</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="w-full">
            <BlogCard
              imageSrc="/gallery/event-6.png"
              date="20 Jun 2024"
              title="Empowering Futures Through Accessible Education for All"
              linkBlog="/blog-details-1"
              excerpt="Education transforms lives, fostering opportunities and breaking barriers for under-served communities worldwide."
            />
          </div>
          <div className="w-full my-5 sm:my-0">
            <BlogCard
              linkBlog="/blog-details-2"
              imageSrc="/blog/blog-6.png"
              date="09 Nov 2024"
              title="Transforming Lives Through Accessible Medical Care"
              excerpt="Medicine saves lives, promotes health, and ensures equitable access for all communities in need."
            />
          </div>
          <div className="w-full">
            <BlogCard
              linkBlog="/blog-details-3"
              imageSrc="/blog/blog-5.png"
              date="04 Apr 2025"
              title="Nourishing Communities: The Power of Good and Quality Food"
              excerpt="Food sustains life, fosters community, and combats hunger for a healthier, more equitable world."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
