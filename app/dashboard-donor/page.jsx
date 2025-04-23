

import React, { Suspense } from "react";

import SideBar from "../components/SideBar";

import globalStyle from "../globals.css";

const DashBoardDonor = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div id="fountainG">
            <div id="fountainG_1" className="fountainG"></div>
            <div id="fountainG_2" className="fountainG"></div>
            <div id="fountainG_3" className="fountainG"></div>
            <div id="fountainG_4" className="fountainG"></div>
            <div id="fountainG_5" className="fountainG"></div>
            <div id="fountainG_6" className="fountainG"></div>
            <div id="fountainG_7" className="fountainG"></div>
            <div id="fountainG_8" className="fountainG"></div>
          </div>
        </div>
      }
    >
      <SideBar />
    </Suspense>
  );
};

export default DashBoardDonor;
