import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

const TeamMember = ({ name, position, image, delay }) => {
  const [showSocial, setShowSocial] = useState(false);

  return (
    <div
      className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
      data-wow-delay={`${delay}s`}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="w-full h-[400px] object-cover hover:scale-105 ease-in-out duration-300"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center"> 
            <div className="flex-1">
              <h4 className="text-xl font-bold capitalize mb-1 text-gray-700 dark:text-gray-700">
                {name}
              </h4>
              <p className="text-gray-600 pb-5">{position}</p>
            </div>
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition duration-300 text-green-700 dark:text-green-700 " 
                onClick={() => setShowSocial(!showSocial)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
              {showSocial && (
                <div className="absolute right-0 flex bg-white shadow-md rounded-md z-10 text-gray-800 dark:text-gray-800">
                  <a
                    href="#"
                    className="p-2 hover:text-emerald-600 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                      <path
                        fill="white"
                        d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-2 hover:text-emerald-600 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-2 hover:text-emerald-600 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
