
"use client"

import DashMain from '../components/DashMain'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const DashboardMain = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/dashboard?component=DashboardMain');
  }, [router]);
  

  return null 
}

export default DashboardMain;
