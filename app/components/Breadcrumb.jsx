import Image from 'next/image';
import Link from 'next/link';

const Breadcrumb = ({ homeTitle, homeSlug, title, breadcrumbImage, breadcrumbAlt }) => {
  return (
    <section className="relative w-full overflow-hidden h-[35vh]">
      <div className="absolute inset-0 z-0">
        <Image 
          src={breadcrumbImage}
          alt={breadcrumbAlt}
          fill
          className="object-cover object-center opacity-95 transparent" 
          priority
        />
      </div>
      
      <div className="container mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="text-white ">
          <nav className="mb-2 breadCrumbBg shadow py-2 px-5 w-64 rounded" aria-label="breadcrumb">
            <ul className="flex items-center text-lg"> 
              <li className='hover:cursor-pointer hover:opacity-80'>
                <Link href={homeSlug} className="transition duration-300 uppercase font-semibold text-xl tracking-wide">
                  {homeTitle}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-2xl ">›</span>
              </li>
              <li aria-current="page"> 
                <span className=" uppercase font-semibold text-xl tracking-wide">{title}</span>
              </li>
            </ul>
          </nav>
          
          {/* Page Title */}
          <h1 className="text-5xl md:text-6xl font-bold mt-7 uppercase tracking-wide">
            {title }
          </h1>
        </div>
      </div>
      
      {/* Green overlay gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-700/70 to-transparent z-[1]"></div>
    </section>
  );
};

export default Breadcrumb;
