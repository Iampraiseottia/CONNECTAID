"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye } from "@fortawesome/free-solid-svg-icons";

import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { motion } from "motion/react" 


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onMouseEnterEmailRef = () => {
    emailRef.current.focus();
  };

  const onMouseEnterPasswordRef = () => {
    passwordRef.current.focus();
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.main initial={{opacity: 0, y: 100}}
    whileInView={{y: 0, opacity: 1}}
    transition={{duration: 0.5, delay: 0.5}} 
    viewport={{once: true, amount: 0.1}}  className="py-32 flex items-center justify-center">
      <div className="  bg-white sm:w-[40%] h-auto shadow-xl py-10">
        <div className="flex items-center justify-center">
          <Image
            src="/icon/logo.png"
            height={100}
            width={100}
            alt="ConnectAID Logo"
          />
          <h1 className="ml-4 text-4xl font-bold tracking-wide">ConnectAID</h1>
        </div>

        <br />

        <form className="">
          <div className="px-[10%] mt-4 mb-4">
            <label htmlFor="emailAddress" className="text-xl ">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-teal-500 mr-2 "
              />{" "}
              Email
            </label>
            <br />

            <input
              type="email"
              name="emailAddress"
              placeholder="Your Email Address"
              id="emailAddress"
              ref={emailRef}
              onMouseEnter={onMouseEnterEmailRef}
              className="border-[1px] border-slate-500 px-5 mt-3 ease-in-out duration-200 focus:outline-none focus:ring-1 focus:ring-teal-400 outline-none w-full py-3 text-[18px] rounded-lg "
            />
          </div>

          <div className="flex flex-col gap-2 px-[10%] mt-8 mb-8 ">
            <div className="flex justify-between items-center ">
              <label htmlFor="password" className="text-xl ">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-teal-500 mr-2 "
                />{" "}
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[18px] font-semibold text-teal-500"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="mb-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                name="password"
                className="border-[1px] border-slate-500 px-5 mt-3 ease-in-out duration-200 focus:outline-none focus:ring-1 focus:ring-teal-400 outline-none w-full py-3 text-[18px] rounded-lg "
                onMouseEnter={onMouseEnterPasswordRef}
                id="password"
                placeholder="Your Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 mt-2 transform -translate-y-1/2 text-teal-400"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          <button
            className="mx-[10%] mt-4 mb-4 py-4 flex justify-center items-center bg-teal-500 text-white ease-in-out duration-200 hover:bg-teal-600 hover:rounded-2xl text-3xl font-bold tracking-wide w-[80%]"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mx-[10%] mt-4 mb-4 text-center py-2 ">
          Don't have an account?{" "}
          <Link href="/register" className="text-teal-500">
            Register
          </Link>
        </p>

        <Link href="#"
          className="mx-[10%] mt-4 mb-4 py-4 flex justify-center items-center bg-transparent border-2 border-teal-500 text-black ease-in-out duration-200 hover:bg-teal-500 hover:text-white hover:rounded-2xl rounded-xl text-xl font-bold tracking-wide w-[80%] "
          
        >
          <Image height={30} width={30} src="/icon/google.png" className="mr-3 " /> 
          <span>Login With Google</span>
        </Link> 
      </div>
    </motion.main> 
  );
};

export default Login;
