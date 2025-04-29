// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Calendar,
//   DollarSign,
//   Tag,
//   AlertCircle,
// } from "lucide-react";

// const MyDonations = ({ setActiveComponent }) => {
//   const [donations, setDonations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showFilter, setShowFilter] = useState(false);
//   const [dateRange, setDateRange] = useState({ from: "", to: "" });
//   const [amountRange, setAmountRange] = useState({ min: "", max: "" });
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const categories = [
//     "Education",
//     "Healthcare",
//     "Disaster Relief",
//     "Poverty Alleviation",
//     "Children",
//     "Environment",
//     "Animal Welfare",
//     "Humanitarian",
//   ];

//   // Mock donation data - would normally come from API
//   useEffect(() => {
//     // Simulate API fetch
//     setTimeout(() => {
//       setDonations([
//         {
//           id: "DON-2025-001",
//           campaign: "Clean Water Initiative",
//           organization: "Water for All",
//           date: "2025-04-15",
//           amount: 150.0,
//           status: "completed",
//           category: "Humanitarian",
//           receipt: "R-2025-001",
//           impact: "Provided clean water to 15 families",
//         },
//         {
//           id: "DON-2025-002",
//           campaign: "School Supplies Drive",
//           organization: "Education First",
//           date: "2025-03-22",
//           amount: 75.5,
//           status: "completed",
//           category: "Education",
//           receipt: "R-2025-002",
//           impact: "Equipped 8 students with supplies",
//         },
//         {
//           id: "DON-2025-003",
//           campaign: "Hurricane Relief Fund",
//           organization: "Disaster Response Team",
//           date: "2025-02-10",
//           amount: 250.0,
//           status: "completed",
//           category: "Disaster Relief",
//           receipt: "R-2025-003",
//           impact: "Helped 5 families with emergency housing",
//         },
//         {
//           id: "DON-2025-004",
//           campaign: "Monthly Children's Hospital Support",
//           organization: "Children's Medical Foundation",
//           date: "2025-04-01",
//           amount: 50.0,
//           status: "recurring",
//           category: "Healthcare",
//           receipt: "R-2025-004",
//           impact: "Contributed to pediatric care",
//         },
//         {
//           id: "DON-2025-005",
//           campaign: "Wildlife Conservation Project",
//           organization: "Planet Protectors",
//           date: "2025-01-20",
//           amount: 100.0,
//           status: "completed",
//           category: "Environment",
//           receipt: "R-2025-005",
//           impact: "Supported habitat restoration efforts",
//         },
//         {
//           id: "DON-2025-006",
//           campaign: "Food Bank Distribution",
//           organization: "Community Helpers",
//           date: "2025-04-10",
//           amount: 85.0,
//           status: "pending",
//           category: "Poverty Alleviation",
//           receipt: "Pending",
//           impact: "Processing",
//         },
//       ]);
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   const toggleCategory = (category) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter((c) => c !== category));
//     } else {
//       setSelectedCategories([...selectedCategories, category]);
//     }
//   };

//   const resetFilters = () => {
//     setFilter("all");
//     setSearchQuery("");
//     setDateRange({ from: "", to: "" });
//     setAmountRange({ min: "", max: "" });
//     setSelectedCategories([]);
//   };

//   const filteredDonations = donations.filter((donation) => {
//     // Filter by status
//     if (filter !== "all" && donation.status !== filter) return false;

//     // Filter by search query
//     if (
//       searchQuery &&
//       !donation.campaign.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !donation.organization.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//       return false;

//     // Filter by date range
//     if (dateRange.from && new Date(donation.date) < new Date(dateRange.from))
//       return false;
//     if (dateRange.to && new Date(donation.date) > new Date(dateRange.to))
//       return false;

//     // Filter by amount range
//     if (amountRange.min && donation.amount < parseFloat(amountRange.min))
//       return false;
//     if (amountRange.max && donation.amount > parseFloat(amountRange.max))
//       return false;

//     // Filter by categories
//     if (
//       selectedCategories.length > 0 &&
//       !selectedCategories.includes(donation.category)
//     )
//       return false;

//     return true;
//   });

//   const totalDonated = filteredDonations
//     .reduce((sum, donation) => sum + donation.amount, 0)
//     .toFixed(2);
//   const completedCount = filteredDonations.filter(
//     (d) => d.status === "completed"
//   ).length;
//   const pendingCount = filteredDonations.filter(
//     (d) => d.status === "pending"
//   ).length;
//   const recurringCount = filteredDonations.filter(
//     (d) => d.status === "recurring"
//   ).length;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center mb-6">
//           <button
//             onClick={() => setActiveComponent("dashboardMain")}
//             className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <h1 className="text-2xl font-bold text-slate-800">My Donations</h1>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
//           <div className="bg-white shadow-md rounded-lg p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Total Donated
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   ${totalDonated}
//                 </p>
//               </div>
//               <div className="p-3 bg-teal-100 rounded-full">
//                 <DollarSign size={20} className="text-teal-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-lg p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Completed Donations
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {completedCount}
//                 </p>
//               </div>
//               <div className="p-3 bg-green-100 rounded-full">
//                 <Calendar size={20} className="text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-lg p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Pending Donations
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {pendingCount}
//                 </p>
//               </div>
//               <div className="p-3 bg-yellow-100 rounded-full">
//                 <AlertCircle size={20} className="text-yellow-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-lg p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Recurring Donations
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {recurringCount}
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-full">
//                 <Tag size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter Controls */}
//         <div className="bg-white shadow-md rounded-lg p-4 mb-6">
//           <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
//             <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
//               <div className="relative flex-grow">
//                 <input
//                   type="text"
//                   placeholder="Search donations..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setFilter("all")}
//                   className={`px-3 py-1 text-sm rounded-md ${
//                     filter === "all"
//                       ? "bg-teal-600 text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   All
//                 </button>
//                 <button
//                   onClick={() => setFilter("completed")}
//                   className={`px-3 py-1 text-sm rounded-md ${
//                     filter === "completed"
//                       ? "bg-teal-600 text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   Completed
//                 </button>
//                 <button
//                   onClick={() => setFilter("pending")}
//                   className={`px-3 py-1 text-sm rounded-md ${
//                     filter === "pending"
//                       ? "bg-teal-600 text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   Pending
//                 </button>
//                 <button
//                   onClick={() => setFilter("recurring")}
//                   className={`px-3 py-1 text-sm rounded-md ${
//                     filter === "recurring"
//                       ? "bg-teal-600 text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   Recurring
//                 </button>
//               </div>

//               <button
//                 onClick={() => setShowFilter(!showFilter)}
//                 className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
//               >
//                 <Filter size={20} className="text-gray-600" />
//               </button>

//               <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
//                 <Download size={20} className="text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Advanced Filter Panel */}
//           {showFilter && (
//             <div className="border-t border-gray-200 pt-4 mt-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-2">
//                     Date Range
//                   </h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     <div>
//                       <label className="block text-xs text-gray-500 mb-1">
//                         From
//                       </label>
//                       <input
//                         type="date"
//                         value={dateRange.from}
//                         onChange={(e) =>
//                           setDateRange({ ...dateRange, from: e.target.value })
//                         }
//                         className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-500 mb-1">
//                         To
//                       </label>
//                       <input
//                         type="date"
//                         value={dateRange.to}
//                         onChange={(e) =>
//                           setDateRange({ ...dateRange, to: e.target.value })
//                         }
//                         className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-2">
//                     Amount Range
//                   </h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     <div>
//                       <label className="block text-xs text-gray-500 mb-1">
//                         Min ($)
//                       </label>
//                       <input
//                         type="number"
//                         value={amountRange.min}
//                         onChange={(e) =>
//                           setAmountRange({
//                             ...amountRange,
//                             min: e.target.value,
//                           })
//                         }
//                         className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-500 mb-1">
//                         Max ($)
//                       </label>
//                       <input
//                         type="number"
//                         value={amountRange.max}
//                         onChange={(e) =>
//                           setAmountRange({
//                             ...amountRange,
//                             max: e.target.value,
//                           })
//                         }
//                         className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-2">
//                     Categories
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {categories.map((category) => (
//                       <button
//                         key={category}
//                         onClick={() => toggleCategory(category)}
//                         className={`px-2 py-1 text-xs rounded-md ${
//                           selectedCategories.includes(category)
//                             ? "bg-teal-600 text-white"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {category}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={resetFilters}
//                   className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md mr-2 hover:bg-gray-200"
//                 >
//                   Reset
//                 </button>
//                 <button
//                   onClick={() => setShowFilter(false)}
//                   className="px-4 py-1.5 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700"
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Donations Table */}
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             {isLoading ? (
//               <div className="p-8 text-center">
//                 <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
//                 <p className="mt-4 text-gray-500">Loading your donations...</p>
//               </div>
//             ) : filteredDonations.length === 0 ? (
//               <div className="p-8 text-center">
//                 <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
//                 <p className="text-gray-500">
//                   No donations found matching your filters.
//                 </p>
//                 {(searchQuery ||
//                   filter !== "all" ||
//                   dateRange.from ||
//                   dateRange.to ||
//                   amountRange.min ||
//                   amountRange.max ||
//                   selectedCategories.length > 0) && (
//                   <button
//                     onClick={resetFilters}
//                     className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Donation
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredDonations.map((donation) => (
//                     <tr key={donation.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex flex-col">
//                           <div className="text-sm font-medium text-gray-900">
//                             {donation.campaign}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {donation.organization}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(donation.date).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         ${donation.amount.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${
//                             donation.status === "completed"
//                               ? "bg-green-100 text-green-800"
//                               : donation.status === "pending"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-blue-100 text-blue-800"
//                           }`}
//                         >
//                           {donation.status.charAt(0).toUpperCase() +
//                             donation.status.slice(1)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {donation.category}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button className="text-teal-600 hover:text-teal-900 mr-3">
//                           <Eye size={18} />
//                         </button>
//                         {donation.status !== "pending" && (
//                           <button className="text-gray-600 hover:text-gray-900">
//                             <Download size={18} />
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           {/* Pagination - Simple version */}
//           {!isLoading && filteredDonations.length > 0 && (
//             <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                   Previous
//                 </button>
//                 <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-700">
//                     Showing <span className="font-medium">1</span> to{" "}
//                     <span className="font-medium">
//                       {filteredDonations.length}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-medium">
//                       {filteredDonations.length}
//                     </span>{" "}
//                     results
//                   </p>
//                 </div>
//                 <div>
//                   <nav
//                     className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                     aria-label="Pagination"
//                   >
//                     <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                       <span className="sr-only">Previous</span>
//                       <ArrowLeft size={20} className="h-5 w-5" />
//                     </button>
//                     <button className="bg-teal-50 border-teal-500 text-teal-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
//                       1
//                     </button>
//                     <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                       <span className="sr-only">Next</span>
//                       <ArrowLeft
//                         size={20}
//                         className="h-5 w-5 transform rotate-180"
//                       />
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyDonations;



import React from 'react'

const MyDonations = () => {
  return (
    <div>MyDonations</div>
  )
}

export default MyDonations