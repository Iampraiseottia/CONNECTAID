// app/connectaid-survey-analysis/page.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SurveyAnalyticsDisplay from "../components/SurveyAnalyticsDisplay";
import navLogo from "/public/icon/logo.png";

import globalStyle from "../globals.css";

import Metadata from "../components/Metadata";

export default function SurveyAnalyticsStats() {
  const metadata = {
    title: "Survey Stats - ConnectAID ",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempting, setLoginAttempting] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchAdminCredentials = async () => {
    return { username: "aldris", password_hash: "wise man moses" };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoginAttempting(true);

    try {
      const storedCredentials = await fetchAdminCredentials();

      if (
        username === storedCredentials.username &&
        password === storedCredentials.password_hash
      ) {
        setIsAuthenticated(true);
        setError("");
        setUsername("");
        setPassword("");
      } else {
        setError("Invalid username or password.");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Login attempt error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsAuthenticated(false);
    } finally {
      setLoginAttempting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingAuth(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>{" "}
        Loading Authentication...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${
        !isAuthenticated ? "relative" : ""
      }`}
    >
      <Metadata title={metadata.title} description={metadata.description} />

      <header className="bg-yellow-600 dark:bg-yellow-800 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center cursor-pointer">
            <Image
              src={navLogo}
              alt="ConnectAID Logo"
              width={70}
              height={60}
              className="h-auto transition-all duration-300 w-[60px] md:w-[90px]"
            />
            <span className="ml-2 md:ml-3 tracking-wide werey4 font-bold text-black dark:text-white transition-all duration-300 text-2xl md:text-4xl">
              ConnectAID Survey Analytics Dashboard
            </span>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 rounded-md transition duration-300 shadow-sm text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Main content area */}
      <main className="py-8 dark:text-white">
        {/* Render SurveyAnalyticsDisplay only if authenticated */}
        {isAuthenticated ? (
          <SurveyAnalyticsDisplay
            className="dark:text-white"
            isAuthenticated={isAuthenticated} // Pass isAuthenticated for conditional data fetching
          />
        ) : (
          // Login Popup/Overlay when not authenticated
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100 dark:border-2 dark:border-yellow-500">
              <div className="flex flex-col items-center mb-6">
                <Image
                  src={navLogo}
                  alt="ConnectAID Logo"
                  width={70}
                  height={60}
                  className="h-auto w-[60px] md:w-[90px]"
                />
                <h2 className="mt-4 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Admin Login Required
                </h2>
              </div>
              {error && (
                <div
                  className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4 text-sm"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:font-bold "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loginAttempting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 disabled:opacity-50"
                  >
                    {loginAttempting ? "Logging In..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
