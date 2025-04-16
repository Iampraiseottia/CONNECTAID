
import Image from 'next/image';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faComment, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const BlogCard = ({ imageSrc, date, title, excerpt, linkBlog }) => {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:translate-y-[-5px]">
      <div className="relative">
        <Link href={linkBlog}>
          <div className="relative h-[340px] sm:h-[450px] w-full">
            <Image 
              src={imageSrc} 
              alt={title}
              fill
              className="object-cover hover:scale-105 ease-in-out"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        </Link>
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-emerald-600 text-white p-2 text-center rounded">
          <p className="text-sm font-medium">
            {date.split(' ')[0]} {date.split(' ')[1]} <br />
            {date.split(' ')[2]}
          </p>
        </div>
        
        {/* Overlay info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-4 mb-5 items-center">
            <div className="flex gap-2 items-center text-white">
              <FontAwesomeIcon icon={faUser } className="w-4 h-4" />
              <p className="text-sm">By: admin</p>
            </div>
            <div className="flex gap-2 items-center text-white">
              <FontAwesomeIcon icon={faComment} className="w-4 h-4" />
              <p className="text-sm">Donation</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5 leading-8">
        <div className="flex flex-col">
          <h4 className="text-xl font-bold sm:mt-5 mb-2 hover:text-emerald-600 transition-colors">
            <Link href={linkBlog}>{title}</Link>
          </h4>
          <p className="text-gray-600 mb-4">{excerpt}</p>
          
          <Link 
            href={linkBlog}
            className={`bg-teal-600 text-white font-bold ease-in-out cursor-pointer rounded hover:rounded-3xl  hover:bg-transparent hover:border-2 hover:border-teal-500 hover:text-teal-600  transition duration-300 py-3 text-center `}>
            Read More <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div> 
    </div>
  );
};

export default BlogCard
