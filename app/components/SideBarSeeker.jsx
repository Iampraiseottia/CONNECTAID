"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import globalStyle from "../globals.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPeopleGroup,
  faMoneyBill,
  faUser,
  faRightFromBracket,
  faAddressCard,
  faIdCard,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

import Metadata from "./Metadata";
import About_Seeker from "./About_Seeker";
import Identity_Seeker from "./Identity_Seeker";
import Survey_Seeker from "./Survey_Seeker";
import Campaigns_Seeker from "./Campaigns_Seeker";
import MyAID from "./MyAID";
import Seeker_Profile from "./Seeker_Profile";
import Logout from "../logout/page";
import DashMainSeeker from "./DashMainSeeker";

import { FileText, ChevronDown, ChevronFirst, ChevronLast } from "lucide-react";

const SideBarSeeker = () => {
  const [activeComponent, setActiveComponent] = useState("dashboardMain");
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSideBar, setExpandedSideBar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [metadata, setMetadata] = useState({
    title: "Dashboard - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const searchParams = useSearchParams();
  const componentParam = searchParams.get("component");

  // Update metadata based on active component
  const updateMetadata = (component) => {
    const metadataMap = {
      dashboardMain: {
        title: "Seeker Dashboard - ConnectAID Web Application",  
        description:
          "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
      },
      Campaigns_Seeker: {
        title: "All Campaigns - ConnectAID Web Application",
        description:
          "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
      },
      "about-you": {
        title: "About You - ConnectAID Web Application",
        description:
          "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
      },
      identity: {
        title: "Identity Verification - ConnectAID Web Application",
        description:
          "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
      },
      survey: {
        title: "Survey - ConnectAID Web Application",
        description:
          "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
      },
      MyAID: {
        title: "My AID - ConnectAID Web Application",
        description:
          "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
      },
      profile: {
        title: "User Profile - ConnectAID Web Application",
        description:
          "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
      },
      logout: {
        title: "Logout - ConnectAID Web Application",
        description:
          "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
      },
    };

    setMetadata(metadataMap[component] || metadataMap["dashboardMain"]);
  };

  // Set active component from URL parameter
  useEffect(() => {
    if (componentParam) {
      setActiveComponent(componentParam);
      updateMetadata(componentParam);
    }
  }, [componentParam]);

  // Handle component change
  const handleComponentChange = (component) => {
    setActiveComponent(component);
    updateMetadata(component);
    if ((isMobile || isTablet) && expandedSideBar) setExpandedSideBar(false);
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);

      // On desktop, always keep sidebar expanded
      if (desktop) {
        setExpandedSideBar(true);
      }
      // On mobile, collapse by default
      else if (mobile) {
        setExpandedSideBar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    switch (activeComponent) {
      case "dashboardMain":
        return <DashMainSeeker setActiveComponent={setActiveComponent} />;
      case "MyAID":
        return <MyAID setActiveComponent={setActiveComponent} />;
      case "about-you":
        return <About_Seeker setActiveComponent={setActiveComponent} />;
      case "identity":
        return <Identity_Seeker setActiveComponent={setActiveComponent} />;
      case "survey":
        return <Survey_Seeker setActiveComponent={setActiveComponent} />;
      case "Campaigns_Seeker":
        return <Campaigns_Seeker setActiveComponent={setActiveComponent} />;
      case "profile":
        return <Seeker_Profile setActiveComponent={setActiveComponent} />;
      case "logout":
        return <Logout />;
      default:
        return <DashMainSeeker />;
    }
  };

  // Get sidebar width based on device type and state 
  const getSidebarWidth = () => {
    if (expandedSideBar) {
      if (isMobile) return "w-4/5";
      if (isTablet) return "w-[35%]";
      return "w-1/6";
    } else {
      if (isMobile) return "w-0";
      if (isTablet) return "w-[60px]";
      return "w-1/6";
    }
  };

  // Get content margin based on device type and sidebar state 
  const getContentMargin = () => {
    if (isMobile) {
      return expandedSideBar ? "ml-0" : "ml-0";
    } else if (isTablet) {
      return expandedSideBar ? "ml-[35%]" : "ml-[70px]";
    } else { 
      return "ml-[16.67%]";
    }
  };

  const getContentWidth = () => {
    if (isMobile) {
      return "100%";
    } else if (isTablet) {
      return expandedSideBar ? "calc(100% - 25%)" : "calc(100% - 60px)";
    } else {
      return "calc(100% - 16.67%)";
    }
  };

  return (
    <section className="w-full relative flex dark:bg-gray-900 bg-white">
      <Metadata title={metadata.title} description={metadata.description} />

      {/* Mobile Toggle Button - Always visible on mobile */}
      {isMobile && (
        <button
          onClick={() => setExpandedSideBar((current) => !current)}
          className="fixed top-4 left-4 z-30 p-2 bg-slate-700 text-white rounded-lg shadow-lg hover:bg-slate-600"
          aria-label="Toggle Sidebar"
        >
          {expandedSideBar ? (
            <ChevronFirst size={30} />
          ) : (
            <ChevronLast size={30} />
          )}
        </button>
      )}

      {/* Dashboard Left Section (Side Bar) */}
      <div
        className={`bg-slate-700 duration-500 fixed z-20 dashboard-sidebar-border h-[100vh] top-0 left-0 border-2 border-slate-700 border-solid text-center text-white text-2xl font-semibold transition-all ease-in-out ${getSidebarWidth()}`}
        style={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <div className="flex items-start justify-evenly flex-row">
          <div
            className={`flex items-center justify-center mb-4 ${
              expandedSideBar ? "mt-8 w-[4/5]" : "mt-24 w-full"
            }`}
          >
            <div className="rounded-full p-2 flex flex-col items-center justify-center">
              <img
                src="/icon/logo.png"
                className={`overflow-hidden transition-all ${
                  expandedSideBar
                    ? "w-32 lg:w-32 h-32 mt-4 mr-10"
                    : isTablet
                    ? "w-14 h-14 mx-auto"
                    : "w-32 lg:w-32 h-32 mt-4 mr-10"
                }`}
                alt="ConnectAID Logo"
              />
              <h1
                className={`tracking-wider text-4xl font-extrabold overflow-hidden transition-all ${
                  expandedSideBar || isDesktop ? "w-auto" : "w-0 opacity-0"
                }`}
              >
                ConnectAID
              </h1>
            </div>
          </div>

          {/* Toggle button for tablet */}
          {isTablet && (
            <button
              onClick={() => setExpandedSideBar((current) => !current)}
              className="absolute p-1.5 rounded-lg text-[lightseagreen] bg-gray-100 top-7 right-5 hover:cursor-pointer ease-in-out z-10"
            >
              {expandedSideBar ? (
                <ChevronFirst size={30} />
              ) : (
                <ChevronLast size={30} />
              )}
            </button>
          )}
        </div>

        <div
          onClick={() => handleComponentChange("dashboardMain")}
          title="Dashboard"
          className={`mb-2 flex items-center px-4 py-2 rounded-lg ease-in-out hover:bg-white hover:text-teal-500 cursor-pointer transition-all ${
            expandedSideBar || isDesktop
              ? "mt-[19px] justify-start"
              : isTablet
              ? "mt-[-30px] justify-center"
              : ""
          } ${
            activeComponent === "dashboardMain" ? "bg-white text-teal-500" : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faHome}
            className={`transition-all ${
              expandedSideBar || isDesktop ? "h-6 w-6" : "w-6 h-6"
            }`}
          />
          <span
            className={`ml-3 overflow-hidden transition-all ${
              expandedSideBar || isDesktop
                ? "w-auto opacity-100"
                : "w-0 opacity-0"
            }`}
          >
            Dashboard
          </span>
        </div>

        <div className="relative mb-4">
          <div
            title="Complete"
            className={`flex items-center px-4 py-2 rounded-lg hover:bg-white hover:text-teal-500 ease-in-out cursor-pointer transition-all ${
              expandedSideBar || isDesktop
                ? "justify-between"
                : "justify-center"
            } ${isOpen ? "mb-1" : ""} ${
              ["about-you", "identity", "survey"].includes(activeComponent)
                ? "bg-white text-teal-500"
                : ""
            }`}
            onClick={toggleDropdown}
          >
            <div
              className={`flex items-center ${
                expandedSideBar || isDesktop ? "" : "justify-center"
              }`}
            >
              <FileText
                size={expandedSideBar || isDesktop ? 20 : 25}
                className="transition-all"
              />
              <span
                className={`ml-3 transition-all ${
                  expandedSideBar || isDesktop ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                Complete
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              } ${expandedSideBar || isDesktop ? "ml-2" : "hidden"}`}
            />
          </div>

          {isOpen && (
            <ul className="mt-1 w-full rounded-lg overflow-hidden ease-in-out transition-all bg-[gray]">
              <li
                title="About You"
                className={`py-2 pl-4 pr-4 hover:bg-white ease-in-out hover:text-teal-500 cursor-pointer transition-all ${
                  expandedSideBar || isDesktop
                    ? "text-left pl-8"
                    : "text-center"
                } ${
                  activeComponent === "about-you"
                    ? "bg-white text-teal-500"
                    : ""
                }`}
                onClick={() => handleComponentChange("about-you")}
              >
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className={`transition-all ${
                    expandedSideBar || isDesktop
                      ? "h-6 w-6 mr-2"
                      : "w-6 h-6 mx-auto"
                  }`}
                />
                <span
                  className={`transition-all ${
                    expandedSideBar || isDesktop
                      ? "inline-block text-[18px]"
                      : "hidden"
                  }`}
                >
                  {"About You"}
                </span>
              </li>

              <li
                onClick={() => handleComponentChange("identity")}
                title="Identity"
                className={`py-2 pl-4 pr-4 hover:bg-white ease-in-out hover:text-teal-500 cursor-pointer transition-all ${
                  expandedSideBar || isDesktop
                    ? "text-left pl-8"
                    : "text-center"
                } ${
                  activeComponent === "identity" ? "bg-white text-teal-500" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faIdCard}
                  className={`transition-all ${
                    expandedSideBar || isDesktop
                      ? "h-6 w-6 mr-2"
                      : "w-6 h-6 mx-auto"
                  }`}
                />
                <span
                  className={`transition-all ${
                    expandedSideBar || isDesktop
                      ? "inline-block text-[19px]"
                      : "hidden"
                  }`}
                >
                  Identity
                </span>
              </li>

              <li
                onClick={() => handleComponentChange("survey")}
                title="Survey"
                className={`py-2 pl-4 pr-4 hover:bg-white ease-in-out hover:text-teal-500 cursor-pointer transition-all ${
                  expandedSideBar || isDesktop
                    ? "text-left pl-8"
                    : "text-center"
                } ${
                  activeComponent === "survey" ? "bg-white text-teal-500" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faClipboard}
                  className={`transition-all ${
                    expandedSideBar || isDesktop
                      ? "h-6 w-6 mr-2"
                      : "w-6 h-6 mx-auto"
                  }`}
                />
                <span
                  className={`transition-all ${
                    expandedSideBar || isDesktop
                      ? "inline-block text-[19px]"
                      : "hidden"
                  }`}
                >
                  Survey
                </span>
              </li>
            </ul>
          )}
        </div>

        <div
          onClick={() => handleComponentChange("MyAID")}
          title="My Donations"
          className={`mb-2 flex items-center px-4 py-2 ease-in-out rounded-lg hover:bg-white hover:text-teal-500 cursor-pointer transition-all ${
            expandedSideBar || isDesktop ? "justify-start" : "justify-center"
          } ${
            activeComponent === "MyAID" ? "bg-white text-teal-500" : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faMoneyBill}
            className={`transition-all ${
              expandedSideBar || isDesktop ? "h-8 w-8" : "w-6 h-6"
            }`}
          />
          <span
            className={`ml-3 overflow-hidden transition-all ${
              expandedSideBar || isDesktop
                ? "w-auto opacity-100"
                : "w-0 opacity-0"
            }`}
          >
            My AID
          </span>
        </div>

        <div
          onClick={() => handleComponentChange("Campaigns_Seeker")}
          title="Campaigns_Seeker"
          className={`mb-2 flex items-center px-4 py-2 ease-in-out rounded-lg hover:bg-white hover:text-teal-500 cursor-pointer transition-all ${
            expandedSideBar || isDesktop ? "justify-start" : "justify-center"
          } ${activeComponent === "Campaigns_Seeker" ? "bg-white text-teal-500" : ""}`}
        >
          <FontAwesomeIcon
            icon={faPeopleGroup}
            className={`transition-all ${
              expandedSideBar || isDesktop ? "h-7 w-7" : "w-6 h-6"
            }`}
          />
          <span
            className={`ml-3 overflow-hidden transition-all ${
              expandedSideBar || isDesktop
                ? "w-auto opacity-100"
                : "w-0 opacity-0"
            }`}
          >
            Campaigns_Seeker
          </span>
        </div>

        <div
          onClick={() => handleComponentChange("profile")}
          title="Profile"
          className={`mb-6 flex items-center px-4 py-2 rounded-lg hover:bg-white hover:text-teal-500 cursor-pointer transition-all ${
            expandedSideBar || isDesktop ? "justify-start" : "justify-center"
          } ${activeComponent === "profile" ? "bg-white text-teal-500" : ""}`}
        >
          <FontAwesomeIcon
            icon={faUser}
            className={`transition-all ${
              expandedSideBar || isDesktop ? "h-6 w-6" : "w-6 h-6"
            }`}
          />
          <span
            className={`ml-3 overflow-hidden transition-all ${
              expandedSideBar || isDesktop
                ? "w-auto opacity-100"
                : "w-0 opacity-0"
            }`}
          >
            Profile
          </span>
        </div>

        <div
          onClick={() => handleComponentChange("logout")}
          title="Logout"
          className={`mb-2 mt-[-20px] flex items-center px-4 py-2 rounded-lg hover:bg-white hover:text-teal-500 cursor-pointer transition-all ${
            expandedSideBar || isDesktop ? "justify-start" : "justify-center"
          } ${activeComponent === "logout" ? "bg-white text-teal-500" : ""}`}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className={`transition-all ${
              expandedSideBar || isDesktop ? "h-6 w-6" : "w-6 h-6"
            }`}
          />
          <span
            className={`ml-3 overflow-hidden transition-all ${
              expandedSideBar || isDesktop ? "w-auto" : "w-0"
            }`}
          >
            Logout
          </span>
        </div>

      <p className="bg-white text-yellow-500 py-2 text-center absolute bottom-0 left-0 w-full ">*A Grateful Seeker 😊*</p>

      </div>


      {/* Overlay for mobile when sidebar is expanded */}
      {isMobile && expandedSideBar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setExpandedSideBar(false)}
        ></div>
      )}

      {/* Dashboard Right Section - Display Each SideBar Header content dynamically */}  
      <div
        className={`transition-all duration-500 min-h-screen ${getContentMargin()}`}
        style={{
          width: getContentWidth(),
        }}
      > 
        {renderContent()}
      </div>
    </section>
  );
};

export default SideBarSeeker;
