"use client";

import Campaigns from "../components/Campaigns";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const Donate_Campaigns = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard-donor?component=Campaigns");
  }, [router]);

  return null;
};

export default Donate_Campaigns;
