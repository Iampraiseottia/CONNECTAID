"use client";

import Campaigns_Seeker from "../components/Campaigns_Seeker";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const Seeker_Campaigns = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard-seeker?component=Campaigns_Seeker");
  }, [router]);

  return null;
};

export default Seeker_Campaigns;
