
import BlogCard from '../components/BlogCard'

import { motion } from "motion/react"


const Blog = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        
        <motion.div 
            initial={{opacity: 0, y: 100}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: 0.5}} 
            className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-emerald-600 font-semibold mb-2">Blog</span>
          <h2 className="text-3xl md:text-4xl font-bold">Our Blog & Feeds</h2>
        </motion.div>
        
       
        <motion.div 
            initial={{opacity: 0, y: 100}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: 0.5}} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full">
            <BlogCard 
                imageSrc="/blog/blog-4.png"
                date="30 Jun 2023"
                title="Donate Your Money For Africa Poor Child."
                linkBlog="/blog-details-1"
                excerpt="We understand that there are many people organization The seeking support,"
            />
          </div>
          <div className="w-full my-5 sm:my-0">
            <BlogCard  
                linkBlog="/blog-details-2"
                imageSrc="/blog/blog-6.png"
                date="30 Jun 2023"
                title="Donate Your Money For Africa Poor Child."
                excerpt="We understand that there are many people organization The seeking support,"
            />
          </div>
          <div className="w-full"> 
            <BlogCard 
                linkBlog="/blog-details-3"
                imageSrc="/blog/blog-5.png"
                date="30 Jun 2023"
                title="Donate Your Money For Africa Poor Child."
                excerpt="We understand that there are many people organization The seeking support," 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;