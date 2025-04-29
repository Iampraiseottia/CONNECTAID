// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   Heart,
//   Tag,
//   Share2,
//   Calendar,
//   DollarSign,
//   Users,
// } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHandHoldingHeart,
//   faSeedling,
//   faGraduationCap,
//   faHeartPulse,
//   faPaw,
//   faUtensils,
//   faHome,
// } from "@fortawesome/free-solid-svg-icons";

// const Campaigns = ({ setActiveComponent }) => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Sample campaign data - in production you would fetch this from your API
//   useEffect(() => {
//     // Simulate API fetch
//     setTimeout(() => {
//       setCampaigns([
//         {
//           id: 1,
//           title: "Provide Clean Water in Rural Communities",
//           description:
//             "Help us provide clean drinking water to communities struggling with access to safe water sources.",
//           category: "basic-needs",
//           categoryName: "Basic Needs",
//           icon: faSeedling,
//           raised: 28500,
//           goal: 50000,
//           supporters: 345,
//           daysLeft: 15,
//           image: "/api/placeholder/400/250",
//           location: "East Africa",
//         },
//         {
//           id: 2,
//           title: "Educational Support for Underprivileged Children",
//           description:
//             "Support education initiatives for children in low-income areas by providing school supplies and resources.",
//           category: "education",
//           categoryName: "Education",
//           icon: faGraduationCap,
//           raised: 12780,
//           goal: 25000,
//           supporters: 189,
//           daysLeft: 30,
//           image: "/api/placeholder/400/250",
//           location: "South Asia",
//         },
//         {
//           id: 3,
//           title: "Medical Aid for Rural Health Centers",
//           description:
//             "Help us supply essential medical equipment and medications to rural health centers.",
//           category: "healthcare",
//           categoryName: "Healthcare",
//           icon: faHeartPulse,
//           raised: 32100,
//           goal: 45000,
//           supporters: 278,
//           daysLeft: 21,
//           image: "/api/placeholder/400/250",
//           location: "West Africa",
//         },
//         {
//           id: 4,
//           title: "Animal Shelter Renovation Project",
//           description:
//             "Help us renovate and expand our shelter to accommodate more rescued animals in need.",
//           category: "animals",
//           categoryName: "Animals",
//           icon: faPaw,
//           raised: 8950,
//           goal: 20000,
//           supporters: 125,
//           daysLeft: 45,
//           image: "/api/placeholder/400/250",
//           location: "North America",
//         },
//         {
//           id: 5,
//           title: "Food Security Initiative",
//           description:
//             "Join our mission to reduce hunger by supporting sustainable food production and distribution programs.",
//           category: "food",
//           categoryName: "Food",
//           icon: faUtensils,
//           raised: 15200,
//           goal: 30000,
//           supporters: 210,
//           daysLeft: 25,
//           image: "/api/placeholder/400/250",
//           location: "Southeast Asia",
//         },
//         {
//           id: 6,
//           title: "Homeless Shelter Support Program",
//           description:
//             "Support our shelter providing temporary housing, meals, and resources for people experiencing homelessness.",
//           category: "housing",
//           categoryName: "Housing",
//           icon: faHome,
//           raised: 19800,
//           goal: 35000,
//           supporters: 231,
//           daysLeft: 18,
//           image: "/api/placeholder/400/250",
//           location: "Europe",
//         },
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Filter campaigns based on category and search query
//   const filteredCampaigns = campaigns.filter((campaign) => {
//     const matchesFilter = filter === "all" || campaign.category === filter;
//     const matchesSearch =
//       campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   // Handle donation button click
//   const handleDonate = (campaignId) => {
//     console.log(`Donating to campaign ${campaignId}`);
//     // In a real application, this would navigate to a donation page or open a modal
//   };

//   // Categories for filter
//   const categories = [
//     { id: "all", name: "All Campaigns", icon: faHandHoldingHeart },
//     { id: "basic-needs", name: "Basic Needs", icon: faSeedling },
//     { id: "education", name: "Education", icon: faGraduationCap },
//     { id: "healthcare", name: "Healthcare", icon: faHeartPulse },
//     { id: "animals", name: "Animals", icon: faPaw },
//     { id: "food", name: "Food", icon: faUtensils },
//     { id: "housing", name: "Housing", icon: faHome },
//   ];

//   // Calculate progress percentage
//   const calculateProgress = (raised, goal) => {
//     return Math.min((raised / goal) * 100, 100);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-slate-800 mb-2">
//           Active Campaigns
//         </h1>
//         <p className="text-slate-600">
//           Browse through current campaigns and support causes that matter to
//           you.
//         </p>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="relative w-full md:w-1/2">
//             <input
//               type="text"
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//               placeholder="Search campaigns..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>

//           <div className="flex items-center gap-2 text-sm w-full md:w-auto">
//             <Filter className="h-5 w-5 text-gray-500" />
//             <span className="text-gray-600">Filter:</span>
//             <select
//               className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Category Pills */}
//       <div className="mb-8 overflow-x-auto">
//         <div className="flex space-x-2 pb-2">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
//                 filter === category.id
//                   ? "bg-teal-500 text-white"
//                   : "bg-white text-slate-700 hover:bg-gray-100"
//               }`}
//               onClick={() => setFilter(category.id)}
//             >
//               <FontAwesomeIcon icon={category.icon} className="h-4 w-4 mr-2" />
//               {category.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Campaigns Grid */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center p-8 bg-red-50 rounded-lg">
//           <p className="text-red-600">
//             Error loading campaigns. Please try again later.
//           </p>
//         </div>
//       ) : filteredCampaigns.length === 0 ? (
//         <div className="text-center p-8 bg-gray-50 rounded-lg">
//           <p className="text-gray-600">
//             No campaigns found matching your criteria.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {filteredCampaigns.map((campaign) => (
//             <div
//               key={campaign.id}
//               className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="relative">
//                 <img
//                   src={campaign.image}
//                   alt={campaign.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <span className="absolute top-4 right-4 bg-white/90 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
//                   <FontAwesomeIcon icon={campaign.icon} className="mr-1" />
//                   {campaign.categoryName}
//                 </span>
//               </div>

//               <div className="p-5">
//                 <h3 className="text-xl font-bold text-slate-800 mb-2">
//                   {campaign.title}
//                 </h3>
//                 <p className="text-slate-600 mb-4 line-clamp-2">
//                   {campaign.description}
//                 </p>

//                 {/* Progress bar */}
//                 <div className="mb-2">
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div
//                       className="bg-teal-500 h-2.5 rounded-full"
//                       style={{
//                         width: `${calculateProgress(
//                           campaign.raised,
//                           campaign.goal
//                         )}%`,
//                       }}
//                     ></div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between text-sm text-slate-700 mb-4">
//                   <span className="font-medium">
//                     ${campaign.raised.toLocaleString()} raised
//                   </span>
//                   <span>of ${campaign.goal.toLocaleString()}</span>
//                 </div>

//                 <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
//                   <div className="flex items-center">
//                     <Users className="h-4 w-4 mr-1" />
//                     <span>{campaign.supporters} supporters</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Calendar className="h-4 w-4 mr-1" />
//                     <span>{campaign.daysLeft} days left</span>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center mt-4">
//                   <div className="flex space-x-2">
//                     <button className="p-2 rounded-full hover:bg-gray-100">
//                       <Heart className="h-5 w-5 text-slate-500" />
//                     </button>
//                     <button className="p-2 rounded-full hover:bg-gray-100">
//                       <Share2 className="h-5 w-5 text-slate-500" />
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => handleDonate(campaign.id)}
//                     className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     <DollarSign className="h-4 w-4 inline mr-1" />
//                     Donate Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div> 
//       )}
//     </div>
//   );
// };

// export default Campaigns;


import React from 'react'

const Campaigns = () => {
  return (
    <div>Campaigns</div>
  )
}

export default Campaigns