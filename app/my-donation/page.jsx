"use client";

import MyDonations from "../components/MyDonations";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const My_Donations = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard-donor?component=MyDonations");
  }, [router]);

  return null;
};

export default My_Donations;
