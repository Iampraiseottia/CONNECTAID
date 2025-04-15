import Image from "next/image";

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <div className="px-2 md:px-4">
      <div
        className={`relative p-4 md:p-6 bg-white rounded-lg shadow-md ${
          isActive ? "border border-teal-600" : "border border-gray-100"
        } h-full mx-4 transition-colors duration-300`}
      >
        <div className="flex items-center mb-4">
          <div className="relative w-10 h-10 md:w-12 md:h-12 mr-3 md:mr-4 overflow-hidden rounded-full">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold">
              {testimonial.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">
              {testimonial.location}
            </p>
          </div>
        </div>

        <div className="absolute right-4 md:right-6 top-4 md:top-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="25"
            viewBox="0 0 54 33"
            fill="none"
            className="md:w-[54px] md:h-[33px]"
          >
            <path
              d="M0 2C0 0.895431 0.895431 0 2 0H20C21.1046 0 22 0.895431 22 2V29.4951C22 31.0437 20.3158 32.0048 18.9825 31.217L0.98254 20.5806C0.373596 20.2208 0 19.5661 0 18.8587V2Z"
              fill={isActive ? "#00715D" : "#E6F2EF"}
            />
            <path
              d="M32 2C32 0.895431 32.8954 0 34 0H52C53.1046 0 54 0.895431 54 2V29.4951C54 31.0437 52.3158 32.0048 50.9825 31.217L32.9825 20.5806C32.3736 20.2208 32 19.5661 32 18.8587V2Z"
              fill={isActive ? "#00715D" : "#E6F2EF"}
            />
          </svg>
        </div>

        <div className="relative mb-4 mx-4">
          <p className="text-sm md:text-base text-gray-600 italic">
            {testimonial.text}
          </p>
        </div>

        <div className="flex text-yellow-400 mx-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
