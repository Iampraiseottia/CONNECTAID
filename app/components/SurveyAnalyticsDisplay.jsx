"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Define a set of consistent colors for charts
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#d0ed57",
  "#a4de6c",
  "#83a6ed",
  "#8dd1e1",
  "#83a6ed",
];

const SurveyAnalyticsDisplay = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch data from the new analytics API endpoint
        const response = await fetch("/api/survey/analytics");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setAnalyticsData(result.data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch analytics:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">
          No analytics data available.
        </p>
      </div>
    );
  }

  /**
   * Renders a section of data, optionally with a chart.
   * @param {string} title - The title of the section.
   * @param {Array<Object>} data - The data array for the section.
   * @param {string} keyAccessor - The key for the label/category in the data.
   * @param {string} valueAccessor - The key for the value/count in the data.
   * @param {boolean} isChart - Whether to render a chart.
   * @param {'bar'|'pie'} chartType - The type of chart to render.
   */
  const renderDataSection = (
    title,
    data,
    keyAccessor,
    valueAccessor,
    isChart = false,
    chartType = "bar"
  ) => (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h2>
      {data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No data available for this section.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    {keyAccessor.charAt(0).toUpperCase() +
                      keyAccessor
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item[keyAccessor] || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item[valueAccessor]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isChart && (
            <div className="mt-6 h-80 w-full">
              {" "}
              {/* Fixed height for charts */}
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey={keyAccessor}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={80}
                      style={{ fontSize: "0.75rem", fill: "#4B5563" }}
                    />
                    <YAxis style={{ fontSize: "0.75rem", fill: "#4B5563" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderColor: "#4B5563",
                        color: "#E5E7EB",
                      }}
                      itemStyle={{ color: "#E5E7EB" }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "0.8rem", color: "#E5E7EB" }}
                    />
                    <Bar dataKey={valueAccessor} fill="#10B981" />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey={valueAccessor}
                      nameKey={keyAccessor}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderColor: "#4B5563",
                        color: "#E5E7EB",
                      }}
                      itemStyle={{ color: "#E5E7EB" }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "0.8rem", color: "#E5E7EB" }}
                    />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto sm:pt-20 p-5">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Survey Analytics Dashboard
        </h1>

        {/* Overview Section */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Responses
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {analyticsData.overview.totalResponses}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Recent Responses (30 days)
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {analyticsData.overview.recentResponses}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Weekly Responses (7 days)
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {analyticsData.overview.weeklyResponses}
            </p>
          </div>
        </div>

        {renderDataSection(
          "Donation Frequency Distribution",
          analyticsData.donationFrequency,
          "frequency",
          "count",
          true,
          "pie"
        )}
        {renderDataSection(
          "Donation Amount Distribution",
          analyticsData.donationAmounts,
          "amount",
          "count",
          true,
          "bar"
        )}
        {renderDataSection(
          "Donation Preferences Popularity",
          analyticsData.donationPreferences,
          "preference",
          "count",
          true,
          "bar"
        )}
        {renderDataSection(
          "Communication Preferences Distribution",
          analyticsData.communicationPreferences,
          "preference",
          "count",
          true,
          "pie"
        )}
        {renderDataSection(
          "Donation Motivations",
          analyticsData.motivations,
          "motivation",
          "count",
          true,
          "bar"
        )}
        {renderDataSection(
          "How People Heard About ConnectAID",
          analyticsData.howHeard,
          "source",
          "count",
          true,
          "bar"
        )}
      </div>
    </motion.div>
  );
};

export default SurveyAnalyticsDisplay;
