"use client";

import MyAID from "../components/MyAID";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const My_Helpers = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard-seeker?component=MyAID");
  }, [router]); 

  return null;
};

export default My_Helpers;
